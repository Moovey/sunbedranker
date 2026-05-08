<?php

namespace App\Http\Requests\Admin\Scoring;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScoringWeightsRequest extends FormRequest
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
            'weights'                  => ['required', 'array', 'min:1'],
            'weights.*.id'             => ['required', 'integer', 'exists:scoring_weights,id'],
            'weights.*.weight'         => ['required', 'numeric', 'min:0', 'max:5'],
            'weights.*.family_weight'  => ['required', 'numeric', 'min:0', 'max:5'],
            'weights.*.quiet_weight'   => ['required', 'numeric', 'min:0', 'max:5'],
            'weights.*.party_weight'   => ['required', 'numeric', 'min:0', 'max:5'],
        ];
    }
}
