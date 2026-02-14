import React, { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { Page } from '../types';

interface RegisterPageProps {
  onNavigate: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(name, email, password);
      onNavigate(Page.ONBOARDING);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full h-full bg-black flex flex-col relative animate-[fadeIn_0.3s_ease-out]">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-8 relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white tracking-tight mb-2">onyx</h1>
          <p className="text-xs text-text-dim font-medium uppercase tracking-widest">Fitness</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-text-dim mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-surface-input border-none rounded-xl py-4 px-4 text-white placeholder-text-dim focus:ring-1 focus:ring-white outline-none transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-text-dim mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-surface-input border-none rounded-xl py-4 px-4 text-white placeholder-text-dim focus:ring-1 focus:ring-white outline-none transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-text-dim mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min 6 characters)"
                className="w-full bg-surface-input border-none rounded-xl py-4 px-4 text-white placeholder-text-dim focus:ring-1 focus:ring-white outline-none transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-text-dim mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full bg-surface-input border-none rounded-xl py-4 px-4 text-white placeholder-text-dim focus:ring-1 focus:ring-white outline-none transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all active:scale-95 py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-text-dim">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate(Page.LOGIN)}
                className="text-white font-medium hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
