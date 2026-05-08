<?php

namespace App\Http\Requests\Admin\Scoring;

use App\Services\BadgeCriteriaService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BadgeRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Route already protected by 'auth' + 'admin' middleware.
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name'              => ['required', 'string', 'max:255'],
            'description'       => ['nullable', 'string', 'max:500'],
            'icon'              => ['nullable', 'string', 'max:50'],
            'color'             => ['required', 'string', 'max:20'],
            'criteria'          => ['required', 'array', 'min:1'],
            'criteria.*.field'  => ['required', 'string', Rule::in(BadgeCriteriaService::allowedFields())],
            'criteria.*.operator' => ['required', Rule::in(BadgeCriteriaService::ALLOWED_OPERATORS)],
            'criteria.*.value'  => ['required'],
            'priority'          => ['required', 'integer', 'min:0', 'max:100'],
            'is_active'         => ['sometimes', 'boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'criteria.*.field.in' => 'The selected criterion field is not allowed.',
            'criteria.*.operator.in' => 'The comparison operator is not allowed.',
        ];
    }
}
