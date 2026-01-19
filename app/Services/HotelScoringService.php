<?php

namespace App\Services;

use App\Models\Hotel;
use App\Models\PoolCriteria;
use App\Models\ScoringWeight;

class HotelScoringService
{
    protected $weights = null;

    /**
     * Get scoring weights from database (cached per request)
     */
    protected function getWeights(): array
    {
        if ($this->weights === null) {
            $this->weights = ScoringWeight::active()
                ->get()
                ->keyBy('criteria_name')
                ->toArray();
        }
        return $this->weights;
    }

    /**
     * Clear cached weights (useful after updating weights)
     */
    public function clearWeightsCache(): void
    {
        $this->weights = null;
    }

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

        // Get dynamic weights from database
        $weights = $this->getWeights();

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

        // Calculate category scores using dynamic weights (0-10)
        $categoryScores = [
            'sun_availability' => $this->calculateSunAvailability($criterionScores, $weights),
            'comfort' => $this->calculateComfort($criterionScores, $weights),
            'family_friendly' => $this->calculateFamilyFriendly($criterionScores, $weights),
            'peace_quiet' => $this->calculatePeaceQuiet($criterionScores, $criteria, $weights),
            'party_vibe' => $this->calculatePartyVibe($criterionScores, $criteria, $weights),
        ];

        // Calculate overall score using dynamic weights (0-10)
        $overallScore = $this->calculateOverallScore($criterionScores, $weights);

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
    private function calculateSunAvailability($scores, $weights): float
    {
        // Uses sunbed_ratio and sun_exposure weights
        $sunbedWeight = $weights['sunbed_ratio']['weight'] ?? 2.50;
        $sunExposureWeight = $weights['sun_exposure']['weight'] ?? 2.00;
        $totalWeight = $sunbedWeight + $sunExposureWeight;
        
        if ($totalWeight == 0) return 0;
        
        $score = (
            ($scores['sunbed_ratio'] * $sunbedWeight) +
            ($scores['sun_exposure'] * $sunExposureWeight)
        ) / $totalWeight;
        
        return round($score * 2, 1); // Scale to 0-10
    }

    /**
     * Calculate Comfort category score (0-10)
     */
    private function calculateComfort($scores, $weights): float
    {
        // Uses cleanliness, atmosphere, and luxury weights
        $cleanlinessWeight = $weights['cleanliness']['weight'] ?? 1.70;
        $atmosphereWeight = $weights['atmosphere']['weight'] ?? 1.50;
        
        // Pool size and facilities don't have their own weight, use atmosphere as proxy
        $facilitiesWeight = $atmosphereWeight * 0.8;
        $poolSizeWeight = $atmosphereWeight * 0.5;
        
        $totalWeight = $cleanlinessWeight + $atmosphereWeight + $facilitiesWeight + $poolSizeWeight;
        
        if ($totalWeight == 0) return 0;
        
        $score = (
            ($scores['facilities'] * $facilitiesWeight) +
            ($scores['cleanliness'] * $cleanlinessWeight) +
            ($scores['pool_size'] * $poolSizeWeight) +
            ($scores['luxury_extras'] * $atmosphereWeight)
        ) / $totalWeight;
        
        return round($score * 2, 1); // Scale to 0-10
    }

    /**
     * Calculate Family-Friendly category score (0-10)
     */
    private function calculateFamilyFriendly($scores, $weights): float
    {
        // Uses family_features weight primarily
        $familyWeight = $weights['family_features']['family_weight'] ?? 2.50;
        $poolVarietyWeight = $weights['pool_variety']['family_weight'] ?? 2.50;
        
        // Accessibility contributes to family score
        $accessibilityWeight = $familyWeight * 0.6;
        
        $totalWeight = $familyWeight + $poolVarietyWeight + $accessibilityWeight;
        
        if ($totalWeight == 0) return 0;
        
        $score = (
            ($scores['kids_features'] * $familyWeight) +
            ($scores['accessibility'] * $accessibilityWeight) +
            ($scores['pool_variety'] * $poolVarietyWeight)
        ) / $totalWeight;
        
        return round($score * 2, 1); // Scale to 0-10
    }

