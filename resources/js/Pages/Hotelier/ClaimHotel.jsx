import { Link, Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClaimHotel({ hotel }) {
    const { data, setData, post, processing, errors } = useForm({
        official_email: '',
        phone: '',
        claim_message: '',
    });

    const [showPhoneVerification, setShowPhoneVerification] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('hotelier.hotels.claim.store', hotel.slug), {
            onSuccess: () => {
                toast.success('Hotel claim submitted successfully! We will review your claim and contact you soon.', {
                    position: 'top-right',
                    autoClose: 5000,
                });
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat();
                errorMessages.forEach((error) => {
                    toast.error(error, {
                        position: 'top-right',
                        autoClose: 5000,
                    });
                });
            },
        });
    };

    // Get hotel's website domain for email validation hint
    const getHotelDomain = () => {
        if (!hotel.website) return '';
        try {
            const url = new URL(hotel.website.startsWith('http') ? hotel.website : 'https://' + hotel.website);
            return url.hostname.replace('www.', '');
        } catch {
            return '';
        }
    };

    const hotelDomain = getHotelDomain();

    return (
        <>
            <Head title={`Claim ${hotel.name}`} />
            <ToastContainer />
            
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <Header />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('hotelier.dashboard')}
                            className="text-orange-500 hover:text-orange-600 font-semibold mb-4 inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold text-gray-900 mt-4">Claim Hotel Ownership</h1>
                        <p className="text-lg text-gray-600 mt-2">
                            Verify your ownership of {hotel.name} to manage your hotel profile
                        </p>
                    </div>

                    {/* Hotel Info Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-orange-200">
                        <div className="flex gap-6">
                            <img
                                src={hotel.main_image || '/images/default-hotel.jpg'}
                                alt={hotel.name}
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{hotel.name}</h2>
                                <p className="text-gray-600 mt-1">{hotel.destination?.name}</p>
                                {hotel.website && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        Website: <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">{hotel.website}</a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Anti-Fraud Notice */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h3 className="font-bold text-blue-900 mb-2">Verification Required</h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• You must use an official email from the hotel's domain{hotelDomain && ` (@${hotelDomain})`}</li>
                                    <li>• Phone verification will be required</li>
                                    <li>• Our admin team will review your claim within 24-48 hours</li>
                                    <li>• Only one owner per hotel is allowed</li>
                                    <li>• False claims will result in account suspension</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Claim Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Ownership Verification</h3>

                        {/* Official Email */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Official Hotel Email *
                            </label>
                            <p className="text-sm text-gray-600 mb-3">
                                Must be from the hotel's official domain{hotelDomain && ` (@${hotelDomain})`}
                            </p>
                            <input
                                type="email"
                                value={data.official_email}
                                onChange={(e) => setData('official_email', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                                placeholder={`manager@${hotelDomain || 'yourhotel.com'}`}
                                required
                            />
                            {errors.official_email && (
                                <p className="text-red-500 text-sm mt-2">{errors.official_email}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Hotel Contact Phone *
                            </label>
                            <p className="text-sm text-gray-600 mb-3">
                                We'll send a verification code to this number
                            </p>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                                placeholder="+44 20 1234 5678"
                                required
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                            )}
                        </div>

                        {/* Additional Message */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Additional Information (Optional)
                            </label>
                            <p className="text-sm text-gray-600 mb-3">
                                Provide any additional details that verify your ownership
                            </p>
                            <textarea
                                value={data.claim_message}
                                onChange={(e) => setData('claim_message', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                                placeholder="E.g., Your position at the hotel, how long you've worked there, etc."
                            />
                            {errors.claim_message && (
                                <p className="text-red-500 text-sm mt-2">{errors.claim_message}</p>
                            )}
                        </div>

                        {/* Error Messages */}
                        {errors.rate_limit && (
                            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                                <p className="text-red-700 font-semibold">{errors.rate_limit}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {processing ? 'Submitting...' : 'Submit Claim for Review'}
                            </button>
                            <Link
                                href="/hotelier/dashboard"
                                className="px-8 py-4 bg-gray-200 text-gray-700 font-bold text-lg rounded-lg hover:bg-gray-300 transition-all duration-300 text-center"
                            >
                                Cancel
                            </Link>
                        </div>

                        {/* Legal Notice */}
                        <p className="text-xs text-gray-500 mt-6 text-center">
                            By submitting this claim, you confirm that you are an authorized representative of {hotel.name} 
                            and that all information provided is accurate. False claims may result in legal action.
                        </p>
                    </form>

                    {/* What Happens Next */}
                    <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">What happens next?</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <div>
                                    <p className="font-semibold text-gray-900">Immediate Review</p>
                                    <p className="text-sm text-gray-600">Your claim is immediately sent to our admin team</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <div>
                                    <p className="font-semibold text-gray-900">Verification Process</p>
                                    <p className="text-sm text-gray-600">We verify your email domain and contact details</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <div>
                                    <p className="font-semibold text-gray-900">Decision (24-48 hours)</p>
                                    <p className="text-sm text-gray-600">You'll be notified via email once approved or if we need more information</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                                <div>
                                    <p className="font-semibold text-gray-900">Start Managing</p>
                                    <p className="text-sm text-gray-600">Once approved, you can edit hotel details, respond to reviews, and more!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
