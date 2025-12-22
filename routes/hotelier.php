<?php

use App\Http\Controllers\Hotelier\HotelierDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hotelier'])->prefix('hotelier')->name('hotelier.')->group(function () {
    // Dashboard
    Route::get('/', [HotelierDashboardController::class, 'index'])->name('dashboard');
});
