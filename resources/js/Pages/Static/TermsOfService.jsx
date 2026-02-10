import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service - Sunbed Ranker">
                <meta name="description" content="Sunbed Ranker's terms of service. Review the terms and conditions governing your use of our website and services." />
                <meta property="og:title" content="Terms of Service - Sunbed Ranker" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${window.location.origin}/terms-of-service`} />
                <meta property="og:site_name" content="Sunbed Ranker" />
                <link rel="canonical" href={`${window.location.origin}/terms-of-service`} />
            </Head>

            <div className="min-h-screen bg-white font-sans">
                <Header />

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Terms of Service</h1>
                        <p className="text-xl text-white/90">Last updated: February 2026</p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                By accessing and using Sunbed Ranker ("the Website"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Sunbed Ranker is an independent travel review platform that provides hotel pool and sunbed ratings, travel guides, destination information, and hotel comparison tools. We also provide booking links to third-party travel platforms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                When you create an account, you are responsible for maintaining the security of your account and password. You agree to provide accurate and complete information and to update your information as necessary.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Content</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                All content on this website, including text, graphics, logos, images, and software, is the property of Sunbed Ranker or its content suppliers and is protected by copyright laws.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Users may submit reviews and ratings. By submitting content, you grant Sunbed Ranker a non-exclusive, royalty-free license to use, reproduce, and display that content on our platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Links</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Our website contains links to third-party websites and booking platforms. We are not responsible for the content, policies, or practices of these third-party sites. Bookings made through affiliate links are subject to the terms and conditions of the respective booking platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                The information on this website is provided "as is" without warranty of any kind. While we strive for accuracy, we cannot guarantee that all hotel information, scores, and reviews are completely accurate or up-to-date at all times.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Sunbed Ranker shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including but not limited to booking decisions made based on our reviews.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes acceptance of the revised terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                For questions about these Terms of Service, please contact us at <a href="mailto:legal@sunbedranker.com" className="text-orange-500 hover:text-orange-600">legal@sunbedranker.com</a>.
                            </p>
                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
