@extends('emails.base')

@section('title', 'Reset Your Password')
@section('preheader', 'Reset your SunbedRanker password. This link expires in ' . $expireMinutes . ' minutes.')

@section('content')
    <span class="eyebrow">Account Security</span>
    <h1 class="greeting">Reset your password</h1>
    <p class="subgreeting">Use the secure link below to set a new password.</p>

    <div class="content">
        <p>Hello,</p>
        <p>We received a request to reset the password for the SunbedRanker account associated with this email address. Click the button below to choose a new one:</p>
    </div>

    <div class="btn-container">
        <a href="{{ $url }}" class="btn">Reset Password</a>
    </div>

    <div class="banner banner-warning">
        <strong>Time Sensitive</strong>
        This password reset link will expire in {{ $expireMinutes }} minutes for your security.
    </div>

    <hr class="divider">

    <div class="content">
        <p style="font-size: 14px; color: #64748b;">
            If the button above doesn't work, copy and paste this link into your browser:
        </p>
        <p style="font-size: 13px; color: #ea580c; word-break: break-all;">
            {{ $url }}
        </p>
    </div>

    <hr class="divider">

    <p class="warning-text">
        If you did not request a password reset, please ignore this email. Your password will remain unchanged and your account stays secure.
    </p>
@endsection
