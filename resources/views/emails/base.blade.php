<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') - SunbedRanker</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f3f4f6;
            color: #1f2937;
            line-height: 1.6;
        }
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .email-container {
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
        }
        .email-header {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            padding: 32px 40px;
            text-align: center;
        }
        .logo {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #ffffff;
            text-decoration: none;
        }
        .logo-icon {
            width: 40px;
            height: 40px;
        }
        .logo-text {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        .email-body {
            padding: 40px;
        }
        .greeting {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
        }
        .content {
            color: #4b5563;
            font-size: 16px;
            margin-bottom: 24px;
        }
        .content p {
            margin-bottom: 16px;
        }
        .highlight-box {
            background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
            border: 2px solid #fed7aa;
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            margin: 24px 0;
        }
        .verification-code {
            font-size: 36px;
            font-weight: 800;
            color: #ea580c;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
        }
        .code-label {
            font-size: 12px;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        .btn {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
        }
        .btn-container {
            text-align: center;
            margin: 32px 0;
        }
        .info-box {
            background: #f9fafb;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
        }
        .info-box p {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
        }
        .info-box strong {
            color: #374151;
        }
        .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 24px 0;
        }
        .email-footer {
            background: #f9fafb;
            padding: 24px 40px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            font-size: 13px;
            color: #9ca3af;
            margin-bottom: 8px;
        }
        .footer-links {
            margin-top: 16px;
        }
        .footer-links a {
            color: #f97316;
            text-decoration: none;
            font-size: 13px;
            margin: 0 8px;
        }
        .footer-links a:hover {
            text-decoration: underline;
        }
        .warning-text {
            font-size: 13px;
            color: #9ca3af;
            font-style: italic;
        }
        .hotel-badge {
            display: inline-block;
            background: #fef3c7;
            color: #92400e;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin: 8px 0;
        }
        @media only screen and (max-width: 600px) {
            .email-wrapper {
                padding: 20px 10px;
            }
            .email-header {
                padding: 24px 20px;
            }
            .email-body {
                padding: 24px 20px;
            }
            .email-footer {
                padding: 20px;
            }
            .verification-code {
                font-size: 28px;
                letter-spacing: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <!-- Header -->
            <div class="email-header">
                <a href="{{ config('app.url') }}" class="logo">
                    <svg class="logo-icon" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span class="logo-text">SunbedRanker</span>
                </a>
            </div>

            <!-- Body -->
            <div class="email-body">
                @yield('content')
            </div>

            <!-- Footer -->
            <div class="email-footer">
                <p class="footer-text">
                    © {{ date('Y') }} SunbedRanker. All rights reserved.
                </p>
                <p class="footer-text">
                    Find the best hotels with amazing pools.
                </p>
                <div class="footer-links">
                    <a href="{{ config('app.url') }}">Visit Website</a>
                    <a href="{{ config('app.url') }}/contact">Contact Us</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
