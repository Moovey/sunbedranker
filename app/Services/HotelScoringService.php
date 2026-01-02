<?php

namespace App\Services;

use App\Models\Hotel;
use App\Models\PoolCriteria;

class HotelScoringService
{
    /**
     * Calculate all scores for a hotel
     */
    public function calculateAndUpdateScores(Hotel $hotel): array
    {
        $criteria = $hotel->poolCriteria;
        
        if (!$criteria) {
            return [
                'overall_score' => null,
                'sun_availability_score' => null,
                'comfort_score' => null,
                'family_friendly_score' => null,
                'peace_quiet_score' => null,
                'party_vibe_score' => null,
            ];
        }

        // Calculate individual criterion scores (0-5)
        $criterionScores = [
            'sunbed_ratio' => $this->scoreSunbedRatio($criteria),
            'sun_exposure' => $this->scoreSunExposure($criteria),
            'pool_size' => $this->scorePoolSize($criteria),
            'pool_variety' => $this->scorePoolVariety($criteria),
            'facilities' => $this->scoreFacilities($criteria),
            'atmosphere' => $this->scoreAtmosphere($criteria),
            'cleanliness' => $this->scoreCleanliness($criteria),
            'accessibility' => $this->scoreAccessibility($criteria),
            'kids_features' => $this->scoreKidsFeatures($criteria),
            'luxury_extras' => $this->scoreLuxuryExtras($criteria),
        ];

        // Calculate category scores (0-10)
        $categoryScores = [
            'sun_availability' => $this->calculateSunAvailability($criterionScores),
            'comfort' => $this->calculateComfort($criterionScores),
            'family_friendly' => $this->calculateFamilyFriendly($criterionScores),
            'peace_quiet' => $this->calculatePeaceQuiet($criterionScores, $criteria),
            'party_vibe' => $this->calculatePartyVibe($criterionScores, $criteria),
        ];

        // Calculate overall score (0-10)
        $overallScore = $this->calculateOverallScore($categoryScores);

        // Update hotel scores
        $hotel->update([
            'overall_score' => $overallScore,
            'family_score' => $categoryScores['family_friendly'],
            'quiet_score' => $categoryScores['peace_quiet'],
            'party_score' => $categoryScores['party_vibe'],
        ]);

        return array_merge(['overall_score' => $overallScore], $categoryScores);
    }

    /**
     * Calculate sunbed ratio score (0-5)
     */
    private function scoreSunbedRatio($criteria): float
    {
        $ratio = $criteria->sunbed_to_guest_ratio;
        
        if (!$ratio) return 0;
        if ($ratio >= 1.0) return 5;
        if ($ratio >= 0.75) return 4;
        if ($ratio >= 0.5) return 3;
        if ($ratio >= 0.33) return 2;
        if ($ratio >= 0.2) return 1;
        
        return 0;
    }

    /**
     * Calculate sun exposure score (0-5)
     */
    private function scoreSunExposure($criteria): float
    {
        $scores = [
            'all_day' => 5,
            'afternoon_only' => 4,
            'morning_only' => 3,
            'partial_shade' => 2,
            'mostly_shaded' => 1,
        ];
        
        return $scores[$criteria->sun_exposure] ?? 0;
    }

    /**
     * Calculate pool size score (0-5)
     */
    private function scorePoolSize($criteria): float
    {
        $scores = [
            'very_large' => 5,
            'large' => 4,
            'medium' => 3,
            'small' => 2,
        ];
        
        return $scores[$criteria->pool_size_category] ?? 2.5;
    }

    /**
     * Calculate pool variety score (0-5)
     */
    private function scorePoolVariety($criteria): float
    {
        $score = 0;
        
        // Number of pools
        if ($criteria->number_of_pools >= 4) $score += 2;
        elseif ($criteria->number_of_pools >= 2) $score += 1.5;
        elseif ($criteria->number_of_pools >= 1) $score += 1;
        
        // Pool types variety
        $poolTypes = $criteria->pool_types ?? [];
        $typeCount = count($poolTypes);
        
        if ($typeCount >= 4) $score += 3;
        elseif ($typeCount >= 3) $score += 2;
        elseif ($typeCount >= 2) $score += 1.5;
        elseif ($typeCount >= 1) $score += 1;
        
        return min($score, 5);
    }

    /**
     * Calculate facilities score (0-5)
     */
    private function scoreFacilities($criteria): float
    {
        $score = 0;
        
        // Sunbed types (premium = higher score)
        $sunbedTypes = $criteria->sunbed_types ?? [];
        $premiumBeds = ['cushioned', 'cabanas', 'bali_beds'];
        $hasPremium = !empty(array_intersect($premiumBeds, $sunbedTypes));
        $score += $hasPremium ? 2 : 1;
        
        // Pool bar
        if ($criteria->has_pool_bar) $score += 1;
        
        // Waiter service
        if ($criteria->has_waiter_service) $score += 1;
        
        // Shade options
        $shadeCount = count($criteria->shade_options ?? []);
        if ($shadeCount >= 3) $score += 1;
        elseif ($shadeCount >= 2) $score += 0.5;
        
        return min($score, 5);
    }

