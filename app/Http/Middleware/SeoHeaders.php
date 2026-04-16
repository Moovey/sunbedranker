<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SeoHeaders
{
    /**
     * Add SEO-related headers to responses.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // X-Robots-Tag: block admin/auth/hotelier routes from indexing as a safety net
        $path = $request->path();
        $noIndexPrefixes = ['admin', 'hotelier', 'login', 'register', 'password', 'email/verify'];

        foreach ($noIndexPrefixes as $prefix) {
            if (str_starts_with($path, $prefix)) {
                $response->headers->set('X-Robots-Tag', 'noindex, nofollow');
                return $response;
            }
        }

        // Allow indexing for all public pages
        $response->headers->set('X-Robots-Tag', 'index, follow');

        return $response;
    }
}
