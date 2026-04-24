<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>@yield('title') · SunbedRanker</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        img { border: 0; max-width: 100%; height: auto; line-height: 100%; vertical-align: middle; }
        a { text-decoration: none; }

        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            background-color: #f1f5f9;
            color: #0f172a;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 16px;
            line-height: 1.65;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .preheader {
            display: none !important;
            visibility: hidden;
            opacity: 0;
            color: transparent;
            height: 0;
            width: 0;
            overflow: hidden;
            /* stylelint-disable-next-line property-no-unknown */
            mso-hide: all; /* Outlook-specific: hides preheader in MS Outlook */
            font-size: 1px;
            line-height: 1px;
        }

        .email-wrapper {
            width: 100%;
            background-color: #f1f5f9;
            padding: 32px 16px;
        }
        .email-container {
            max-width: 620px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 18px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -12px rgba(15, 23, 42, 0.10);
        }

        .email-header {
            background: linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%);
            padding: 36px 40px;
            text-align: center;
        }
        .logo {
            display: inline-block;
            color: #ffffff;
            text-decoration: none;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        .logo-row {
            display: inline-block;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.22);
            border-radius: 999px;
        }
        .logo-icon {
            display: inline-block;
            vertical-align: middle;
            width: 28px;
            height: 28px;
            margin-right: 8px;
        }
        .logo-text {
            display: inline-block;
            vertical-align: middle;
            font-size: 20px;
            line-height: 28px;
            color: #ffffff;
        }
        .header-tagline {
            margin-top: 14px;
            color: #fff7ed;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
        }

        .email-body { padding: 40px 44px 32px; }
        .eyebrow {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.6px;
            color: #ea580c;
            background: #fff7ed;
            padding: 5px 10px;
            border-radius: 6px;
            margin-bottom: 16px;
        }
        .greeting {
            font-size: 26px;
            line-height: 1.25;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            letter-spacing: -0.4px;
        }
        .subgreeting {
            font-size: 15px;
            color: #64748b;
            margin-bottom: 24px;
        }
        .content {
            color: #334155;
            font-size: 15.5px;
            line-height: 1.7;
        }
        .content p { margin: 0 0 14px; }
        .content strong { color: #0f172a; font-weight: 700; }
        .content ul { margin: 0 0 16px 20px; padding: 0; }
        .content li { margin-bottom: 6px; color: #334155; }

        .highlight-box {
            background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
            border: 1px solid #fed7aa;
            border-radius: 14px;
            padding: 24px;
            text-align: center;
            margin: 24px 0;
        }
        .verification-code {
            font-size: 38px;
            font-weight: 800;
            color: #c2410c;
            letter-spacing: 10px;
            font-family: 'SFMono-Regular', Menlo, Consolas, 'Courier New', monospace;
        }
        .code-label {
            font-size: 11px;
            color: #9a3412;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .btn-container { text-align: center; margin: 28px 0 8px; }
        .btn {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            color: #ffffff !important;
            border-radius: 10px;
            font-weight: 700;
            font-size: 15px;
            letter-spacing: 0.2px;
            box-shadow: 0 6px 16px -4px rgba(234, 88, 12, 0.45);
        }
        .btn-secondary {
            display: inline-block;
            padding: 12px 26px;
            background: #ffffff;
            color: #ea580c !important;
            border: 1.5px solid #fed7aa;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
        }

        .banner {
            border-radius: 12px;
            padding: 16px 18px;
            margin: 22px 0;
            font-size: 14.5px;
            border: 1px solid transparent;
        }
        .banner strong { display: block; margin-bottom: 4px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
        .banner-success { background: #ecfdf5; border-color: #a7f3d0; color: #065f46; }
        .banner-warning { background: #fffbeb; border-color: #fde68a; color: #92400e; }
        .banner-danger  { background: #fef2f2; border-color: #fecaca; color: #991b1b; }
        .banner-info    { background: #eff6ff; border-color: #bfdbfe; color: #1e40af; }

        .detail-card {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            margin: 22px 0;
            background: #ffffff;
        }
        .detail-row {
            display: block;
            padding: 14px 18px;
            border-bottom: 1px solid #f1f5f9;
            font-size: 14.5px;
        }
        .detail-row:last-child { border-bottom: 0; }
        .detail-label {
            display: inline-block;
            color: #64748b;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            min-width: 130px;
        }
        .detail-value {
            display: inline-block;
            color: #0f172a;
            font-weight: 600;
        }

        .info-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 14px 16px;
            margin: 22px 0;
        }
        .info-box p { font-size: 13.5px; color: #475569; margin: 0; }
        .info-box strong { color: #0f172a; }

        .tier-card {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f8fafc;
            border-radius: 14px;
            padding: 22px 24px;
            margin: 22px 0;
        }
        .tier-card .tier-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #fb923c;
            font-weight: 700;
        }
        .tier-card .tier-name {
            font-size: 24px;
            font-weight: 800;
            margin: 4px 0 6px;
            color: #ffffff;
        }
        .tier-card .tier-meta {
            font-size: 13.5px;
            color: #cbd5e1;
        }
        .tier-card ul { margin: 14px 0 0 18px; padding: 0; }
        .tier-card li { color: #e2e8f0; font-size: 14px; margin-bottom: 4px; }

        .divider { height: 1px; background: #e2e8f0; margin: 28px 0; border: 0; }

        .hotel-badge {
            display: inline-block;
            background: #fef3c7;
            color: #92400e;
            padding: 5px 12px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .email-footer {
            background: #0f172a;
            padding: 28px 40px;
            text-align: center;
        }
        .footer-brand {
            color: #ffffff;
            font-weight: 800;
            font-size: 15px;
            letter-spacing: -0.2px;
            margin-bottom: 6px;
        }
        .footer-text {
            font-size: 12.5px;
            color: #94a3b8;
            margin-bottom: 4px;
        }
        .footer-links { margin-top: 16px; }
        .footer-links a {
            color: #fdba74;
            font-size: 12.5px;
            margin: 0 8px;
            font-weight: 600;
        }
        .footer-links a:hover { text-decoration: underline; }
        .footer-legal {
            margin-top: 14px;
            font-size: 11.5px;
            color: #64748b;
        }
        .warning-text {
            font-size: 13px;
            color: #94a3b8;
            font-style: italic;
        }

        @media only screen and (max-width: 600px) {
            .email-wrapper { padding: 16px 8px; }
            .email-header { padding: 28px 22px; }
            .email-body { padding: 28px 22px 22px; }
            .email-footer { padding: 24px 22px; }
            .greeting { font-size: 22px; }
            .verification-code { font-size: 30px; letter-spacing: 6px; }
            .detail-label { display: block; min-width: 0; margin-bottom: 4px; }
            .detail-value { display: block; }
        }
    </style>
</head>
<body>
    <div class="preheader">@yield('preheader', 'A message from SunbedRanker.')</div>

    <div class="email-wrapper">
        <div class="email-container">
            <div class="email-header">
                <a href="{{ config('app.url') }}" class="logo">
                    <span class="logo-row">
                        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="12" cy="9" r="3.2" fill="#ffffff"/>
                            <path d="M12 2.5v1.6M12 13.9v1.6M4.6 9h1.6M17.8 9h1.6M6.4 3.4l1.1 1.1M16.5 13.5l1.1 1.1M6.4 14.6l1.1-1.1M16.5 4.5l1.1-1.1" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>
                            <path d="M3 18h18M5 21h14" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                        <span class="logo-text">SunbedRanker</span>
                    </span>
                </a>
                <div class="header-tagline">Hotel Pool &amp; Sunbed Reviews</div>
            </div>

            <div class="email-body">
                @yield('content')
            </div>

            <div class="email-footer">
                <div class="footer-brand">SunbedRanker</div>
                <p class="footer-text">The independent guide to hotel pools &amp; sunbeds.</p>
                <div class="footer-links">
                    <a href="{{ config('app.url') }}">Visit Website</a>
                    <a href="{{ config('app.url') }}/contact">Contact</a>
                    <a href="{{ config('app.url') }}/about">About</a>
                </div>
                <div class="footer-legal">
                    © {{ date('Y') }} SunbedRanker. All rights reserved.
                </div>
            </div>
        </div>
    </div>
</body>
</html>
