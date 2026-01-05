import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            
            <div className="min-h-screen bg-white font-sans flex flex-col">
                {/* Header Navigation */}
                <nav className="bg-white border-b-2 border-orange-200 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center flex-shrink-0">
                                <span className="text-xl sm:text-2xl font-black">
                                    <span className="text-red-500">sun</span>
                                    <span className="text-orange-500">bed</span>
                                    <span className="text-blue-500">ranker</span>
                                </span>
                            </Link>

                            {/* Back to Home */}
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

                        {/* Login Card */}
                        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8 sm:p-10">
                            <h1 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 text-center mb-8">
                                Log in
                            </h1>

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

                                <div>
                                    <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                                        Password
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 rounded-lg font-medium"
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 font-semibold">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 text-orange-500 bg-white border-2 border-orange-300 rounded focus:ring-orange-500 focus:ring-2"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700 font-semibold">
                                        Remember me
                                    </label>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-blue-600 hover:text-blue-700 font-bold text-sm transition-all duration-300 transform hover:scale-105"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                    >
                                        {processing ? 'Logging in...' : 'Log in'}
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
                            By logging in, you agree to our{' '}
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
        </>
    );
}
