<?php

namespace App\Http\Requests\Admin\Scoring;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScoringVisibilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'metrics'                => ['required', 'array', 'min:1'],
            'metrics.*.id'           => ['required', 'integer', 'exists:scoring_weights,id'],
            'metrics.*.is_active'    => ['required', 'boolean'],
            'metrics.*.is_visible'   => ['required', 'boolean'],
            'metrics.*.is_public'    => ['required', 'boolean'],
        ];
    }
}
