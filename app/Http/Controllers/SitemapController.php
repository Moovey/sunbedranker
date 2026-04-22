<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Destination;
use App\Models\Hotel;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class SitemapController extends Controller
{
    /**
     * Generate XML sitemap for search engines and affiliate program reviewers.
     * Streamed via XMLWriter + chunkById to stay memory-safe at scale.
     */
    public function index(): Response
    {
        $sitemap = Cache::remember('sitemap:xml', 3600, function () {
            $writer = new \XMLWriter();
            $writer->openMemory();
            $writer->setIndent(true);
            $writer->setIndentString('  ');
            $writer->startDocument('1.0', 'UTF-8');
            $writer->startElement('urlset');
            $writer->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

            $emit = function (string $loc, ?string $lastmod, string $priority, string $freq) use ($writer) {
                $writer->startElement('url');
                $writer->writeElement('loc', $loc);
                if ($lastmod) {
                    $writer->writeElement('lastmod', $lastmod);
                }
                $writer->writeElement('changefreq', $freq);
                $writer->writeElement('priority', $priority);
                $writer->endElement();
            };

            // Static pages
            $staticPages = [
                ['loc' => url('/'), 'priority' => '1.0', 'changefreq' => 'daily'],
                ['loc' => url('/destinations'), 'priority' => '0.9', 'changefreq' => 'weekly'],
                ['loc' => url('/guides'), 'priority' => '0.9', 'changefreq' => 'daily'],
                ['loc' => url('/compare'), 'priority' => '0.7', 'changefreq' => 'weekly'],
                ['loc' => url('/about'), 'priority' => '0.6', 'changefreq' => 'monthly'],
                ['loc' => url('/how-we-rate'), 'priority' => '0.6', 'changefreq' => 'monthly'],
                ['loc' => url('/editorial-policy'), 'priority' => '0.5', 'changefreq' => 'monthly'],
                ['loc' => url('/contact'), 'priority' => '0.5', 'changefreq' => 'monthly'],
                ['loc' => url('/privacy-policy'), 'priority' => '0.3', 'changefreq' => 'yearly'],
                ['loc' => url('/terms-of-service'), 'priority' => '0.3', 'changefreq' => 'yearly'],
                ['loc' => url('/affiliate-disclosure'), 'priority' => '0.3', 'changefreq' => 'yearly'],
            ];
            foreach ($staticPages as $p) {
                $emit($p['loc'], null, $p['priority'], $p['changefreq']);
            }

            // Destinations (only those with active hotels) — chunked for memory safety
            Destination::where('is_active', true)
                ->whereHas('hotels', fn ($q) => $q->where('is_active', true))
                ->select('id', 'slug', 'updated_at')
                ->chunkById(500, function ($chunk) use ($emit) {
                    foreach ($chunk as $d) {
                        $emit(
                            url("/destinations/{$d->slug}"),
                            $d->updated_at?->toW3cString(),
                            '0.8',
                            'weekly'
                        );
                    }
                });

            // Hotels — chunked
            Hotel::active()
                ->select('id', 'slug', 'updated_at')
                ->chunkById(1000, function ($chunk) use ($emit) {
                    foreach ($chunk as $h) {
                        $emit(
                            url("/hotels/{$h->slug}"),
                            $h->updated_at?->toW3cString(),
                            '0.8',
                            'weekly'
                        );
                    }
                });

            // Blog posts — chunked
            Post::where('status', 'published')
                ->where(function ($q) {
                    $q->whereNull('published_at')
                      ->orWhere('published_at', '<=', now());
                })
                ->select('id', 'slug', 'updated_at', 'published_at')
                ->chunkById(1000, function ($chunk) use ($emit) {
                    foreach ($chunk as $p) {
                        $emit(
                            url("/guides/{$p->slug}"),
                            ($p->updated_at ?? $p->published_at)?->toW3cString(),
                            '0.8',
                            'weekly'
                        );
                    }
                });

            $writer->endElement();
            $writer->endDocument();

            return $writer->outputMemory();
        });

        return response($sitemap, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }
}
