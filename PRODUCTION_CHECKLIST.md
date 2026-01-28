# SunbedRanker Production Deployment Checklist

## Pre-Deployment (Local)

### 1. Code Quality
- [ ] All tests passing: `php artisan test`
- [ ] No PHP errors: `php artisan route:list` (should not error)
- [ ] Security audit: `composer audit`

### 2. Environment Configuration
- [ ] Copy `.env.example` to production `.env`
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Generate new `APP_KEY`: `php artisan key:generate`
- [ ] Set proper `APP_URL`

### 3. Database
- [ ] Run migrations: `php artisan migrate --force`
- [ ] Seed any required data: `php artisan db:seed --force`

---

## Server Requirements

### Minimum Specs (500-1000 users/day)
- **CPU**: 2 vCPU
- **RAM**: 4GB
- **Storage**: 20GB SSD
- **PHP**: 8.2+
- **MySQL**: 8.0+ or MariaDB 10.6+

### Recommended Specs (5000+ users/day)
- **CPU**: 4 vCPU
- **RAM**: 8GB
- **Storage**: 50GB SSD
- **Redis**: For caching and sessions
- **CDN**: Cloudflare or similar

---

## Production .env Settings

```env
# Application
APP_NAME=SunbedRanker
APP_ENV=production
APP_DEBUG=false
APP_URL=https://sunbedranker.com

# Logging
LOG_CHANNEL=daily
LOG_LEVEL=error

# Database
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=sunbedranker
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password

# Cache (Redis recommended for production)
CACHE_STORE=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Session (Redis recommended)
SESSION_DRIVER=redis
SESSION_LIFETIME=120

# Queue (Redis recommended)
QUEUE_CONNECTION=redis

# Mail (for notifications)
MAIL_MAILER=smtp
MAIL_HOST=your-mail-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@sunbedranker.com
MAIL_FROM_NAME="${APP_NAME}"
```

---

## Post-Deployment Commands

### Essential (Run after every deployment)
```bash
# Clear old caches first
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Build fresh caches
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Run any new migrations
php artisan migrate --force

# Restart queue workers
php artisan queue:restart
```

### One-time Setup
```bash
# Link storage for file uploads
php artisan storage:link

# Create cache table (if using database cache)
php artisan cache:table
php artisan migrate
```

---

## Performance Optimizations

### 1. PHP OPcache (php.ini)
```ini
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0
opcache.revalidate_freq=0
opcache.interned_strings_buffer=16
```

### 2. MySQL Optimizations (my.cnf)
```ini
[mysqld]
innodb_buffer_pool_size=1G
innodb_log_file_size=256M
innodb_flush_log_at_trx_commit=2
query_cache_type=1
query_cache_size=128M
```

### 3. Nginx Configuration
```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name sunbedranker.com;
    root /var/www/sunbedranker/public;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Static file caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_buffer_size 128k;
        fastcgi_buffers 256 16k;
    }
}
```

---

## Monitoring

### 1. Health Check Endpoint
Add to `routes/web.php`:
```php
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toISOString(),
        'database' => DB::connection()->getPdo() ? 'connected' : 'error',
        'cache' => Cache::has('health-check') || Cache::put('health-check', true, 60) ? 'working' : 'error',
    ]);
});
```

### 2. Recommended Tools
- **Uptime**: UptimeRobot (free) or Pingdom
- **Errors**: Sentry or Bugsnag
- **Performance**: Laravel Telescope (dev) or New Relic (production)
- **Logs**: Papertrail or Loggly

---

## Queue Worker (Supervisor)

Create `/etc/supervisor/conf.d/sunbedranker-worker.conf`:
```ini
[program:sunbedranker-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/sunbedranker/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/sunbedranker/storage/logs/worker.log
stopwaitsecs=3600
```

Then run:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start sunbedranker-worker:*
```

---

## Security Checklist

- [ ] SSL certificate installed (Let's Encrypt free)
- [ ] `APP_DEBUG=false` in production
- [ ] Database not publicly accessible
- [ ] File permissions: storage/logs writable, code not writable
- [ ] Rate limiting enabled (✅ already done)
- [ ] CORS configured properly
- [ ] Secure headers (CSP, X-Frame-Options, etc.)

---

## Backup Strategy

### Database
```bash
# Daily backup cron job
0 2 * * * mysqldump -u user -p sunbedranker | gzip > /backups/db-$(date +\%Y\%m\%d).sql.gz
```

### Files
```bash
# Backup uploaded files
0 3 * * * tar -czf /backups/uploads-$(date +\%Y\%m\%d).tar.gz /var/www/sunbedranker/storage/app/public
```

---

## Scaling Checklist (When you outgrow single server)

- [ ] Move database to managed service (AWS RDS, DigitalOcean Managed DB)
- [ ] Move Redis to managed service (AWS ElastiCache, Redis Cloud)
- [ ] Set up load balancer with multiple app servers
- [ ] Move file storage to S3 or similar
- [ ] Use CDN for all static assets
- [ ] Consider Laravel Octane for 2-3x performance boost
