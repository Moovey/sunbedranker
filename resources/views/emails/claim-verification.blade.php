@extends('emails.base')

@section('title', 'Verify Your Hotel Claim')
@section('preheader', 'Your verification code for ' . $hotelName . ' is ' . $code . ' (expires in 30 minutes).')

@section('content')
    <span class="eyebrow">Hotel Claim · Verification</span>
    <h1 class="greeting">Verify your email</h1>
    <p class="subgreeting">Confirm ownership to continue your claim.</p>

    <div class="content">
        <p>Hello,</p>
        <p>You have submitted a claim of ownership for the following hotel:</p>
    </div>

    <div class="detail-card">
        <div class="detail-row">
            <span class="detail-label">Hotel</span>
            <span class="detail-value">{{ $hotelName }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Status</span>
            <span class="detail-value"><span class="hotel-badge">Pending Verification</span></span>
        </div>
    </div>

    <div class="content">
        <p>Enter the verification code below in the SunbedRanker claim form to complete your submission:</p>
    </div>

    <div class="highlight-box">
        <p class="code-label">Your Verification Code</p>
        <p class="verification-code">{{ $code }}</p>
    </div>

    <div class="banner banner-warning">
        <strong>Time Sensitive</strong>
        This code expires in 30 minutes. Request a new code if it has expired.
    </div>

    <hr class="divider">

    <p class="warning-text">
        If you did not request this verification, you can safely ignore this email — no changes will be made to your account.
    </p>
@endsection
