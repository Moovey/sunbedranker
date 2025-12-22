<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\HotelManagementController;
use App\Http\Controllers\Admin\ClaimManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Hotels Management
    Route::get('/hotels', [HotelManagementController::class, 'index'])->name('hotels.index');
    Route::get('/hotels/create', [HotelManagementController::class, 'create'])->name('hotels.create');
    Route::post('/hotels', [HotelManagementController::class, 'store'])->name('hotels.store');
    Route::get('/hotels/{hotel}/edit', [HotelManagementController::class, 'edit'])->name('hotels.edit');
    Route::patch('/hotels/{hotel}', [HotelManagementController::class, 'update'])->name('hotels.update');
    Route::delete('/hotels/{hotel}', [HotelManagementController::class, 'destroy'])->name('hotels.destroy');
    Route::post('/hotels/{hotel}/pool-criteria', [HotelManagementController::class, 'updatePoolCriteria'])->name('hotels.pool-criteria');
    Route::post('/hotels/{hotel}/recalculate-score', [HotelManagementController::class, 'recalculateScore'])->name('hotels.recalculate-score');
    Route::post('/hotels/recalculate-all-scores', [HotelManagementController::class, 'recalculateAllScores'])->name('hotels.recalculate-all-scores');

    // Hotel Claims
    Route::get('/claims', [ClaimManagementController::class, 'index'])->name('claims.index');
    Route::post('/claims/{claim}/approve', [ClaimManagementController::class, 'approve'])->name('claims.approve');
    Route::post('/claims/{claim}/reject', [ClaimManagementController::class, 'reject'])->name('claims.reject');
});
