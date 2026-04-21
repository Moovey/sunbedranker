export default function PromoBanner() {
    return (
        <div className="bg-gradient-to-r from-orange-600 via-orange-600 to-orange-700 text-white py-2.5 px-4 text-center relative overflow-hidden" role="banner" aria-label="Promotional offer">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
            <p className="relative text-sm sm:text-base font-semibold tracking-tight flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span>SPECIAL OFFER: Book now and get exclusive pool access! Limited time only. T&amp;Cs apply.</span>
            </p>
        </div>
    );
}
