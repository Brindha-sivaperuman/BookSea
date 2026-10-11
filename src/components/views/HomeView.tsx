import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Bookmark,
  CheckCircle2,
  Clock,
  Compass,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { BOOKS_DATA, CATEGORIES_DATA } from '../../data/booksData';
import { BookCard } from '../books/BookCard';
import { CategoryCard } from '../books/CategoryCard';
import { BookCoverVisual } from '../common/BookCoverVisual';
import { BookCategory } from '../../types';

export const HomeView: React.FC = () => {
  const {
    setCurrentView,
    setActiveCategoryFilter,
    setGlobalSearchQuery,
    readingProgress,
    openReader,
    openBookDetails,
  } = useLibrary();

  const [searchInput, setSearchInput] = useState('');

  const featuredBooks = BOOKS_DATA.filter((b) => b.isFeatured);
  const popularBooks = BOOKS_DATA.filter((b) => b.isPopular);

  // Recently opened books from readingProgress
  const inProgressBookIds = Object.keys(readingProgress).sort(
    (a, b) => readingProgress[b].lastReadTimestamp - readingProgress[a].lastReadTimestamp
  );
  const inProgressBooks = inProgressBookIds
    .map((id) => BOOKS_DATA.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setGlobalSearchQuery(searchInput.trim());
      setCurrentView('explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryName: BookCategory) => {
    setActiveCategoryFilter(categoryName);
    setCurrentView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 sm:space-y-24">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-4 pb-10 sm:pt-6 sm:pb-12 lg:py-16">
        {/* Subtle Ocean Wave Backdrop Elements with Brand Colors */}
        <div className="absolute top-0 right-0 -z-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-br from-[#14B8A6]/15 via-[#2563EB]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-5 sm:left-10 -z-10 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] bg-gradient-to-tr from-[#0F4C81]/15 via-[#14B8A6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline, Search, CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              {/* Unboxed Brand Subtitle */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#0F4C81] tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] shrink-0" />
                <span>Smart Digital Library Platform</span>
                <span aria-hidden="true" className="text-[#2563EB]">·</span>
                <span className="text-[#2563EB]">For College Students</span>
              </div>

              {/* Required Exact Headline */}
              <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl lg:text-[3.25rem] text-[#0F172A] tracking-tight leading-tight sm:leading-[1.12] text-balance">
                Your Next Great Read Starts Here.
              </h1>

              {/* Required Exact Supporting Text */}
              <p className="text-xs sm:text-lg text-slate-700 leading-relaxed max-w-xl font-medium">
                Explore a world of knowledge, discover books that inspire you, and make every
                reading moment count with BookSea.
              </p>

              {/* Prominent Search Bar */}
              <form
                onSubmit={handleHeroSearchSubmit}
                className="pt-1 sm:pt-2 max-w-xl w-full"
              >
                <div className="relative flex items-center shadow-md sm:shadow-lg shadow-[#0F4C81]/10 rounded-2xl bg-white border-2 border-[#0F4C81]/20 focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/15 transition-all p-1 sm:p-1.5">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F4C81] ml-2 sm:ml-3 mr-1.5 sm:mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search books, authors, subjects..."
                    className="w-full min-w-0 bg-transparent text-xs sm:text-base text-[#0F172A] placeholder-slate-400 focus:outline-none py-1.5 sm:py-2 px-1 placeholder:truncate"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-3 sm:px-6 py-2 sm:py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm shadow-[#2563EB]/30 transition-all whitespace-nowrap flex items-center gap-1 sm:gap-1.5"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6] hidden xs:inline" />
                  </button>
                </div>
              </form>

              {/* Action Buttons */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
                <button
                  onClick={() => {
                    setCurrentView('explore');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto justify-center px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#0F4C81] hover:bg-[#0A3258] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0F4C81]/25 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#14B8A6]" />
                  <span>Explore Books</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('categories');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto justify-center px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-[#F0F9FF] text-[#0F4C81] border-2 border-[#0F4C81]/30 hover:border-[#0F4C81] text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-[#14B8A6]" />
                  <span>Browse Categories</span>
                </button>
              </div>

              {/* Trust Indicators: Unboxed */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0F4C81] shrink-0">
                    <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <span>Curated for College Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#CCFBF1] flex items-center justify-center text-[#0D9488] shrink-0">
                    <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <span>Distraction-Free Digital Reader</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Composition with Generated College Reading Photography */}
            <div className="lg:col-span-5 relative flex justify-center w-full">
              <div className="relative w-full max-w-md">
                {/* Decorative Multi-tone Ocean Current Ring */}
                <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-tr from-[#0F4C81] via-[#14B8A6] to-[#2563EB] rounded-3xl opacity-25 blur-xl pointer-events-none" />

                {/* Primary Photo Showcase */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white">
                  <img
                    src="/src/assets/images/hero_reading_students_1791725275169.jpg"
                    alt="College students reading in modern digital library"
                    className="w-full h-64 sm:h-84 lg:h-96 object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Brand Tag Pill */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#0F4C81]/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold text-white shadow-xs border border-white/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
                    <span>BookSea Open Catalog</span>
                  </div>

                  {/* Bottom Highlight Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-white/80 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0F4C81] to-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#14B8A6]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0F172A] truncate">
                          100% Free Open Access
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                          Digital textbooks & curriculum
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-display font-bold text-[#0F4C81] shrink-0 ml-2">Book<span className="text-[#2563EB]">Sea</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED READS SECTION */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6] mb-1">
              Curated Syllabus Selection
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">
              Featured Reads
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Essential academic textbooks hand-selected by faculty for undergraduate curricula.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-semibold text-[#0F4C81] hover:text-[#2563EB] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View All Textbooks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-column responsive grid as specified */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* BROWSE CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C81] mb-1">
            Academic Fields & Disciplines
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">
            Browse Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2">
            Organized across undergraduate disciplines to help you navigate coursework and research papers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES_DATA.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              iconName={cat.iconName}
              description={cat.description}
              bookCount={cat.bookCount}
              color={cat.color}
              onClick={() => handleCategorySelect(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* POPULAR AMONG STUDENTS SECTION */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-1">
              Campus Trending
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">
              Popular Among Students
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              High-enrollment course readers and computational references most saved this term.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-semibold text-[#0F4C81] hover:text-[#2563EB] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularBooks.slice(0, 4).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* CONTINUE LEARNING SECTION (with authentic empty state if no books opened) */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-5 pb-3 sm:pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-display font-bold text-lg sm:text-2xl text-[#0F172A]">
                Continue Learning
              </h2>
              <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5">
                Resume right where you left off in your study sessions.
              </p>
            </div>
            {inProgressBooks.length > 0 && (
              <button
                onClick={() => {
                  setCurrentView('library');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-[#0F4C81] hover:text-[#2563EB] shrink-0"
              >
                View History
              </button>
            )}
          </div>

          {inProgressBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {inProgressBooks.map((book) => {
                const prog = readingProgress[book.id];
                return (
                  <div
                    key={book.id}
                    className="p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-[#2563EB]/40 bg-[#F0F9FF]/40 hover:bg-white transition-all flex items-center gap-3 sm:gap-4 group"
                  >
                    <div
                      onClick={() => openBookDetails(book.id)}
                      className="cursor-pointer shrink-0"
                    >
                      <BookCoverVisual
                        title={book.title}
                        author={book.author}
                        category={book.category}
                        coverImage={book.coverImage}
                        accentColor={book.accentColor}
                        secondaryColor={book.secondaryColor}
                        size="sm"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold text-[#0F4C81] uppercase tracking-wider">
                        {book.category}
                      </span>
                      <h4
                        onClick={() => openBookDetails(book.id)}
                        className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB] truncate cursor-pointer"
                      >
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        Chapter {prog.currentChapterIndex + 1}
                      </p>

                      {/* Progress bar */}
                      <div className="mt-2.5">
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                          <span>Progress</span>
                          <span className="font-mono font-semibold">{prog.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#14B8A6] h-full rounded-full"
                            style={{ width: `${prog.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => openReader(book.id)}
                        className="mt-3 w-full py-1.5 px-3 bg-[#0F4C81] hover:bg-[#2563EB] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Resume</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Helpful empty state as strictly requested */
            <div className="text-center py-8 sm:py-10 px-4 max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F0F9FF] border border-[#0F4C81]/20 text-[#0F4C81] mx-auto flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-base text-[#0F172A]">
                No Books In Progress Yet
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                When you open any textbook in the digital reader, your reading progress and chapter
                bookmarks will automatically appear here.
              </p>
              <button
                onClick={() => {
                  setCurrentView('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F4C81] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <span>Browse and Start Reading</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION SECTION (Required exact copy) */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F4C81] via-[#0b3860] to-[#2563EB] text-white p-6 sm:p-12 lg:p-16 shadow-xl">
          {/* Subtle wave vector geometry overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 800 300" className="w-full h-full object-cover">
              <path
                d="M0 100 C 150 150, 300 50, 450 100 C 600 150, 750 50, 900 100"
                stroke="#FFFFFF"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M0 160 C 150 210, 300 110, 450 160 C 600 210, 750 110, 900 160"
                stroke="#14B8A6"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl text-left space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-xs font-medium text-[#14B8A6] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Digital Library Initiative</span>
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white leading-tight">
              Make Knowledge Your Daily Habit.
            </h2>

            <p className="text-sm sm:text-lg text-blue-100/90 leading-relaxed">
              Build your personal library and discover something new every day.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentView('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto justify-center px-6 py-3 sm:py-3.5 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
