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
        <div className="min-h-screen bg-neutral-50">
            <Head title="Register" />
            
            {/* Navigation Header */}
            <nav className="bg-white border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                                SunbedRanker
                            </span>
                        </Link>
                        <Link
                            href="/"
                            className="text-sm font-light text-neutral-600 hover:text-neutral-900 transition-colors duration-300"
                        >
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
                        <div className="h-px w-12 bg-neutral-200"></div>
                        <svg className="w-5 h-5 mx-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="h-px w-12 bg-neutral-200"></div>
                    </div>

                    {/* Register Card */}
                    <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
                        <h2 className="text-3xl sm:text-4xl font-serif-luxury text-neutral-900 text-center mb-8">
                            Create Account
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-light text-neutral-700 tracking-wide mb-2">
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
                                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-neutral-200 focus:border-neutral-900 focus:ring-0 text-neutral-900 placeholder-neutral-400 transition-colors duration-300"
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600 font-light">{errors.name}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-light text-neutral-700 tracking-wide mb-2">
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
                                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-neutral-200 focus:border-neutral-900 focus:ring-0 text-neutral-900 placeholder-neutral-400 transition-colors duration-300"
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 font-light">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-light text-neutral-700 tracking-wide mb-2">
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
                                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-neutral-200 focus:border-neutral-900 focus:ring-0 text-neutral-900 placeholder-neutral-400 transition-colors duration-300"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 font-light">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-light text-neutral-700 tracking-wide mb-2">
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
                                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-neutral-200 focus:border-neutral-900 focus:ring-0 text-neutral-900 placeholder-neutral-400 transition-colors duration-300"
                                    placeholder="••••••••"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600 font-light">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                                <Link
                                    href={route('login')}
                                    className="text-sm font-light text-neutral-600 hover:text-neutral-900 tracking-wide border-b border-transparent hover:border-neutral-900 transition-all duration-300"
                                >
                                    ALREADY REGISTERED?
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto px-8 py-3 bg-neutral-900 text-white font-light tracking-wide rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    {processing ? 'Creating Account...' : 'Register'}
                                </button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
                            <p className="text-sm font-light text-neutral-600">
                                Already have an account?{' '}
                                <Link
                                    href={route('login')}
                                    className="text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 transition-colors duration-300"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 text-center">
                        <p className="text-xs font-light text-neutral-500">
                            By registering, you agree to our{' '}
                            <Link href="#" className="text-neutral-700 hover:text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 transition-colors duration-300">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link href="#" className="text-neutral-700 hover:text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 transition-colors duration-300">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
