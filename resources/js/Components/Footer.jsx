import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-neutral-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <img 
                                src="/images/logo.png" 
                                alt="Sunbed Ranker" 
                                width={120}
                                height={48}
                                className="h-12 w-auto brightness-0 invert opacity-90"
                            />
                        </Link>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            The leading independent travel resource for hotel pool and sunbed reviews. 
                            We help travelers find the perfect poolside experience with expert ratings, 
                            detailed guides, and honest comparisons.
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400">
                                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Independent Reviews
                            </span>
                        </div>
                    </div>

                    {/* Explore Column */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href={route('destinations.index')} className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Destinations
                                </Link>
                            </li>
                            <li>
                                <Link href={route('blog.index')} className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Travel Guides & Tips
                                </Link>
                            </li>
                            <li>
                                <Link href={route('compare.index')} className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Compare Hotels
                                </Link>
                            </li>
                            <li>
                                <Link href={route('search')} className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Search Hotels
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-we-rate" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    How We Rate Hotels
                                </Link>
                            </li>
                            <li>
                                <Link href="/editorial-policy" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Editorial Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy-policy" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookie-policy" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/affiliate-disclosure" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200">
                                    Affiliate Disclosure
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-neutral-500">
                            &copy; {currentYear} Sunbed Ranker. All rights reserved. Independent travel reviews since 2024.
                        </p>
                        <div className="flex items-center gap-4">
                            <p className="text-xs text-neutral-500">
                                <span className="text-neutral-600">Affiliate Disclosure:</span> Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
