export default function CreateImagesTab({ data, setData, errors, hotel }) {
    const handleMainImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setData('main_image', e.target.files[0]);
        }
    };

    const handleGalleryChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('gallery_images', Array.from(e.target.files));
        }
    };

    const removeMainImage = () => {
        setData('main_image', null);
    };

    const removeGalleryImage = (index) => {
        const updatedGallery = data.gallery_images.filter((_, i) => i !== index);
        setData('gallery_images', updatedGallery);
    };

    // Check if we have a new uploaded image or an existing one
    const hasMainImage = data.main_image || (hotel && hotel.main_image);
    const getMainImageUrl = () => {
        if (data.main_image) {
            return URL.createObjectURL(data.main_image);
        }
        if (hotel && hotel.main_image) {
            // Handle both full URLs and storage paths
            return hotel.main_image.startsWith('http') ? hotel.main_image : `/storage/${hotel.main_image}`;
        }
        return null;
    };
    const mainImageUrl = getMainImageUrl();

    return (
        <div className="space-y-8">
            {/* Main Image */}
            <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Main Image</h3>
                <p className="text-sm text-neutral-600 mb-4">
                    Upload the primary image for this hotel. This will be displayed as the main photo.
                </p>
                
                {hasMainImage ? (
                    <div className="flex items-start gap-6">
                        <div className="relative">
                            <img
                                src={mainImageUrl}
                                alt="Main preview"
                                className="w-64 h-40 object-cover rounded-lg border border-neutral-200"
                            />
                            {data.main_image && (
                                <button
                                    type="button"
                                    onClick={removeMainImage}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="flex-1">
                            {data.main_image ? (
                                <>
                                    <p className="text-sm text-neutral-700 font-medium mb-1">
                                        {data.main_image.name}
                                    </p>
                                    <p className="text-sm text-neutral-500">
                                        {(data.main_image.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </>
                            ) : (
                                <p className="text-sm text-neutral-700">
                                    Current main image
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageChange}
                            className="hidden"
                            id="main-image-upload"
                        />
                        <label
                            htmlFor="main-image-upload"
                            className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer inline-block transition-colors"
                        >
                            Upload Main Image
                        </label>
                        <p className="text-sm text-neutral-500 mt-2">
                            Recommended: 1200x800px, max 5MB
                        </p>
                    </div>
                )}
                {errors.main_image && (
                    <p className="text-red-600 text-sm mt-2">{errors.main_image}</p>
                )}
            </div>

            {/* Gallery Images */}
            <div className="border-t border-neutral-200 pt-8">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Image Gallery</h3>
                <p className="text-sm text-neutral-600 mb-4">
                    Upload additional images to showcase the hotel's amenities, pools, and facilities.
                </p>

                {/* Existing Hotel Gallery Images */}
                {hotel && hotel.images && hotel.images.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-neutral-700 mb-3">Current Gallery Images</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {hotel.images.map((imagePath, index) => {
                                // Handle both full URLs and storage paths
                                const imageUrl = imagePath.startsWith('http') ? imagePath : `/storage/${imagePath}`;
                                return (
                                    <div key={`existing-${index}`} className="relative group">
                                        <img
                                            src={imageUrl}
                                            alt={`Gallery image ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg border border-neutral-200"
                                        />
                                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                            {index + 1}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* New Gallery Images to Upload */}
                {data.gallery_images && data.gallery_images.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-neutral-700 mb-3">New Images to Upload</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {data.gallery_images.map((image, index) => (
                                <div key={`new-${index}`} className="relative group">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Gallery preview ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-lg border border-neutral-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeGalleryImage(index)}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                        New {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryChange}
                        className="hidden"
                        id="gallery-upload"
                    />
                    <label
                        htmlFor="gallery-upload"
                        className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer inline-block transition-colors"
                    >
                        {data.gallery_images && data.gallery_images.length > 0 ? 'Add More Images' : 'Upload Gallery Images'}
                    </label>
                    <p className="text-sm text-neutral-500 mt-2">
                        You can select multiple images at once. Recommended: 1200x800px each, max 5MB per image
                    </p>
                </div>
                {errors.gallery_images && (
                    <p className="text-red-600 text-sm mt-2">{errors.gallery_images}</p>
                )}
            </div>
        </div>
    );
}
