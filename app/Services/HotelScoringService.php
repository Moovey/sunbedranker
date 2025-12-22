<?php

namespace App\Services;

use App\Models\Hotel;
use App\Models\PoolCriteria;
use App\Models\ScoringWeight;

class HotelScoringService
{
    protected array $weights;

    public function __construct()
    {
        $this->loadWeights();
    }

    protected function loadWeights(): void
    {
        $this->weights = ScoringWeight::active()->get()->keyBy('criteria_name')->toArray();
    }

    /**
     * Calculate all scores for a hotel and update the hotel record
     */
    public function calculateAndUpdateScores(Hotel $hotel): void
    {
        $poolCriteria = $hotel->poolCriteria;

        if (!$poolCriteria) {
            return;
        }

        $scores = [
            'overall_score' => $this->calculateOverallScore($poolCriteria),
            'family_score' => $this->calculateFamilyScore($poolCriteria),
            'quiet_score' => $this->calculateQuietScore($poolCriteria),
            'party_score' => $this->calculatePartyScore($poolCriteria),
        ];

        $hotel->update($scores);
    }

    /**
     * Calculate overall Pool & Sun Score (0-10)
     */
    public function calculateOverallScore(PoolCriteria $criteria): float
    {
        $totalScore = 0;
        $totalWeight = 0;

        // Sunbed Ratio Score
        $sunbedScore = $this->scoreSunbedRatio($criteria->sunbed_to_guest_ratio);
        $sunbedWeight = $this->getWeight('sunbed_ratio', 'weight');
        $totalScore += $sunbedScore * $sunbedWeight;
        $totalWeight += $sunbedWeight;

        // Sun Exposure Score
        $sunScore = $this->scoreSunExposure($criteria->sun_exposure, $criteria->getSunExposureHours());
        $sunWeight = $this->getWeight('sun_exposure', 'weight');
        $totalScore += $sunScore * $sunWeight;
        $totalWeight += $sunWeight;

        // Pool Variety Score
        $poolScore = $this->scorePoolVariety($criteria);
        $poolWeight = $this->getWeight('pool_variety', 'weight');
        $totalScore += $poolScore * $poolWeight;
        $totalWeight += $poolWeight;

        // Atmosphere Score
        $atmosphereScore = $this->scoreAtmosphere($criteria->atmosphere);
        $atmosphereWeight = $this->getWeight('atmosphere', 'weight');
        $totalScore += $atmosphereScore * $atmosphereWeight;
        $totalWeight += $atmosphereWeight;

        // Cleanliness Score
        $cleanlinessScore = $this->scoreCleanliness($criteria->cleanliness_score, $criteria->maintenance_score);
        $cleanlinessWeight = $this->getWeight('cleanliness', 'weight');
        $totalScore += $cleanlinessScore * $cleanlinessWeight;
        $totalWeight += $cleanlinessWeight;

        // Family Features Score
        $familyFeaturesScore = $this->scoreFamilyFeatures($criteria);
        $familyFeaturesWeight = $this->getWeight('family_features', 'weight');
        $totalScore += $familyFeaturesScore * $familyFeaturesWeight;
        $totalWeight += $familyFeaturesWeight;

        // Calculate weighted average and scale to 0-10
        $weightedAverage = $totalWeight > 0 ? $totalScore / $totalWeight : 0;
        
        return round(($weightedAverage / 5) * 10, 1);
    }

