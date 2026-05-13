<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\ComparisonController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\StaticPageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Health check endpoint for monitoring (rate-limited so it can't be used to fingerprint infra)
Route::get('/health', function () {
    try {
        $dbOk = DB::connection()->getPdo() !== null;
    } catch (\Exception $e) {
        $dbOk = false;
    }
    
    try {
        $cacheOk = Cache::put('health-check', true, 60) && Cache::has('health-check');
    } catch (\Exception $e) {
        $cacheOk = false;
    }
    
    $healthy = $dbOk && $cacheOk;
    
    return response()->json([
        'status' => $healthy ? 'healthy' : 'unhealthy',
        'timestamp' => now()->toISOString(),
        'checks' => [
            'database' => $dbOk ? 'ok' : 'error',
            'cache' => $cacheOk ? 'ok' : 'error',
        ],
    ], $healthy ? 200 : 503);
})->middleware('throttle:30,1')->name('health');

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Search (rate limited: 30 requests per minute)
Route::get('/search', [SearchController::class, 'search'])
    ->middleware('throttle:30,1')
    ->name('search');

Route::get('/search/autocomplete', [SearchController::class, 'autocomplete'])
    ->middleware('throttle:60,1')
    ->name('search.autocomplete');

Route::get('/search/popular', [SearchController::class, 'popular'])
    ->middleware('throttle:60,1')
    ->name('search.popular');

// Destinations
Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations.index');
Route::get('/destinations/{destination:slug}', [DestinationController::class, 'show'])->name('destinations.show');

// Hotels
Route::get('/hotels/{hotel:slug}', [HotelController::class, 'show'])->name('hotels.show');
Route::get('/hotels/{hotel:slug}/click', [HotelController::class, 'trackClick'])->name('hotels.click');

// Comparison
Route::get('/compare', [ComparisonController::class, 'index'])->name('compare.index');
Route::post('/compare/add/{hotel}', [ComparisonController::class, 'add'])->name('compare.add');
Route::delete('/compare/remove/{hotel}', [ComparisonController::class, 'remove'])->name('compare.remove');
Route::delete('/compare/clear', [ComparisonController::class, 'clear'])->name('compare.clear');

// Blog / Guides
Route::get('/guides', [BlogController::class, 'index'])->name('blog.index');
Route::get('/guides/{post:slug}', [BlogController::class, 'show'])->name('blog.show');

// Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Static / Editorial Pages
Route::get('/about', [StaticPageController::class, 'about'])->name('about');
Route::get('/how-we-rate', [StaticPageController::class, 'howWeRate'])->name('how-we-rate');
Route::get('/editorial-policy', [StaticPageController::class, 'editorialPolicy'])->name('editorial-policy');
Route::get('/contact', [StaticPageController::class, 'contact'])->name('contact');
Route::get('/privacy-policy', [StaticPageController::class, 'privacyPolicy'])->name('privacy-policy');
Route::get('/terms-of-service', [StaticPageController::class, 'termsOfService'])->name('terms-of-service');
Route::get('/cookie-policy', [StaticPageController::class, 'cookiePolicy'])->name('cookie-policy');
Route::get('/affiliate-disclosure', [StaticPageController::class, 'affiliateDisclosure'])->name('affiliate-disclosure');

// Authenticated routes (regular users)
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // User Profile (new branded profile page)
    Route::get('/my-profile', [UserProfileController::class, 'index'])->name('user.profile');
    Route::post('/my-profile', [UserProfileController::class, 'update'])
        ->middleware('throttle:6,1') // 6 attempts per minute
        ->name('user.profile.update');
    Route::put('/my-profile/password', [UserProfileController::class, 'updatePassword'])
        ->middleware('throttle:3,1') // 3 attempts per minute (stricter for password)
        ->name('user.profile.password');
    Route::delete('/my-profile/picture', [UserProfileController::class, 'removeProfilePicture'])->name('user.profile.picture.remove');
    
    // Keep old profile routes for password/email updates (used by Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->middleware('throttle:6,1') // 6 attempts per minute
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->middleware('throttle:3,1') // 3 attempts per minute (stricter for deletion)
        ->name('profile.destroy');
});

// Admin routes
require __DIR__.'/admin.php';

// Hotelier routes
require __DIR__.'/hotelier.php';

require __DIR__.'/auth.php';
