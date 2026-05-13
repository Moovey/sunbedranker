<?php

namespace App\Http\Resources;

use App\DataTransferObjects\Suggestion;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\DataTransferObjects\Suggestion
 */
class SuggestionResource extends JsonResource
{
    public static $wrap = null;

    public function toArray($request): array
    {
        /** @var Suggestion $s */
        $s = $this->resource;

        return $s->toArray();
    }
}