    /**
     * Calculate Family-Friendly Score
     */
    public function calculateFamilyScore(PoolCriteria $criteria): float
    {
        $totalScore = 0;
        $totalWeight = 0;

        $sunbedScore = $this->scoreSunbedRatio($criteria->sunbed_to_guest_ratio);
        $sunbedWeight = $this->getWeight('sunbed_ratio', 'family_weight');
        $totalScore += $sunbedScore * $sunbedWeight;
        $totalWeight += $sunbedWeight;

        $sunScore = $this->scoreSunExposure($criteria->sun_exposure, $criteria->getSunExposureHours());
        $sunWeight = $this->getWeight('sun_exposure', 'family_weight');
        $totalScore += $sunScore * $sunWeight;
        $totalWeight += $sunWeight;

        $poolScore = $this->scorePoolVariety($criteria);
        $poolWeight = $this->getWeight('pool_variety', 'family_weight');
        $totalScore += $poolScore * $poolWeight;
        $totalWeight += $poolWeight;

        $atmosphereScore = $this->scoreAtmosphere($criteria->atmosphere);
        $atmosphereWeight = $this->getWeight('atmosphere', 'family_weight');
        $totalScore += $atmosphereScore * $atmosphereWeight;
        $totalWeight += $atmosphereWeight;

        $cleanlinessScore = $this->scoreCleanliness($criteria->cleanliness_score, $criteria->maintenance_score);
        $cleanlinessWeight = $this->getWeight('cleanliness', 'family_weight');
        $totalScore += $cleanlinessScore * $cleanlinessWeight;
        $totalWeight += $cleanlinessWeight;

        $familyFeaturesScore = $this->scoreFamilyFeatures($criteria);
        $familyFeaturesWeight = $this->getWeight('family_features', 'family_weight');
        $totalScore += $familyFeaturesScore * $familyFeaturesWeight;
        $totalWeight += $familyFeaturesWeight;

        $weightedAverage = $totalWeight > 0 ? $totalScore / $totalWeight : 0;
        
        return round(($weightedAverage / 5) * 10, 1);
    }

    /**
     * Calculate Quiet Sun Score
     */
    public function calculateQuietScore(PoolCriteria $criteria): float
    {
        $totalScore = 0;
        $totalWeight = 0;

        $sunbedScore = $this->scoreSunbedRatio($criteria->sunbed_to_guest_ratio);
        $sunbedWeight = $this->getWeight('sunbed_ratio', 'quiet_weight');
        $totalScore += $sunbedScore * $sunbedWeight;
        $totalWeight += $sunbedWeight;

        $sunScore = $this->scoreSunExposure($criteria->sun_exposure, $criteria->getSunExposureHours());
        $sunWeight = $this->getWeight('sun_exposure', 'quiet_weight');
        $totalScore += $sunScore * $sunWeight;
        $totalWeight += $sunWeight;

        $poolScore = $this->scorePoolVariety($criteria);
        $poolWeight = $this->getWeight('pool_variety', 'quiet_weight');
        $totalScore += $poolScore * $poolWeight;
        $totalWeight += $poolWeight;

        $atmosphereScore = $this->scoreAtmosphere($criteria->atmosphere);
        $atmosphereWeight = $this->getWeight('atmosphere', 'quiet_weight');
        $totalScore += $atmosphereScore * $atmosphereWeight;
        $totalWeight += $atmosphereWeight;

        $cleanlinessScore = $this->scoreCleanliness($criteria->cleanliness_score, $criteria->maintenance_score);
        $cleanlinessWeight = $this->getWeight('cleanliness', 'quiet_weight');
        $totalScore += $cleanlinessScore * $cleanlinessWeight;
        $totalWeight += $cleanlinessWeight;

        $familyFeaturesScore = $this->scoreFamilyFeatures($criteria);
        $familyFeaturesWeight = $this->getWeight('family_features', 'quiet_weight');
        $totalScore += $familyFeaturesScore * $familyFeaturesWeight;
        $totalWeight += $familyFeaturesWeight;

        // Bonus for quiet atmosphere
        if ($criteria->atmosphere === 'quiet' || $criteria->is_adults_only) {
            $totalScore += 2;
            $totalWeight += 0.5;
        }

        $weightedAverage = $totalWeight > 0 ? $totalScore / $totalWeight : 0;
        
        return round(($weightedAverage / 5) * 10, 1);
    }

