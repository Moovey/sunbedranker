@extends('emails.base')

@section('title', 'Reset Your Password')

@section('content')
    <h1 class="greeting">Reset Your Password</h1>
    
    <div class="content">
        <p>Hello!</p>
        <p>We received a request to reset the password for your SunbedRanker account associated with this email address.</p>
        <p>Click the button below to set a new password:</p>
    </div>

    <div class="btn-container">
        <a href="{{ $url }}" class="btn">Reset Password</a>
    </div>

    <div class="info-box">
        <p>⏱️ This password reset link will expire in <strong>{{ $expireMinutes }} minutes</strong>.</p>
    </div>

    <div class="divider"></div>

    <div class="content">
        <p style="font-size: 14px; color: #6b7280;">
            If the button above doesn't work, copy and paste this link into your browser:
        </p>
        <p style="font-size: 13px; color: #f97316; word-break: break-all;">
            {{ $url }}
        </p>
    </div>

    <div class="divider"></div>

    <p class="warning-text">
        If you did not request a password reset, please ignore this email. Your password will remain unchanged and your account will stay secure.
    </p>
@endsection
