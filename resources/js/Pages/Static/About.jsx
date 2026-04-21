import { Link } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import { useAppUrl } from '@/hooks/useAppUrl';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function About() {
    const appUrl = useAppUrl();

    return (
        <>
            <SeoHead
                title="About Us"
                description="Learn about Sunbed Ranker - the leading independent travel resource for hotel pool and sunbed reviews. Our mission, team, and commitment to honest travel advice."
                path="/about"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "About Sunbed Ranker",
                    "description": "The leading independent travel resource for hotel pool and sunbed reviews.",
                    "url": `${appUrl}/about`,
                    "publisher": {
                        "@type": "Organization",
                        "name": "Sunbed Ranker",
                        "logo": { "@type": "ImageObject", "url": `${appUrl}/images/logo.png` },
                        "foundingDate": "2024",
                        "description": "Independent travel guide specializing in hotel pool and sunbed reviews."
                    }
                }}
            />

            <div className="min-h-screen bg-slate-50/60 font-sans">
                <Header />

                {/* Hero */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-3 sm:mb-4">About Sunbed Ranker</h1>
                        <p className="text-base sm:text-lg text-orange-100/90 max-w-2xl mx-auto">
                            The independent travel guide dedicated to helping you find the perfect poolside experience
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="prose prose-lg max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">Our Mission</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
                                At Sunbed Ranker, we believe that the pool experience can make or break a holiday. That's why we created the world's first dedicated platform for rating and comparing hotel pools and sunbed availability.
                            </p>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
                                We understand the frustration of arriving at a beautifully marketed resort only to discover overcrowded pools, insufficient sunbeds, and nowhere to relax. Our mission is to eliminate these unpleasant surprises by providing transparent, data-driven reviews of every hotel's poolside experience.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">What We Do</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-orange-50/60 rounded-2xl ring-1 ring-inset ring-orange-100 p-6">
                                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-3">Detailed Pool Reviews</h3>
                                    <p className="text-slate-700">We evaluate hotels based on 10 specific pool criteria including sunbed-to-guest ratio, sun exposure, atmosphere, cleanliness, and more.</p>
                                </div>
                                <div className="bg-blue-50/60 rounded-2xl ring-1 ring-inset ring-blue-100 p-6">
                                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-3">Expert Travel Guides</h3>
                                    <p className="text-slate-700">Our editorial team publishes original travel guides, destination stories, pool tips, and insider knowledge to help travelers plan better holidays.</p>
                                </div>
                                <div className="bg-green-50/60 rounded-2xl ring-1 ring-inset ring-green-100 p-6">
                                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-3">Honest Comparisons</h3>
                                    <p className="text-slate-700">Compare hotels side-by-side on the metrics that matter most to sun-seekers: sunbed availability, pool quality, and overall atmosphere.</p>
                                </div>
                                <div className="bg-purple-50/60 rounded-2xl ring-1 ring-inset ring-purple-100 p-6">
                                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-3">Destination Insights</h3>
                                    <p className="text-slate-700">Discover the best pool destinations worldwide with curated hotel rankings and local travel tips for every type of traveler.</p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">Our Story</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
                                Sunbed Ranker was born from a simple but common frustration: booking a luxury hotel with a stunning pool in the photos, only to arrive and find that every sunbed is either reserved with towels at 6 AM or simply doesn't exist in sufficient numbers for the guests.
                            </p>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
                                We started by developing a unique 10-point scoring system that evaluates every aspect of a hotel's pool area — from sunbed-to-guest ratios and sun exposure hours to noise levels, cleanliness, and family friendliness. Today, we cover hundreds of hotels across popular destinations, and our travel blog is regularly updated with fresh guides, tips, and destination stories.
                            </p>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                                Our content team includes experienced travelers and hospitality enthusiasts who visit and review pools firsthand, combining on-the-ground insights with data analysis to produce the most reliable pool reviews available anywhere.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">Our Values</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold tracking-tight text-slate-900">Independence</h3>
                                        <p className="text-slate-700">Our reviews are independent and unbiased. Hotels cannot pay for higher ratings.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold tracking-tight text-slate-900">Transparency</h3>
                                        <p className="text-slate-700">We clearly disclose how we rate hotels and how we earn revenue through affiliate partnerships.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold tracking-tight text-slate-900">Quality Content</h3>
                                        <p className="text-slate-700">We publish only original, well-researched articles and never use AI-generated content without human editorial oversight.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold tracking-tight text-slate-900">Traveler First</h3>
                                        <p className="text-slate-700">Everything we do is designed to help real travelers make better-informed decisions about their holidays.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CTA */}
                        <section className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] p-8 sm:p-12 text-center">
                            <h2 className="text-2xl sm:text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4">Start Exploring</h2>
                            <p className="text-slate-700 text-base sm:text-lg mb-6">Ready to find your perfect pool? Browse our destinations or read our latest travel guides.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/destinations" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04]">
                                    Browse Destinations
                                </Link>
                                <Link href="/guides" className="bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold tracking-tight px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 shadow-sm ring-1 ring-slate-200 hover:ring-slate-300">
                                    Read Travel Guides
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
