import React from 'react';
import { Page } from '../types';
import { useAuth } from '../src/context/AuthContext';

interface NavigationProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
    const { isAuthenticated, logout } = useAuth();

    const handleProfileClick = () => {
        if (isAuthenticated) {
            onNavigate(Page.PROFILE);
        } else {
            onNavigate(Page.LOGIN);
        }
    };

    return (
        <div className="fixed bottom-0 w-full max-w-md bg-transparent z-50 pointer-events-none left-1/2 -translate-x-1/2">
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none"></div>

            {/* Floating Action Button */}
            <div className="absolute bottom-8 right-6 pointer-events-auto">
                <button
                    onClick={() => onNavigate(Page.ROUTINE_BUILDER)}
                    className="w-14 h-14 bg-surface-card hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all shadow-lg border border-white/10 group active:scale-95"
                >
                    <span className="material-icons-round text-3xl group-hover:rotate-90 transition-transform duration-300">add</span>
                </button>
            </div>

            {/* Nav Items */}
            <nav className="relative pointer-events-auto px-8 pb-8 pt-4 flex justify-between items-end">
                <div className="flex gap-10 items-center">
                    <button
                        onClick={() => onNavigate(Page.HOME)}
                        className={`flex flex-col items-center gap-1 transition-colors ${currentPage === Page.HOME ? 'text-white' : 'text-text-dim hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-[28px]">home</span>
                        {currentPage === Page.HOME && <span className="w-1 h-1 bg-white rounded-full absolute -bottom-2"></span>}
                    </button>

                    <button
                        onClick={() => onNavigate(Page.FEED)}
                        className={`flex flex-col items-center gap-1 transition-colors ${currentPage === Page.FEED ? 'text-white' : 'text-text-dim hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-[28px]">dynamic_feed</span>
                         {currentPage === Page.FEED && <span className="w-1 h-1 bg-white rounded-full absolute -bottom-2"></span>}
                    </button>
                </div>

                <div className="flex gap-10 items-center mr-20">
                     <button
                        onClick={() => onNavigate(Page.WATCH_SYNC)}
                        className={`flex flex-col items-center gap-1 transition-colors ${currentPage === Page.WATCH_SYNC ? 'text-white' : 'text-text-dim hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-[28px]">watch</span>
                         {currentPage === Page.WATCH_SYNC && <span className="w-1 h-1 bg-white rounded-full absolute -bottom-2"></span>}
                    </button>

                    <button
                         onClick={handleProfileClick}
                         className={`flex flex-col items-center gap-1 transition-colors ${currentPage === Page.PROFILE ? 'text-white' : 'text-text-dim hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-[28px]">
                            {isAuthenticated ? 'person' : 'login'}
                        </span>
                         {currentPage === Page.PROFILE && <span className="w-1 h-1 bg-white rounded-full absolute -bottom-2"></span>}
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;