<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only apply security headers in production
        if (!app()->environment('production')) {
            return $response;
        }

        // Strict Transport Security - force HTTPS for 1 year, include subdomains
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

        // Cross-Origin Opener Policy - isolate browsing context
        $response->headers->set('Cross-Origin-Opener-Policy', 'same-origin');

        // Content Security Policy - Report-Only mode first to catch issues without breaking anything
        // Change to 'Content-Security-Policy' once confirmed working
        $response->headers->set('Content-Security-Policy-Report-Only',
            "default-src 'self'; " .
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://*.cloudflareinsights.com https://challenges.cloudflare.com; " .
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; " .
            "img-src 'self' data: blob: https: http:; " .
            "font-src 'self' https://fonts.gstatic.com; " .
            "connect-src 'self' https://api.stripe.com https://*.cloudflareinsights.com https://*.tile.openstreetmap.org; " .
            "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://www.youtube-nocookie.com; " .
            "object-src 'none'; " .
            "base-uri 'self';"
        );

        // Prevent MIME type sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Referrer Policy
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Permissions Policy
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');

        return $response;
    }
}
