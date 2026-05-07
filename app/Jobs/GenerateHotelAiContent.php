<?php

namespace App\Jobs;

use App\Models\Hotel;
use App\Services\GeminiService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\RateLimited;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

/**
 * Generate AI-rewritten SEO content for a single hotel.
 *
 * Idempotent: safe to re-run; overwrites previous AI content. Skips silently
 * if Gemini is not configured (no API key) so promotion flows still work in
 * environments without AI access.
 */
class GenerateHotelAiContent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 120;
    public int $backoff = 30;

    public function __construct(public int $hotelId)
    {
    }

    public function middleware(): array
    {
        // Rate-limit calls so a 5,000-hotel bulk promote does not exceed
        // Gemini's per-minute quota. 60 jobs / 60s = ~1 req/sec.
        return [(new RateLimited('gemini'))];
    }

    public function handle(GeminiService $gemini): void
    {
        $hotel = Hotel::with('destination')->find($this->hotelId);
        if (!$hotel) {
            return;
        }

        if (!$gemini->isConfigured()) {
            Log::info('GenerateHotelAiContent: skipped (no Gemini key)', ['hotel_id' => $hotel->id]);
            return;
        }

        $payload = [
            'hotel_name'       => $hotel->name,
            'city'             => $hotel->destination?->name,
            'country'          => $hotel->destination?->country,
            'star_rating'      => $hotel->star_rating,
            'address'          => $hotel->address,
            'original_summary' => Str::limit((string) $hotel->description, 1500),
        ];

        $system = <<<TXT
            You are an expert travel SEO copywriter for SunbedRanker, a site that
            ranks hotels by pool & sunbed quality. Tone: friendly, factual, helpful
            for UK/EU sun holidaymakers. Avoid superlatives without basis. Never
            invent facts not implied by the supplied data.

            ## SEO writing principles (apply to every section)

            1. SEARCH INTENT — The reader is in BUYING mode. They are choosing where
               to book a sun holiday and want decision-making information about the
               pool, sunbeds, atmosphere and suitability. They are NOT here to learn
               trivia. Every paragraph must help them decide "is this hotel right
               for me and my group?".

            2. SEMANTIC VARIETY — Do NOT just swap synonyms of the source text.
               Expand on the WHY behind each feature (e.g. why sunbed availability
               matters, why a quiet adults-only pool suits couples, why proximity
               to the beach affects daily routine). Add practical applications:
               who should pick this hotel, what to expect on a typical day, what
               to pack or pre-book. Each H2 section must add genuinely new angle,
               not restate the description in different words.

            3. UNIQUENESS — Every output must read as if a different copywriter
               wrote it. Vary sentence openings, paragraph rhythm, and the order
               in which features are introduced. Never reuse the same opening
               formula across hotels.

            ## Output format

            Always respond with a single JSON object matching exactly this shape:

            {
              "meta_title":       "<= 60 chars, includes hotel name + city, written as a click-worthy SERP headline",
              "meta_description": "<= 155 chars, search snippet that promises a clear decision-making payoff",
              "description":      "150-220 words, plain text, 2 paragraphs, focused on the pool/sunbed experience and who the hotel suits",
              "h2_sections": [
                { "title": "<= 60 chars", "body": "60-110 words, plain text, expands on a unique angle (the WHY, not synonyms)" },
                ...3 to 4 sections total covering Pool & Sunbeds, Atmosphere, Location & Nearby, Who It Suits
              ],
              "schema_jsonld": {
                "@context": "https://schema.org",
                "@type":    "Hotel",
                "name":     "<hotel name>",
                "description": "<one-sentence summary of the pool experience, <= 200 chars>",
                "address": {
                  "@type":           "PostalAddress",
                  "addressLocality": "<city>",
                  "addressCountry":  "<country>"
                },
                "amenityFeature": [
                  { "@type": "LocationFeatureSpecification", "name": "<amenity, e.g. Outdoor Pool>" }
                  // 3-6 amenities inferred from the source data
                ]
              }
            }
            TXT;

        $user = "Hotel data:\n" . json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        // Throttle by IP-of-app to be polite even when queue middleware misses bursts.
        RateLimiter::attempt('gemini-global', 60, fn () => null, 60);

        $result = $gemini->generateJson($system, $user);
        if (!$result) {
            // Trigger retry via exception so backoff applies
            $this->release($this->backoff);
            return;
        }

        $hotel->update([
            'ai_meta_title'        => $this->trim($result['meta_title'] ?? null, 255),
            'ai_meta_description'  => $this->trim($result['meta_description'] ?? null, 320),
            'ai_description'       => $result['description'] ?? null,
            'ai_h2_sections'       => $this->normalizeSections($result['h2_sections'] ?? null),
            'ai_schema_jsonld'     => is_array($result['schema_jsonld'] ?? null) ? $result['schema_jsonld'] : null,
            'ai_related_hotel_ids' => $this->pickRelatedHotelIds($hotel),
            'ai_generated_at'      => now(),
            'ai_model_used'        => $gemini->model(),
        ]);
    }

    /** @return array<int>|null */
    protected function pickRelatedHotelIds(Hotel $hotel): ?array
    {
        if (!$hotel->destination_id) {
            return null;
        }

        return Hotel::where('destination_id', $hotel->destination_id)
            ->where('id', '!=', $hotel->id)
            ->where('is_active', true)
            ->orderByDesc('overall_score')
            ->limit(5)
            ->pluck('id')
            ->all();
    }

    /** @return array<int,array{title:string,body:string}>|null */
    /** @param  mixed  $sections */
    protected function normalizeSections($sections): ?array
    {
        if (!is_array($sections)) {
            return null;
        }

        $clean = [];
        foreach ($sections as $section) {
            if (!is_array($section)) {
                continue;
            }
            $title = trim((string) ($section['title'] ?? ''));
            $body  = trim((string) ($section['body'] ?? ''));
            if ($title === '' || $body === '') {
                continue;
            }
            $clean[] = [
                'title' => Str::limit($title, 120, ''),
                'body'  => $body,
            ];
        }

        return $clean ?: null;
    }

    protected function trim(?string $value, int $max): ?string
    {
        if ($value === null) {
            return null;
        }
        $value = trim($value);
        return $value === '' ? null : Str::limit($value, $max, '');
    }
}
