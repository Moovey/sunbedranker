import SeoHead from '@/Components/SeoHead';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function AffiliateDisclosure() {
    return (
        <>
            <SeoHead
                title="Affiliate Disclosure"
                description="Sunbed Ranker's affiliate disclosure. Learn how we earn revenue through affiliate partnerships and how this supports our independent travel reviews."
                path="/affiliate-disclosure"
            />

            <div className="min-h-screen bg-slate-50/60 font-sans">
                <Header />

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-3 sm:mb-4">Affiliate Disclosure</h1>
                        <p className="text-base sm:text-lg text-orange-100/90 max-w-2xl mx-auto">
                            Transparency about how Sunbed Ranker earns revenue
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4">How We Earn Revenue</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
                                Sunbed Ranker is a free resource for travelers. We earn revenue through affiliate marketing partnerships with hotel booking platforms and travel service providers. When you click on certain links on our website and make a booking or purchase, we may receive a commission from the booking platform at no additional cost to you.
                            </p>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                                This commission helps us maintain our platform, fund our editorial team, and continue providing free, independent hotel pool reviews and travel content.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4">Our Affiliate Partners</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
                                We partner with reputable travel booking platforms to provide you with booking options. These may include:
                            </p>
                            <ul className="space-y-2">
                                {['Major hotel booking platforms (Expedia, Booking.com, Trip.com, etc.)', 'Travel comparison and metasearch engines', 'Direct hotel booking systems', 'Travel insurance providers'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-slate-700 text-base sm:text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4">Editorial Independence</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
                                Our affiliate partnerships do not influence our editorial content in any way:
                            </p>
                            <ul className="space-y-2">
                                {[
                                    'Hotel ratings and scores are based solely on our objective assessment criteria',
                                    'Affiliate relationships have no impact on how hotels are ranked or reviewed',
                                    'We feature hotels based on merit, not commercial relationships',
                                    'Our editorial team operates independently from our commercial team',
                                    'Negative reviews are published without censorship, regardless of affiliate status'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-slate-700 text-base sm:text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4">FTC Compliance</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                                In accordance with the Federal Trade Commission (FTC) guidelines and applicable regulations, we disclose our affiliate relationships. Links that may earn us a commission are clearly identifiable. This disclosure applies to all pages on sunbedranker.com.
                            </p>
                        </section>

                        <section className="bg-orange-50/60 rounded-2xl ring-1 ring-inset ring-orange-100 p-8">
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-4">Questions?</h2>
                            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                                If you have any questions about our affiliate relationships or how we earn revenue, please feel free to contact us at <a href="mailto:hello@sunbedranker.com" className="text-orange-500 hover:text-orange-600 font-semibold">hello@sunbedranker.com</a>.
                            </p>
                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
