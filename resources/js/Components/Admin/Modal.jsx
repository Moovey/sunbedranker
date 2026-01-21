// Modal Component
// Reusable modal dialog wrapper

import { CloseIcon } from './Icons';

export default function Modal({ show, title, children, onClose, maxWidth = 'md' }) {
    if (!show) return null;

    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className={`bg-white rounded-xl shadow-xl w-full ${maxWidthClasses[maxWidth] || maxWidthClasses.md} max-h-[90vh] overflow-y-auto`}>
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
                    <button 
                        onClick={onClose} 
                        className="p-1.5 sm:p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-3 sm:p-4 md:p-5">
                    {children}
                </div>
            </div>
        </div>
    );
}
