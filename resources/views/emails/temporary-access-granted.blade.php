@extends('emails.base')

@section('title', 'Temporary Access Granted')
@section('preheader', $days . ' days of ' . ucfirst($tier) . ' features have been unlocked for your account.')

@section('content')
    <span class="eyebrow">Access · Trial Granted</span>
    <h1 class="greeting">Hello, {{ $userName }}!</h1>
    <p class="subgreeting">You've been granted temporary access to premium features — make the most of it.</p>

    <div class="tier-card">
        <div class="tier-label">Temporary Access</div>
        <div class="tier-name">{{ ucfirst($tier) }}</div>
        <div class="tier-meta">
            Duration: <strong style="color:#ffffff;">{{ $days }} days</strong>
            &nbsp;·&nbsp; Expires <strong style="color:#ffffff;">{{ $endsAt }}</strong>
        </div>
        @if($tier === 'enhanced')
            <ul>
                <li>Promotional banners on your listing</li>
                <li>Featured special offers</li>
                <li>Priority placement in search results</li>
            </ul>
        @elseif($tier === 'premium')
            <ul>
                <li>360° video tours</li>
                <li>Multiple active promotions</li>
                <li>Verified badge display</li>
                <li>Top placement in listings</li>
            </ul>
        @endif
    </div>

    @if($reason)
        <div class="banner banner-info">
            <strong>Reason</strong>
            {{ $reason }}
        </div>
    @endif

    <div class="btn-container">
        <a href="{{ $dashboardUrl }}" class="btn">Start Using Your Features</a>
    </div>

    <hr class="divider">

    <p class="warning-text">Make the most of your temporary access — we hope you love it.</p>
@endsection
