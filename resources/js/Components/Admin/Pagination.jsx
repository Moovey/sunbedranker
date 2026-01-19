// Pagination Component
// Table pagination with page links

import { Link } from '@inertiajs/react';

export default function Pagination({ links, from, to, total }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="bg-white px-6 py-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-900">{from}</span> to{' '}
                    <span className="font-medium text-gray-900">{to}</span> of{' '}
                    <span className="font-medium text-gray-900">{total}</span> results
                </div>
                <div className="flex gap-1 flex-wrap justify-center">
                    {links.map((link, index) => (
                        link.url ? (
                            <Link
                                key={index}
                                href={link.url}
                                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                                    link.active
                                        ? 'bg-orange-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                key={index}
                                className="px-3 py-1.5 text-sm text-gray-400"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
