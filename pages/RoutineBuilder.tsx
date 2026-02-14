import React, { useState } from 'react';
import { MOCK_EXERCISES } from '../constants';
import { Page } from '../types';

interface RoutineBuilderProps {
    onCancel: () => void;
    onStartWorkout: () => void;
    onAddExercise: () => void;
}

const RoutineBuilder: React.FC<RoutineBuilderProps> = ({ onCancel, onStartWorkout, onAddExercise }) => {
    const [routineName, setRoutineName] = useState('Hypertrophy Chest & Back');

    return (
        <div className="w-full h-full bg-background-dark flex flex-col relative animate-[fadeIn_0.3s_ease-out]">
            <header className="px-6 py-4 flex items-center justify-between z-20 bg-background-dark/95 backdrop-blur-sm sticky top-0 border-b border-white/5 pt-12">
                <button 
                    onClick={onCancel}
                    className="text-text-dim hover:text-white transition-colors text-base font-medium"
                >
                    Cancel
                </button>
                <div className="text-lg font-semibold tracking-tight text-white">Edit Routine</div>
                <button 
                    onClick={onCancel} // In a real app, this would save
                    className="text-white hover:text-gray-300 transition-colors text-base font-semibold"
                >
                    Save
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32 space-y-8 pt-4">
                <section className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-[11px] font-medium text-text-dim uppercase tracking-wider" htmlFor="routineName">Routine Name</label>
                        <input 
                            id="routineName" 
                            type="text" 
                            value={routineName} 
                            onChange={(e) => setRoutineName(e.target.value)}
                            className="w-full bg-transparent border-none text-3xl font-light tracking-tight p-0 focus:ring-0 placeholder-gray-700 text-white border-b border-gray-800 focus:border-white transition-colors pb-2"
                            placeholder="Routine Name"
                        />
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar">
                        <button className="flex items-center justify-center px-4 py-2 rounded-full bg-surface-card text-white text-xs font-medium border border-white/20 whitespace-nowrap">
                            Strength
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 rounded-full bg-surface-card text-text-dim text-xs font-medium border border-white/5 whitespace-nowrap">
                            60 min
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 rounded-full bg-surface-card text-text-dim text-xs font-medium border border-white/5 whitespace-nowrap">
                            High Intensity
                        </button>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1 mb-2">
                        <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider">Exercises</h3>
                        <button className="text-xs text-text-dim hover:text-white transition-colors font-medium">Reorder</button>
                    </div>

                    {MOCK_EXERCISES.map((exercise) => (
                        <div key={exercise.id} className="group relative bg-surface-card rounded-2xl p-5 border border-white/5 transition-all hover:border-white/10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-surface-input flex-shrink-0 overflow-hidden opacity-80 grayscale contrast-125">
                                        <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-white leading-tight">{exercise.name}</h4>
                                        <p className="text-xs text-text-dim mt-1 font-light">{exercise.muscleGroup}</p>
                                    </div>
                                </div>
                                <div className="text-text-dim cursor-grab active:cursor-grabbing hover:text-white transition-colors">
                                    <span className="material-icons-round text-xl">drag_indicator</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-text-dim uppercase tracking-wider pl-1">Sets</label>
                                    <input type="number" defaultValue={exercise.sets} className="w-full bg-surface-input border-none rounded-xl py-3 px-3 text-center font-display text-sm text-white focus:ring-1 focus:ring-white outline-none transition-all placeholder-gray-600" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-text-dim uppercase tracking-wider pl-1">Reps</label>
                                    <input type="text" defaultValue={exercise.reps} className="w-full bg-surface-input border-none rounded-xl py-3 px-3 text-center font-display text-sm text-white focus:ring-1 focus:ring-white outline-none transition-all" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-text-dim uppercase tracking-wider pl-1">Rest</label>
                                    <div className="relative">
                                        <input type="number" defaultValue={exercise.rest} className="w-full bg-surface-input border-none rounded-xl py-3 px-3 text-center font-display text-sm text-white focus:ring-1 focus:ring-white outline-none transition-all" />
                                        <span className="absolute right-2 top-3 text-[10px] text-text-dim opacity-50">s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <button 
                        onClick={onAddExercise}
                        className="w-full py-6 rounded-2xl border border-dashed border-white/10 text-text-dim hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide bg-surface-card/30"
                    >
                        <span className="material-icons text-sm">add</span> Add Exercise
                    </button>
                    
                    <div className="h-24"></div>
                </section>
            </main>

            <div className="absolute bottom-6 left-0 right-0 px-6 z-30 pointer-events-none">
                <div className="flex items-center justify-center pointer-events-auto">
                    <button 
                        onClick={onStartWorkout}
                        className="bg-white hover:bg-gray-200 text-black font-semibold py-4 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3 transform transition-all active:scale-95 group w-full justify-center max-w-sm"
                    >
                        <span className="material-icons-round text-2xl">play_arrow</span>
                        <span className="text-lg tracking-wide font-display">Start Workout</span>
                    </button>
                </div>
            </div>
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
        </div>
    );
};

export default RoutineBuilder;