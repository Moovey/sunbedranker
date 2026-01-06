<?php

use App\Http\Controllers\Hotelier\HotelierDashboardController;
use App\Http\Controllers\ClaimController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hotelier'])->prefix('hotelier')->name('hotelier.')->group(function () {
    // Dashboard
    Route::get('/', [HotelierDashboardController::class, 'index'])->name('dashboard');

    // Hotel Claims
    Route::get('/claims', [ClaimController::class, 'index'])->name('claims.index');
    Route::get('/hotels/{hotel}/claim', [ClaimController::class, 'create'])->name('hotels.claim');
    Route::post('/hotels/{hotel}/claim', [ClaimController::class, 'store'])->name('hotels.claim.store');
});
