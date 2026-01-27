<?php

namespace App\Observers;

use App\Http\Controllers\Admin\HotelManagementController;
use App\Models\Destination;
use Illuminate\Support\Facades\Cache;

class DestinationObserver
{
    /**
     * Clear public destinations cache.
     */
    private function clearPublicCache(): void
    {
        Cache::forget('destinations:index');
    }

    /**
     * Handle the Destination "created" event.
     */
    public function created(Destination $destination): void
    {
        HotelManagementController::clearDestinationsCache();
        $this->clearPublicCache();
    }

    /**
     * Handle the Destination "updated" event.
     */
    public function updated(Destination $destination): void
    {
        // Only clear if name or is_active changed (affects dropdown)
        if ($destination->wasChanged(['name', 'is_active'])) {
            HotelManagementController::clearDestinationsCache();
            $this->clearPublicCache();
        }
    }

    /**
     * Handle the Destination "deleted" event.
     */
    public function deleted(Destination $destination): void
    {
        HotelManagementController::clearDestinationsCache();
        $this->clearPublicCache();
    }

    /**
     * Handle the Destination "restored" event.
     */
    public function restored(Destination $destination): void
    {
        HotelManagementController::clearDestinationsCache();
        $this->clearPublicCache();
    }
}
