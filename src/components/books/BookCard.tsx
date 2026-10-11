import React from 'react';
import { Bookmark, Star, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Book } from '../../types';
import { BookCoverVisual } from '../common/BookCoverVisual';
import { useLibrary } from '../../context/LibraryContext';

interface BookCardProps {
  book: Book;
  featuredLayout?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, featuredLayout = false }) => {
  const { openBookDetails, openReader, toggleSaveBook, isBookSaved, getBookProgress } =
    useLibrary();

  const saved = isBookSaved(book.id);
  const progress = getBookProgress(book.id);

  return (
    <div className="group bg-white rounded-2xl border border-[#0F4C81]/15 shadow-[0_2px_10px_rgba(15,76,129,0.06)] hover:shadow-[0_12px_28px_rgba(15,76,129,0.14)] hover:border-[#2563EB] transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Media Area with Rich Ocean Gradient Background */}
      <div className="relative p-5 pb-3 bg-gradient-to-b from-[#F0F9FF] via-[#E0F2FE]/60 to-white flex justify-center items-center border-b border-[#0F4C81]/5">
        {/* Quick Save Bookmark Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveBook(book.id);
          }}
          aria-label={saved ? 'Remove from My Library' : 'Save to My Library'}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            saved
              ? 'bg-[#14B8A6] text-white shadow-sm shadow-[#14B8A6]/40'
              : 'bg-white/90 text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white shadow-xs border border-[#0F4C81]/20'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Clickable Cover */}
        <div
          onClick={() => openBookDetails(book.id)}
          className="cursor-pointer transform group-hover:-translate-y-1.5 transition-transform duration-300"
        >
          <BookCoverVisual
            title={book.title}
            author={book.author}
            category={book.category}
            coverImage={book.coverImage}
            accentColor={book.accentColor}
            secondaryColor={book.secondaryColor}
            size="md"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Unboxed Metadata Line (anti-pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5 flex-wrap">
            <span className="text-[#0F4C81] font-bold">{book.category}</span>
            <span aria-hidden="true" className="text-[#14B8A6]">·</span>
            <span>{book.year}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="capitalize text-slate-600">{book.level}</span>
          </div>

          {/* Book Title */}
          <h3
            onClick={() => openBookDetails(book.id)}
            className="font-display font-semibold text-[#0F172A] text-sm sm:text-base group-hover:text-[#2563EB] cursor-pointer line-clamp-2 transition-colors leading-snug break-words"
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-slate-600 mt-1 line-clamp-1 font-medium break-words">
            {book.author}
          </p>

          {/* Rating & Pages stats */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 flex-wrap gap-1">
            <div className="flex items-center gap-1 font-medium text-[#0F172A]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-[#0F172A]">{book.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[11px]">({book.ratingsCount})</span>
            </div>
            <span className="tabular-nums text-slate-500 font-medium text-[11px] sm:text-xs">{book.pages} pages</span>
          </div>

          {/* Progress bar if started reading */}
          {progress && progress.progressPercent > 0 && (
            <div className="mt-2.5">
              <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1">
                <span className="text-[#0F4C81] font-semibold">Reading Progress</span>
                <span className="font-mono text-[#0F4C81] font-bold">{progress.progressPercent}%</span>
              </div>
              <div className="w-full bg-[#E0F2FE] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#0F4C81] to-[#14B8A6] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress.progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Card Action Buttons */}
        <div className="mt-4 pt-3 flex items-center gap-2 border-t border-slate-100/80">
          <button
            onClick={() => openBookDetails(book.id)}
            className="flex-1 min-w-0 py-2 px-2 sm:px-3 rounded-xl text-xs font-semibold text-[#0F4C81] bg-[#F0F9FF] hover:bg-[#0F4C81] hover:text-white border border-[#0F4C81]/25 transition-all text-center truncate shadow-2xs"
          >
            Details
          </button>

          <button
            onClick={() => openReader(book.id)}
            className="flex-1 min-w-0 py-2 px-2 sm:px-3 rounded-xl text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-sm shadow-[#2563EB]/25 transition-all text-center truncate flex items-center justify-center gap-1 sm:gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
            <span>Read</span>
          </button>
        </div>
      </div>
    </div>
  );
};
