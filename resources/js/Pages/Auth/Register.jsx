import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <Head title="Register" />
            
            {/* Navigation Header */}
            <nav className="bg-white border-b-2 border-orange-200 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl sm:text-2xl font-black">
                                <span className="text-red-500">sun</span>
                                <span className="text-orange-500">bed</span>
                                <span className="text-blue-500">ranker</span>
                            </span>
                        </Link>
                        <Link
                            href="/"
                            className="text-sm text-orange-600 hover:text-orange-700 font-bold transition-all duration-300 flex items-center gap-1 transform hover:scale-105"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    {/* Decorative Accent */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="h-0.5 w-12 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                        <svg className="mx-4 text-orange-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    </div>

                    {/* Register Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-gray-100">
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-8">
                            Create Account
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                                    NAME
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoComplete="name"
                                    autoFocus
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 rounded-lg font-medium"
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600 font-semibold">{errors.name}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                    EMAIL
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="username"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 rounded-lg font-medium"
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 font-semibold">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                                    PASSWORD
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 rounded-lg font-medium"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 font-semibold">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-bold text-gray-700 mb-2">
                                    CONFIRM PASSWORD
                                </label>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 rounded-lg font-medium"
                                    placeholder="••••••••"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600 font-semibold">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                                <Link
                                    href={route('login')}
                                    className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
                                >
                                    ALREADY REGISTERED?
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    {processing ? 'Creating Account...' : 'Register'}
                                </button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <div className="mt-8 pt-6 border-t-2 border-gray-200 text-center">
                            <p className="text-sm font-semibold text-gray-700">
                                Already have an account?{' '}
                                <Link
                                    href={route('login')}
                                    className="text-orange-600 hover:text-orange-700 font-bold transition-all duration-300 transform hover:scale-105 inline-block"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 text-center">
                        <p className="text-xs font-medium text-gray-600">
                            By registering, you agree to our{' '}
                            <Link href="#" className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link href="#" className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
