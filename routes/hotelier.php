<?php

use App\Http\Controllers\Hotelier\HotelierDashboardController;
use App\Http\Controllers\Hotelier\HotelierProfileController;
use App\Http\Controllers\Hotelier\HotelManagementController;
use App\Http\Controllers\ClaimController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hotelier'])->prefix('hotelier')->name('hotelier.')->group(function () {
    // Dashboard
    Route::get('/', [HotelierDashboardController::class, 'index'])->name('dashboard');

    // Hotelier Profile
    Route::get('/profile', [HotelierProfileController::class, 'index'])->name('profile');
    Route::post('/profile', [HotelierProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [HotelierProfileController::class, 'updatePassword'])->name('profile.password');
    Route::delete('/profile/picture', [HotelierProfileController::class, 'removeProfilePicture'])->name('profile.picture.remove');

    // Hotel Claims
    Route::get('/claims', [ClaimController::class, 'index'])->name('claims.index');
    Route::get('/hotels/{hotel}/claim', [ClaimController::class, 'create'])->name('hotels.claim');
    Route::post('/hotels/{hotel}/claim', [ClaimController::class, 'store'])->name('hotels.claim.store');

    // Hotel Management (for approved claims)
    Route::get('/hotels/{hotel:slug}/manage', [HotelManagementController::class, 'edit'])->name('hotels.manage');
    Route::post('/hotels/{hotel:slug}/manage', [HotelManagementController::class, 'update'])->name('hotels.update');
    Route::post('/hotels/{hotel:slug}/images', [HotelManagementController::class, 'uploadImage'])->name('hotels.uploadImage');
    Route::delete('/hotels/{hotel:slug}/images/{image}', [HotelManagementController::class, 'deleteImage'])->name('hotels.deleteImage');
});
