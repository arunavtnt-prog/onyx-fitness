import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import OnboardingStep from '../components/OnboardingStep';
import GoalCard from '../components/GoalCard';

interface OnboardingPageProps {
  onNavigate: (page: Page) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Goal Selection State
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const goals = [
    {
      id: 'build-muscle',
      icon: 'fitness_center',
      label: 'Build Muscle',
      description: 'Gain strength and increase muscle mass'
    },
    {
      id: 'lose-weight',
      icon: 'trending_down',
      label: 'Lose Weight',
      description: 'Burn fat and improve body composition'
    },
    {
      id: 'stay-active',
      icon: 'directions_run',
      label: 'Stay Active',
      description: 'Maintain a healthy lifestyle'
    },
    {
      id: 'improve-cardio',
      icon: 'favorite',
      label: 'Improve Cardio',
      description: 'Boost endurance and heart health'
    }
  ];

  // Experience Level State
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const levels = [
    {
      id: 'beginner',
      icon: 'spa',
      label: 'Beginner',
      description: 'New to fitness or returning after a break'
    },
    {
      id: 'intermediate',
      icon: 'trending_up',
      label: 'Intermediate',
      description: 'Consistent training for 6+ months'
    },
    {
      id: 'advanced',
      icon: 'military_tech',
      label: 'Advanced',
      description: 'Experienced athlete looking to push limits'
    }
  ];

  // Preferences State
  const [frequency, setFrequency] = useState(3);
  const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);
  const workoutTypeOptions = [
    { id: 'strength', label: 'Strength' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'hiit', label: 'HIIT' },
    { id: 'flexibility', label: 'Flexibility' }
  ];

  const toggleWorkoutType = (id: string) => {
    setWorkoutTypes(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    // Store onboarding preferences (could be sent to backend in the future)
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('fitnessGoal', selectedGoal || '');
    localStorage.setItem('experienceLevel', selectedLevel || '');
    localStorage.setItem('workoutFrequency', frequency.toString());
    localStorage.setItem('workoutTypes', JSON.stringify(workoutTypes));
    onNavigate(Page.HOME);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3 mt-6">
            <h2 className="text-lg font-medium text-white mb-4">
              What's your main fitness goal?
            </h2>
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                icon={goal.icon}
                label={goal.label}
                description={goal.description}
                selected={selectedGoal === goal.id}
                onClick={() => setSelectedGoal(goal.id)}
              />
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-3 mt-6">
            <h2 className="text-lg font-medium text-white mb-4">
              What's your experience level?
            </h2>
            {levels.map((level) => (
              <GoalCard
                key={level.id}
                icon={level.icon}
                label={level.label}
                description={level.description}
                selected={selectedLevel === level.id}
                onClick={() => setSelectedLevel(level.id)}
              />
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 mt-6">
            {/* Workout Frequency */}
            <div>
              <h2 className="text-lg font-medium text-white mb-4">
                How many days per week do you want to workout?
              </h2>
              <div className="flex justify-between items-center bg-surface-dark rounded-2xl p-4 border border-white/5">
                {[...Array(7)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setFrequency(i + 1)}
                    className={`w-10 h-10 rounded-full font-medium text-sm transition-all ${
                      frequency === i + 1
                        ? 'bg-white text-black'
                        : 'bg-surface-input text-text-dim hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-text-dim mt-3">
                {frequency} day{frequency > 1 ? 's' : ''} per week
              </p>
            </div>

            {/* Workout Types */}
            <div>
              <h2 className="text-lg font-medium text-white mb-4">
                What types of workouts do you enjoy?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {workoutTypeOptions.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => toggleWorkoutType(type.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      workoutTypes.includes(type.id)
                        ? 'bg-white text-black border-white'
                        : 'bg-surface-dark border-white/5 text-text-dim hover:text-white'
                    }`}
                  >
                    <span className="font-medium text-sm">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !selectedGoal;
      case 2:
        return !selectedLevel;
      case 3:
        return false; // Preferences are optional
      default:
        return false;
    }
  };

  const getNextLabel = () => {
    return currentStep === totalSteps ? 'Get Started' : 'Next';
  };

  return (
    <OnboardingStep
      stepNumber={currentStep}
      totalSteps={totalSteps}
      title="Welcome to Onyx Fitness"
      description={
        currentStep === 1
          ? "Let's personalize your experience"
          : currentStep === 2
          ? 'Help us understand your fitness level'
          : 'Set your workout preferences'
      }
      onNext={handleNext}
      onBack={handleBack}
      onSkip={handleSkip}
      nextLabel={getNextLabel()}
      showBack={currentStep > 1}
      showSkip={currentStep < totalSteps}
      isNextDisabled={isNextDisabled()}
    >
      {renderStepContent()}
    </OnboardingStep>
  );
};

export default OnboardingPage;
