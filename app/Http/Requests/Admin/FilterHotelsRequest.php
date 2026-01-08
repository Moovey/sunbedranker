<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Form Request for filtering hotels in admin panel.
 */
class FilterHotelsRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'destination_id' => ['nullable', 'integer', 'exists:destinations,id'],
            'status' => ['nullable', 'string', 'in:active,inactive'],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:100'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'destination_id' => 'destination',
            'per_page' => 'items per page',
        ];
    }

    /**
     * Get the filters from the request.
     */
    public function filters(): array
    {
        return $this->only(['search', 'destination_id', 'status']);
    }

    /**
     * Get search term.
     */
    public function searchTerm(): ?string
    {
        return $this->validated('search');
    }

    /**
     * Get destination ID filter.
     */
    public function destinationId(): ?int
    {
        $id = $this->validated('destination_id');
        return $id ? (int) $id : null;
    }

    /**
     * Get status filter.
     */
    public function status(): ?string
    {
        return $this->validated('status');
    }

    /**
     * Get items per page.
     */
    public function perPage(): int
    {
        return (int) ($this->validated('per_page') ?? 10);
    }
}
