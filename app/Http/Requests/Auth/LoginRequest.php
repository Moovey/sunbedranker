<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());
            // Also hit the IP-only limiter so an attacker rotating emails still gets blocked
            RateLimiter::hit('login-ip:'.$this->ip(), 60);

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
        RateLimiter::clear('login-ip:'.$this->ip());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * Two limiters in parallel:
     *  - per email+IP (5 attempts / minute) — blocks credential stuffing on a single account
     *  - per IP only  (30 attempts / minute) — blocks attackers rotating emails to bypass the first limiter
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        $ipKey = 'login-ip:'.$this->ip();

        foreach ([[$this->throttleKey(), 5], [$ipKey, 30]] as [$key, $max]) {
            if (RateLimiter::tooManyAttempts($key, $max)) {
                event(new Lockout($this));
                $seconds = RateLimiter::availableIn($key);
                throw ValidationException::withMessages([
                    'email' => trans('auth.throttle', [
                        'seconds' => $seconds,
                        'minutes' => ceil($seconds / 60),
                    ]),
                ]);
            }
        }
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }
}
