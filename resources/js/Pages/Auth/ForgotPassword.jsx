import Header from '@/Components/Header';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />
            
            <div className="min-h-screen bg-white font-sans flex flex-col">
                <Header />

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="w-full max-w-md">
                        {/* Decorative accent */}
                        <div className="flex items-center justify-center mb-8">
                            <div className="h-0.5 w-12 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                            <svg className="mx-4 text-orange-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                        </div>

                        {/* Forgot Password Card */}
                        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8 sm:p-10">
                            <h1 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 text-center mb-4">
                                Forgot Password
                            </h1>

                            <p className="text-gray-600 text-sm text-center mb-8">
                                No problem! Just enter your email address and we'll send you a password reset link.
                            </p>

                            {status && (
                                <div className="mb-6 px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg text-sm font-bold text-green-700">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 rounded-lg font-medium"
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="you@example.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600 font-semibold">{errors.email}</p>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                    <Link
                                        href={route('login')}
                                        className="text-blue-600 hover:text-blue-700 font-bold text-sm transition-all duration-300 transform hover:scale-105"
                                    >
                                        Back to Login
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                    >
                                        {processing ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                </div>
                            </form>

                            {/* Register Link */}
                            <div className="mt-8 pt-6 border-t-2 border-gray-200 text-center">
                                <p className="text-sm text-gray-700 font-semibold">
                                    Don't have an account?{' '}
                                    <Link
                                        href={route('register')}
                                        className="text-orange-600 hover:text-orange-700 font-bold transition-all duration-300 transform hover:scale-105 inline-block"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <p className="mt-8 text-center text-xs text-gray-600 font-medium">
                            Remember your password?{' '}
                            <Link href={route('login')} className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300">
                                Log in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
