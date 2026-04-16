import SeoHead from '@/Components/SeoHead';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <SeoHead
                title="Privacy Policy"
                description="Sunbed Ranker's privacy policy. Learn how we collect, use, and protect your personal information."
                path="/privacy-policy"
            />

            <div className="min-h-screen bg-white font-sans">
                <Header />

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                        <p className="text-xl text-white/90">Last updated: February 2026</p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">We collect information you provide directly to us, including:</p>
                            <ul className="space-y-2 text-gray-700 text-lg">
                                <li>Account information (name, email, password) when you register</li>
                                <li>Profile information you choose to add to your account</li>
                                <li>Communications you send to us (emails, feedback)</li>
                                <li>Hotel reviews and ratings you submit</li>
                            </ul>
                            <p className="text-gray-700 text-lg leading-relaxed mt-4">We also automatically collect certain information when you visit our site:</p>
                            <ul className="space-y-2 text-gray-700 text-lg">
                                <li>Log data (IP address, browser type, pages visited)</li>
                                <li>Device information (operating system, screen size)</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                            <ul className="space-y-2 text-gray-700 text-lg">
                                <li>To provide, maintain, and improve our services</li>
                                <li>To send you notifications and updates about your account</li>
                                <li>To respond to your comments and questions</li>
                                <li>To analyze usage patterns and improve user experience</li>
                                <li>To detect, prevent, and address technical issues</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                We do not sell your personal information. We may share information with third-party service providers who assist in operating our website, conducting our business, or serving you, provided those parties agree to keep this information confidential. We may share data with affiliate partners only in aggregate, anonymized form.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                We use cookies and similar technologies to enhance your experience, analyze traffic, and for advertising purposes. You can control cookie settings through your browser preferences. Some cookies are essential for the website to function properly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">You have the right to:</p>
                            <ul className="space-y-2 text-gray-700 text-lg">
                                <li>Access the personal data we hold about you</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to processing of your data</li>
                                <li>Request data portability</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                If you have questions about this Privacy Policy, please contact us at <a href="mailto:privacy@sunbedranker.com" className="text-orange-500 hover:text-orange-600">privacy@sunbedranker.com</a>.
                            </p>
                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
