import React from 'react';

const WatchSync: React.FC = () => {
    return (
        <div className="w-full h-full bg-background-dark flex flex-col relative overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between z-10 bg-background-dark/90 backdrop-blur-md sticky top-0">
                <button className="text-text-dim hover:text-white transition-colors">
                    <span className="material-icons-round text-2xl">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold tracking-tight text-white">Watch Sync</h1>
                <button className="text-text-dim font-medium text-sm hover:text-white transition-colors">Help</button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-28 space-y-8">
                {/* Status Card */}
                <div className="relative bg-surface-dark rounded-3xl p-6 shadow-lg border border-white/5 overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Header Info */}
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl font-semibold text-white tracking-tight">Apple Watch</h2>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <p className="text-sm text-text-dim font-medium">Connected</p>
                            </div>
                        </div>
                        <div className="bg-black/40 px-3 py-2 rounded-xl border border-white/10 flex flex-col items-center min-w-[70px] backdrop-blur-sm">
                            <div className="flex items-center gap-1 text-white font-bold">
                                <span className="material-icons-round text-sm text-green-400">bolt</span>
                                <span>84%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div>
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-dim">Watch Interface</h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white border border-white/20 px-2 py-0.5 rounded-md bg-white/5">Live Preview</span>
                    </div>
                    
                    {/* CSS Watch Mockup (Flat view) */}
                    <div className="bg-[#111] rounded-[3rem] p-1 shadow-2xl border border-[#222] mx-auto max-w-[200px] scale-90 sm:scale-100 transition-transform">
                        <div className="bg-black rounded-[2.8rem] p-2 border-[4px] border-[#0a0a0a]">
                            <div className="aspect-[4/5] bg-black rounded-[2.2rem] overflow-hidden relative shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] flex flex-col p-4">
                                <div className="flex justify-between items-center text-gray-500 text-[10px] font-medium mb-4">
                                    <span className="text-white">9:41</span>
                                    <span className="text-green-500 font-bold tracking-wider">RUN</span>
                                </div>
                                <div className="flex-1 flex flex-col justify-center items-center">
                                    <span className="text-5xl font-medium text-white tracking-tight tabular-nums font-display leading-none">
                                        45<span className="text-gray-500 animate-pulse">:</span>12
                                    </span>
                                    <span className="text-gray-600 text-[9px] mt-2 uppercase tracking-[0.2em]">Duration</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <div className="flex flex-col items-center">
                                        <span className="text-lg font-bold text-white leading-none">145</span>
                                        <span className="text-[8px] text-gray-600 uppercase mt-1 tracking-wider">BPM</span>
                                    </div>
                                    <div className="flex flex-col items-center border-l border-white/10">
                                        <span className="text-lg font-bold text-white leading-none">320</span>
                                        <span className="text-[8px] text-gray-600 uppercase mt-1 tracking-wider">KCAL</span>
                                    </div>
                                </div>
                                <div className="mt-5 h-0.5 w-full bg-gray-900 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-3/4 shadow-[0_0_5px_#22c55e]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings */}
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-text-dim mb-4 px-1">Configuration</h3>
                    <div className="bg-surface-dark rounded-3xl overflow-hidden shadow-sm border border-white/5 divide-y divide-white/5">
                        <div className="p-5 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                            <div className="flex-1 pr-4">
                                <div className="text-sm font-medium text-white mb-1">Offline Logging</div>
                                <div className="text-xs text-text-dim leading-relaxed">Store workout data locally.</div>
                            </div>
                            <div className="w-11 h-6 bg-white rounded-full relative cursor-pointer">
                                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-black rounded-full shadow-sm"></div>
                            </div>
                        </div>
                        <div className="p-5 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                            <div className="flex-1 pr-4">
                                <div className="text-sm font-medium text-white mb-1">Haptic Feedback</div>
                                <div className="text-xs text-text-dim leading-relaxed">Vibrate on intervals.</div>
                            </div>
                             <div className="w-11 h-6 bg-white rounded-full relative cursor-pointer">
                                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-black rounded-full shadow-sm"></div>
                            </div>
                        </div>
                        <div className="p-5 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                            <div className="flex-1 pr-4">
                                <div className="text-sm font-medium text-white mb-1">Auto-Sync</div>
                                <div className="text-xs text-text-dim leading-relaxed">Upload immediately on finish.</div>
                            </div>
                             <div className="w-11 h-6 bg-surface-input rounded-full relative cursor-pointer">
                                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-text-dim rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-white/5">
                    <span className="material-icons-round animate-spin-slow text-xl" style={{ animationDuration: '3s' }}>sync</span>
                    Sync Now
                </button>
                
                <div className="text-center pb-4 pt-2">
                    <p className="text-[10px] text-text-dim uppercase tracking-wide">Last synced: Today at 9:41 AM</p>
                </div>
            </main>
        </div>
    );
};

export default WatchSync;