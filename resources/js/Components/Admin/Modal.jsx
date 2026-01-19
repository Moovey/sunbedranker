// Modal Component
// Reusable modal dialog wrapper

import { CloseIcon } from './Icons';

export default function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button 
                        onClick={onClose} 
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
