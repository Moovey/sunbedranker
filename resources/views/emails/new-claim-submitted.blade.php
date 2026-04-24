@extends('emails.base')

@section('title', 'New Hotel Claim Submitted')
@section('preheader', 'A new claim for ' . $hotelName . ' is awaiting your review.')

@section('content')
    <span class="eyebrow">Admin · Action Required</span>
    <h1 class="greeting">New hotel claim submitted</h1>
    <p class="subgreeting">A hotelier has submitted ownership documentation that requires your review.</p>

    <div class="banner banner-info">
        <strong>Review Window</strong>
        Please review this claim within 24–48 hours.
    </div>

    <div class="detail-card">
        <div class="detail-row">
            <span class="detail-label">Hotel</span>
            <span class="detail-value">{{ $hotelName }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Claimed By</span>
            <span class="detail-value">{{ $hotelierName }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">User Email</span>
            <span class="detail-value">{{ $hotelierEmail }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Official Email</span>
            <span class="detail-value">{{ $officialEmail }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Phone</span>
            <span class="detail-value">{{ $phone }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Submitted</span>
            <span class="detail-value">{{ $submittedAt }}</span>
        </div>
    </div>

    <div class="btn-container">
        <a href="{{ $reviewUrl }}" class="btn">Review Claim</a>
    </div>
@endsection
