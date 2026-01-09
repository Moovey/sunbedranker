<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\ComparisonController;
use App\Http\Controllers\SearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// TEMPORARY: Test S3 upload - DELETE AFTER TESTING
Route::get('/test-s3', function () {
    try {
        $disk = config('filesystems.public_uploads', 'public');
        $testContent = 'Test file created at ' . now();
        
        // Try to write a test file
        $result = \Illuminate\Support\Facades\Storage::disk($disk)->put('test.txt', $testContent);
        
        if ($result) {
            $url = \Illuminate\Support\Facades\Storage::disk($disk)->url('test.txt');
            return response()->json([
                'success' => true,
                'message' => 'S3 write successful!',
                'disk' => $disk,
                'url' => $url,
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'S3 write returned false',
            'disk' => $disk,
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
            'disk' => config('filesystems.public_uploads', 'public'),
        ]);
    }
});

// Search
Route::get('/search', [SearchController::class, 'search'])->name('search');

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

// Authenticated routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
require __DIR__.'/admin.php';

// Hotelier routes
require __DIR__.'/hotelier.php';

require __DIR__.'/auth.php';
