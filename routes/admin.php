<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\HotelManagementController;
use App\Http\Controllers\Admin\ClaimManagementController;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Hotels Management
    Route::get('/hotels', [HotelManagementController::class, 'index'])->name('hotels.index');
    Route::get('/hotels/create', [HotelManagementController::class, 'create'])->name('hotels.create');
    Route::post('/hotels', [HotelManagementController::class, 'store'])->name('hotels.store');
    Route::get('/hotels/{hotel:id}/edit', [HotelManagementController::class, 'edit'])->name('hotels.edit');
    Route::patch('/hotels/{hotel:id}', [HotelManagementController::class, 'update'])->name('hotels.update');
    Route::delete('/hotels/{hotel:id}', [HotelManagementController::class, 'destroy'])->name('hotels.destroy');
    
    // Hotel Pool Criteria & Scoring
    Route::post('/hotels/{hotel:id}/pool-criteria', [HotelManagementController::class, 'updatePoolCriteria'])->name('hotels.pool-criteria');
    Route::post('/hotels/{hotel:id}/recalculate-score', [HotelManagementController::class, 'recalculateScore'])->name('hotels.recalculate-score');
    Route::post('/hotels/recalculate-all-scores', [HotelManagementController::class, 'recalculateAllScores'])->name('hotels.recalculate-all-scores');
    
    // Hotel Images
    Route::post('/hotels/{hotel:id}/upload-main-image', [HotelManagementController::class, 'uploadMainImage'])->name('hotels.upload-main-image');
    Route::post('/hotels/{hotel:id}/upload-gallery-images', [HotelManagementController::class, 'uploadGalleryImages'])->name('hotels.upload-gallery-images');
    Route::delete('/hotels/{hotel:id}/delete-gallery-image', [HotelManagementController::class, 'deleteGalleryImage'])->name('hotels.delete-gallery-image');
    
    // Amadeus API Integration
    Route::post('/hotels/search-amadeus', [HotelManagementController::class, 'searchAmadeus'])->name('hotels.search-amadeus');
    Route::post('/hotels/{hotel:id}/import-amadeus', [HotelManagementController::class, 'importFromAmadeus'])->name('hotels.import-amadeus');
    
    // Hotel Badges
    Route::post('/hotels/{hotel:id}/update-badges', [HotelManagementController::class, 'updateBadges'])->name('hotels.update-badges');
    Route::post('/hotels/{hotel:id}/auto-assign-badges', [HotelManagementController::class, 'autoAssignBadges'])->name('hotels.auto-assign-badges');
    
    // Hotel Subscription
    Route::post('/hotels/{hotel:id}/update-subscription', [HotelManagementController::class, 'updateSubscription'])->name('hotels.update-subscription');

    // Hotel Claims
    Route::get('/claims', [ClaimManagementController::class, 'index'])->name('claims.index');
    Route::get('/claims/{claim}', [ClaimManagementController::class, 'show'])->name('claims.show');
    Route::post('/claims/{claim}/approve', [ClaimManagementController::class, 'approve'])->name('claims.approve');
    Route::post('/claims/{claim}/reject', [ClaimManagementController::class, 'reject'])->name('claims.reject');

    // Users Management
    Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
    Route::get('/users/{user}/edit', [UserManagementController::class, 'edit'])->name('users.edit');
    Route::patch('/users/{user}', [UserManagementController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
});
