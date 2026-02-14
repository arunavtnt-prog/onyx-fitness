import React, { useState, useEffect } from 'react';
import { getExercises } from '../src/api';
import { Exercise } from '../src/api';

interface ExerciseSelectorProps {
    onBack: () => void;
    onSelect: (id: string) => void;
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({ onBack, onSelect }) => {
    const [search, setSearch] = useState('');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Abs', 'Cardio'];
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            loadExercises();
        }, 300);
        return () => clearTimeout(timer);
    }, [search, selectedCategory]);

    const loadExercises = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params: any = {};
            if (search) params.search = search;
            if (selectedCategory !== 'All') params.muscleGroup = selectedCategory;

            const response = await getExercises(params);
            setExercises(response.exercises);
        } catch (err) {
            console.error('Failed to load exercises:', err);
            setError('Failed to load exercises. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const filtered = exercises.filter(ex =>
        ex.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategory === 'All' || ex.muscleGroup.toLowerCase().includes(selectedCategory.toLowerCase()))
    );

    return (
        <div className="w-full h-full bg-background-dark flex flex-col relative animate-[fadeIn_0.3s_ease-out]">
            <header className="px-6 pt-12 pb-2 flex flex-col z-10 sticky top-0 bg-background-dark/95 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={onBack} className="text-white hover:text-gray-300 transition-colors -ml-2 p-2">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight text-white">Add Exercise</h1>
                    <button className="text-white hover:text-gray-300 transition-colors">
                        <span className="material-symbols-outlined text-2xl">filter_list</span>
                    </button>
                </div>
                
                <div className="relative mb-4">
                    <span className="absolute left-3 top-2.5 text-text-dim material-symbols-outlined">search</span>
                    <input 
                        type="text" 
                        placeholder="Search exercises..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-surface-input border-none rounded-xl py-3 pl-10 pr-4 text-white placeholder-text-dim focus:ring-1 focus:ring-white transition-all"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                                selectedCategory === cat 
                                    ? 'bg-white text-black border-white' 
                                    : 'bg-surface-card text-text-dim border-white/5 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-12 pt-4">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/30"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm mt-4">
                        {error}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-4xl text-text-dim mb-4">search_off</span>
                        <p className="text-text-dim">No exercises found.</p>
                        <button className="text-white font-medium mt-4 border-b border-white">Create Custom Exercise</button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((ex) => (
                            <button
                                key={ex.id}
                                onClick={() => onSelect(ex.id)}
                                className="w-full text-left bg-surface-dark p-4 rounded-2xl border border-white/5 hover:bg-surface-card flex items-center gap-4 group transition-all active:scale-[0.98]"
                            >
                                <div className="w-12 h-12 bg-surface-input rounded-lg flex items-center justify-center text-text-dim group-hover:text-white border border-white/5">
                                    <span className="material-symbols-outlined">fitness_center</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">{ex.name}</h4>
                                    <p className="text-xs text-text-dim mt-0.5">{ex.muscleGroup}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors">
                                    <span className="material-symbols-outlined text-lg text-transparent group-hover:text-black">add</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ExerciseSelector;