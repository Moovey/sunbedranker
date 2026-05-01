import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';;

const compressionOptions = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
};

export default function CreateImagesTab({ data, setData, errors, hotel, onDeleteImage, hotelId, videosRouteName = 'admin.hotels.update-videos', videosRouteParam = null }) {
    // Auto-save the videos array (and any pending uploads) immediately, without
    // requiring the admin to submit the full hotel form. Only available in Edit
    // mode (when hotelId is provided).
    //
    // Strategy: send ONE request per file (with the current full `videos` list
    // each time) so:
    //   - the user sees per-file progress,
    //   - failures are isolated to a single file,
    //   - PHP never has to buffer a giant multi-file request.
    const [savingVideos, setSavingVideos] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    // shape: { current: 1, total: 5, name: 'pool.mp4', percent: 47 }

    // Low-level: POST a single update to the dedicated videos endpoint with
    // optional XHR upload progress callback. Returns a Promise<{success, body}>.
    const postVideoUpdate = (videosList, file = null, onProgress = null) => {
        return new Promise((resolve, reject) => {
            const fd = new FormData();
            (videosList || []).forEach((v) => fd.append('videos[]', v));
            if (file) fd.append('video_files[]', file);

            // Read the live XSRF-TOKEN cookie that Laravel rotates on every
            // response. This avoids the stale meta-tag token problem after
            // session regeneration (e.g. immediately after login). Laravel
            // accepts the encrypted token via the X-XSRF-TOKEN header and
            // decrypts it automatically before CSRF validation.
            const xsrfCookie = document.cookie
                .split('; ')
                .find((row) => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            const xhr = new XMLHttpRequest();
            xhr.open('POST', route(videosRouteName, { hotel: videosRouteParam ?? hotelId }));
            if (xsrfCookie) {
                xhr.setRequestHeader('X-XSRF-TOKEN', decodeURIComponent(xsrfCookie));
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (onProgress && xhr.upload) {
                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        onProgress(Math.round((e.loaded / e.total) * 100));
                    }
                };
            }

            xhr.onload = () => {
                const body = xhr.response || {};
                if (xhr.status >= 200 && xhr.status < 300 && body.success) {
                    resolve({ ok: true, body });
                } else {
                    resolve({ ok: false, body });
                }
            };
            xhr.onerror = () => reject(new Error('Network error'));
            xhr.ontimeout = () => reject(new Error('Timeout'));
            xhr.send(fd);
        });
    };

    const autoSaveVideos = async (nextVideos, nextFiles = []) => {
        if (!hotelId) return; // create page — will be saved on form submit
        setSavingVideos(true);

        try {
            // 1. Sync the URL-only / removed entries first (no files attached).
            //    This is a tiny request and updates the canonical list on the server.
            const initial = await postVideoUpdate(nextVideos);
            if (!initial.ok) {
                toast.error(initial.body?.message || 'Failed to update videos');
                return;
            }
            // Track the canonical list returned by the server — each per-file
            // request must include it so we don't overwrite previous uploads.
            let canonical = initial.body.videos || nextVideos;

            // 2. Upload each file one at a time, with progress.
            const files = Array.from(nextFiles || []);
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setUploadProgress({
                    current: i + 1,
                    total: files.length,
                    name: file.name,
                    percent: 0,
                });
                const res = await postVideoUpdate(canonical, file, (percent) => {
                    setUploadProgress((prev) => prev && { ...prev, percent });
                });
                if (!res.ok) {
                    toast.error(`Failed to upload "${file.name}": ${res.body?.message || 'unknown error'}`);
                    // continue with remaining files anyway
                    continue;
                }
                canonical = res.body.videos || canonical;
            }

            if (files.length > 0) {
                toast.success(`Uploaded ${files.length} video${files.length > 1 ? 's' : ''}`);
            } else {
                toast.success('Videos updated');
            }

            // 3. Re-seed local form with the final canonical list.
            setData((prev) => ({
                ...prev,
                videos: canonical,
                video_files: [],
            }));

            // 4. Reload the hotel prop so resolved URLs / thumbnails refresh.
            router.reload({ only: ['hotel'], preserveScroll: true, preserveState: true });
        } catch (err) {
            toast.error(err.message || 'Failed to update videos');
        } finally {
            setSavingVideos(false);
            setUploadProgress(null);
        }
    };

    const [compressing, setCompressing] = useState(false);

    const handleMainImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setCompressing(true);
            try {
                const compressed = await imageCompression(e.target.files[0], compressionOptions);
                setData('main_image', compressed);
            } catch {
                setData('main_image', e.target.files[0]);
            }
            setCompressing(false);
        }
    };

    const handleGalleryChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setCompressing(true);
            try {
                const files = Array.from(e.target.files);
                const compressed = await Promise.all(
                    files.map(file => imageCompression(file, compressionOptions).catch(() => file))
                );
                setData('gallery_images', [...(data.gallery_images || []), ...compressed]);
            } catch {
                setData('gallery_images', [...(data.gallery_images || []), ...Array.from(e.target.files)]);
            }
            setCompressing(false);
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
    const hasMainImage = data.main_image || (hotel && (hotel.main_image_url || hotel.main_image));
    const getMainImageUrl = () => {
        if (data.main_image) {
            return URL.createObjectURL(data.main_image);
        }
        // Use main_image_url accessor if available (includes full URL for S3/cloud storage)
        if (hotel && hotel.main_image_url) {
            return hotel.main_image_url;
        }
        // Fallback to raw main_image path
        if (hotel && hotel.main_image) {
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
                            className={`px-4 py-2 rounded-lg cursor-pointer inline-block transition-colors ${compressing ? 'bg-neutral-400 cursor-wait' : 'bg-neutral-900 hover:bg-neutral-800'} text-white`}
                        >
                            {compressing ? 'Compressing...' : 'Upload Main Image'}
                        </label>
                        <p className="text-sm text-neutral-500 mt-2">
                            Recommended: 1200x800px. Large images are auto-compressed before upload.
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
                {hotel && ((hotel.gallery_images_urls && hotel.gallery_images_urls.length > 0) || (hotel.images && hotel.images.length > 0)) && (
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-neutral-700 mb-3">Current Gallery Images</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(hotel.gallery_images_urls || hotel.images || []).map((imageUrlOrPath, index) => {
                                // Use gallery_images_urls accessor if available, otherwise fallback to manual URL building
                                const imageUrl = hotel.gallery_images_urls 
                                    ? imageUrlOrPath 
                                    : (imageUrlOrPath.startsWith('http') ? imageUrlOrPath : `/storage/${imageUrlOrPath}`);
                                // Get the raw path for deletion
                                const rawPath = hotel.images?.[index];
                                return (
                                    <div key={`existing-${index}`} className="relative group">
                                        <img
                                            src={imageUrl}
                                            alt={`Gallery image ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg border border-neutral-200"
                                        />
                                        {rawPath && onDeleteImage && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this image?')) {
                                                        onDeleteImage(rawPath);
                                                    }
                                                }}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
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
                        className={`px-4 py-2 rounded-lg cursor-pointer inline-block transition-colors ${compressing ? 'bg-neutral-400 cursor-wait' : 'bg-neutral-900 hover:bg-neutral-800'} text-white`}
                    >
                        {compressing ? 'Compressing images...' : (data.gallery_images && data.gallery_images.length > 0 ? 'Add More Images' : 'Upload Gallery Images')}
                    </label>
                    <p className="text-sm text-neutral-500 mt-2">
                        You can select multiple images at once. Large images are auto-compressed before upload.
                    </p>
                </div>
                {errors.gallery_images && (
                    <p className="text-red-600 text-sm mt-2">{errors.gallery_images}</p>
                )}
            </div>

            {/* Pool Videos (multiple) */}
            <div className="border-t border-neutral-200 pt-8">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Pool Videos</h3>
                <p className="text-sm text-neutral-600 mb-4">
                    Add one or more short video tours of the pool area. Each entry can be a
                    YouTube / Vimeo / TikTok link <strong>or</strong> an uploaded MP4 file (max 100 MB each).
                    Videos appear on the hotel page below the map.
                </p>

                {/* Live upload progress */}
                {uploadProgress && (
                    <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center justify-between text-xs font-medium text-orange-900 mb-1">
                            <span className="truncate pr-2">
                                Uploading {uploadProgress.current} of {uploadProgress.total}: {uploadProgress.name}
                            </span>
                            <span className="flex-shrink-0">{uploadProgress.percent}%</span>
                        </div>
                        <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-orange-600 h-full transition-all duration-150"
                                style={{ width: `${uploadProgress.percent}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Existing saved videos (Edit only) — admin can keep or remove each */}
                {(data.videos || []).length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs font-medium text-neutral-700 mb-2">
                            Saved videos ({data.videos.length}) — click <span className="text-red-600">remove</span> to delete on save:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {data.videos.map((rawEntry, idx) => {
                                // Find the resolved URL for this raw entry (may not exist for newly-added URLs)
                                const resolved = (hotel?.videos_resolved || []).find((v) => v.raw === rawEntry);
                                const previewUrl = resolved?.url || rawEntry;
                                const isYouTube = /youtube\.com|youtu\.be/.test(previewUrl);
                                const isTikTok = /tiktok\.com/.test(previewUrl);
                                const isNative = /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(previewUrl);
                                const ytId = isYouTube ? (previewUrl.match(/(?:v=|youtu\.be\/|embed\/)([^&?\/\s]{11})/)?.[1]) : null;

                                return (
                                    <div key={`saved-${idx}`} className="relative rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50">
                                        {/* Preview */}
                                        <div className="aspect-video bg-black flex items-center justify-center">
                                            {isYouTube && ytId ? (
                                                <img
                                                    src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                                                    alt="Video thumbnail"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : isNative ? (
                                                <video
                                                    src={previewUrl}
                                                    controls
                                                    preload="metadata"
                                                    className="w-full h-full"
                                                />
                                            ) : (
                                                <div className="text-white/80 text-center p-4">
                                                    <svg className="w-10 h-10 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                    <span className="text-xs">{isTikTok ? 'TikTok video' : 'Video link'}</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Footer */}
                                        <div className="p-2 flex items-center gap-2">
                                            <a
                                                href={previewUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-xs text-blue-700 hover:underline truncate min-w-0"
                                                title={rawEntry}
                                            >
                                                {rawEntry}
                                            </a>
                                            <button
                                                type="button"
                                                disabled={savingVideos}
                                                onClick={() => {
                                                    if (!confirm('Remove this video' + (hotelId ? ' immediately' : ' on save') + '? This cannot be undone.')) return;
                                                    const next = [...data.videos];
                                                    next.splice(idx, 1);
                                                    setData('videos', next);
                                                    autoSaveVideos(next, data.video_files);
                                                }}
                                                className="px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                                            >
                                                {savingVideos ? 'Saving…' : 'Remove'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Add a new video by URL */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Add a video by URL
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="url"
                            value={data._video_url_draft || ''}
                            onChange={(e) => setData('_video_url_draft', e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        />
                        <button
                            type="button"
                            disabled={savingVideos}
                            onClick={() => {
                                const v = (data._video_url_draft || '').trim();
                                if (!v) return;
                                if (!/^https?:\/\//i.test(v)) {
                                    alert('Please enter a valid URL starting with http:// or https://');
                                    return;
                                }
                                if ((data.videos || []).length >= 10) {
                                    alert('Maximum 10 videos.');
                                    return;
                                }
                                const nextVideos = [...(data.videos || []), v];
                                setData((prev) => ({
                                    ...prev,
                                    videos: nextVideos,
                                    _video_url_draft: '',
                                }));
                                autoSaveVideos(nextVideos, data.video_files);
                            }}
                            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-sm font-medium whitespace-nowrap disabled:opacity-50"
                        >
                            {savingVideos ? 'Saving…' : 'Add URL'}
                        </button>
                    </div>
                </div>

                <div className="text-center text-xs text-neutral-500 my-3">— OR —</div>

                {/* Add new videos by file upload */}
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Upload video files (MP4 / MOV / WebM, max 100 MB each)
                    </label>

                    {(data.video_files || []).length > 0 && (
                        <div className="mb-3 space-y-2">
                            {data.video_files.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-neutral-900 truncate">{file.name}</p>
                                        <p className="text-xs text-neutral-500">{(file.size / 1024 / 1024).toFixed(1)} MB · pending upload</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const next = [...data.video_files];
                                            next.splice(idx, 1);
                                            setData('video_files', next);
                                        }}
                                        className="text-red-600 hover:text-red-700 p-1"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <input
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm"
                        multiple
                        onChange={(e) => {
                            const newFiles = Array.from(e.target.files || []);
                            if (newFiles.length === 0) return;

                            const oversized = newFiles.find((f) => f.size > 100 * 1024 * 1024);
                            if (oversized) {
                                alert(`"${oversized.name}" is larger than 100 MB.`);
                                e.target.value = '';
                                return;
                            }

                            const totalAfter = (data.videos || []).length + (data.video_files || []).length + newFiles.length;
                            if (totalAfter > 10) {
                                alert('Maximum 10 videos total.');
                                e.target.value = '';
                                return;
                            }

                            const nextFiles = [...(data.video_files || []), ...newFiles];
                            setData('video_files', nextFiles);
                            e.target.value = '';

                            // Auto-upload immediately on Edit
                            if (hotelId) {
                                autoSaveVideos(data.videos || [], nextFiles);
                            }
                        }}
                        className="hidden"
                        id="video-upload"
                        disabled={savingVideos}
                    />
                    <label
                        htmlFor="video-upload"
                        className={`px-4 py-2 rounded-lg cursor-pointer inline-block transition-colors text-white text-sm font-medium ${savingVideos ? 'bg-neutral-400 cursor-not-allowed' : 'bg-neutral-900 hover:bg-neutral-800'}`}
                    >
                        {savingVideos ? 'Uploading…' : 'Choose Video Files'}
                    </label>
                    <p className="text-xs text-neutral-500 mt-2">
                        Recommended: MP4 (H.264), 1080p. iPhone .mov files are also accepted.
                    </p>

                    {errors['video_files'] && (
                        <p className="text-red-600 text-sm mt-1">{errors['video_files']}</p>
                    )}
                    {Object.keys(errors).filter(k => k.startsWith('video_files.')).map(k => (
                        <p key={k} className="text-red-600 text-sm mt-1">{errors[k]}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
