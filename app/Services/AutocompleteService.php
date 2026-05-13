<?php

namespace App\Services;

use App\DataTransferObjects\Suggestion;
use App\Models\Destination;
use App\Models\Hotel;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

/**
 * Builds smart autocomplete suggestions for the search bar.
 *
 * Pipeline:
 *   1. Resolve aliases (e.g. "Spain" → country=España).
 *   2. Match destinations (name/country/region/code).
 *   3. Match hotels (name).
 *   4. Group destinations under shared country/region buckets.
 *   5. Score every suggestion for relevance and rank.
 *
 * Cached per-query for `config('search.cache_ttl')` seconds.
 * Invalidated globally by a versioned cache key bumped via observers.
 */
class AutocompleteService
{
    public const VERSION_KEY = 'search:autocomplete:version';

    /**
     * Bumped whenever a hotel/destination changes — invalidates all
     * autocomplete cache entries without needing tagged caches
     * (database/file driver compatible).
     */
    public static function bumpVersion(): void
    {
        Cache::add(self::VERSION_KEY, 1);
        Cache::increment(self::VERSION_KEY);
    }

    public static function currentVersion(): int
    {
        return (int) Cache::get(self::VERSION_KEY, 1);
    }

    public function suggest(string $query): array
    {
        $query = trim($query);
        if ($query === '') {
            return [];
        }

        $cacheKey = sprintf(
            'search:autocomplete:v%d:%s',
            self::currentVersion(),
            md5(Str::lower($query))
        );

        return Cache::remember($cacheKey, config('search.cache_ttl', 1800), function () use ($query) {
            return $this->build($query)
                ->sortByDesc('relevance')
                ->take(config('search.limits.total', 12))
                ->map(fn (Suggestion $s) => $s->toArray())
                ->values()
                ->all();
        });
    }

    /**
     * Returns popular destinations for the empty-state dropdown.
     * Cached daily; cheap fallback to featured destinations.
     */
    public function popular(): array
    {
        return Cache::remember(
            'search:popular:v' . self::currentVersion(),
            config('search.popular_cache_ttl', 86400),
            function () {
                $limit = config('search.limits.popular', 6);

                $destinations = Destination::active()
                    ->withCount(['hotels' => fn ($q) => $q->where('is_active', true)])
                    ->orderByDesc('is_featured')
                    ->orderByDesc('hotels_count')
                    ->limit($limit)
                    ->get();

                return $destinations->map(fn (Destination $d) => (new Suggestion(
                    type: 'destination',
                    label: $d->name,
                    sublabel: implode(', ', array_filter([$d->region, $d->country])),
                    value: $d->name,
                    hotelCount: (int) $d->hotels_count,
                ))->toArray())->all();
            }
        );
    }

    /* -------------------------------------------------------------- */
    /*  Internal pipeline                                             */
    /* -------------------------------------------------------------- */

    private function build(string $query): Collection
    {
        $weights = config('search.weights');
        $lower = Str::lower($query);

        $suggestions = collect();

        // 1. Aliases
        if ($alias = $this->resolveAlias($lower)) {
            if ($s = $this->aliasToSuggestion($alias, $weights['alias'])) {
                $suggestions->push($s);
            }
        }

        // 2. Destinations
        $destinations = Destination::active()
            ->search($query)
            ->withCount(['hotels' => fn ($q) => $q->where('is_active', true)])
            ->orderByDesc('hotels_count')
            ->limit(config('search.limits.destinations', 10))
            ->get();

        // 2a. Group buckets (country / region) when multiple destinations share one
        $this->buildGroupSuggestions($destinations, $alias ?? null, $weights, $lower)
            ->each(fn (Suggestion $s) => $suggestions->push($s));

        // 2b. Individual destinations
        foreach ($destinations as $dest) {
            $suggestions->push(new Suggestion(
                type: 'destination',
                label: $dest->name,
                sublabel: implode(', ', array_filter([$dest->region, $dest->country])),
                value: $dest->name,
                hotelCount: (int) $dest->hotels_count,
                relevance: $this->score($dest->name, $lower, $weights, 'destination'),
            ));
        }

        // 3. Hotels (direct navigation on click)
        $hotels = Hotel::active()
            ->search($query)
            ->with('destination:id,name,country')
            ->orderByDesc('overall_score')
            ->limit(config('search.limits.hotels', 5))
            ->get(['id', 'name', 'slug', 'destination_id', 'star_rating', 'overall_score']);

        foreach ($hotels as $hotel) {
            $suggestions->push(new Suggestion(
                type: 'hotel',
                label: $hotel->name,
                sublabel: implode(' · ', array_filter([
                    $hotel->destination?->name,
                    $hotel->destination?->country,
                    $hotel->star_rating ? $hotel->star_rating . '★' : null,
                ])),
                value: $hotel->name,
                hotelCount: 1,
                slug: $hotel->slug,
                score: $hotel->overall_score !== null ? (float) $hotel->overall_score : null,
                relevance: $this->score($hotel->name, $lower, $weights, 'hotel')
                    + ($hotel->overall_score ? (float) $hotel->overall_score / 10 : 0),
            ));
        }

        return $this->dedupe($suggestions);
    }

