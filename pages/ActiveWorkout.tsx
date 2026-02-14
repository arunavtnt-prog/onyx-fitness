import React, { useState, useEffect } from 'react';
import { MOCK_EXERCISES } from '../constants';
import BottomSheet from '../components/BottomSheet';

interface ActiveWorkoutProps {
    onFinish: () => void;
}

const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({ onFinish }) => {
    const [timer, setTimer] = useState(0);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isFinishing, setIsFinishing] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    
    // Mock sets state
    const [sets, setSets] = useState([
        { id: 1, lbs: 60, reps: 12, completed: true },
        { id: 2, lbs: 65, reps: 10, completed: false },
        { id: 3, lbs: 65, reps: '', completed: false }
    ]);

    const currentExercise = MOCK_EXERCISES[currentExerciseIndex];
    const nextExercise = MOCK_EXERCISES[currentExerciseIndex + 1];
    const isLastExercise = currentExerciseIndex === MOCK_EXERCISES.length - 1;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(t => t + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleSet = (id: number) => {
        setSets(sets.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
    };

    const handleAddSet = () => {
        const newId = sets.length > 0 ? Math.max(...sets.map(s => s.id)) + 1 : 1;
        const previousSet = sets[sets.length - 1] || { lbs: 0, reps: '' };
        // Add new set with data from previous set
        setSets([...sets, { id: newId, lbs: previousSet.lbs, reps: previousSet.reps, completed: false }]);
        
        // Scroll to bottom (simple implementation)
        setTimeout(() => {
             const main = document.querySelector('main');
             if(main) main.scrollTop = main.scrollHeight;
        }, 100);
    };

    const handleNextExercise = () => {
        if (isLastExercise) {
            handleFinish();
        } else {
            setCurrentExerciseIndex(prev => prev + 1);
            setSets([
                { id: 1, lbs: 0, reps: 0, completed: false },
                { id: 2, lbs: 0, reps: 0, completed: false },
                { id: 3, lbs: 0, reps: '', completed: false }
            ]);
        }
    };

    const handleFinish = () => {
        setIsFinishing(true);
        setTimeout(() => {
            onFinish();
        }, 1500);
    };

    if (isFinishing) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-out]">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        <span className="material-icons-round text-4xl text-black animate-[spin_1s_ease-in-out_infinite]" style={{ animationIterationCount: 1 }}>check</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white font-display">Workout Saved</h2>
                    <p className="text-text-dim">Great job! Syncing to cloud...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col bg-background-dark relative overflow-hidden animate-[fadeIn_0.5s_ease-out]">
            {/* Timer Header */}
            <div className="flex-none pt-12 pb-2 px-5 flex items-center justify-center bg-background-dark z-20 sticky top-0 border-b border-white/5">
                <div className="flex flex-col items-center">
                    <div className="text-[40px] leading-none font-bold text-white tracking-tight flex items-center gap-2 font-display tabular-nums">
                        {formatTime(timer)}
                    </div>
                    <div className="text-xs text-text-dim uppercase tracking-widest mt-1">Duration</div>
                </div>
            </div>

            {/* Sub Header */}
            <div className="flex-none px-5 py-3 flex items-center justify-between bg-background-dark z-10">
                <button className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors text-text-dim hover:text-white">
                    <span className="material-icons text-3xl">keyboard_arrow_down</span>
                </button>
                <div className="flex flex-col items-center">
                     <span className="text-xs font-semibold tracking-wide uppercase text-text-dim">Hypertrophy Chest & Back</span>
                     <span className="text-[10px] text-white/40 font-mono mt-0.5">Exercise {currentExerciseIndex + 1} / {MOCK_EXERCISES.length}</span>
                </div>
                <button 
                    onClick={() => setShowMenu(true)}
                    className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors text-text-dim hover:text-white"
                >
                    <span className="material-icons text-2xl">more_horiz</span>
                </button>
            </div>

            <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
                <div className="px-5 pt-2">
                    {/* Exercise Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1 pr-4">
                            <h2 className="text-3xl font-bold text-white leading-tight mb-3 font-display">{currentExercise.name}</h2>
                            <div className="flex items-end gap-3 h-12">
                                <div className="flex-1 h-full relative opacity-50">
                                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                                        <defs>
                                            <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="white" stopOpacity="0.2"></stop>
                                                <stop offset="100%" stopColor="transparent" stopOpacity="0"></stop>
                                            </linearGradient>
                                        </defs>
                                        <path d="M0 35 C 20 35, 30 20, 50 15 S 70 5, 100 2" fill="none" stroke="white" strokeLinecap="round" strokeWidth="2"></path>
                                        <path d="M0 35 C 20 35, 30 20, 50 15 S 70 5, 100 2 V 40 H 0 Z" fill="url(#lineGradient)" stroke="none"></path>
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-text-dim uppercase tracking-wide">Last Best</p>
                                    <p className="text-sm font-semibold text-white">60lbs × 10</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="bg-surface-dark border border-white/10 p-2 rounded-xl text-text-dim hover:text-white hover:border-white transition-colors">
                                <span className="material-icons text-xl">videocam</span>
                            </button>
                            <button className="bg-surface-dark border border-white/10 p-2 rounded-xl text-text-dim hover:text-white hover:border-white transition-colors">
                                <span className="material-icons text-xl">notes</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-[30px_1fr_1fr_auto_40px] gap-3 px-2 mb-2 text-xs font-medium text-text-dim uppercase tracking-widest">
                        <div className="text-center self-center">#</div>
                        <div className="text-center">Lbs</div>
                        <div className="text-center">Reps</div>
                        <div className="text-center hidden sm:block"></div>
                        <div className="text-center"></div>
                    </div>

                    {/* Sets */}
                    <div className="space-y-2">
                        {sets.map((set, index) => {
                            const isActive = !set.completed && sets.slice(0, index).every(s => s.completed);
                            
                            return (
                                <div 
                                    key={set.id}
                                    className={`rounded-xl p-3 border transition-all duration-300 relative overflow-hidden ${
                                        isActive 
                                            ? 'bg-surface-card border-white/20 shadow-lg shadow-black/40 scale-[1.02] z-10' 
                                            : 'bg-surface-dark border-transparent opacity-60'
                                    }`}
                                >
                                    <div className="grid grid-cols-[30px_1fr_1fr_auto_40px] gap-3 items-center relative z-10">
                                        <div className={`font-medium text-sm text-center ${isActive ? 'text-white font-bold text-lg' : 'text-text-dim'}`}>
                                            {set.id}
                                        </div>
                                        <div>
                                            <input 
                                                className={`w-full text-center font-medium rounded-lg border focus:ring-1 outline-none transition-all ${
                                                    isActive 
                                                        ? 'bg-surface-input border-white/10 text-white text-2xl py-3 focus:border-white focus:ring-white' 
                                                        : 'bg-transparent border-transparent text-text-dim text-lg py-2'
                                                }`}
                                                defaultValue={set.lbs || ''} 
                                                placeholder="-"
                                                inputMode="decimal"
                                                type="number"
                                            />
                                        </div>
                                        <div>
                                            <input 
                                                className={`w-full text-center font-medium rounded-lg border focus:ring-1 outline-none transition-all ${
                                                    isActive 
                                                        ? 'bg-surface-input border-white/10 text-white text-2xl py-3 focus:border-white focus:ring-white placeholder-white/20' 
                                                        : 'bg-transparent border-transparent text-text-dim text-lg py-2'
                                                }`}
                                                defaultValue={set.reps || ''}
                                                placeholder={isActive ? "10" : "-"}
                                                inputMode="decimal"
                                                type="number"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 items-center justify-center">
                                            {isActive && (
                                                <>
                                                     <div className="w-8 h-8 rounded border border-text-dim flex items-center justify-center text-[10px] font-bold text-text-dim hover:border-white hover:text-white cursor-pointer transition-colors">D</div>
                                                     <div className="w-8 h-8 rounded border border-text-dim flex items-center justify-center text-[10px] font-bold text-text-dim hover:border-white hover:text-white cursor-pointer transition-colors">F</div>
                                                </>
                                            )}
                                             {!isActive && (
                                                  <div className="w-6 h-6 rounded border border-text-dim flex items-center justify-center text-[8px] font-bold text-text-dim opacity-50">W</div>
                                             )}
                                        </div>
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={() => toggleSet(set.id)}
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                                    set.completed 
                                                        ? 'bg-white text-black scale-100' 
                                                        : isActive 
                                                            ? 'bg-surface-input border border-white/20 text-transparent hover:border-white' 
                                                            : 'text-white opacity-20'
                                                }`}
                                            >
                                                <span className="material-icons font-bold text-xl">check</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button 
                        onClick={handleAddSet}
                        className="w-full py-4 mt-4 rounded-xl border border-dashed border-white/10 text-text-dim hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2 mb-8 text-sm uppercase tracking-wide"
                    >
                        <span className="material-icons text-sm">add</span> Add Set
                    </button>

                    {nextExercise && (
                        <div className="mt-8 pt-6 border-t border-white/5" onClick={handleNextExercise}>
                            <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest mb-4">Next Up</h3>
                            <div className="flex items-center gap-4 bg-surface-dark p-4 rounded-xl border border-white/5 group hover:border-white/20 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-surface-input rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
                                    <img src={nextExercise.image} alt={nextExercise.name} className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-lg group-hover:underline decoration-1 underline-offset-4">{nextExercise.name}</h4>
                                    <p className="text-xs text-text-dim mt-1">{nextExercise.sets} Sets · {nextExercise.reps} Reps</p>
                                </div>
                                <button className="ml-auto p-2 text-text-dim group-hover:text-white rounded-full">
                                    <span className="material-icons">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 p-5 bg-background-dark/80 border-t border-white/5 z-30 backdrop-blur-xl max-w-md mx-auto">
                <div className="flex gap-4">
                    {!isLastExercise && (
                        <button 
                            onClick={handleNextExercise}
                            className="flex-1 bg-surface-dark border border-white/10 text-white font-medium py-4 rounded-xl hover:bg-surface-card transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            Next Exercise
                        </button>
                    )}
                    <button 
                        onClick={handleFinish}
                        className={`flex-[2] bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 active:scale-[0.98] ${isLastExercise ? 'w-full flex-auto' : ''}`}
                    >
                        Finish Workout <span className="material-icons text-sm">flag</span>
                    </button>
                </div>
            </footer>

            <BottomSheet 
                isOpen={showMenu} 
                onClose={() => setShowMenu(false)} 
                title="Exercise Options"
                actions={[
                    { label: 'Substitute Exercise', icon: 'swap_horiz', onClick: () => console.log('Swap') },
                    { label: 'View History', icon: 'history', onClick: () => console.log('History') },
                    { label: 'Exercise Tutorial', icon: 'play_circle', onClick: () => console.log('Tutorial') },
                    { label: 'Remove Exercise', icon: 'delete', onClick: () => console.log('Remove'), destructive: true },
                ]}
            />
        </div>
    );
};

export default ActiveWorkout;