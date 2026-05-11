<?php

namespace App\Http\Requests\Admin\Directory;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates a bulk promotion request from the directory's multi-select UI.
 *
 * The cap of 200 IDs per request is intentional — it keeps a single dispatch
 * within the queue worker's reasonable memory/time budget and prevents
 * accidental "promote 1000 hotels" clicks.
 */
class BulkPromoteSelectedRequest extends FormRequest
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
            'ids'   => ['required', 'array', 'min:1', 'max:200'],
            'ids.*' => ['integer', 'min:1', 'distinct'],
        ];
    }

    public function messages(): array
    {
        return [
            'ids.required' => 'Select at least one hotel to promote.',
            'ids.max'      => 'You can promote up to 200 hotels at a time. Please reduce your selection.',
        ];
    }

    /**
     * @return array<int, int>
     */
    public function ids(): array
    {
        return array_values(array_unique(array_map('intval', $this->validated('ids'))));
    }
}