    private function buildGroupSuggestions(Collection $destinations, ?array $alias, array $weights, string $lowerQuery): Collection
    {
        $groups = collect();
        if ($alias) {
            return $groups; // alias already produced the grouped suggestion
        }

        $byCountry = $destinations->filter(fn ($d) => $d->country)->groupBy('country');
        foreach ($byCountry as $country => $dests) {
            if ($dests->count() > 1) {
                $groups->push(new Suggestion(
                    type: 'region',
                    label: (string) $country,
                    sublabel: $dests->count() . ' destinations · Country',
                    value: (string) $country,
                    hotelCount: (int) $dests->sum('hotels_count'),
                    relevance: $this->score((string) $country, $lowerQuery, $weights, 'region'),
                ));
            }
        }

        $byRegion = $destinations->filter(fn ($d) => $d->region)->groupBy('region');
        foreach ($byRegion as $region => $dests) {
            if ($dests->count() > 1) {
                $groups->push(new Suggestion(
                    type: 'region',
                    label: (string) $region,
                    sublabel: ($dests->first()->country ?? '') . ' · ' . $dests->count() . ' areas',
                    value: (string) $region,
                    hotelCount: (int) $dests->sum('hotels_count'),
                    relevance: $this->score((string) $region, $lowerQuery, $weights, 'region'),
                ));
            }
        }

        return $groups;
    }

    private function aliasToSuggestion(array $alias, int $relevance): ?Suggestion
    {
        $field = array_key_first($alias);
        $value = $alias[$field];

        $hotelCount = Hotel::active()
            ->whereHas('destination', fn ($q) => $q->where($field, $value))
            ->count();

        if ($hotelCount === 0) {
            return null;
        }

        $sample = Destination::where($field, $value)->active()->first();
        $sublabel = match ($field) {
            'region'       => ($sample->country ?? '') . ' · Region',
            'country'      => 'Country',
            'country_code' => ($sample->country ?? '') . ' · Country',
            default        => '',
        };
        $label = $field === 'country_code' ? ($sample->country ?? $value) : $value;

        return new Suggestion(
            type: 'region',
            label: $label,
            sublabel: $sublabel,
            value: $label,
            hotelCount: $hotelCount,
            relevance: $relevance,
        );
    }

    private function resolveAlias(string $lowerTerm): ?array
    {
        $aliases = config('search.aliases', []);

        if (isset($aliases[$lowerTerm])) {
            return $aliases[$lowerTerm];
        }

        if (strlen($lowerTerm) === 2) {
            $upper = strtoupper($lowerTerm);
            $exists = Destination::active()->where('country_code', $upper)->exists();
            if ($exists) {
                return ['country_code' => $upper];
            }
        }

        return null;
    }

    /**
     * Compute a relevance score for a candidate label vs the lowercased query.
     */
    private function score(string $label, string $lowerQuery, array $weights, string $type): float
    {
        $lowerLabel = Str::lower($label);
        $bonus = $weights['type_bonus'][$type] ?? 0;

        if ($lowerLabel === $lowerQuery) {
            return $weights['exact_match'] + $bonus;
        }

        if (str_starts_with($lowerLabel, $lowerQuery)) {
            return $weights['prefix_match'] + $bonus;
        }

        if (str_contains($lowerLabel, $lowerQuery)) {
            return $weights['contains_name'] + $bonus;
        }

        // Fuzzy fallback: typo tolerance for short queries (PHP levenshtein limit = 255)
        if (strlen($lowerQuery) <= 32 && strlen($lowerLabel) <= 64) {
            $distance = levenshtein($lowerQuery, $lowerLabel);
            $maxLen = max(strlen($lowerQuery), strlen($lowerLabel));
            if ($maxLen > 0 && $distance <= max(2, (int) floor($maxLen / 4))) {
                return max(0, $weights['fuzzy_max'] - $distance * 5) + $bonus;
            }
        }

        return $bonus;
    }

    /**
     * Drop duplicate (type+value) suggestions, keeping the highest relevance.
     */
    private function dedupe(Collection $suggestions): Collection
    {
        return $suggestions
            ->sortByDesc('relevance')
            ->unique(fn (Suggestion $s) => $s->type . '|' . Str::lower($s->value))
            ->values();
    }
}
