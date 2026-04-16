<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class StaticPageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('Static/About');
    }

    public function howWeRate(): Response
    {
        return Inertia::render('Static/HowWeRate');
    }

    public function editorialPolicy(): Response
    {
        return Inertia::render('Static/EditorialPolicy');
    }

    public function contact(): Response
    {
        return Inertia::render('Static/Contact');
    }

    public function privacyPolicy(): Response
    {
        return Inertia::render('Static/PrivacyInfo');
    }

    public function termsOfService(): Response
    {
        return Inertia::render('Static/TermsOfService');
    }

    public function cookiePolicy(): Response
    {
        return Inertia::render('Static/CookiesInfo');
    }

    public function affiliateDisclosure(): Response
    {
        return Inertia::render('Static/AffiliateDisclosure');
    }
}
