import SeoHead from '@/Components/SeoHead';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function EditorialPolicy() {
    return (
        <>
            <SeoHead
                title="Editorial Policy"
                description="Sunbed Ranker's editorial policy outlines our commitment to honest, independent travel content. Learn about our review standards, content guidelines, and editorial independence."
                path="/editorial-policy"
            />

            <div className="min-h-screen bg-white font-sans">
                <Header />

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Editorial Policy</h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Our commitment to honest, independent, and helpful travel content
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="prose prose-lg max-w-none space-y-10">
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Editorial Independence</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                Sunbed Ranker maintains strict editorial independence. Our content team operates independently from our commercial partnerships. Hotel reviews, ratings, and editorial recommendations are never influenced by advertising relationships or affiliate partnerships.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Hotels that have claimed their profiles may provide additional information and imagery, but they cannot influence their scores or editorial coverage. Our reviews reflect the genuine quality of each hotel's pool experience.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Content Standards</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">All content published on Sunbed Ranker must meet these standards:</p>
                            <ul className="space-y-3">
                                {[
                                    'Accuracy: All facts, figures, and claims must be verified before publication.',
                                    'Originality: We publish only original content. All articles are written by our editorial team or vetted contributors.',
                                    'Usefulness: Content must provide genuine value to travelers planning their holidays.',
                                    'Timeliness: Hotel reviews and destination guides are regularly updated to reflect current conditions.',
                                    'Fairness: All hotels are assessed using the same criteria, regardless of commercial relationships.',
                                    'Disclosure: Affiliate relationships and sponsored content are always clearly disclosed.'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700 text-lg"><strong>{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Review Process</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                Every hotel review on Sunbed Ranker follows a structured process:
                            </p>
                            <ol className="space-y-4">
                                {[
                                    { step: 'Data Collection', desc: 'We gather information from multiple sources including on-site visits, hotel submissions, satellite imagery, and guest reviews.' },
                                    { step: 'Criteria Assessment', desc: 'Each of our 10 rating criteria is evaluated independently using standardized metrics.' },
                                    { step: 'Score Calculation', desc: 'The weighted average of all criteria produces the overall pool score.' },
                                    { step: 'Editorial Review', desc: 'A member of our editorial team reviews the assessment for accuracy and consistency.' },
                                    { step: 'Publication & Updates', desc: 'The review is published and scheduled for regular updates as conditions change.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{item.step}</h3>
                                            <p className="text-gray-700">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Affiliate Links & Revenue</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                Sunbed Ranker earns revenue through affiliate partnerships with hotel booking platforms. When you click on a booking link and make a reservation, we may earn a commission at no additional cost to you.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                These commercial relationships never influence our editorial content, ratings, or recommendations. A hotel's affiliate relationship has no bearing on its score or placement in our rankings.
                            </p>
                        </section>

                        <section className="bg-gray-50 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Corrections & Updates</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                If you notice inaccurate information on our site, please contact us at <a href="mailto:editorial@sunbedranker.com" className="text-orange-500 hover:text-orange-600">editorial@sunbedranker.com</a>. We take accuracy seriously and will promptly investigate and correct any errors.
                            </p>
                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
