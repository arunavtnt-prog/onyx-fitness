import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Feed from './pages/Feed';
import RoutineBuilder from './pages/RoutineBuilder';
import ActiveWorkout from './pages/ActiveWorkout';
import WatchSync from './pages/WatchSync';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ExerciseSelector from './pages/ExerciseSelector';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import { Page } from './types';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const AppContent: React.FC = () => {
    const { user, isLoading, isAuthenticated } = useAuth();
    const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
    const [previousPage, setPreviousPage] = useState<Page>(Page.HOME);

    useEffect(() => {
        // Check if user should see onboarding
        if (isAuthenticated && !isLoading) {
            const onboardingCompleted = localStorage.getItem('onboardingCompleted');
            if (!onboardingCompleted) {
                setCurrentPage(Page.ONBOARDING);
            }
        }
    }, [isAuthenticated, isLoading]);

    useEffect(() => {
        // Redirect to login if not authenticated (after initial load)
        if (!isLoading && !isAuthenticated && currentPage !== Page.LOGIN && currentPage !== Page.REGISTER) {
            setCurrentPage(Page.LOGIN);
        }
    }, [isAuthenticated, isLoading, currentPage]);

    const navigateTo = (page: Page) => {
        setPreviousPage(currentPage);
        setCurrentPage(page);
    };

    const goBack = () => {
        setCurrentPage(previousPage);
    };

    const renderPage = () => {
        switch (currentPage) {
            case Page.HOME:
                return <Home />;
            case Page.FEED:
                return <Feed />;
            case Page.WATCH_SYNC:
                return <WatchSync />;
            case Page.ROUTINE_BUILDER:
                return (
                    <RoutineBuilder
                        onCancel={() => navigateTo(Page.HOME)}
                        onStartWorkout={() => navigateTo(Page.ACTIVE_WORKOUT)}
                        onAddExercise={() => navigateTo(Page.EXERCISE_SELECTOR)}
                    />
                );
            case Page.EXERCISE_SELECTOR:
                return (
                    <ExerciseSelector
                        onBack={() => navigateTo(Page.ROUTINE_BUILDER)}
                        onSelect={() => navigateTo(Page.ROUTINE_BUILDER)} // Mock: select returns to builder
                    />
                );
            case Page.ACTIVE_WORKOUT:
                return <ActiveWorkout onFinish={() => navigateTo(Page.HOME)} />;
            case Page.PROFILE:
                return <Profile onNavigate={navigateTo} />;
            case Page.SETTINGS:
                return <Settings onBack={() => navigateTo(Page.PROFILE)} />;
            case Page.LOGIN:
                return <LoginPage onNavigate={navigateTo} />;
            case Page.REGISTER:
                return <RegisterPage onNavigate={navigateTo} />;
            case Page.ONBOARDING:
                return <OnboardingPage onNavigate={navigateTo} />;
            default:
                return <Home />;
        }
    };

    const showNav = [Page.HOME, Page.FEED, Page.WATCH_SYNC, Page.PROFILE].includes(currentPage) && isAuthenticated;

    if (isLoading) {
        return (
            <div className="bg-black min-h-screen text-white font-sans flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white font-sans flex justify-center">
            <div className="w-full max-w-md h-screen relative bg-black shadow-2xl overflow-hidden flex flex-col">
                <div className="flex-1 overflow-hidden relative">
                    {renderPage()}
                </div>
                {showNav && (
                    <Navigation currentPage={currentPage} onNavigate={navigateTo} />
                )}
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;