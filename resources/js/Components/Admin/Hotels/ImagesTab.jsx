export default function ImagesTab({ 
    hotel, 
    uploadingMain, 
    uploadingGallery, 
    handleMainImageUpload, 
    handleGalleryUpload, 
    deleteGalleryImage 
}) {
    return (
        <div className="space-y-8">
            {/* Main Image */}
            <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Main Image</h3>
                <div className="flex items-start gap-6">
                    {hotel.main_image_url && (
                        <img
                            src={hotel.main_image_url}
                            alt={hotel.name}
                            className="w-64 h-40 object-cover rounded-lg"
                        />
                    )}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageUpload}
                            className="hidden"
                            id="main-image-upload"
                            disabled={uploadingMain}
                        />
                        <label
                            htmlFor="main-image-upload"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
                        >
                            {uploadingMain ? 'Uploading...' : 'Upload Main Image'}
                        </label>
                        <p className="text-sm text-neutral-500 mt-2">
                            Recommended: 1200x800px, max 5MB
                        </p>
                    </div>
                </div>
            </div>

            {/* Gallery Images */}
            <div className="border-t border-neutral-200 pt-8">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Image Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {hotel.gallery_images_urls?.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={imageUrl}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => deleteGalleryImage(hotel.images[index])}
                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                    id="gallery-upload"
                    disabled={uploadingGallery}
                />
                <label
                    htmlFor="gallery-upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
                >
                    {uploadingGallery ? 'Uploading...' : 'Add Gallery Images'}
                </label>
            </div>
        </div>
    );
}
