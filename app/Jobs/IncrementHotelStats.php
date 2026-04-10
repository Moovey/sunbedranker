<?php

namespace App\Jobs;

use App\Models\Hotel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class IncrementHotelStats implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public function __construct(
        public int $hotelId,
        public string $type, // 'view', 'click_affiliate', 'click_direct'
    ) {}

    public function handle(): void
    {
        $hotel = Hotel::find($this->hotelId);
        if (!$hotel) {
            return;
        }

        $date = now()->toDateString();

        if ($this->type === 'view') {
            $hotel->increment('view_count');

            $analytic = $hotel->analytics()->firstOrCreate(
                ['date' => $date],
                ['views' => 0, 'clicks' => 0]
            );
            $analytic->increment('views');
        } else {
            $hotel->increment('click_count');

            $clickType = $this->type === 'click_direct' ? 'direct' : 'affiliate';

            if ($clickType === 'direct') {
                $hotel->increment('direct_click_count');
            } else {
                $hotel->increment('affiliate_click_count');
            }

            $analytic = $hotel->analytics()->firstOrCreate(
                ['date' => $date],
                ['views' => 0, 'clicks' => 0, 'affiliate_clicks' => 0, 'direct_clicks' => 0]
            );
            $analytic->increment('clicks');

            if ($clickType === 'direct') {
                $analytic->increment('direct_clicks');
            } else {
                $analytic->increment('affiliate_clicks');
            }
        }
    }
}
