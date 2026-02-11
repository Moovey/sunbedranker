<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\DestinationApiController;
use App\Http\Controllers\Admin\DestinationManagementController;
use App\Http\Controllers\Admin\HotelManagementController;
use App\Http\Controllers\Admin\ClaimManagementController;
use App\Http\Controllers\Admin\ContentManagementController;
use App\Http\Controllers\Admin\ScoringSettingsController;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin', 'throttle:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Admin Profile
    Route::get('/profile', [AdminProfileController::class, 'index'])->name('profile');
    Route::post('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [AdminProfileController::class, 'updatePassword'])->name('profile.password');
    Route::delete('/profile/picture', [AdminProfileController::class, 'removeProfilePicture'])->name('profile.picture.remove');

    // Hotels Management
    Route::get('/hotels', [HotelManagementController::class, 'index'])->name('hotels.index');
    Route::get('/hotels/create', [HotelManagementController::class, 'create'])->name('hotels.create');
    Route::post('/hotels', [HotelManagementController::class, 'store'])->name('hotels.store');
    Route::get('/hotels/{hotel:id}/edit', [HotelManagementController::class, 'edit'])->name('hotels.edit');
    Route::post('/hotels/{hotel:id}', [HotelManagementController::class, 'update'])->name('hotels.update');
    Route::delete('/hotels/{hotel:id}', [HotelManagementController::class, 'destroy'])->name('hotels.destroy');
    
    // Hotel Pool Criteria & Scoring
    Route::post('/hotels/{hotel:id}/pool-criteria', [HotelManagementController::class, 'updatePoolCriteria'])->name('hotels.pool-criteria');
    Route::post('/hotels/{hotel:id}/recalculate-score', [HotelManagementController::class, 'recalculateScore'])->name('hotels.recalculate-score');
    
    // Bulk operations with stricter rate limiting
    Route::post('/hotels/recalculate-all-scores', [HotelManagementController::class, 'recalculateAllScores'])
        ->middleware('throttle:admin-bulk')
        ->name('hotels.recalculate-all-scores');
    
    // Hotel Images
    Route::post('/hotels/{hotel:id}/upload-main-image', [HotelManagementController::class, 'uploadMainImage'])->name('hotels.upload-main-image');
    Route::post('/hotels/{hotel:id}/upload-gallery-images', [HotelManagementController::class, 'uploadGalleryImages'])->name('hotels.upload-gallery-images');
    Route::delete('/hotels/{hotel:id}/delete-gallery-image', [HotelManagementController::class, 'deleteGalleryImage'])->name('hotels.delete-gallery-image');
    
    // Hotel Badges
    Route::post('/hotels/{hotel:id}/update-badges', [HotelManagementController::class, 'updateBadges'])->name('hotels.update-badges');
    Route::post('/hotels/{hotel:id}/auto-assign-badges', [HotelManagementController::class, 'autoAssignBadges'])->name('hotels.auto-assign-badges');
    
    // Hotel Subscription
    Route::post('/hotels/{hotel:id}/update-subscription', [HotelManagementController::class, 'updateSubscription'])->name('hotels.update-subscription');

    // Scoring & Criteria Settings
    Route::get('/scoring', [ScoringSettingsController::class, 'index'])->name('scoring.index');
    Route::put('/scoring/weights', [ScoringSettingsController::class, 'updateWeights'])->name('scoring.weights.update');
    Route::put('/scoring/visibility', [ScoringSettingsController::class, 'updateVisibility'])->name('scoring.visibility.update');
    Route::put('/scoring/order', [ScoringSettingsController::class, 'updateOrder'])->name('scoring.order.update');
    
    // Bulk recalculate with stricter rate limiting
    Route::post('/scoring/recalculate', [ScoringSettingsController::class, 'recalculateAllScores'])
        ->middleware('throttle:admin-bulk')
        ->name('scoring.recalculate');
    
    // Badge Management
    Route::post('/scoring/badges', [ScoringSettingsController::class, 'storeBadge'])->name('scoring.badges.store');
    Route::put('/scoring/badges/{badge}', [ScoringSettingsController::class, 'updateBadge'])->name('scoring.badges.update');
    Route::delete('/scoring/badges/{badge}', [ScoringSettingsController::class, 'destroyBadge'])->name('scoring.badges.destroy');
    Route::post('/scoring/badges/{badge}/toggle', [ScoringSettingsController::class, 'toggleBadge'])->name('scoring.badges.toggle');
    Route::post('/scoring/badges/{badge}/apply', [ScoringSettingsController::class, 'applyBadgeToHotels'])->name('scoring.badges.apply');
    Route::post('/scoring/badges/preview', [ScoringSettingsController::class, 'previewBadge'])->name('scoring.badges.preview');
    
    // Apply all badges - bulk operation with stricter rate limiting
    Route::post('/scoring/badges/apply-all', [ScoringSettingsController::class, 'applyAllBadges'])
        ->middleware('throttle:admin-bulk')
        ->name('scoring.badges.apply-all');
    
    // Job progress endpoint for AJAX polling
    Route::get('/scoring/job-progress', [ScoringSettingsController::class, 'getJobProgress'])
        ->name('scoring.job-progress');

    // Hotel Claims
    Route::get('/claims', [ClaimManagementController::class, 'index'])->name('claims.index');
    Route::get('/claims/{claim}', [ClaimManagementController::class, 'show'])->name('claims.show');
    Route::post('/claims/{claim}/approve', [ClaimManagementController::class, 'approve'])->name('claims.approve');
    Route::post('/claims/{claim}/reject', [ClaimManagementController::class, 'reject'])->name('claims.reject');
    
    // Hotelier Subscription Management
    Route::post('/hoteliers/{user}/subscription', [ClaimManagementController::class, 'updateSubscription'])->name('hoteliers.update-subscription');
    Route::post('/hoteliers/{user}/temporary-access', [ClaimManagementController::class, 'grantTemporaryAccess'])->name('hoteliers.temporary-access');
    Route::post('/subscriptions/{subscription}/cancel', [ClaimManagementController::class, 'cancelSubscription'])->name('subscriptions.cancel');
    Route::get('/hoteliers/{user}/performance', [ClaimManagementController::class, 'hotelierPerformance'])->name('hoteliers.performance');

    // Users Management
    Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
    Route::get('/users/{user}/edit', [UserManagementController::class, 'edit'])->name('users.edit');
    Route::patch('/users/{user}', [UserManagementController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');

    // Content Management
    Route::get('/content', [ContentManagementController::class, 'index'])->name('content.index');
    
    // Posts
    Route::get('/content/posts/create', [ContentManagementController::class, 'createPost'])->name('content.posts.create');
    Route::post('/content/posts', [ContentManagementController::class, 'storePost'])->name('content.posts.store');
    Route::get('/content/posts/{post}/edit', [ContentManagementController::class, 'editPost'])->name('content.posts.edit');
    Route::put('/content/posts/{post}', [ContentManagementController::class, 'updatePost'])->name('content.posts.update');
    Route::delete('/content/posts/{post}', [ContentManagementController::class, 'destroyPost'])->name('content.posts.destroy');
    Route::post('/content/posts/{post}/toggle-status', [ContentManagementController::class, 'togglePostStatus'])->name('content.posts.toggle-status');
    Route::post('/content/upload-image', [ContentManagementController::class, 'uploadContentImage'])->name('content.upload-image');
    
    // Categories
    Route::post('/content/categories', [ContentManagementController::class, 'storeCategory'])->name('content.categories.store');
    Route::put('/content/categories/{category}', [ContentManagementController::class, 'updateCategory'])->name('content.categories.update');
    Route::delete('/content/categories/{category}', [ContentManagementController::class, 'destroyCategory'])->name('content.categories.destroy');
    
    // Tags
    Route::post('/content/tags', [ContentManagementController::class, 'storeTag'])->name('content.tags.store');
    Route::put('/content/tags/{tag}', [ContentManagementController::class, 'updateTag'])->name('content.tags.update');
    Route::delete('/content/tags/{tag}', [ContentManagementController::class, 'destroyTag'])->name('content.tags.destroy');

    // Destinations Management
    Route::get('/destinations', [DestinationManagementController::class, 'index'])->name('destinations.index');
    Route::get('/destinations/{destination:id}/edit', [DestinationManagementController::class, 'edit'])->name('destinations.edit');
    Route::put('/destinations/{destination:id}', [DestinationManagementController::class, 'update'])->name('destinations.update');
    Route::post('/destinations/{destination:id}/toggle-active', [DestinationManagementController::class, 'toggleActive'])->name('destinations.toggle-active');
    Route::post('/destinations/{destination:id}/toggle-featured', [DestinationManagementController::class, 'toggleFeatured'])->name('destinations.toggle-featured');
    Route::delete('/destinations/{destination:id}', [DestinationManagementController::class, 'destroy'])->name('destinations.destroy');

    // Destination Lookup API (AJAX endpoints for lazy city seeding)
    Route::get('/api/destinations/countries', [DestinationApiController::class, 'countries'])->name('api.destinations.countries');
    Route::get('/api/destinations/cities', [DestinationApiController::class, 'searchCities'])->name('api.destinations.cities');

    // Live stats polling endpoint (lightweight JSON)
    Route::get('/api/stats/pending-claims', function () {
        return response()->json([
            'pending_claims' => Cache::remember('admin.nav.pending_claims', now()->addMinutes(2), function () {
                return \App\Models\HotelClaim::where('status', 'pending')->count();
            }),
        ]);
    })->name('api.stats.pending-claims');
});
