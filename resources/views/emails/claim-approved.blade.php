@extends('emails.base')

@section('title', 'Hotel Claim Approved')
@section('preheader', 'Your claim for ' . $hotelName . ' has been approved. Welcome aboard!')

@section('content')
    <span class="eyebrow">Hotel Claim · Approved</span>
    <h1 class="greeting">Congratulations, {{ $userName }}!</h1>
    <p class="subgreeting">You are now the verified owner of your property on SunbedRanker.</p>

    <div class="banner banner-success">
        <strong>Claim Approved</strong>
        Your claim for <strong>{{ $hotelName }}</strong> has been verified and approved.
    </div>

    <div class="content">
        <p>You now have full access to manage your hotel listing. Here's what you can do next:</p>
        <ul>
            <li>Update your hotel profile, photos, and videos</li>
            <li>Respond to guest reviews</li>
            <li>View analytics and performance data</li>
            <li>Add a direct booking link</li>
            <li>Upgrade your subscription for enhanced features</li>
        </ul>
    </div>

    <div class="btn-container">
        <a href="{{ $manageUrl }}" class="btn">Manage Your Hotel</a>
    </div>

    <hr class="divider">

    <p class="warning-text">
        Need help getting started? Reply to this email or visit our <a href="{{ config('app.url') }}/contact" style="color:#ea580c;font-weight:600;">support page</a>.
    </p>
@endsection
