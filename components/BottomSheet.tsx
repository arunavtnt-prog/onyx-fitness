import React, { useEffect, useState } from 'react';

interface Action {
    label: string;
    icon: string;
    onClick: () => void;
    destructive?: boolean;
}

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    actions: Action[];
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, actions }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setVisible(false), 300);
            document.body.style.overflow = '';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!visible && !isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Sheet */}
            <div 
                className={`relative w-full max-w-md bg-surface-card rounded-t-3xl border-t border-white/10 p-6 pb-10 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* Handle */}
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6"></div>

                {title && (
                    <h3 className="text-center text-sm font-semibold text-text-dim uppercase tracking-widest mb-6">{title}</h3>
                )}

                <div className="space-y-2">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                action.onClick();
                                onClose();
                            }}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors active:scale-[0.98] ${
                                action.destructive 
                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                                    : 'bg-surface-dark text-white hover:bg-white/5'
                            }`}
                        >
                            <span className="material-symbols-outlined text-2xl">{action.icon}</span>
                            <span className="font-medium">{action.label}</span>
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={onClose}
                    className="w-full mt-4 py-4 text-center text-text-dim hover:text-white font-medium transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default BottomSheet;