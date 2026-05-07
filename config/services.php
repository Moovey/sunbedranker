<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'ffmpeg' => [
        // Optional absolute paths to the ffmpeg / ffprobe binaries.
        // Leave unset to auto-detect from the system PATH (recommended).
        'ffmpeg_path'  => env('FFMPEG_PATH'),
        'ffprobe_path' => env('FFPROBE_PATH'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'stripe' => [
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI', '/auth/google/callback'),
    ],

    'countrystatecity' => [
        'key' => env('COUNTRYSTATECITY_API_KEY'),
        'base_url' => 'https://api.countrystatecity.in/v1',
    ],

    'agoda' => [
        'site_id' => env('AGODA_SITE_ID'),
        'api_key' => env('AGODA_API_KEY'),
        'endpoint' => env('AGODA_API_ENDPOINT', 'http://affiliateapi7643.agoda.com/affiliateservice/lt_v1'),
    ],

    'gemini' => [
        'api_key' => env('GEMINI_API_KEY'),
        'model'   => env('GEMINI_MODEL', 'gemini-flash-latest'),
    ],

];
