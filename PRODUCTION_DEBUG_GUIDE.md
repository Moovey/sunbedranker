# Production Debugging Guide - Hotel Creation Issues

## Problem
Hotels are not saving in the database and validation is not working in Laravel Cloud production environment.

## Changes Made

### 1. Enhanced Error Logging in Controller
**File:** `app/Http/Controllers/Admin/HotelManagementController.php`

Added comprehensive logging throughout the hotel creation process:
- Logs when validation attempt starts
- Logs when validation passes
- Logs image upload progress
- Logs hotel creation
- Logs pool criteria creation
- Logs score calculation
- Logs validation errors with details
- Logs general exceptions with full stack trace

### 2. Frontend Debugging
**File:** `resources/js/Pages/Admin/Hotels/Create.jsx`

Added console.log statements to track:
- Form data being submitted
- Success/failure of submission
- Validation errors received
- Request lifecycle (onFinish callback)

## How to Debug in Production

### Step 1: Check Laravel Logs
After deploying these changes, try to create a hotel in production and then check the logs:

```bash
# In your Laravel Cloud dashboard or via SSH
tail -f storage/logs/laravel.log
```

Look for entries like:
- `Hotel creation attempt` - Shows the request is reaching the controller
- `Validation passed successfully` - Validation is working
- `Validation failed` - Shows what validation rules failed
- `Hotel creation failed` - Shows any exceptions

### Step 2: Check Browser Console
Open the browser console (F12) when creating a hotel. You'll see:

```
=== SUBMITTING HOTEL ===
Form data: {name: "...", destination_id: 1, ...}
Route: http://your-domain.com/admin/hotels
```

If validation fails:
```
✗ Validation errors: {name: ["The name field is required."], ...}
Error count: 3
```

If successful:
```
✓ Hotel created successfully
=== REQUEST FINISHED ===
```

### Step 3: Common Production Issues & Solutions

#### Issue: Validation always passes (gets success message)
**Possible Causes:**
1. **Database connection issue** - Hotel appears to save but doesn't commit
2. **File upload permissions** - Images can't be saved to storage
3. **Missing environment variables**

**Check:**
```bash
# Verify database connection
php artisan tinker
>>> \DB::connection()->getPdo();

# Check storage permissions
ls -la storage/app/public/hotels
```

**Solution:**
```bash
# Ensure storage is linked
php artisan storage:link

# Set proper permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

#### Issue: Validation errors not showing in UI
**Possible Causes:**
1. `APP_DEBUG=false` hides detailed errors
2. Inertia not properly passing errors back

**Check Laravel Cloud Environment Variables:**
- `APP_DEBUG` should be `false` in production (this is normal)
- `SESSION_DRIVER` should match your configuration
- `SESSION_DOMAIN` should be set correctly

**Solution:** The code now has explicit error logging and console logging, so you can see what's happening even with `APP_DEBUG=false`.

#### Issue: Hotels not appearing in database
**Possible Causes:**
1. **Transaction rollback** - Exception after hotel is created
2. **Database write permissions**
3. **Wrong database connection**

**Check the logs for:**
```
Hotel created [hotel_id: 123]
```

If you see this but no hotel in database, there's a rollback happening.

**Solution:** Check the next log entry - it will show what exception caused the rollback.

### Step 4: Validate Database Schema in Production

Make sure all migrations ran successfully:

```bash
php artisan migrate:status
```

Check that the `pool_criteria` table has all required columns:

```bash
php artisan tinker
>>> \DB::select("SHOW COLUMNS FROM pool_criteria WHERE Field = 'pool_size_sqm'");
>>> \DB::select("SHOW COLUMNS FROM pool_criteria WHERE Field = 'pool_size_category'");
```

### Step 5: Test File Uploads

File upload issues are common in production. Test:

```bash
# Check if storage/app/public exists
ls -la storage/app/public

# Check if public/storage symlink exists
ls -la public/storage

# Recreate symlink if needed
php artisan storage:link

# Check permissions
# Owner should be the web server user (often www-data or nginx)
chown -R www-data:www-data storage
```

## Expected Log Output (Success)

When a hotel is successfully created, you should see:

```
[2026-01-02 12:34:56] local.INFO: Hotel creation attempt {"user_id":1,"has_main_image":true,"has_gallery":true}
[2026-01-02 12:34:56] local.INFO: Validation passed successfully
[2026-01-02 12:34:56] local.INFO: Uploading main image...
[2026-01-02 12:34:56] local.INFO: Main image uploaded {"path":"hotels/main/xyz123.jpg"}
[2026-01-02 12:34:56] local.INFO: Uploading gallery images...
[2026-01-02 12:34:57] local.INFO: Gallery images uploaded {"count":3}
[2026-01-02 12:34:57] local.INFO: Creating hotel record...
[2026-01-02 12:34:57] local.INFO: Hotel created {"hotel_id":45}
[2026-01-02 12:34:57] local.INFO: Creating pool criteria...
[2026-01-02 12:34:57] local.INFO: Pool criteria created {"criteria_id":45}
[2026-01-02 12:34:57] local.INFO: Calculating scores...
[2026-01-02 12:34:58] local.INFO: Scores calculated successfully
[2026-01-02 12:34:58] local.INFO: Hotel creation completed successfully {"hotel_id":45}
```

## Expected Log Output (Validation Failure)

```
[2026-01-02 12:34:56] local.INFO: Hotel creation attempt {"user_id":1,"has_main_image":false,"has_gallery":false}
[2026-01-02 12:34:56] local.WARNING: Validation failed {"errors":{"main_image":["The main image field is required."],"address":["The address field is required."]},"user_id":1}
```

## Quick Fixes Checklist

- [ ] Deploy the updated code to Laravel Cloud
- [ ] Check `storage/logs/laravel.log` after attempting to create a hotel
- [ ] Open browser console (F12) and check for JavaScript errors
- [ ] Verify `php artisan storage:link` was run
- [ ] Check storage folder permissions (775 or 755)
- [ ] Verify all environment variables are set correctly
- [ ] Run `php artisan migrate:status` to confirm migrations
- [ ] Test database connection with `php artisan tinker`
- [ ] Check if `pool_size_sqm` column exists in `pool_criteria` table
- [ ] Verify `APP_URL` matches your production domain

## Still Not Working?

Share the following information:
1. Relevant entries from `storage/logs/laravel.log`
2. Browser console output (especially the "SUBMITTING HOTEL" section)
3. Output of `php artisan migrate:status`
4. Result of checking the pool_criteria table structure

## Production vs Local Differences

| Aspect | Local (Laragon) | Production (Laravel Cloud) |
|--------|----------------|----------------------------|
| APP_DEBUG | true | false (hides detailed errors) |
| Error Display | On screen | In logs only |
| File Permissions | Usually permissive | May be strict |
| Storage Path | May differ | /storage/app/public |
| Database User | root (full access) | Limited permissions |
| Session Driver | file | May be redis/database |

The logging we added will help identify which of these differences is causing the issue.
