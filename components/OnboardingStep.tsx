import React from 'react';

interface OnboardingStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  showSkip?: boolean;
  isNextDisabled?: boolean;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({
  stepNumber,
  totalSteps,
  title,
  description,
  children,
  onNext,
  onBack,
  onSkip,
  nextLabel = 'Next',
  showBack = stepNumber > 1,
  showSkip = true,
  isNextDisabled = false
}) => {
  return (
    <div className="w-full h-full bg-black flex flex-col relative animate-[fadeIn_0.3s_ease-out]">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-8 pt-12 pb-6">
        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[...Array(totalSteps)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i < stepNumber ? 'bg-white' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Title and Description */}
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-text-dim font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-32 relative z-10">
        {children}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/5 px-8 py-6 relative z-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            {showBack && onBack && (
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-full text-sm font-medium text-text-dim hover:text-white transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={onNext}
              disabled={isNextDisabled}
              className="flex-1 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all active:scale-95 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {nextLabel}
            </button>
            {showSkip && onSkip && (
              <button
                onClick={onSkip}
                className="px-6 py-3 rounded-full text-sm font-medium text-text-dim hover:text-white transition-colors"
              >
                Skip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep;
