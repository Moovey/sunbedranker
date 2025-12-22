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
            
            <div className="min-h-screen bg-neutral-50 font-sans-luxury flex flex-col">
                {/* Header Navigation */}
                <nav className="bg-white border-b border-neutral-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center flex-shrink-0">
                                <span className="text-xl sm:text-2xl font-bold">
                                    <span className="text-red-500">sun</span>
                                    <span className="text-orange-500">bed</span>
                                    <span className="text-blue-500">ranker</span>
                                </span>
                            </Link>

                            {/* Back to Home */}
                            <Link
                                href="/"
                                className="text-sm text-neutral-600 hover:text-neutral-900 font-light transition-colors duration-300"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="w-full max-w-md">
                        {/* Decorative accent */}
                        <div className="flex items-center justify-center mb-8">
                            <div className="h-px w-12 bg-neutral-300"></div>
                            <svg className="mx-4 text-neutral-400" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L11.5 8.5L18 10L11.5 11.5L10 18L8.5 11.5L2 10L8.5 8.5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            <div className="h-px w-12 bg-neutral-300"></div>
                        </div>

                        {/* Login Card */}
                        <div className="bg-white rounded-xl shadow-2xl border border-neutral-100 p-8 sm:p-10">
                            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-neutral-900 text-center tracking-tight mb-8">
                                Log in
                            </h1>

                            {status && (
                                <div className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-light text-emerald-800">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full px-4 py-3 border-b-2 border-neutral-200 focus:border-neutral-900 outline-none text-neutral-900 placeholder-neutral-400 transition-all duration-300 bg-transparent font-light"
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="you@example.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600 font-light">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                                        Password
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full px-4 py-3 border-b-2 border-neutral-200 focus:border-neutral-900 outline-none text-neutral-900 placeholder-neutral-400 transition-all duration-300 bg-transparent font-light"
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 font-light">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 text-neutral-900 bg-neutral-100 border-neutral-300 rounded focus:ring-neutral-900 focus:ring-2"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-neutral-600 font-light">
                                        Remember me
                                    </label>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-neutral-600 hover:text-neutral-900 font-light tracking-[0.1em] uppercase text-xs transition-colors duration-400 border-b border-neutral-300 hover:border-neutral-900 pb-1"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto px-8 py-3 bg-neutral-900 text-white font-light rounded-lg hover:bg-neutral-800 transition-all duration-300 tracking-wide hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {processing ? 'Logging in...' : 'Log in'}
                                    </button>
                                </div>
                            </form>

                            {/* Register Link */}
                            <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
                                <p className="text-sm text-neutral-600 font-light">
                                    Don't have an account?{' '}
                                    <Link
                                        href={route('register')}
                                        className="text-neutral-900 hover:text-neutral-700 font-normal tracking-wide transition-colors duration-300 border-b border-neutral-900 hover:border-neutral-700"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <p className="mt-8 text-center text-xs text-neutral-500 font-light">
                            By logging in, you agree to our{' '}
                            <Link href="#" className="text-neutral-700 hover:text-neutral-900 transition-colors duration-300">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link href="#" className="text-neutral-700 hover:text-neutral-900 transition-colors duration-300">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
