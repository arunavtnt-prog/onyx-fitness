import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import BottomSheet from '../components/BottomSheet';

const data = [
  { name: 'Mon', value: 3000 },
  { name: 'Tue', value: 4500 },
  { name: 'Wed', value: 3200 },
  { name: 'Thu', value: 8453 },
  { name: 'Fri', value: 5000 },
  { name: 'Sat', value: 6000 },
  { name: 'Sun', value: 4800 },
];

const Home: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="w-full flex flex-col min-h-screen">
            <header className="pt-12 pb-6 px-6 flex justify-between items-center z-10">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-display font-medium tracking-tight text-white">Home</h1>
                    <p className="text-sm text-text-dim mt-1 font-light tracking-wide">Mon. 04 March</p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setShowMenu(true)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl font-light">more_horiz</span>
                    </button>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-surface-card bg-surface-dark">
                        <img 
                            alt="User profile" 
                            className="w-full h-full object-cover opacity-80" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyfw47RO6Pt_X8zFbnyNBJDjSYJTy67gEoKGaWPlCydgEDeQzbDr0z6Z6G5GxFxzk3dAYzALa_Tl7bi50VIVlygpswbPGDI-xAxlvLbp4OLWO8BVJ3ryHikgTyXCjN-obv058dIibkpy0xaQbtFeHObcGgxhJj7C3FFsw0IW50L88G7_NpOsXhGwVAnH_fjpZqNuxSt3ZI0UkyTOytemx6lZOHBFSjLHckwbPWXbKFKy3V2ZgF5smHbkJpB8QRsogW0-kQ6cVQAA" 
                        />
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 space-y-4">
                <div className="flex justify-between items-end mb-2">
                    <h2 className="text-sm font-medium text-text-dim uppercase tracking-wider">Today</h2>
                    <button onClick={() => setShowMenu(true)} className="text-white hover:text-gray-300">
                        <span className="material-symbols-outlined text-xl">more_horiz</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Streak Card */}
                    <div className="bg-surface-dark rounded-3xl p-5 flex flex-col justify-between aspect-square group hover:bg-[#1a1a1a] transition-colors relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.03] rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-display font-light text-white">12</span>
                            <span className="text-sm text-text-dim">/20</span>
                        </div>
                        <div>
                            <p className="text-xs text-text-dim font-medium mb-2">Streak Days</p>
                            <div className="flex items-end h-8 gap-1 opacity-60">
                                <div className="w-1.5 bg-white/20 h-[40%] rounded-sm"></div>
                                <div className="w-1.5 bg-white/20 h-[60%] rounded-sm"></div>
                                <div className="w-1.5 bg-white/20 h-[30%] rounded-sm"></div>
                                <div className="w-1.5 bg-white h-full rounded-sm shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                                <div className="w-1.5 bg-white/20 h-[50%] rounded-sm"></div>
                            </div>
                        </div>
                    </div>

                    {/* Workouts Card */}
                    <div className="bg-surface-dark rounded-3xl p-5 flex flex-col justify-between aspect-square group hover:bg-[#1a1a1a] transition-colors border border-white/5">
                        <div className="flex justify-between items-start">
                            <span className="text-4xl font-display font-light text-white">4</span>
                            <span className="material-symbols-outlined text-white/40 text-lg">fitness_center</span>
                        </div>
                        <div className="relative h-12 w-full mt-2">
                             <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                                <path className="drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]" d="M0,30 Q10,25 20,30 T40,20 T60,10 T80,25 T100,20" fill="none" stroke="white" strokeLinecap="round" strokeWidth="1.5"></path>
                            </svg>
                        </div>
                        <p className="text-xs text-text-dim font-medium mt-1">Workouts this week</p>
                    </div>

                    {/* Calories Card */}
                    <div className="bg-surface-dark rounded-3xl p-5 flex flex-col justify-between aspect-square group hover:bg-[#1a1a1a] transition-colors relative border border-white/5">
                        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/5"></div>
                        </div>
                        <span className="text-4xl font-display font-light text-white">1,744</span>
                        <div className="z-10">
                            <p className="text-xs text-text-dim font-medium">Calories</p>
                        </div>
                    </div>

                    {/* Volume Card with Chart */}
                    <div className="bg-surface-dark rounded-3xl p-0 flex flex-col justify-between aspect-square group hover:bg-[#1a1a1a] transition-colors relative overflow-hidden border border-white/5">
                        <div className="p-5 pb-0">
                            <span className="text-4xl font-display font-light text-white">8453</span>
                        </div>
                        
                        <div className="flex-1 w-full min-h-[50px] relative mt-2">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={1.5} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="p-5 pt-2 relative z-10">
                            <p className="text-xs text-text-dim font-medium">Volume (kg)</p>
                        </div>
                    </div>
                </div>

                {/* Weekly Activity */}
                <div className="bg-surface-dark rounded-3xl p-6 mt-4 border border-white/5">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                             <span className="text-3xl font-display font-light text-white">8,453</span>
                             <span className="text-xs text-text-dim ml-2 uppercase">Steps today</span>
                        </div>
                        <span className="text-xs text-white font-medium bg-white/10 px-3 py-1 rounded-full">Thursday</span>
                    </div>
                    
                    <div className="h-32 flex items-end justify-between gap-3 px-1">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                            const heights = ['40%', '30%', '60%', '85%', '20%', '15%', '10%'];
                            const isActive = idx === 3; // Thursday
                            
                            return (
                                <div key={idx} className="flex flex-col items-center gap-3 w-full group relative cursor-pointer">
                                    {isActive && (
                                        <div className="absolute -top-6 w-full flex justify-center">
                                             <div className="bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg">Current</div>
                                        </div>
                                    )}
                                    <div 
                                        className={`w-1.5 rounded-full transition-all duration-500 ease-out group-hover:scale-y-110 ${isActive ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'bg-white/20 group-hover:bg-white/40'}`} 
                                        style={{ height: heights[idx] }}
                                    ></div>
                                    <span className={`text-[10px] font-medium ${isActive ? 'text-white font-bold' : 'text-text-dim'}`}>{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
            
            <BottomSheet 
                isOpen={showMenu} 
                onClose={() => setShowMenu(false)} 
                title="Dashboard Options"
                actions={[
                    { label: 'Edit Dashboard', icon: 'dashboard_customize', onClick: () => console.log('Edit') },
                    { label: 'Share Statistics', icon: 'ios_share', onClick: () => console.log('Share') },
                    { label: 'Sync Wearable', icon: 'watch', onClick: () => console.log('Sync') },
                ]}
            />
        </div>
    );
};

export default Home;