import React, { useState } from 'react';
import {
  Search,
  Bookmark,
  User,
  Menu,
  X,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { BookSeaLogo } from '../common/BookSeaLogo';
import { useLibrary, AppView } from '../../context/LibraryContext';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    savedBookIds,
    userProfile,
    setIsProfileOpen,
    setIsAuthOpen,
    globalSearchQuery,
    setGlobalSearchQuery,
  } = useLibrary();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearchFocused, setHeaderSearchFocused] = useState(false);

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentView !== 'explore') {
      setCurrentView('explore');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_2px_8px_rgba(15,76,129,0.06)] transition-colors">
      {/* Signature BookSea Top Accent Band */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0F4C81] via-[#2563EB] to-[#14B8A6]" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="shrink-0 flex items-center">
            <BookSeaLogo
              size="md"
              showTagline={false}
              onClick={() => handleNavClick('home')}
            />
          </div>

          {/* Desktop Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center flex-1 max-w-md relative"
          >
            <div
              className={`w-full flex items-center bg-[#F0F9FF] border rounded-xl px-3.5 py-2 transition-all duration-200 ${
                headerSearchFocused
                  ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 bg-white shadow-sm'
                  : 'border-[#0F4C81]/20 hover:border-[#0F4C81]/40'
              }`}
            >
              <Search className="w-4 h-4 text-[#0F4C81] shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Search textbooks, topics, authors..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                onFocus={() => setHeaderSearchFocused(true)}
                onBlur={() => setHeaderSearchFocused(false)}
                className="w-full bg-transparent text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none"
              />
              {globalSearchQuery && (
                <button
                  type="button"
                  onClick={() => setGlobalSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-[#0F4C81] font-medium px-1"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {/* Zone 2: Navigation Links (single-line, clean) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`whitespace-nowrap transition-colors py-1 relative ${
                currentView === 'home'
                  ? 'text-[#0F4C81] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F4C81]'
                  : 'text-slate-600 hover:text-[#0F4C81]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('explore')}
              className={`whitespace-nowrap transition-colors py-1 relative ${
                currentView === 'explore'
                  ? 'text-[#0F4C81] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F4C81]'
                  : 'text-slate-600 hover:text-[#0F4C81]'
              }`}
            >
              Explore
            </button>

            <button
              onClick={() => handleNavClick('categories')}
              className={`whitespace-nowrap transition-colors py-1 relative ${
                currentView === 'categories'
                  ? 'text-[#0F4C81] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F4C81]'
                  : 'text-slate-600 hover:text-[#0F4C81]'
              }`}
            >
              Categories
            </button>

            <button
              onClick={() => handleNavClick('library')}
              className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1.5 ${
                currentView === 'library'
                  ? 'text-[#0F4C81] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F4C81]'
                  : 'text-slate-600 hover:text-[#0F4C81]'
              }`}
            >
              <span>My Library</span>
              {savedBookIds.length > 0 && (
                <span className="font-mono text-xs px-2 py-0.5 bg-[#14B8A6] text-white font-semibold rounded-md shadow-xs">
                  {savedBookIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`whitespace-nowrap transition-colors py-1 relative ${
                currentView === 'about'
                  ? 'text-[#0F4C81] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0F4C81]'
                  : 'text-slate-600 hover:text-[#0F4C81]'
              }`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: Primary Action / User Profile */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {userProfile ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#0F4C81]/25 hover:border-[#2563EB] bg-[#F0F9FF] hover:bg-white text-xs font-semibold text-[#0F172A] shadow-xs transition-all"
                title="Student Profile"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0F4C81] to-[#2563EB] text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
                  {userProfile.name.charAt(0)}
                </div>
                <span className="max-w-[100px] truncate text-[#0F172A]">
                  {userProfile.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0F4C81] hover:bg-[#0A3258] rounded-xl shadow-xs transition-all whitespace-nowrap"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => handleNavClick('explore')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-sm shadow-[#2563EB]/25 transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Browse Catalog</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 text-slate-600 hover:text-[#0F4C81] rounded-lg"
              aria-label="Student Profile"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0F4C81] to-[#2563EB] text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
                {userProfile?.name ? userProfile.name.charAt(0) : 'S'}
              </div>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0F4C81] rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar if viewport < lg */}
        <div className="lg:hidden pb-3 pt-0.5">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search books, authors, subjects..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="w-full bg-[#F0F9FF] border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB]"
            />
            {globalSearchQuery && (
              <button
                type="button"
                onClick={() => setGlobalSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#0F4C81]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg max-h-[calc(100vh-90px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'home'
                  ? 'bg-[#F0F9FF] text-[#0F4C81] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('explore')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'explore'
                  ? 'bg-[#F0F9FF] text-[#0F4C81] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Explore Books
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'categories'
                  ? 'bg-[#F0F9FF] text-[#0F4C81] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('library')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentView === 'library'
                  ? 'bg-[#F0F9FF] text-[#0F4C81] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>My Library</span>
              <span className="text-xs bg-[#0F4C81] text-white px-2 py-0.5 rounded-full font-mono">
                {savedBookIds.length}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'about'
                  ? 'bg-[#F0F9FF] text-[#0F4C81] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About BookSea
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsProfileOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg border border-slate-200 bg-[#F0F9FF] text-xs font-semibold text-[#0F4C81] flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Student Profile ({userProfile?.name ? userProfile.name.split(' ')[0] : 'Student'})</span>
            </button>
            <button
              onClick={() => {
                setIsAuthOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#0F4C81] text-xs font-semibold text-white flex items-center justify-center gap-2"
            >
              <span>Demo Account & Switch User</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
