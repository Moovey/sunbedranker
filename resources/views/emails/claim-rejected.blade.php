@extends('emails.base')

@section('title', 'Hotel Claim Update')
@section('preheader', 'An update regarding your claim for ' . $hotelName . '.')

@section('content')
    <span class="eyebrow">Hotel Claim · Update</span>
    <h1 class="greeting">Hello, {{ $userName }}</h1>
    <p class="subgreeting">We have completed our review of your hotel claim.</p>

    <div class="content">
        <p>Thank you for submitting your claim for <strong>{{ $hotelName }}</strong>. After careful review, we were unable to approve your claim at this time.</p>
    </div>

    <div class="banner banner-danger">
        <strong>Reason</strong>
        {{ $reason }}
    </div>

    <div class="content">
        <p>If you believe this decision was made in error, or if you have additional documentation that supports your ownership, please reach out to our support team. We're happy to take another look.</p>
    </div>

    <div class="btn-container">
        <a href="{{ $contactUrl }}" class="btn">Contact Support</a>
    </div>

    <hr class="divider">

    <p class="warning-text">
        Thank you for your understanding and for your interest in SunbedRanker.
    </p>
@endsection
