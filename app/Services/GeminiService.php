<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Thin wrapper around the Google Gemini REST API for SEO content generation.
 *
 * - If GEMINI_API_KEY is not set, generate() returns null (no-op fallback).
 *   Callers must handle null gracefully so the system stays functional in
 *   local/dev where no key is provisioned yet.
 * - On API failure, returns null and logs a warning. Jobs decide how to retry.
 */
class GeminiService
{
    public function isConfigured(): bool
    {
        return !empty(config('services.gemini.api_key'));
    }

    public function model(): string
    {
        return config('services.gemini.model', 'gemini-flash-latest');
    }

    /**
     * Send a prompt expecting a JSON object back. Returns the decoded array
     * or null if generation failed / not configured.
     *
     * @param  string  $systemInstruction  Persona / role for the model.
     * @param  string  $userPrompt         Concrete task + structured input.
     * @return array<string,mixed>|null
     */
    public function generateJson(string $systemInstruction, string $userPrompt): ?array
    {
        if (!$this->isConfigured()) {
            Log::info('GeminiService: skipped (no API key configured)');
            return null;
        }

        $endpoint = sprintf(
            'https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s',
            urlencode($this->model()),
            urlencode(config('services.gemini.api_key')),
        );

        $payload = [
            'systemInstruction' => [
                'parts' => [['text' => $systemInstruction]],
            ],
            'contents' => [[
                'role'  => 'user',
                'parts' => [['text' => $userPrompt]],
            ]],
            'generationConfig' => [
                'responseMimeType' => 'application/json',
                'temperature'      => 0.7,
                'maxOutputTokens'  => 2048,
            ],
        ];

        try {
            $response = Http::timeout(60)
                ->retry(2, 500, throw: false)
                ->post($endpoint, $payload);
        } catch (ConnectionException $e) {
            Log::warning('GeminiService: connection failed', ['error' => $e->getMessage()]);
            return null;
        }

        if (!$response->successful()) {
            Log::warning('GeminiService: non-200 response', [
                'status' => $response->status(),
                'body'   => substr((string) $response->body(), 0, 500),
            ]);
            return null;
        }

        $text = data_get($response->json(), 'candidates.0.content.parts.0.text');
        if (!is_string($text) || $text === '') {
            return null;
        }

        $decoded = json_decode($text, true);
        return is_array($decoded) ? $decoded : null;
    }
}
