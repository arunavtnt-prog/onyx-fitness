import React from 'react';

interface GoalCardProps {
  icon: string;
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ icon, label, description, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-2xl border transition-all active:scale-[0.98] text-left ${
        selected
          ? 'bg-white text-black border-white'
          : 'bg-surface-dark border-white/5 text-white hover:bg-surface-card hover:border-white/10'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            selected ? 'bg-black/10' : 'bg-surface-input border border-white/5'
          }`}
        >
          <span className={`material-symbols-outlined text-2xl ${selected ? 'text-black' : 'text-text-dim'}`}>
            {icon}
          </span>
        </div>
        <div className="flex-1">
          <h3 className={`font-medium mb-1 ${selected ? 'text-black' : 'text-white'}`}>
            {label}
          </h3>
          {description && (
            <p className={`text-sm ${selected ? 'text-black/60' : 'text-text-dim'}`}>
              {description}
            </p>
          )}
        </div>
        {selected && (
          <span className="material-symbols-outlined text-black text-xl">
            check_circle
          </span>
        )}
      </div>
    </button>
  );
};

export default GoalCard;