    /**
     * Calculate Peace & Quiet category score (0-10)
     */
    private function calculatePeaceQuiet($scores, $criteria, $weights): float
    {
        // Uses quiet_weight from relevant criteria
        $atmosphereWeight = $weights['atmosphere']['quiet_weight'] ?? 2.50;
        $cleanlinessWeight = $weights['cleanliness']['quiet_weight'] ?? 1.80;
        
        $score = 0;
        
        // Atmosphere preference (quieter is better)
        if ($criteria->atmosphere === 'quiet') $score += 3 * $atmosphereWeight;
        elseif ($criteria->atmosphere === 'relaxed') $score += 2 * $atmosphereWeight;
        elseif ($criteria->atmosphere === 'family') $score += 1 * $atmosphereWeight;
        
        // Music level (inverse - quieter is better)
        $musicScores = ['none' => 2, 'low' => 1.5, 'moderate' => 1, 'loud' => 0.5, 'dj' => 0];
        $musicScore = $musicScores[$criteria->music_level] ?? 1;
        $score += $musicScore * $cleanlinessWeight;
        
        $maxScore = (3 * $atmosphereWeight) + (2 * $cleanlinessWeight);
        
        if ($maxScore == 0) return 0;
        
        return round(($score / $maxScore) * 10, 1);
    }

    /**
     * Calculate Party Vibe category score (0-10)
     */
    private function calculatePartyVibe($scores, $criteria, $weights): float
    {
        // Uses party_weight from relevant criteria
        $atmosphereWeight = $weights['atmosphere']['party_weight'] ?? 2.50;
        $sunExposureWeight = $weights['sun_exposure']['party_weight'] ?? 2.50;
        
        $score = 0;
        
        // Atmosphere preference (livelier is better)
        if ($criteria->atmosphere === 'party') $score += 3 * $atmosphereWeight;
        elseif ($criteria->atmosphere === 'lively') $score += 2.5 * $atmosphereWeight;
        elseif ($criteria->atmosphere === 'relaxed') $score += 1 * $atmosphereWeight;
        
        // Music level (more is better for party vibe)
        $musicScores = ['dj' => 2, 'loud' => 1.5, 'moderate' => 1, 'low' => 0.5, 'none' => 0];
        $musicScore = $musicScores[$criteria->music_level] ?? 0;
        $score += $musicScore * $sunExposureWeight;
        
        $maxScore = (3 * $atmosphereWeight) + (2 * $sunExposureWeight);
        
        if ($maxScore == 0) return 0;
        
        return round(($score / $maxScore) * 10, 1);
    }

    /**
     * Calculate overall Pool & Sun Score (0-10)
     * Uses all active weights from the database
     */
    private function calculateOverallScore($criterionScores, $weights): float
    {
        // Map criterion scores to their weight keys
        $criteriaMapping = [
            'sunbed_ratio' => 'sunbed_ratio',
            'sun_exposure' => 'sun_exposure',
            'pool_variety' => 'pool_variety',
            'atmosphere' => 'atmosphere',
            'cleanliness' => 'cleanliness',
            'kids_features' => 'family_features',
        ];
        
        $weightedSum = 0;
        $totalWeight = 0;
        
        foreach ($criteriaMapping as $scoreKey => $weightKey) {
            if (isset($weights[$weightKey]) && isset($criterionScores[$scoreKey])) {
                $weight = (float) $weights[$weightKey]['weight'];
                $weightedSum += $criterionScores[$scoreKey] * $weight;
                $totalWeight += $weight;
            }
        }
        
        // Add unmapped criteria with default weight of 1.0
        $unmappedCriteria = ['pool_size', 'facilities', 'accessibility', 'luxury_extras'];
        foreach ($unmappedCriteria as $key) {
            if (isset($criterionScores[$key])) {
                $weightedSum += $criterionScores[$key] * 1.0;
                $totalWeight += 1.0;
            }
        }
        
        if ($totalWeight == 0) return 0;
        
        // Calculate weighted average and scale to 0-10
        $avgScore = $weightedSum / $totalWeight;
        return round($avgScore * 2, 1); // Scale 0-5 to 0-10
    }

    /**
     * Recalculate scores for all hotels
     */
    public function recalculateAllScores(): int
    {
        // Clear cached weights to ensure fresh values are used
        $this->clearWeightsCache();
        
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
