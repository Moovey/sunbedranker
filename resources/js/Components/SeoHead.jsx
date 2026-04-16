import { Head } from '@inertiajs/react';
import { useAppUrl } from '@/hooks/useAppUrl';

/**
 * Reusable SEO Head component providing consistent meta tags across all pages.
 * 
 * @param {string} title - Page title (appended with " - Sunbed Ranker")
 * @param {string} description - Meta description (max ~160 chars)
 * @param {string} path - URL path (e.g., "/about", "/hotels/some-slug")
 * @param {string} [image] - OG image URL (defaults to /images/og-default.jpg)
 * @param {string} [type] - OG type (default: "website")
 * @param {object} [schema] - JSON-LD structured data object
 * @param {boolean} [noindex] - Set true for pages that shouldn't be indexed
 * @param {React.ReactNode} [children] - Additional head elements
 */
export default function SeoHead({ title, description, path, image, type = 'website', schema, noindex = false, prev, next, children }) {
    const appUrl = useAppUrl();
    const fullUrl = `${appUrl}${path}`;
    const ogImage = image || `${appUrl}/images/og-default.jpg`;

    return (
        <Head title={title}>
            <meta name="description" content={description} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            
            {/* Open Graph */}
            <meta property="og:title" content={`${title} | Sunbed Ranker`} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="Sunbed Ranker" />
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${title} | Sunbed Ranker`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            
            {/* Canonical */}
            <link rel="canonical" href={fullUrl} />
            
            {/* Pagination */}
            {prev && <link rel="prev" href={prev} />}
            {next && <link rel="next" href={next} />}
            
            {/* JSON-LD Structured Data */}
            {schema && (
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            )}
            
            {children}
        </Head>
    );
}
