import Header from '@/Components/Header';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset Password" />
            
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

                        {/* Reset Password Card */}
                        <div className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_24px_48px_-24px_rgba(15,23,42,0.18)] p-8 sm:p-10">
                            <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight leading-[1.1] text-slate-900 text-center mb-3">
                                Reset Password
                            </h1>

                            <p className="text-slate-600 text-sm text-center mb-8">
                                Enter your new password below.
                            </p>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Hidden email field for accessibility */}
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="sr-only"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                />

                                <div>
                                    <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2">
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email_display"
                                        value={data.email}
                                        className="w-full px-3.5 py-2.5 ring-1 ring-inset ring-slate-200 bg-slate-50 text-slate-600 rounded-lg text-sm cursor-not-allowed"
                                        autoComplete="username"
                                        readOnly
                                    />

                                    {errors.email && (
                                        <p className="mt-2 text-xs text-rose-600 font-medium">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2">
                                        New Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            className="w-full px-3.5 py-2.5 pr-11 bg-white ring-1 ring-inset ring-slate-200 hover:ring-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 placeholder-slate-400 transition-shadow duration-150 rounded-lg text-sm"
                                            autoComplete="new-password"
                                            autoFocus
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

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2">
                                        Confirm New Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="password_confirmation"
                                            type={showPasswordConfirmation ? "text" : "password"}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="w-full px-3.5 py-2.5 pr-11 bg-white ring-1 ring-inset ring-slate-200 hover:ring-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 placeholder-slate-400 transition-shadow duration-150 rounded-lg text-sm"
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150"
                                        >
                                            {showPasswordConfirmation ? (
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

                                    {errors.password_confirmation && (
                                        <p className="mt-2 text-xs text-rose-600 font-medium">{errors.password_confirmation}</p>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight rounded-lg shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04] transition-all duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:shadow-sm"
                                    >
                                        {processing ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </div>
                            </form>

                            {/* Login Link */}
                            <div className="mt-8 pt-6 border-t border-slate-200/70 text-center">
                                <p className="text-sm text-slate-600">
                                    Remember your password?{' '}
                                    <Link
                                        href={route('login')}
                                        className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-150 inline-block"
                                    >
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <p className="mt-8 text-center text-xs text-slate-500">
                            Need help?{' '}
                            <Link href="/" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors duration-150">
                                Contact Support
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
