<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DestinationManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Destination::withCount('activeHotels')
            ->orderBy('country')
            ->orderBy('name');

        // Search filter
        if ($request->filled('search')) {
            $search = str_replace(['%', '_'], ['\%', '\_'], $request->search);
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%")
                  ->orWhere('region', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        // Featured filter
        if ($request->filled('featured')) {
            $query->where('is_featured', $request->featured === 'yes');
        }

        $destinations = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Destinations/Index', [
            'destinations' => $destinations,
            'filters' => $request->only(['search', 'status', 'featured']),
        ]);
    }

    public function edit(Destination $destination): Response
    {
        $destination->loadCount('activeHotels');

        return Inertia::render('Admin/Destinations/Edit', [
            'destination' => $destination,
        ]);
    }

    public function update(Request $request, Destination $destination): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('destinations')->ignore($destination->id)],
            'country' => ['required', 'string', 'max:255'],
            'country_code' => ['required', 'string', 'size:2'],
            'region' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'image' => ['nullable', 'image', 'max:5120'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'agoda_city_id' => ['nullable', 'integer', 'min:1'],
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if it exists and is not external
            if ($destination->image && !str_starts_with($destination->image, 'http')) {
                $disk = config('filesystems.public_uploads', 'public');
                Storage::disk($disk)->delete($destination->image);
            }
            $disk = config('filesystems.public_uploads', 'public');
            $validated['image'] = $request->file('image')->store('destinations', $disk);
        } else {
            unset($validated['image']);
        }

        $destination->update($validated);
        $destination->updateHotelCount();

        $this->clearHomeCache();

        return redirect()->route('admin.destinations.index')
            ->with('success', "Destination \"{$destination->name}\" updated successfully.");
    }

    public function toggleActive(Destination $destination): \Illuminate\Http\RedirectResponse
    {
        $destination->update(['is_active' => !$destination->is_active]);

        $this->clearHomeCache();

        $status = $destination->is_active ? 'activated' : 'deactivated';

        return back()->with('success', "Destination \"{$destination->name}\" has been {$status}.");
    }

    public function toggleFeatured(Destination $destination): \Illuminate\Http\RedirectResponse
    {
        $destination->update(['is_featured' => !$destination->is_featured]);

        $this->clearHomeCache();

        $status = $destination->is_featured ? 'featured' : 'unfeatured';

        return back()->with('success', "Destination \"{$destination->name}\" has been {$status}.");
    }

    public function destroy(Destination $destination): \Illuminate\Http\RedirectResponse
    {
        $hotelCount = $destination->activeHotels()->count();

        if ($hotelCount > 0) {
            return back()->with('error', "Cannot delete \"{$destination->name}\" — it has {$hotelCount} active hotel(s). Deactivate them first.");
        }

        $name = $destination->name;
        $destination->delete();

        $this->clearHomeCache();

        return redirect()->route('admin.destinations.index')
            ->with('success', "Destination \"{$name}\" has been deleted.");
    }

    /**
     * Clear homepage destination cache so changes appear immediately.
     */
    private function clearHomeCache(): void
    {
        Cache::forget('home:featured-destinations');
    }
}
