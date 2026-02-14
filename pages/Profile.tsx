import React, { useEffect, useState } from 'react';
import { getProfile } from '../src/api';
import { Page } from '../types';
import { useAuth } from '../src/context/AuthContext';

interface ProfileProps {
    onNavigate?: (page: Page) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
    const { user, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getProfile();
            setProfileData(data);
        } catch (err) {
            console.error('Failed to load profile:', err);
            setError('Failed to load profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
    };

    if (isLoading) {
        return (
            <div className="w-full h-full bg-background-dark flex flex-col relative animate-[fadeIn_0.3s_ease-out]">
                <div className="flex-1 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/30"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full bg-background-dark flex flex-col relative animate-[fadeIn_0.3s_ease-out]">
                <div className="flex-1 flex flex-col justify-center items-center px-8">
                    <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    <button
                        onClick={loadProfile}
                        className="bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all active:scale-95 py-3 px-8 text-sm"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const stats = profileData?.stats || { workouts: 0, hours: 0, streak: 0 };
    const recentWorkouts = profileData?.recentWorkouts || [];
    const consistency = profileData?.consistency || [];

    return (
        <div className="w-full h-full bg-background-dark flex flex-col relative animate-[fadeIn_0.3s_ease-out]">
            {/* Header */}
            <header className="px-6 pt-12 pb-6 flex items-center justify-between z-10 sticky top-0 bg-background-dark/95 backdrop-blur-md">
                <h1 className="text-xl font-bold tracking-tight text-white">Profile</h1>
                <button
                    onClick={() => onNavigate && onNavigate(Page.SETTINGS)}
                    className="text-white hover:text-gray-300 transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">settings</span>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-white to-white/10">
                            {user?.avatar ? (
                                <img
                                    alt="User"
                                    className="w-full h-full rounded-full object-cover border-[3px] border-black"
                                    src={user.avatar}
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-surface-input border-[3px] border-black flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-text-dim">person</span>
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-black">
                            PRO
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">{user?.name || 'User'}</h2>
                        <p className="text-sm text-text-dim">
                            Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-surface-dark border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
                        <span className="text-2xl font-display font-light text-white">{stats.workouts}</span>
                        <span className="text-[10px] uppercase tracking-widest text-text-dim font-semibold">Workouts</span>
                    </div>
                    <div className="bg-surface-dark border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
                        <span className="text-2xl font-display font-light text-white">{stats.hours}</span>
                        <span className="text-[10px] uppercase tracking-widest text-text-dim font-semibold">Hours</span>
                    </div>
                    <div className="bg-surface-dark border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
                        <span className="text-2xl font-display font-light text-white">{stats.streak}</span>
                        <span className="text-[10px] uppercase tracking-widest text-text-dim font-semibold">Streak</span>
                    </div>
                </div>

                {/* Consistency Heatmap (Visual) */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-dim">Consistency</h3>
                        <span className="text-xs text-white font-mono">Last 30 Days</span>
                    </div>
                    <div className="flex gap-[3px] flex-wrap">
                        {[...Array(30)].map((_, i) => {
                            const activityLevel = consistency[i] || Math.random();
                            const opacity = activityLevel > 0 ? Math.max(0.2, activityLevel) : 0.1;
                            const isToday = i === 29;
                            return (
                                <div
                                    key={i}
                                    className={`h-8 flex-1 min-w-[8px] rounded-sm ${isToday ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white'}`}
                                    style={{ opacity: isToday ? 1 : opacity }}
                                ></div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent History */}
                <div className="mb-8">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-text-dim mb-3 px-1">Recent History</h3>
                    <div className="space-y-3">
                        {recentWorkouts.length === 0 ? (
                            <div className="text-center py-8">
                                <span className="material-symbols-outlined text-4xl text-text-dim mb-2">history</span>
                                <p className="text-sm text-text-dim">No workouts yet</p>
                                <p className="text-xs text-text-dim mt-1">Start your first workout!</p>
                            </div>
                        ) : (
                            recentWorkouts.map((item: any) => (
                                <div key={item.id} className="bg-surface-dark border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-surface-card transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-surface-input flex items-center justify-center border border-white/5 overflow-hidden">
                                            <span className="material-symbols-outlined text-white/50 text-xl">fitness_center</span>
                                        </div>
                                        <div>
                                            <div className="text-white font-medium text-sm">{item.name}</div>
                                            <div className="text-xs text-text-dim mt-0.5">{item.date} • {item.duration}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-display text-sm">{item.volume}</div>
                                        <span className="material-icons-round text-text-dim text-lg">chevron_right</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {recentWorkouts.length > 0 && (
                        <button className="w-full text-center text-xs font-medium text-text-dim mt-4 hover:text-white transition-colors uppercase tracking-wide">
                            View All History
                        </button>
                    )}
                </div>

                {/* Settings Menu */}
                <div className="space-y-1">
                    <button
                        onClick={() => onNavigate && onNavigate(Page.SETTINGS)}
                        className="w-full bg-surface-dark/50 border border-white/5 p-4 rounded-t-2xl flex items-center justify-between hover:bg-surface-card transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-icons-round text-text-dim group-hover:text-white transition-colors">person_outline</span>
                            <span className="text-sm font-medium text-white">Account Details</span>
                        </div>
                        <span className="material-icons-round text-text-dim">chevron_right</span>
                    </button>
                    <button
                        onClick={() => onNavigate && onNavigate(Page.SETTINGS)}
                        className="w-full bg-surface-dark/50 border-x border-white/5 p-4 flex items-center justify-between hover:bg-surface-card transition-colors group"
                    >
                         <div className="flex items-center gap-3">
                            <span className="material-icons-round text-text-dim group-hover:text-white transition-colors">tune</span>
                            <span className="text-sm font-medium text-white">Preferences</span>
                        </div>
                        <span className="material-icons-round text-text-dim">chevron_right</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-surface-dark/50 border border-white/5 p-4 rounded-b-2xl flex items-center justify-between hover:bg-surface-card transition-colors group">
                         <div className="flex items-center gap-3">
                            <span className="material-icons-round text-text-dim group-hover:text-red-400 transition-colors">logout</span>
                            <span className="text-sm font-medium text-red-400 group-hover:text-red-300">Log Out</span>
                        </div>
                    </button>
                </div>

                 <div className="mt-12 text-center">
                    <p className="text-[10px] text-text-dim font-medium uppercase tracking-widest">Onyx Fitness v1.0.4</p>
                </div>
            </main>
        </div>
    );
};

export default Profile;