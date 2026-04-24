@extends('emails.base')

@section('title', 'Subscription Updated')
@section('preheader', 'Your SunbedRanker subscription has been updated to ' . ucfirst($tier) . '.')

@section('content')
    <span class="eyebrow">Subscription · Update</span>
    <h1 class="greeting">Hello, {{ $userName }}!</h1>
    <p class="subgreeting">
        @if($tier === 'free')
            Your subscription has been updated.
        @else
            Welcome to your upgraded experience.
        @endif
    </p>

    @if($tier === 'free')
        <div class="banner banner-info">
            <strong>Plan Updated</strong>
            Your subscription has been moved to the <strong>Free</strong> tier.
        </div>
    @else
        <div class="tier-card">
            <div class="tier-label">Active Plan</div>
            <div class="tier-name">{{ ucfirst($tier) }}</div>
            <div class="tier-meta">
                Duration: <strong style="color:#ffffff;">{{ $periodMonths }} month{{ $periodMonths === 1 ? '' : 's' }}</strong>
                @if($endsAt)
                    &nbsp;·&nbsp; Valid until <strong style="color:#ffffff;">{{ $endsAt }}</strong>
                @endif
            </div>
            @if($tier === 'enhanced')
                <ul>
                    <li>Promotional banners on your listing</li>
                    <li>Featured special offers</li>
                    <li>Priority placement in search results</li>
                </ul>
            @elseif($tier === 'premium')
                <ul>
                    <li>Everything in Enhanced</li>
                    <li>360° video tours</li>
                    <li>Multiple active promotions</li>
                    <li>Verified badge display</li>
                    <li>Top placement in listings</li>
                </ul>
            @endif
        </div>
    @endif

    @if($reason)
        <div class="banner banner-warning">
            <strong>Note</strong>
            {{ $reason }}
        </div>
    @endif

    <div class="btn-container">
        <a href="{{ $dashboardUrl }}" class="btn">View Your Dashboard</a>
    </div>

    <hr class="divider">

    <p class="warning-text">Thank you for being part of SunbedRanker.</p>
@endsection
