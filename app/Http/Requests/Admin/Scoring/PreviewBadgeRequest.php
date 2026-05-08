<?php

namespace App\Http\Requests\Admin\Scoring;

use App\Services\BadgeCriteriaService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PreviewBadgeRequest extends FormRequest
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
            'criteria'            => ['required', 'array', 'min:1'],
            'criteria.*.field'    => ['required', 'string', Rule::in(BadgeCriteriaService::allowedFields())],
            'criteria.*.operator' => ['required', Rule::in(BadgeCriteriaService::ALLOWED_OPERATORS)],
            'criteria.*.value'    => ['required'],
        ];
    }
}
