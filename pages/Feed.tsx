import React, { useState, useEffect } from 'react';
import { getFeed } from '../src/api';
import { FeedItem } from '../types';
import BottomSheet from '../components/BottomSheet';

const FeedCard: React.FC<{ item: FeedItem, onMore: () => void }> = ({ item, onMore }) => {
    return (
        <article className="bg-surface-dark rounded-3xl shadow-lg border border-white/5 overflow-hidden mb-6">
            <div className="p-5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <img 
                            src={item.user.avatar} 
                            alt={item.user.name} 
                            className="h-10 w-10 rounded-full object-cover border border-white/10" 
                        />
                    </div>
                    <div>
                        <h3 className="font-medium text-white text-sm">{item.user.name}</h3>
                        <p className="text-[10px] uppercase tracking-wider text-text-dim font-semibold mt-0.5">{item.timeAgo}</p>
                    </div>
                </div>
                <button 
                    onClick={onMore}
                    className="text-text-dim hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div>
            
            <div className="px-5 pb-2">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-light text-white mb-2 tracking-tight">{item.title}</h2>
                        <div className="flex items-center space-x-3 text-sm">
                            {item.tags.map((tag, i) => (
                                <span key={i} className={`flex items-center font-medium px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-white/5 ${tag.type === 'intensity' ? 'bg-white/10 text-white' : 'text-text-dim'}`}>
                                    {tag.type === 'duration' && <span className="material-symbols-outlined text-[16px] mr-1">schedule</span>}
                                    {tag.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                
                {item.description && (
                    <p className="text-sm text-text-dim mb-6 font-light leading-relaxed">
                        {item.description}
                    </p>
                )}
                
                {item.stats.length > 0 && (
                     <div className={`grid gap-3 mb-5 ${item.stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {item.stats.map((stat, i) => (
                             <div key={i} className="bg-surface-card p-4 rounded-2xl border border-white/5 flex flex-col justify-between h-24">
                                <div className="text-[10px] text-text-dim uppercase tracking-widest font-semibold">{stat.label}</div>
                                <div className="flex items-baseline">
                                    <span className="text-2xl font-light text-white mr-1">{stat.value}</span>
                                    {stat.unit && <span className="text-[10px] text-text-dim font-bold uppercase">{stat.unit}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-5 pb-5">
                {item.image && (
                    <div className="h-40 w-full rounded-2xl overflow-hidden relative bg-surface-card border border-white/5">
                        <img src={item.image} alt="Workout content" className="w-full h-full object-cover opacity-60 grayscale" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent flex items-end p-4">
                            {item.exercisesCount && (
                                <span className="text-xs font-medium text-white/90 flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                                    <span className="material-symbols-outlined text-[16px] mr-2 text-white">fitness_center</span> 
                                    {item.exercisesCount} Exercises
                                </span>
                            )}
                        </div>
                    </div>
                )}
                {item.mapImage && (
                     <div className="h-40 w-full rounded-2xl overflow-hidden relative bg-surface-card border border-white/5">
                        <img src={item.mapImage} alt="Map" className="w-full h-full object-cover opacity-30 grayscale invert" />
                         <div className="absolute bottom-3 left-3 z-20">
                            <span className="text-xs font-medium text-white/90 flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                                <span className="material-symbols-outlined text-[16px] mr-2 text-white">location_on</span> 
                                {item.location}
                            </span>
                        </div>
                     </div>
                )}
            </div>
            
            <div className="border-t border-white/5 p-4 flex items-center justify-between bg-surface-card/50">
                <div className="flex space-x-6 pl-1">
                    <button className="flex items-center space-x-2 group">
                        <span className="material-symbols-outlined text-text-dim group-hover:text-red-500 transition-colors text-xl font-light group-active:scale-125">favorite</span>
                        <span className="text-xs font-medium text-text-dim group-hover:text-white transition-colors">{item.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 group">
                        <span className="material-symbols-outlined text-text-dim group-hover:text-white transition-colors text-xl font-light">chat_bubble</span>
                        <span className="text-xs font-medium text-text-dim group-hover:text-white transition-colors">{item.comments}</span>
                    </button>
                </div>
                <button className="flex items-center space-x-2 bg-transparent border border-white/20 hover:border-white text-white px-5 py-2.5 rounded-full transition-all active:scale-95 font-medium text-xs tracking-wide hover:bg-white/5">
                    <span>Save Routine</span>
                    <span className="material-symbols-outlined text-base">download</span>
                </button>
            </div>
        </article>
    );
};

const Feed: React.FC = () => {
    const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        loadFeed();
    }, []);

    const loadFeed = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getFeed();
            setFeedItems(response.feed);
        } catch (err) {
            console.error('Failed to load feed:', err);
            setError('Failed to load feed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col min-h-screen bg-background-dark">
            <header className="fixed top-0 left-0 right-0 z-40 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 pt-12 pb-4 max-w-md mx-auto">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h1 className="text-3xl font-light tracking-tight text-white">Feed</h1>
                        <p className="text-xs text-text-dim font-medium tracking-widest uppercase mt-0.5">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={loadFeed} className="relative p-2 rounded-full hover:bg-white/5 transition-colors group" title="Refresh">
                            <span className="material-symbols-outlined text-text-dim group-hover:text-white transition-colors">refresh</span>
                        </button>
                        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors group">
                            <span className="material-symbols-outlined text-text-dim group-hover:text-white transition-colors">notifications</span>
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-white rounded-full"></span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar pt-36 px-4 pb-32 max-w-md mx-auto w-full">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/30"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm mx-4 mt-4">
                        {error}
                    </div>
                ) : feedItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <span className="material-symbols-outlined text-4xl text-text-dim mb-4">dynamic_feed</span>
                        <p className="text-text-dim text-sm">No posts yet</p>
                        <p className="text-text-dim text-xs mt-2">Be the first to share your workout!</p>
                    </div>
                ) : (
                    feedItems.map(item => <FeedCard key={item.id} item={item} onMore={() => setShowMenu(true)} />)
                )}
                
                {/* Community Challenge Card */}
                <article className="bg-surface-dark rounded-3xl shadow-lg border border-white/5 overflow-hidden mb-24">
                     <div className="p-5 pb-2">
                        <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDzF8UNECzPHoEJcw5XpJ8kliFq0bb8FygI1JVa1J2jZv0t52Abj8ejlJMJpA6qQY7B-k2JhFOP5Z5PtvPQ3i7vbWWRVA8KHri7KjeiaMNZjubD3tv0OfdACYsBlYfJFzipFUrSJjVU6Hyp22YJUfQUgJ3WP1lIoHOwyMIVeDzKE1S01DARmhVQo7B7nW3L_qrrm3GWEeGVPhEI941iK4qjGY-FtMrCcRXcmiPD5O-I8I2rdscqX90L71nuTJJJX_i0XEcXN4C9w" className="w-8 h-8 rounded-full grayscale opacity-70" alt="Jessica" />
                                 <div>
                                     <h2 className="text-xl font-light text-white tracking-tight">Murph Challenge</h2>
                                     <p className="text-[10px] text-text-dim">Jessica Chen • 8h ago</p>
                                 </div>
                             </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 text-sm">
                            <span className="bg-white/10 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide border border-white/5">HIIT</span>
                            <span className="bg-surface-card border border-white/5 px-3 py-1.5 rounded-full text-[10px] text-text-dim">1 Mile Run</span>
                            <span className="bg-surface-card border border-white/5 px-3 py-1.5 rounded-full text-[10px] text-text-dim">100 Pullups</span>
                        </div>
                        <div className="mt-5 p-4 rounded-2xl bg-surface-card border border-white/5 flex items-center justify-between">
                            <div>
                                <div className="text-[10px] uppercase text-text-dim font-bold tracking-widest mb-1">Total Time</div>
                                <div className="text-3xl font-light text-white font-mono tracking-tight">38:42</div>
                            </div>
                            <button className="bg-white text-black h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors active:scale-95">
                                <span className="material-symbols-outlined text-xl">download</span>
                            </button>
                        </div>
                    </div>
                </article>
            </main>

            <BottomSheet 
                isOpen={showMenu} 
                onClose={() => setShowMenu(false)} 
                actions={[
                    { label: 'Share Workout', icon: 'ios_share', onClick: () => console.log('Share') },
                    { label: 'Copy Link', icon: 'link', onClick: () => console.log('Copy') },
                    { label: 'Unfollow User', icon: 'person_remove', onClick: () => console.log('Unfollow'), destructive: true },
                    { label: 'Report Post', icon: 'report', onClick: () => console.log('Report'), destructive: true },
                ]}
            />
        </div>
    );
};

export default Feed;