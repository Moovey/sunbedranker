<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Only include routes used in JavaScript
    |--------------------------------------------------------------------------
    |
    | This dramatically reduces the Ziggy payload size embedded in every
    | Inertia response. Only routes referenced via route() in JS are included.
    |
    */
    'only' => [
        // Public pages
        'home',
        'dashboard',
        'login',
        'register',
        'logout',
        'search',
        'hotels.show',
        'hotels.click',
        'destinations.index',
        'compare.index',
        'blog.index',
        'blog.show',

        // Auth
        'auth.google',
        'password.*',
        'verification.*',
        'profile.*',

        // User
        'user.*',

        // Hotelier
        'hotelier.*',

        // Admin
        'admin.*',
    ],
];