    /**
     * Calculate atmosphere score (0-5)
     */
    private function scoreAtmosphere($criteria): float
    {
        // This is used for general vibe assessment
        $scores = [
            'party' => 5,
            'lively' => 4,
            'family' => 3.5,
            'relaxed' => 3,
            'quiet' => 2,
        ];
        
        return $scores[$criteria->atmosphere] ?? 2.5;
    }

    /**
     * Calculate cleanliness score (0-5)
     */
    private function scoreCleanliness($criteria): float
    {
        $cleanliness = $criteria->cleanliness_rating ?? 0;
        $sunbedCondition = $criteria->sunbed_condition_rating ?? 0;
        $tilingCondition = $criteria->tiling_condition_rating ?? 0;
        
        // Average of the three ratings
        return ($cleanliness + $sunbedCondition + $tilingCondition) / 3;
    }

    /**
     * Calculate accessibility score (0-5)
     */
    private function scoreAccessibility($criteria): float
    {
        $score = 0;
        
        if ($criteria->has_accessibility_ramp) $score += 1.5;
        if ($criteria->has_pool_hoist) $score += 1.5;
        if ($criteria->has_step_free_access) $score += 1;
        if ($criteria->has_elevator_to_rooftop) $score += 1;
        
        return min($score, 5);
    }

    /**
     * Calculate kids features score (0-5)
     */
    private function scoreKidsFeatures($criteria): float
    {
        $score = 0;
        
        if ($criteria->has_kids_pool) $score += 1.5;
        if ($criteria->has_splash_park) $score += 1.5;
        if ($criteria->has_waterslide) $score += 1;
        if ($criteria->has_lifeguard) $score += 1;
        
        return min($score, 5);
    }

    /**
     * Calculate luxury extras score (0-5)
     */
    private function scoreLuxuryExtras($criteria): float
    {
        $score = 0;
        
        if ($criteria->has_luxury_cabanas) $score += 1.5;
        if ($criteria->has_cabana_service) $score += 1;
        if ($criteria->has_heated_pool) $score += 1;
        if ($criteria->has_jacuzzi) $score += 1;
        if ($criteria->has_adult_sun_terrace) $score += 0.5;
        
        return min($score, 5);
    }

    /**
     * Calculate Sun Availability category score (0-10)
     */
    private function calculateSunAvailability($scores): float
    {
        return round((
            ($scores['sunbed_ratio'] * 0.5) +
            ($scores['sun_exposure'] * 0.5)
        ) * 2, 1);
    }

    /**
     * Calculate Comfort category score (0-10)
     */
    private function calculateComfort($scores): float
    {
        return round((
            ($scores['facilities'] * 0.4) +
            ($scores['cleanliness'] * 0.3) +
            ($scores['pool_size'] * 0.2) +
            ($scores['luxury_extras'] * 0.1)
        ) * 2, 1);
    }

    /**
     * Calculate Family-Friendly category score (0-10)
     */
    private function calculateFamilyFriendly($scores): float
    {
        return round((
            ($scores['kids_features'] * 0.5) +
            ($scores['accessibility'] * 0.3) +
            ($scores['pool_variety'] * 0.2)
        ) * 2, 1);
    }

    /**
     * Calculate Peace & Quiet category score (0-10)
     */
    private function calculatePeaceQuiet($scores, $criteria): float
    {
        $score = 0;
        
        // Atmosphere preference (quieter is better)
        if ($criteria->atmosphere === 'quiet') $score += 3;
        elseif ($criteria->atmosphere === 'relaxed') $score += 2;
        elseif ($criteria->atmosphere === 'family') $score += 1;
        
        // Music level (inverse - quieter is better)
        $musicScores = ['none' => 2, 'low' => 1.5, 'moderate' => 1, 'loud' => 0.5, 'dj' => 0];
        $score += $musicScores[$criteria->music_level] ?? 1;
        
        return round(($score / 5) * 10, 1);
    }

    /**
     * Calculate Party Vibe category score (0-10)
     */
    private function calculatePartyVibe($scores, $criteria): float
    {
        $score = 0;
        
        // Atmosphere preference (livelier is better)
        if ($criteria->atmosphere === 'party') $score += 3;
        elseif ($criteria->atmosphere === 'lively') $score += 2.5;
        elseif ($criteria->atmosphere === 'relaxed') $score += 1;
        
        // Music level (more is better for party vibe)
        $musicScores = ['dj' => 2, 'loud' => 1.5, 'moderate' => 1, 'low' => 0.5, 'none' => 0];
        $score += $musicScores[$criteria->music_level] ?? 0;
        
        return round(($score / 5) * 10, 1);
    }

    /**
     * Calculate overall Pool & Sun Score (0-10)
     */
    private function calculateOverallScore($categoryScores): float
    {
        $weights = [
            'sun_availability' => 0.30,
            'comfort' => 0.30,
            'family_friendly' => 0.15,
            'peace_quiet' => 0.10,
            'party_vibe' => 0.15,
        ];
        
        $total = 0;
        foreach ($categoryScores as $category => $score) {
            $total += $score * $weights[$category];
        }
        
        return round($total, 1);
    }

    /**
     * Recalculate scores for all hotels
     */
    public function recalculateAllScores(): int
    {
        $hotels = Hotel::with('poolCriteria')->get();
        $count = 0;
        
        foreach ($hotels as $hotel) {
            if ($hotel->poolCriteria) {
                $this->calculateAndUpdateScores($hotel);
                $count++;
            }
        }
        
        return $count;
    }
}
