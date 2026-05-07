<?php

namespace App\Jobs;

use App\Models\Destination;
use App\Models\Hotel;
use App\Services\GeminiService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\RateLimited;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Generate AI SEO content for a destination (city) page. Includes a city
 * overview plus 2-3 H2 sections to rank for "best pool hotels in {city}"
 * style queries.
 */
class GenerateDestinationAiContent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 120;
    public int $backoff = 30;

    public function __construct(public int $destinationId)
    {
    }

    public function middleware(): array
    {
        return [(new RateLimited('gemini'))];
    }

    public function handle(GeminiService $gemini): void
    {
        $destination = Destination::find($this->destinationId);
        if (!$destination) {
            return;
        }

        if (!$gemini->isConfigured()) {
            Log::info('GenerateDestinationAiContent: skipped (no Gemini key)', ['destination_id' => $destination->id]);
            return;
        }

        $hotelCount = Hotel::where('destination_id', $destination->id)->where('is_active', true)->count();
        if ($hotelCount === 0) {
            // Nothing to write about.
            return;
        }

        $topHotels = Hotel::where('destination_id', $destination->id)
            ->where('is_active', true)
            ->orderByDesc('overall_score')
            ->limit(5)
            ->pluck('name')
            ->all();

        $payload = [
            'city'        => $destination->name,
            'country'     => $destination->country,
            'hotel_count' => $hotelCount,
            'top_hotels'  => $topHotels,
        ];

        $system = <<<TXT
            You are an expert travel SEO copywriter for SunbedRanker, a site that
            ranks hotels by pool & sunbed quality. Tone: friendly, factual, helpful
            for UK/EU sun holidaymakers. Never invent hotel features that are not
            in the supplied list.

            ## SEO writing principles (apply to every section)

            1. SEARCH INTENT — The reader is choosing a DESTINATION for a sun
               holiday and is in research-then-buy mode. They want to know what
               kind of pool/sunbed experience to expect in {City}, which areas
               suit which travel style, and what makes this city different from
               nearby alternatives. Help them narrow down, not just learn.

            2. SEMANTIC VARIETY — Do NOT just paraphrase generic destination copy.
               Expand on the WHY behind each angle (why the climate produces a
               specific pool culture, why certain neighbourhoods have better
               sunbed availability, why this city suits couples vs families vs
               solo travellers). Add practical applications: best months to
               visit for pool weather, what to expect at a typical 4-star pool,
               whether to pre-book sunbeds.

            3. UNIQUENESS — Every output must read as if written for this exact
               city, never reusable as a template. Vary sentence rhythm and
               opening hooks across destinations.

            ## Output format

            Always respond with a single JSON object matching exactly this shape:

            {
              "meta_title":       "<= 60 chars, e.g. 'Best Pool Hotels in {City} – Ranked'",
              "meta_description": "<= 155 chars, mentions city + sunbed/pool angle, promises a clear decision-making payoff",
              "description":      "120-180 words, plain text, 2 paragraphs, intro to the pool/sunbed scene in this city",
              "h2_sections": [
                { "title": "<= 60 chars", "body": "60-110 words, plain text, expands on a unique angle (the WHY, not synonyms)" },
                ...2 to 3 sections covering Why {City}, What To Expect Poolside, Best Areas To Stay
              ],
              "schema_jsonld": {
                "@context":    "https://schema.org",
                "@type":       "TouristDestination",
                "name":        "<city>",
                "description": "<one-sentence summary of the pool/sunbed scene in this city, <= 200 chars>",
                "containedInPlace": {
                  "@type": "Country",
                  "name":  "<country>"
                },
                "touristType": [
                  "<audience tag, e.g. Couples>",
                  "<audience tag, e.g. Families>"
                ]
              }
            }
            TXT;

        $user = "Destination data:\n" . json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        $result = $gemini->generateJson($system, $user);
        if (!$result) {
            $this->release($this->backoff);
            return;
        }

        $destination->update([
            'ai_meta_title'       => $this->trim($result['meta_title'] ?? null, 255),
            'ai_meta_description' => $this->trim($result['meta_description'] ?? null, 320),
            'ai_description'      => $result['description'] ?? null,
            'ai_h2_sections'      => $this->normalizeSections($result['h2_sections'] ?? null),
            'ai_schema_jsonld'    => is_array($result['schema_jsonld'] ?? null) ? $result['schema_jsonld'] : null,
            'ai_generated_at'     => now(),
            'ai_model_used'       => $gemini->model(),
        ]);
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
