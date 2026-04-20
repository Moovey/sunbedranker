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
     */
    public function index(): Response
    {
        $sitemap = Cache::remember('sitemap:xml', 3600, function () {
            $urls = collect();

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
            $urls = $urls->merge($staticPages);

            // Destinations (only those with active hotels)
            $destinations = Destination::where('is_active', true)
                ->whereHas('hotels', fn ($q) => $q->where('is_active', true))
                ->get(['slug', 'updated_at']);
            foreach ($destinations as $destination) {
                $urls->push([
                    'loc' => url("/destinations/{$destination->slug}"),
                    'lastmod' => $destination->updated_at?->toW3cString(),
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                ]);
            }

            // Hotels
            $hotels = Hotel::active()->get(['slug', 'updated_at']);
            foreach ($hotels as $hotel) {
                $urls->push([
                    'loc' => url("/hotels/{$hotel->slug}"),
                    'lastmod' => $hotel->updated_at?->toW3cString(),
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                ]);
            }

            // Blog posts
            $posts = Post::where('status', 'published')
                ->where(function ($q) {
                    $q->whereNull('published_at')
                      ->orWhere('published_at', '<=', now());
                })
                ->get(['slug', 'updated_at', 'published_at']);
            foreach ($posts as $post) {
                $urls->push([
                    'loc' => url("/guides/{$post->slug}"),
                    'lastmod' => ($post->updated_at ?? $post->published_at)?->toW3cString(),
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                ]);
            }

            // Build XML
            $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
            $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

            foreach ($urls as $url) {
                $xml .= '  <url>' . PHP_EOL;
                $xml .= '    <loc>' . htmlspecialchars($url['loc']) . '</loc>' . PHP_EOL;
                if (!empty($url['lastmod'])) {
                    $xml .= '    <lastmod>' . $url['lastmod'] . '</lastmod>' . PHP_EOL;
                }
                if (!empty($url['changefreq'])) {
                    $xml .= '    <changefreq>' . $url['changefreq'] . '</changefreq>' . PHP_EOL;
                }
                if (!empty($url['priority'])) {
                    $xml .= '    <priority>' . $url['priority'] . '</priority>' . PHP_EOL;
                }
                $xml .= '  </url>' . PHP_EOL;
            }

            $xml .= '</urlset>';

            return $xml;
        });

        return response($sitemap, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
