<?php

namespace App\Services;

use App\Models\Hotel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * Centralised logic for matching hotels against badge criteria.
 *
 * Used by both the admin controller (preview) and the queued job
 * (ApplyBadgesToHotels) so the matching rules cannot diverge.
 */
class BadgeCriteriaService
{
    /**
     * Boolean flag fields stored on the pool_criteria table.
     *
     * @var list<string>
     */
    public const POOL_BOOLEAN_FIELDS = [
        'has_infinity_pool', 'has_rooftop_pool',
        'has_pool_bar', 'has_waiter_service',
        'has_accessibility_ramp', 'has_pool_hoist',
        'has_step_free_access', 'has_elevator_to_rooftop',
        'has_kids_pool', 'has_splash_park', 'has_waterslide', 'has_lifeguard',
        'has_luxury_cabanas', 'has_cabana_service',
        'has_heated_pool', 'has_jacuzzi', 'has_adult_sun_terrace',
        'is_adults_only', 'has_entertainment',
        // Legacy aliases still supported by older badges
        'has_swim_up_bar', 'has_private_cabanas', 'towels_included',
    ];

    /**
     * Numeric fields stored on the pool_criteria table.
     *
     * @var list<string>
     */
    public const POOL_NUMBER_FIELDS = [
        'sunbed_count', 'sunbed_to_guest_ratio',
        'pool_size_sqm', 'number_of_pools',
        'cleanliness_rating', 'sunbed_condition_rating', 'tiling_condition_rating',
    ];

    /**
     * Numeric score fields stored directly on the hotels table.
     *
     * @var list<string>
     */
    public const HOTEL_SCORE_FIELDS = [
        'overall_score', 'family_score', 'quiet_score', 'party_score',
    ];

    /**
     * Whitelisted comparison operators accepted in badge criteria.
     *
     * @var list<string>
     */
    public const ALLOWED_OPERATORS = ['>', '>=', '<', '<=', '==', '!='];

    /**
     * Return every field name that may appear in a badge criterion.
     *
     * @return list<string>
     */
    public static function allowedFields(): array
    {
        return array_values(array_unique(array_merge(
            self::POOL_BOOLEAN_FIELDS,
            self::POOL_NUMBER_FIELDS,
            self::HOTEL_SCORE_FIELDS,
        )));
    }

    /**
     * Build a query that matches hotels against the given criteria array.
     *
     * @param array<int, array{field: string, operator: string, value: mixed}> $criteria
     */
    public function query(array $criteria): Builder
    {
        $query = Hotel::with('poolCriteria');

        foreach ($criteria as $criterion) {
            $field    = (string) ($criterion['field'] ?? '');
            $operator = (string) ($criterion['operator'] ?? '=');
            $rawValue = $criterion['value'] ?? null;

            if ($field === '' || ! in_array($operator, self::ALLOWED_OPERATORS, true)) {
                continue; // silently skip malformed criteria
            }

            // SQL uses '=' rather than '==' for equality.
            $sqlOperator = $operator === '==' ? '=' : $operator;

            if (in_array($field, self::POOL_BOOLEAN_FIELDS, true)) {
                $boolValue = self::toBool($rawValue);
                $query->whereHas('poolCriteria', function (Builder $q) use ($field, $sqlOperator, $boolValue) {
                    // For booleans only equality / inequality make sense.
                    $q->where($field, $sqlOperator === '!=' ? '!=' : '=', $boolValue);
                });
            } elseif (in_array($field, self::HOTEL_SCORE_FIELDS, true)) {
                $query->where($field, $sqlOperator, $rawValue);
            } elseif (in_array($field, self::POOL_NUMBER_FIELDS, true)) {
                $query->whereHas('poolCriteria', function (Builder $q) use ($field, $sqlOperator, $rawValue) {
                    $q->where($field, $sqlOperator, $rawValue);
                });
            }
            // Unknown fields are ignored — server-side validation should
            // already have rejected them at the controller layer.
        }

        return $query;
    }

    /**
     * Get all matching hotels.
     *
     * @param array<int, array{field: string, operator: string, value: mixed}> $criteria
     * @return Collection<int, Hotel>
     */
    public function matchingHotels(array $criteria): Collection
    {
        return $this->query($criteria)->get();
    }

    /**
     * Coerce loose JSON / form values into a strict boolean.
     *
     * Fixes the bug where filter_var('', FILTER_VALIDATE_BOOLEAN) returns
     * null and silently breaks the query.
     */
    public static function toBool(mixed $value): bool
    {
        if (is_bool($value)) {
            return $value;
        }
        if (is_int($value)) {
            return $value === 1;
        }
        if (is_string($value)) {
            return in_array(strtolower(trim($value)), ['1', 'true', 'yes', 'on'], true);
        }
        return (bool) $value;
    }
}
