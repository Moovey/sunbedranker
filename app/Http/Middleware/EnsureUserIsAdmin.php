<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            return redirect()->route('login');
        }

        if ($request->user()->role !== 'admin') {
            // Redirect to appropriate dashboard based on role
            return redirect($request->user()->getRedirectPath())
                ->with('error', 'Access denied. Admin privileges required.');
        }

        return $next($request);
    }
}
