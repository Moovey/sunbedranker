import { Link, Head, useForm } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import HotelierNav from '@/Components/HotelierNav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyClaim({ claim, email }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleDigitChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);

        // Update form data
        setData('code', newDigits.join(''));

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pastedData) {
            const newDigits = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
            setDigits(newDigits);
            setData('code', newDigits.join(''));
            // Focus last filled input or last input
            const lastFilledIndex = Math.min(pastedData.length - 1, 5);
            inputRefs.current[lastFilledIndex]?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('hotelier.claims.verify.submit', claim.id), {
            onSuccess: () => {
                toast.success('Email verified successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
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

    const handleResend = () => {
        post(route('hotelier.claims.resend', claim.id), {
            onSuccess: () => {
                toast.success('A new verification code has been sent!', {
                    position: 'top-right',
                    autoClose: 3000,
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

    return (
        <>
            <Head title="Verify Email" />
            <ToastContainer />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-lg mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                    {/* Card */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
                            Verify Your Email
                        </h1>
                        <p className="text-gray-500 text-sm text-center mb-6">
                            We've sent a 6-digit verification code to
                        </p>
                        <p className="text-orange-600 font-semibold text-center mb-8">
                            {email}
                        </p>

                        {/* Hotel Info */}
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
                            <p className="text-xs text-gray-500 mb-1">Claiming ownership of:</p>
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">{claim.hotel?.name}</p>
                        </div>

                        {/* Code Input */}
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                                {digits.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => inputRefs.current[index] = el}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleDigitChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                    />
                                ))}
                            </div>

                            {errors.code && (
                                <p className="text-red-500 text-sm text-center mb-4">{errors.code}</p>
                            )}

                            <button
                                type="submit"
                                disabled={processing || digits.join('').length !== 6}
                                className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Verifying...' : 'Verify Email'}
                            </button>
                        </form>

                        {/* Resend */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-500 text-sm mb-2">
                                Didn't receive the code?
                            </p>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={processing}
                                className="text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors disabled:text-gray-400"
                            >
                                Resend Code
                            </button>
                        </div>

                        {/* Back Link */}
                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <Link
                                href={route('hotelier.claims.index')}
                                className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                            >
                                ← Back to My Claims
                            </Link>
                        </div>
                    </div>

                    {/* Info Note */}
                    <p className="mt-6 text-center text-xs text-gray-400">
                        The verification code will expire in 30 minutes. If you don't see the email, check your spam folder.
                    </p>
                </div>
            </div>
        </>
    );
}
