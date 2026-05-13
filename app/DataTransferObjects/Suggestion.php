<?php

namespace App\DataTransferObjects;

/**
 * Immutable typed representation of a single autocomplete suggestion.
 */
final class Suggestion
{
    public function __construct(
        public readonly string $type,        // 'hotel' | 'destination' | 'region'
        public readonly string $label,
        public readonly string $sublabel,
        public readonly string $value,
        public readonly int $hotelCount,
        public readonly ?string $slug = null,
        public readonly ?float $score = null,    // overall_score (hotel)
        public readonly float $relevance = 0.0,  // ranking score for sort
    ) {
    }

    public function toArray(): array
    {
        return array_filter([
            'type'        => $this->type,
            'label'       => $this->label,
            'sublabel'    => $this->sublabel,
            'value'       => $this->value,
            'slug'        => $this->slug,
            'score'       => $this->score,
            'hotel_count' => $this->hotelCount,
        ], fn ($v) => $v !== null);
    }
}
