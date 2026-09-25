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
        <meta name="google-site-verification" content="ZNFMwGgbxZs7C5iJcPKSuxw2BYW8ekh7icFLfcFc2Fs" />

        @if($gtmId = config('services.gtm.container_id'))
            <script>window.dataLayer = window.dataLayer || [];</script>
            <!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','{{ $gtmId }}');</script>
            <!-- End Google Tag Manager -->
        @endif

        @if($ga4Id = config('services.ga4.measurement_id'))
            <!-- Google tag (gtag.js) -->
            <script async src="https://www.googletagmanager.com/gtag/js?id={{ $ga4Id }}"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '{{ $ga4Id }}');
            </script>
            <!-- End Google tag (gtag.js) -->
        @endif

        <!-- Favicon -->
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" type="image/png" sizes="48x48" href="/images/favicon-48.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192.png">
        <link rel="apple-touch-icon" href="/images/favicon-192.png">

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
        @if($gtmId = config('services.gtm.container_id'))
            <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $gtmId }}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->
        @endif

        @inertia
    </body>
</html>
