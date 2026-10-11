import React, { useState } from 'react';
import {
  X,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  GraduationCap,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { BookSeaLogo } from '../common/BookSeaLogo';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, updateUserProfile, showToast } = useLibrary();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('Pacific Coast University');
  const [major, setMajor] = useState('Computer Science');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid academic or university email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Please provide your full student name.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateUserProfile({
        name: mode === 'register' ? name.trim() : email.split('@')[0],
        email,
        university: mode === 'register' ? university : 'Pacific Coast University',
        major: mode === 'register' ? major : 'General Studies',
      });
      showToast(
        mode === 'register'
          ? 'Account created! Welcome to BookSea.'
          : 'Signed in successfully in demo mode.',
        'success'
      );
      setIsAuthOpen(false);
    }, 600);
  };

  const handleQuickDemoLogin = (role: 'cs' | 'ds') => {
    if (role === 'cs') {
      updateUserProfile({
        name: 'Alex Rivera',
        email: 'alex.rivera@university.edu',
        university: 'Pacific Coast University',
        major: 'Computer Science & Software Systems',
        yearOfStudy: 'Junior (3rd Year)',
      });
    } else {
      updateUserProfile({
        name: 'Samantha Vance',
        email: 's.vance@statecollege.edu',
        university: 'State College of Science',
        major: 'Data Science & Applied Statistics',
        yearOfStudy: 'Senior (4th Year)',
      });
    }
    showToast('Signed in with Student Demo profile', 'success');
    setIsAuthOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsAuthOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 flex items-center justify-between">
          <BookSeaLogo size="sm" />
          <button
            onClick={() => setIsAuthOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle: Sign In vs Create Account */}
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => {
              setMode('signin');
              setError(null);
            }}
            className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
              mode === 'signin'
                ? 'border-[#0F4C81] text-[#0F4C81]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
              mode === 'register'
                ? 'border-[#0F4C81] text-[#0F4C81]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Notice of Demo Storage */}
        <div className="bg-[#F0F9FF] px-4 sm:px-6 py-2 sm:py-2.5 border-b border-[#0F4C81]/10 flex items-center gap-2 text-xs text-[#0F4C81]">
          <GraduationCap className="w-4 h-4 shrink-0 text-[#14B8A6]" />
          <span>Demo Mode: Profiles and study data are stored locally in your browser.</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Hayes"
                    className="w-full bg-[#F0F9FF] border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Major / Field
                  </label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="Computer Science"
                    className="w-full bg-[#F0F9FF] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    University
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="College Name"
                    className="w-full bg-[#F0F9FF] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address (.edu or personal)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full bg-[#F0F9FF] border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F0F9FF] border border-slate-200 rounded-xl pl-9 pr-10 py-2 text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#0F4C81] hover:bg-[#2563EB] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : mode === 'signin' ? (
              <span>Sign In to Student Account</span>
            ) : (
              <span>Create Free Student Account</span>
            )}
          </button>
        </form>

        {/* Quick Demo Pre-filled Credentials */}
        <div className="bg-slate-50 p-5 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center">
            Or test with 1-Click Demo Profiles:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('cs')}
              className="py-1.5 px-2 bg-white hover:bg-[#F0F9FF] border border-slate-200 rounded-lg text-xs font-medium text-[#0F4C81] transition-colors truncate"
            >
              Demo: Alex (CS Junior)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('ds')}
              className="py-1.5 px-2 bg-white hover:bg-[#F0F9FF] border border-slate-200 rounded-lg text-xs font-medium text-[#0F4C81] transition-colors truncate"
            >
              Demo: Samantha (Data Sci)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
