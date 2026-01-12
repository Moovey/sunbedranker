// ============================================
// REUSABLE UI COMPONENTS FOR HOTEL PAGES
// ============================================

import React, { useState } from 'react';
import { Icons } from '../Icons';

// ============================================
// FAQ ITEM COMPONENT
// ============================================
export const FaqItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
            onClick={onClick}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        >
            <span className="font-medium text-gray-900 text-left">{question}</span>
            <Icons.ChevronDown 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
        </button>
        {isOpen && (
            <div className="px-4 py-3 bg-white border-t border-gray-200">
                <p className="text-gray-600">{answer}</p>
            </div>
        )}
    </div>
);

// ============================================
// METRIC CARD COMPONENT
// ============================================
export const MetricCard = ({ icon, label, value, subValue, description, highlight, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
        cyan: 'bg-cyan-50 text-cyan-600',
        pink: 'bg-pink-50 text-pink-600',
        indigo: 'bg-indigo-50 text-indigo-600',
    };

    // Handle both JSX elements and component references
    const renderIcon = () => {
        if (!icon) return null;
        // If icon is a valid React element (JSX), render it directly
        if (React.isValidElement(icon)) return icon;
        // If icon is a component reference, render it as a component
        const Icon = icon;
        return <Icon className="w-5 h-5" />;
    };

    return (
        <div className={`bg-white rounded-lg p-4 border ${highlight ? 'border-green-300 bg-green-50' : 'border-gray-100'} shadow-sm hover:shadow-md transition-shadow`}>
            <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
                {renderIcon()}
            </div>
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-lg font-semibold text-gray-900">{value}</p>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
            {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
        </div>
    );
};

// ============================================
// FEATURE BADGE COMPONENT
// ============================================
export const FeatureBadge = ({ icon, label, text, variant = 'default', color }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        info: 'bg-blue-100 text-blue-700',
        premium: 'bg-purple-100 text-purple-700',
    };

    // Handle both JSX elements and component references
    const renderIcon = () => {
        if (!icon) return null;
        // If icon is a valid React element (JSX), render it directly
        if (React.isValidElement(icon)) return icon;
        // If icon is a component reference, render it as a component
        const Icon = icon;
        return <Icon className="w-4 h-4" />;
    };

    // Use custom color if provided, otherwise use variant
    const badgeClass = color || variants[variant];

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${badgeClass}`}>
            {renderIcon()}
            {label || text}
        </span>
    );
};

// ============================================
// SECTION CARD COMPONENT
// ============================================
export const SectionCard = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        {children}
    </div>
);

// ============================================
// SECTION TITLE COMPONENT
// ============================================
export const SectionTitle = ({ icon, title, subtitle, iconColor = 'text-blue-600', iconBg = 'bg-blue-100' }) => {
    const renderIcon = () => {
        if (!icon) return null;
        if (React.isValidElement(icon)) return icon;
        const Icon = icon;
        return <Icon className={`w-5 h-5 ${iconColor}`} />;
    };

    return (
        <div className="flex items-center gap-3 mb-4">
            {icon && (
                <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
                    {renderIcon()}
                </div>
            )}
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
        </div>
    );
};

// ============================================
// VERIFIED BADGE COMPONENT
// ============================================
export const VerifiedBadge = ({ text = 'Verified' }) => (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
        <Icons.Verified className="w-3 h-3" />
        {text}
    </span>
);

// ============================================
// BOOKING BUTTON COMPONENT
// ============================================
export const BookingButton = ({ href, children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
        success: 'bg-green-600 hover:bg-green-700 text-white',
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-colors ${variants[variant]} ${className}`}
        >
            {children}
        </a>
    );
};

// ============================================
// FEATURE LIST ITEM COMPONENT
// ============================================
export const FeatureListItem = ({ icon, label, value, iconColor = 'text-gray-400' }) => {
    const renderIcon = () => {
        if (!icon) return null;
        if (React.isValidElement(icon)) return icon;
        const Icon = icon;
        return <Icon className={`w-4 h-4 ${iconColor}`} />;
    };

    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-2">
                {renderIcon()}
                <span className="text-gray-600">{label}</span>
            </div>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    );
};

// ============================================
// STAR RATING COMPONENT
// ============================================
export const StarRating = ({ rating, maxRating = 5, size = 'md' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(maxRating)].map((_, index) => (
                <Icons.Star
                    key={index}
                    className={`${sizes[size]} ${
                        index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                />
            ))}
        </div>
    );
};

// ============================================
// FEATURE CARD COMPONENT
// ============================================
export const FeatureCard = ({ icon, title, description, iconBg = 'bg-blue-100', iconColor = 'text-blue-600' }) => {
    const renderIcon = () => {
        if (!icon) return null;
        if (React.isValidElement(icon)) return icon;
        const Icon = icon;
        return <Icon className={`w-4 h-4 ${iconColor}`} />;
    };

    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
            {icon && (
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
                    {renderIcon()}
                </div>
            )}
            <div>
                <h4 className="font-medium text-gray-900">{title}</h4>
                {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
            </div>
        </div>
    );
};

// ============================================
// CHECK FEATURE COMPONENT
// ============================================
export const CheckFeature = ({ label, available = true }) => (
    <div className="flex items-center gap-2">
        {available ? (
            <Icons.Check className="w-4 h-4 text-green-500" />
        ) : (
            <Icons.X className="w-4 h-4 text-red-400" />
        )}
        <span className={available ? 'text-gray-700' : 'text-gray-400'}>{label}</span>
    </div>
);

// ============================================
// PROGRESS BAR COMPONENT
// ============================================
export const ProgressBar = ({ value, max = 100, color = 'blue', showLabel = true }) => {
    const percentage = Math.min((value / max) * 100, 100);
    
    const colors = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500',
    };

    return (
        <div className="w-full">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${colors[color]} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showLabel && (
                <p className="text-xs text-gray-500 mt-1">{Math.round(percentage)}%</p>
            )}
        </div>
    );
};

// ============================================
// TOOLTIP COMPONENT
// ============================================
export const Tooltip = ({ children, content }) => {
    const [show, setShow] = useState(false);
    
    return (
        <div className="relative inline-block">
            <div 
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
            {show && (
                <div className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    {content}
                    <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
                </div>
            )}
        </div>
    );
};

// ============================================
// EMPTY STATE COMPONENT
// ============================================
export const EmptyState = ({ icon, title, description }) => {
    const renderIcon = () => {
        if (!icon) return null;
        if (React.isValidElement(icon)) return icon;
        const Icon = icon;
        return <Icon className="w-6 h-6 text-gray-400" />;
    };

    return (
        <div className="text-center py-8">
            {icon && (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    {renderIcon()}
                </div>
            )}
            <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
            {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
    );
};

// ============================================
// INFO BANNER COMPONENT
// ============================================
export const InfoBanner = ({ icon, title, description, variant = 'info' }) => {
    const variants = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800',
    };

    const renderIcon = () => {
        if (!icon) return null;
        if (React.isValidElement(icon)) return icon;
        const Icon = icon;
        return <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />;
    };

    return (
        <div className={`flex items-start gap-3 p-4 rounded-lg border ${variants[variant]}`}>
            {renderIcon()}
            <div>
                <h4 className="font-medium">{title}</h4>
                {description && <p className="text-sm mt-1 opacity-90">{description}</p>}
            </div>
        </div>
    );
};
