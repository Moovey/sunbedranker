import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Header from '@/Components/Header';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [googleRole, setGoogleRole] = useState('user');

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            
            <div className="min-h-screen bg-slate-50/60 font-sans flex flex-col">
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

                        {/* Login Card */}
                        <div className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_24px_48px_-24px_rgba(15,23,42,0.18)] p-8 sm:p-10">
                            <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight leading-[1.1] text-slate-900 text-center mb-8">
                                Log in
                            </h1>

                            {status && (
                                <div className="mb-6 px-4 py-3 bg-emerald-50/60 ring-1 ring-inset ring-emerald-200 rounded-lg text-sm font-semibold text-emerald-700">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2">
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full px-3.5 py-2.5 bg-white ring-1 ring-inset ring-slate-200 hover:ring-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 placeholder-slate-400 transition-shadow duration-150 rounded-lg text-sm"
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="you@example.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    {errors.email && (
                                        <p className="mt-2 text-xs text-rose-600 font-medium">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2">
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            className="w-full px-3.5 py-2.5 pr-11 bg-white ring-1 ring-inset ring-slate-200 hover:ring-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 placeholder-slate-400 transition-shadow duration-150 rounded-lg text-sm"
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    {errors.password && (
                                        <p className="mt-2 text-xs text-rose-600 font-medium">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 text-orange-500 bg-white border border-slate-300 rounded focus:ring-orange-500 focus:ring-2"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-slate-700">
                                        Remember me
                                    </label>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors duration-150"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight rounded-lg shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04] transition-all duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:shadow-sm"
                                    >
                                        {processing ? 'Logging in...' : 'Log in'}
                                    </button>
                                </div>
                            </form>

                            {/* Register Link */}
                            <div className="mt-8 pt-6 border-t border-slate-200/70 text-center">
                                <p className="text-sm text-slate-600">
                                    Don't have an account?{' '}
                                    <Link
                                        href={route('register')}
                                        className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-150 inline-block"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>

                            {/* Social Login Divider */}
                            <div className="mt-6 flex items-center">
                                <div className="flex-1 border-t border-slate-200"></div>
                                <span className="px-4 text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-400">or continue with</span>
                                <div className="flex-1 border-t border-slate-200"></div>
                            </div>

                            {/* Google Login Button */}
                            <div className="mt-6 space-y-4">
                                {/* Role Selection for New Users */}
                                <div className="flex items-center justify-center gap-4">
                                    <span className="text-sm text-slate-500">I am a:</span>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="googleRole"
                                            value="user"
                                            checked={googleRole === 'user'}
                                            onChange={(e) => setGoogleRole(e.target.value)}
                                            className="w-4 h-4 text-orange-500 border-slate-300 focus:ring-orange-500"
                                        />
                                        <span className="ml-2 text-sm text-slate-600">Traveler</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="googleRole"
                                            value="hotelier"
                                            checked={googleRole === 'hotelier'}
                                            onChange={(e) => setGoogleRole(e.target.value)}
                                            className="w-4 h-4 text-orange-500 border-slate-300 focus:ring-orange-500"
                                        />
                                        <span className="ml-2 text-sm text-slate-600">Hotelier</span>
                                    </label>
                                </div>

                                <a
                                    href={route('auth.google', { role: googleRole })}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white ring-1 ring-slate-200 hover:ring-slate-300 hover:bg-slate-50 rounded-lg transition-all duration-200 shadow-sm group"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    <span className="text-slate-700 font-semibold group-hover:text-slate-900">
                                        Continue with Google
                                    </span>
                                </a>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <p className="mt-8 text-center text-xs text-slate-500">
                            By logging in, you agree to our{' '}
                            <Link href="#" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors duration-150">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link href="#" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors duration-150">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
