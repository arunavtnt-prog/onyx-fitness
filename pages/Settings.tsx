import React, { useState } from 'react';

interface SettingsProps {
    onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
    const [notifications, setNotifications] = useState(true);
    const [healthKit, setHealthKit] = useState(true);
    const [metric, setMetric] = useState(false); // false = Imperial

    return (
        <div className="w-full h-full bg-background-dark flex flex-col relative animate-[fadeIn_0.3s_ease-out]">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between z-10 sticky top-0 bg-background-dark/95 backdrop-blur-md">
                <button onClick={onBack} className="text-white hover:text-gray-300 transition-colors -ml-2 p-2">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold tracking-tight text-white">Settings</h1>
                <div className="w-8"></div> {/* Spacer */}
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-12 space-y-8">
                {/* Account Section */}
                <section>
                    <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-4 px-1">Account</h3>
                    <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5">
                            <span className="text-white font-medium">Edit Profile</span>
                            <span className="material-symbols-outlined text-text-dim">chevron_right</span>
                        </button>
                         <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                            <span className="text-white font-medium">Subscription Plan</span>
                            <span className="flex items-center text-white bg-white/10 px-2 py-0.5 rounded text-xs font-bold border border-white/10">PRO</span>
                        </button>
                    </div>
                </section>

                {/* Preferences */}
                <section>
                    <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-4 px-1">Preferences</h3>
                    <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex flex-col">
                                <span className="text-white font-medium">Push Notifications</span>
                                <span className="text-xs text-text-dim">Workout reminders & updates</span>
                            </div>
                            <button 
                                onClick={() => setNotifications(!notifications)}
                                className={`w-12 h-7 rounded-full transition-colors relative ${notifications ? 'bg-white' : 'bg-surface-input'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 rounded-full bg-black shadow transition-transform duration-200 ${notifications ? 'left-6' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex flex-col">
                                <span className="text-white font-medium">Apple Health</span>
                                <span className="text-xs text-text-dim">Sync workouts and heart rate</span>
                            </div>
                            <button 
                                onClick={() => setHealthKit(!healthKit)}
                                className={`w-12 h-7 rounded-full transition-colors relative ${healthKit ? 'bg-white' : 'bg-surface-input'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 rounded-full bg-black shadow transition-transform duration-200 ${healthKit ? 'left-6' : 'left-1'}`}></div>
                            </button>
                        </div>
                         <div className="flex items-center justify-between p-4">
                            <div className="flex flex-col">
                                <span className="text-white font-medium">Units</span>
                                <span className="text-xs text-text-dim">{metric ? 'Metric (kg, km)' : 'Imperial (lbs, mi)'}</span>
                            </div>
                             <div className="flex bg-surface-input rounded-lg p-1 border border-white/5">
                                 <button 
                                    onClick={() => setMetric(false)}
                                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${!metric ? 'bg-white text-black' : 'text-text-dim hover:text-white'}`}
                                >
                                    LBS
                                </button>
                                <button 
                                    onClick={() => setMetric(true)}
                                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${metric ? 'bg-white text-black' : 'text-text-dim hover:text-white'}`}
                                >
                                    KG
                                </button>
                             </div>
                        </div>
                    </div>
                </section>

                {/* Support */}
                <section>
                    <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-4 px-1">Support</h3>
                    <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5">
                            <span className="text-white font-medium">Help Center</span>
                            <span className="material-symbols-outlined text-text-dim">open_in_new</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                            <span className="text-white font-medium">Send Feedback</span>
                            <span className="material-symbols-outlined text-text-dim">mail</span>
                        </button>
                    </div>
                </section>

                <div className="pt-8">
                     <button className="w-full py-4 text-red-500 font-medium hover:bg-red-500/5 rounded-xl transition-colors">
                        Delete Account
                    </button>
                    <p className="text-center text-[10px] text-text-dim mt-4">
                        Onyx Fitness v1.0.4<br/>
                        Build 2024.03.04
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Settings;