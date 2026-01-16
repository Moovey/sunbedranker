import { Link, Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import HotelierNav from '@/Components/HotelierNav';
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
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Link
                                href={route('hotelier.dashboard')}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Claim Hotel Ownership</h1>
                        </div>
                        <p className="text-gray-500 text-sm ml-8">
                            Verify your ownership of {hotel.name} to manage your hotel profile
                        </p>
                    </div>

                    {/* Hotel Info Card */}
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
                        <div className="flex gap-4">
                            <img
                                src={hotel.main_image || '/images/default-hotel.jpg'}
                                alt={hotel.name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">{hotel.name}</h2>
                                <p className="text-gray-500 text-sm mt-1">{hotel.destination?.name}</p>
                                {hotel.website && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        Website: <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">{hotel.website}</a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Anti-Fraud Notice */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-sm mb-2">Verification Required</h3>
                                <ul className="text-xs text-gray-600 space-y-1">
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
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Ownership Verification</h3>

                        {/* Official Email */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Official Hotel Email *
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                                Must be from the hotel's official domain{hotelDomain && ` (@${hotelDomain})`}
                            </p>
                            <input
                                type="email"
                                value={data.official_email}
                                onChange={(e) => setData('official_email', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                                placeholder={`manager@${hotelDomain || 'yourhotel.com'}`}
                                required
                            />
                            {errors.official_email && (
                                <p className="text-red-500 text-xs mt-1">{errors.official_email}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hotel Contact Phone *
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                                We'll send a verification code to this number
                            </p>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                                placeholder="+44 20 1234 5678"
                                required
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                            )}
                        </div>

                        {/* Additional Message */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Additional Information (Optional)
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                                Provide any additional details that verify your ownership
                            </p>
                            <textarea
                                value={data.claim_message}
                                onChange={(e) => setData('claim_message', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm resize-none"
                                placeholder="E.g., Your position at the hotel, how long you've worked there, etc."
                            />
                            {errors.claim_message && (
                                <p className="text-red-500 text-xs mt-1">{errors.claim_message}</p>
                            )}
                        </div>

                        {/* Error Messages */}
                        {errors.rate_limit && (
                            <div className="mb-5 bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-red-600 text-sm font-medium">{errors.rate_limit}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex gap-3 mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 px-6 py-2.5 bg-orange-500 text-white font-medium text-sm rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Submitting...' : 'Submit Claim for Review'}
                            </button>
                            <Link
                                href="/hotelier/dashboard"
                                className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-200 transition-colors text-center"
                            >
                                Cancel
                            </Link>
                        </div>

                        {/* Legal Notice */}
                        <p className="text-xs text-gray-400 mt-5 text-center">
                            By submitting this claim, you confirm that you are an authorized representative of {hotel.name} 
                            and that all information provided is accurate. False claims may result in legal action.
                        </p>
                    </form>

                    {/* What Happens Next */}
                    <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Immediate Review</p>
                                    <p className="text-xs text-gray-500">Your claim is immediately sent to our admin team</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Verification Process</p>
                                    <p className="text-xs text-gray-500">We verify your email domain and contact details</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Decision (24-48 hours)</p>
                                    <p className="text-xs text-gray-500">You'll be notified via email once approved or if we need more information</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">4</div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Start Managing</p>
                                    <p className="text-xs text-gray-500">Once approved, you can edit hotel details, respond to reviews, and more!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
