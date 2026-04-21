import SeoHead from '@/Components/SeoHead';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function CookiePolicy() {
    return (
        <>
            <SeoHead
                title="Cookie Policy"
                description="Sunbed Ranker's cookie policy. Learn about the cookies we use, why we use them, and how to manage your cookie preferences."
                path="/cookie-policy"
            />

            <div className="min-h-screen bg-slate-50/60 font-sans">
                <Header />

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-3 sm:mb-4">Cookie Policy</h1>
                        <p className="text-xl text-white/90">Last updated: February 2026</p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-4">What Are Cookies</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                                Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide information to site owners, and enable certain features.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-4">Cookies We Use</h2>
                            <div className="space-y-4">
                                <div className="bg-slate-50/60 rounded-xl ring-1 ring-inset ring-slate-200/70 p-6">
                                    <h3 className="text-base font-semibold tracking-tight text-slate-900 mb-2">Essential Cookies</h3>
                                    <p className="text-slate-700">Required for the website to function properly. These include session cookies, authentication cookies, and CSRF protection tokens.</p>
                                </div>
                                <div className="bg-slate-50/60 rounded-xl ring-1 ring-inset ring-slate-200/70 p-6">
                                    <h3 className="text-base font-semibold tracking-tight text-slate-900 mb-2">Analytics Cookies</h3>
                                    <p className="text-slate-700">Help us understand how visitors interact with our website by collecting and reporting information anonymously. This includes page views, traffic sources, and user behavior.</p>
                                </div>
                                <div className="bg-slate-50/60 rounded-xl ring-1 ring-inset ring-slate-200/70 p-6">
                                    <h3 className="text-base font-semibold tracking-tight text-slate-900 mb-2">Functionality Cookies</h3>
                                    <p className="text-slate-700">Remember your preferences such as hotel comparison selections, search filters, and language settings to provide a personalized experience.</p>
                                </div>
                                <div className="bg-slate-50/60 rounded-xl ring-1 ring-inset ring-slate-200/70 p-6">
                                    <h3 className="text-base font-semibold tracking-tight text-slate-900 mb-2">Affiliate & Advertising Cookies</h3>
                                    <p className="text-slate-700">Used by our affiliate partners (e.g., Expedia, Trip.com) to track referrals from our site. These help us earn commissions that support our free service.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-4">Managing Cookies</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                                You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. Most browsers allow you to view, manage, delete, and block cookies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-4">Contact</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                                For questions about our use of cookies, please contact us at <a href="mailto:privacy@sunbedranker.com" className="text-orange-500 hover:text-orange-600">privacy@sunbedranker.com</a>.
                            </p>
                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
