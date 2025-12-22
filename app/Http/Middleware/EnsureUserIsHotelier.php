<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsHotelier
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            return redirect()->route('login');
        }

        if (!in_array($request->user()->role, ['hotelier', 'admin'])) {
            // Redirect to appropriate dashboard based on role
            return redirect($request->user()->getRedirectPath())
                ->with('error', 'Access denied. Hotelier privileges required.');
        }

        return $next($request);
    }
}
