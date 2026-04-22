<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="agd-partner-manual-verification" />
        <meta name="description" content="Find the best hotel pools and sunbeds. Compare hotels by pool quality, sunbed availability, sun exposure, and atmosphere ratings." />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="1BFi1lziWSsKbvL-aJbAt5VeLsOo8Fg67dzHYRGvzm8" />

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="/images/logo.png">
        <link rel="apple-touch-icon" href="/images/logo.png">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Canonical URL (server-rendered for SEO) -->
        <link rel="canonical" href="{{ url()->current() }}" />

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
        <noscript><link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet"></noscript>

        <!-- Preconnect to image CDNs for faster LCP -->
        <link rel="preconnect" href="https://q-xx.bstatic.com">
        <link rel="preconnect" href="https://pix8.agoda.net">

        <!-- Preload LCP image for hotel/destination pages -->
        @if(isset($page['component']))
            @if($page['component'] === 'Hotels/Show' && !empty($page['props']['hotel']['main_image_url']))
                <link rel="preload" as="image" href="{{ $page['props']['hotel']['main_image_url'] }}">
            @elseif($page['component'] === 'Destinations/Show' && !empty($page['props']['hotels']['data'][0]['main_image_url']))
                <link rel="preload" as="image" href="{{ $page['props']['hotels']['data'][0]['main_image_url'] }}">
            @endif
        @endif

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
