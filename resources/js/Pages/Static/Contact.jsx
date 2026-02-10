import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Contact() {
    return (
        <>
            <Head title="Contact Us - Sunbed Ranker">
                <meta name="description" content="Get in touch with the Sunbed Ranker team. Contact us for editorial inquiries, partnership opportunities, hotel listings, or general questions." />
                <meta property="og:title" content="Contact Us - Sunbed Ranker" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${window.location.origin}/contact`} />
                <meta property="og:site_name" content="Sunbed Ranker" />
                <link rel="canonical" href={`${window.location.origin}/contact`} />
            </Head>

            <div className="min-h-screen bg-white font-sans">
                <Header />

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            We'd love to hear from you. Reach out for any questions, feedback, or partnership inquiries.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-orange-50 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">General Inquiries</h3>
                            <p className="text-gray-700 mb-3">For general questions about Sunbed Ranker, our content, or how our platform works.</p>
                            <a href="mailto:hello@sunbedranker.com" className="text-orange-500 hover:text-orange-600 font-semibold">hello@sunbedranker.com</a>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Editorial & Press</h3>
                            <p className="text-gray-700 mb-3">For press inquiries, content corrections, guest post pitches, or editorial questions.</p>
                            <a href="mailto:editorial@sunbedranker.com" className="text-blue-500 hover:text-blue-600 font-semibold">editorial@sunbedranker.com</a>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Hotel Partners</h3>
                            <p className="text-gray-700 mb-3">Are you a hotelier? Learn how to claim your hotel listing and showcase your pool facilities.</p>
                            <a href="mailto:partners@sunbedranker.com" className="text-green-500 hover:text-green-600 font-semibold">partners@sunbedranker.com</a>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Partnerships & Advertising</h3>
                            <p className="text-gray-700 mb-3">For affiliate partnerships, advertising opportunities, or business collaborations.</p>
                            <a href="mailto:partnerships@sunbedranker.com" className="text-purple-500 hover:text-purple-600 font-semibold">partnerships@sunbedranker.com</a>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Response Times</h2>
                        <p className="text-gray-700 text-lg">
                            We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please include "URGENT" in your email subject line.
                        </p>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
