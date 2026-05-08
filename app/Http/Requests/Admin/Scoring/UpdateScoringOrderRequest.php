<?php

namespace App\Http\Requests\Admin\Scoring;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScoringOrderRequest extends FormRequest
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
            'order'   => ['required', 'array', 'min:1'],
            'order.*' => ['required', 'integer', 'exists:scoring_weights,id'],
        ];
    }
}
