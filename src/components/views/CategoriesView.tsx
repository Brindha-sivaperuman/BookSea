import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { CATEGORIES_DATA, BOOKS_DATA } from '../../data/booksData';
import { CategoryCard } from '../books/CategoryCard';
import { BookCategory } from '../../types';
import { ArrowRight, BookOpen, Sparkles, Layers } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { setCurrentView, setActiveCategoryFilter, openBookDetails } = useLibrary();

  const handleSelectCategory = (catName: BookCategory) => {
    setActiveCategoryFilter(catName);
    setCurrentView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-12">
      {/* View Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6] mb-1">
          Academic Taxonomy
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#0F172A]">
          Academic Subjects & Collections
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
          Explore specialized literature curated to align directly with major college degrees and
          department course catalogs.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <CategoryCard
            key={cat.id}
            id={cat.id}
            name={cat.name}
            iconName={cat.iconName}
            description={cat.description}
            bookCount={cat.bookCount}
            color={cat.color}
            onClick={() => handleSelectCategory(cat.id)}
          />
        ))}
      </div>

      {/* Detailed Subject Showcase Sections */}
      <div className="space-y-6 sm:space-y-8 pt-2 sm:pt-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h2 className="font-display font-bold text-lg sm:text-xl text-[#0F172A]">
            Department Curriculum Highlights
          </h2>
          <span className="text-xs text-slate-500 font-medium shrink-0">8 Disciplines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const sampleBooks = BOOKS_DATA.filter((b) => b.category === cat.id);
            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded text-white"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {sampleBooks.length} titles
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-4">{cat.description}</p>

                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
                      Featured in this Department:
                    </span>
                    {sampleBooks.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => openBookDetails(b.id)}
                        className="p-2.5 rounded-lg bg-[#F0F9FF] hover:bg-[#e0f2fe] border border-[#0F4C81]/10 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <h4 className="text-xs font-semibold text-[#0F172A] truncate">
                            {b.title}
                          </h4>
                          <span className="text-[11px] text-slate-500 truncate block">
                            {b.author}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-[#0F4C81] shrink-0">
                          View
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleSelectCategory(cat.id)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-[#F0F9FF] text-[#0F4C81] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <span>Browse All {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