    /**
     * Calculate Party Vibe Score
     */
    public function calculatePartyScore(PoolCriteria $criteria): float
    {
        $totalScore = 0;
        $totalWeight = 0;

        $sunbedScore = $this->scoreSunbedRatio($criteria->sunbed_to_guest_ratio);
        $sunbedWeight = $this->getWeight('sunbed_ratio', 'party_weight');
        $totalScore += $sunbedScore * $sunbedWeight;
        $totalWeight += $sunbedWeight;

        $sunScore = $this->scoreSunExposure($criteria->sun_exposure, $criteria->getSunExposureHours());
        $sunWeight = $this->getWeight('sun_exposure', 'party_weight');
        $totalScore += $sunScore * $sunWeight;
        $totalWeight += $sunWeight;

        $poolScore = $this->scorePoolVariety($criteria);
        $poolWeight = $this->getWeight('pool_variety', 'party_weight');
        $totalScore += $poolScore * $poolWeight;
        $totalWeight += $poolWeight;

        $atmosphereScore = $this->scoreAtmosphere($criteria->atmosphere);
        $atmosphereWeight = $this->getWeight('atmosphere', 'party_weight');
        $totalScore += $atmosphereScore * $atmosphereWeight;
        $totalWeight += $atmosphereWeight;

        $cleanlinessScore = $this->scoreCleanliness($criteria->cleanliness_score, $criteria->maintenance_score);
        $cleanlinessWeight = $this->getWeight('cleanliness', 'party_weight');
        $totalScore += $cleanlinessScore * $cleanlinessWeight;
        $totalWeight += $cleanlinessWeight;

        $familyFeaturesScore = $this->scoreFamilyFeatures($criteria);
        $familyFeaturesWeight = $this->getWeight('family_features', 'party_weight');
        $totalScore += $familyFeaturesScore * $familyFeaturesWeight;
        $totalWeight += $familyFeaturesWeight;

        // Bonus for party features
        if ($criteria->atmosphere === 'party' || $criteria->atmosphere === 'lively') {
            $totalScore += 2;
            $totalWeight += 0.5;
        }
        if ($criteria->has_pool_bar) {
            $totalScore += 1;
            $totalWeight += 0.3;
        }

        $weightedAverage = $totalWeight > 0 ? $totalScore / $totalWeight : 0;
        
        return round(($weightedAverage / 5) * 10, 1);
    }

    // Individual scoring methods (0-5 scale)

    protected function scoreSunbedRatio(?float $ratio): float
    {
        if ($ratio === null) return 2.5;

        if ($ratio >= 1.0) return 5.0;      // 1:1 or better = excellent
        if ($ratio >= 0.75) return 4.5;     // 3:4 = very good
        if ($ratio >= 0.5) return 3.5;      // 1:2 = good
        if ($ratio >= 0.33) return 2.5;     // 1:3 = average
        if ($ratio >= 0.25) return 1.5;     // 1:4 = poor
        
        return 0.5;                          // worse than 1:4 = very poor
    }

    protected function scoreSunExposure(?string $exposure, ?int $hours): float
    {
        if (!$exposure) return 2.5;

        return match($exposure) {
            'all_day' => 5.0,
            'morning' => 3.5,
            'afternoon' => 4.0,
            'limited' => 2.0,
            default => 2.5,
        };
    }

    protected function scorePoolVariety(PoolCriteria $criteria): float
    {
        $score = 2.0;

        // Base score on number of pools
        $score += min($criteria->number_of_pools * 0.5, 2.0);

        // Bonuses for special pools
        if ($criteria->has_infinity_pool) $score += 0.5;
        if ($criteria->has_rooftop_pool) $score += 0.5;
        if ($criteria->has_heated_pool) $score += 0.3;
        if ($criteria->has_kids_pool) $score += 0.3;
        if ($criteria->has_lazy_river) $score += 0.4;

        return min($score, 5.0);
    }

    protected function scoreAtmosphere(?string $atmosphere): float
    {
        if (!$atmosphere) return 2.5;

        return match($atmosphere) {
            'quiet' => 4.5,
            'lively' => 4.0,
            'family' => 4.5,
            'party' => 3.5,
            'mixed' => 3.5,
            default => 2.5,
        };
    }

    protected function scoreCleanliness(?int $cleanlinessScore, ?int $maintenanceScore): float
    {
        $avg = (($cleanlinessScore ?? 3) + ($maintenanceScore ?? 3)) / 2;
        return $avg;
    }

    protected function scoreFamilyFeatures(PoolCriteria $criteria): float
    {
        $score = 2.0;

        if ($criteria->has_kids_pool) $score += 1.0;
        if ($criteria->has_kids_activities) $score += 0.8;
        if ($criteria->has_lifeguard) $score += 0.7;
        if ($criteria->has_pool_toys) $score += 0.3;
        if ($criteria->has_changing_facilities) $score += 0.2;

        return min($score, 5.0);
    }

    protected function getWeight(string $criteriaName, string $weightType): float
    {
        return $this->weights[$criteriaName][$weightType] ?? 1.0;
    }

    /**
     * Recalculate scores for all hotels
     */
    public function recalculateAllScores(): void
    {
        Hotel::with('poolCriteria')->chunk(100, function ($hotels) {
            foreach ($hotels as $hotel) {
                $this->calculateAndUpdateScores($hotel);
            }
        });
    }
}
