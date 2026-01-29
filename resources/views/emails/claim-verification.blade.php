@extends('emails.base')

@section('title', 'Verify Your Hotel Claim')

@section('content')
    <h1 class="greeting">Verify Your Email</h1>
    
    <div class="content">
        <p>Hello!</p>
        <p>You have submitted a claim for ownership of:</p>
    </div>

    <div class="highlight-box" style="text-align: left; padding: 20px;">
        <span class="hotel-badge">🏨 Hotel Claim</span>
        <h3 style="font-size: 20px; font-weight: 700; color: #1f2937; margin-top: 12px;">{{ $hotelName }}</h3>
    </div>

    <div class="content">
        <p>Please use the following verification code to complete your claim:</p>
    </div>

    <div class="highlight-box">
        <p class="code-label">Your Verification Code</p>
        <p class="verification-code">{{ $code }}</p>
    </div>

    <div class="info-box">
        <p>⏱️ This code will expire in <strong>30 minutes</strong>.</p>
    </div>

    <div class="divider"></div>

    <p class="warning-text">
        If you did not request this verification, please ignore this email. Your account will remain secure.
    </p>
@endsection
