import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  BookOpen,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { BOOKS_DATA, CATEGORIES_DATA } from '../../data/booksData';
import { BookCard } from '../books/BookCard';
import { BookCategory } from '../../types';

type SortOption = 'relevance' | 'title_asc' | 'rating_desc' | 'year_desc';

export const ExploreView: React.FC = () => {
  const {
    globalSearchQuery,
    setGlobalSearchQuery,
    activeCategoryFilter,
    setActiveCategoryFilter,
  } = useLibrary();

  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const categories = CATEGORIES_DATA.map((c) => c.id);

  // Filter & Search Logic
  const filteredBooks = useMemo(() => {
    let result = [...BOOKS_DATA];

    // Search query
    if (globalSearchQuery.trim()) {
      const q = globalSearchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)) ||
          b.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategoryFilter) {
      result = result.filter((b) => b.category === activeCategoryFilter);
    }

    // Level filter
    if (selectedLevel !== 'all') {
      result = result.filter((b) => b.level === selectedLevel);
    }

    // Format filter
    if (selectedFormat !== 'all') {
      result = result.filter((b) => b.format === selectedFormat);
    }

    // Sorting
    switch (sortBy) {
      case 'title_asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'year_desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'relevance':
      default:
        // Featured and popular prioritized
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.ratingsCount - a.ratingsCount;
        });
        break;
    }

    return result;
  }, [globalSearchQuery, activeCategoryFilter, selectedLevel, selectedFormat, sortBy]);

  const handleClearFilters = () => {
    setGlobalSearchQuery('');
    setActiveCategoryFilter(null);
    setSelectedLevel('all');
    setSelectedFormat('all');
    setSortBy('relevance');
  };

  const hasActiveFilters =
    Boolean(globalSearchQuery) ||
    Boolean(activeCategoryFilter) ||
    selectedLevel !== 'all' ||
    selectedFormat !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
      {/* Header and Title */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6] mb-1">
          Smart Catalog Explorer
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#0F172A]">
          Explore Books & Textbooks
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-1 sm:mt-2 max-w-2xl leading-relaxed">
          Search across open academic textbooks, peer-reviewed monographs, and university course readers.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-6 border-2 border-[#0F4C81]/15 shadow-md shadow-[#0F4C81]/5 space-y-3.5 sm:space-y-5">
        {/* Main Search Row */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F4C81] absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, author, keyword..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="w-full bg-[#F0F9FF] border border-[#0F4C81]/20 rounded-xl pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 text-xs sm:text-base text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15 transition-all placeholder:truncate"
            />
            {globalSearchQuery && (
              <button
                onClick={() => setGlobalSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#0F4C81]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>

          {/* Sort dropdown & Reset */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto appearance-none bg-[#F0F9FF] border border-[#0F4C81]/20 rounded-xl pl-3 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#0F4C81] focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="relevance">Sort: Most Relevant</option>
                <option value="rating_desc">Sort: Highest Rated</option>
                <option value="year_desc">Sort: Newest Editions</option>
                <option value="title_asc">Sort: Title (A–Z)</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F4C81] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs font-bold text-[#0F4C81] hover:bg-[#E0F2FE] rounded-xl border border-[#0F4C81]/30 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Tabs (clean button segmented control) */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveCategoryFilter(null)}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl whitespace-nowrap font-bold transition-all shrink-0 ${
                activeCategoryFilter === null
                  ? 'bg-[#0F4C81] text-white shadow-sm shadow-[#0F4C81]/30'
                  : 'bg-[#F0F9FF] text-[#0F4C81] border border-[#0F4C81]/15 hover:bg-[#E0F2FE]'
              }`}
            >
              All ({BOOKS_DATA.length})
            </button>
            {categories.map((cat) => {
              const count = BOOKS_DATA.filter((b) => b.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl whitespace-nowrap font-bold transition-all shrink-0 ${
                    activeCategoryFilter === cat
                      ? 'bg-[#0F4C81] text-white shadow-sm shadow-[#0F4C81]/30'
                      : 'bg-[#F0F9FF] text-slate-700 border border-slate-200 hover:text-[#0F4C81] hover:bg-[#E0F2FE]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary filters: Academic Level & Format */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 text-xs text-slate-600 pt-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0F4C81]">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-[#F0F9FF] border border-[#0F4C81]/20 rounded-lg px-2 py-1 text-xs text-[#0F172A] font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Introductory">Introductory</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0F4C81]">Type:</span>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="bg-[#F0F9FF] border border-[#0F4C81]/20 rounded-lg px-2 py-1 text-xs text-[#0F172A] font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All</option>
                <option value="Digital Textbook">Textbook</option>
                <option value="Open Research">Research</option>
                <option value="Course Reader">Reader</option>
              </select>
            </div>
          </div>

          {/* Results count indicator */}
          <div className="font-mono text-[#0F4C81] text-[11px] sm:text-xs font-bold bg-[#E0F2FE] px-2.5 py-1 rounded-md border border-[#0F4C81]/15 self-start sm:self-auto">
            {filteredBooks.length} of {BOOKS_DATA.length} materials
          </div>
        </div>
      </div>

      {/* Book Grid or Empty State */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 text-center max-w-xl mx-auto border border-slate-200 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#F0F9FF] border border-[#0F4C81]/20 text-[#0F4C81] mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-display font-semibold text-xl text-[#0F172A]">
            No matching textbooks found
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {globalSearchQuery
              ? `We couldn't find any items matching "${globalSearchQuery}" with the selected filters.`
              : 'No books match the currently selected course level and format filters.'}
            {' '}Try adjusting your criteria or clearing filters.
          </p>
          <div className="pt-2">
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#2563EB] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Search Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
