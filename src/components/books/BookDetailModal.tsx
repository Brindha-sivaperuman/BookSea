import React, { useState } from 'react';
import {
  X,
  Star,
  Bookmark,
  BookOpen,
  Calendar,
  Layers,
  Building2,
  Barcode,
  GraduationCap,
  Check,
  Clock,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { BOOKS_DATA } from '../../data/booksData';
import { BookCoverVisual } from '../common/BookCoverVisual';
import { ReadingStatus } from '../../types';

export const BookDetailModal: React.FC = () => {
  const {
    selectedBookId,
    isBookDetailsOpen,
    closeBookDetails,
    openReader,
    toggleSaveBook,
    isBookSaved,
    readingList,
    setBookReadingStatus,
    getBookProgress,
    openBookDetails,
    showToast,
  } = useLibrary();

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  if (!isBookDetailsOpen || !selectedBookId) return null;

  const book = BOOKS_DATA.find((b) => b.id === selectedBookId);
  if (!book) return null;

  const saved = isBookSaved(book.id);
  const currentReadingItem = readingList.find((i) => i.bookId === book.id);
  const currentStatus = currentReadingItem ? currentReadingItem.status : null;
  const progress = getBookProgress(book.id);

  // Related books in the same category
  const relatedBooks = BOOKS_DATA.filter(
    (b) => b.category === book.category && b.id !== book.id
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out "${book.title}" by ${book.author} on BookSea Digital Library!`
      );
      showToast('Book details link copied to clipboard', 'info');
    } else {
      showToast('Book details link copied', 'info');
    }
  };

  const statusOptions: { value: ReadingStatus; label: string; desc: string }[] = [
    { value: 'want_to_read', label: 'Want to Read', desc: 'Add to upcoming study queue' },
    { value: 'reading', label: 'Currently Reading', desc: 'Track reading progress in My Library' },
    { value: 'finished', label: 'Finished', desc: 'Mark as read and completed' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeBookDetails}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Close and Share */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#0F4C81] truncate pr-2">
            <span className="uppercase tracking-wider truncate">{book.category}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 font-normal shrink-0">{book.level}</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-[#0F4C81] hover:bg-[#F0F9FF] rounded-lg transition-colors"
              title="Share Book"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeBookDetails}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-8 space-y-5 sm:space-y-8">
          {/* Main Book Presentation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-start">
            {/* Left Column: Cover & Quick Actions */}
            <div className="md:col-span-4 flex flex-col items-center">
              <BookCoverVisual
                title={book.title}
                author={book.author}
                category={book.category}
                coverImage={book.coverImage}
                accentColor={book.accentColor}
                secondaryColor={book.secondaryColor}
                size="md"
                className="sm:w-52 sm:h-72 shadow-xl"
              />

              {/* Availability Notice */}
              <div className="mt-3 sm:mt-4 w-full p-2.5 sm:p-3 bg-[#F0F9FF] rounded-xl border border-[#0F4C81]/15 text-center">
                <span className="text-xs font-semibold text-[#0F4C81] block">
                  Digital Access Available
                </span>
                <span className="text-[11px] text-slate-500">
                  Full student reading view with sample chapters
                </span>
              </div>
            </div>

            {/* Right Column: Title, Author, Rating, Actions */}
            <div className="md:col-span-8 flex flex-col justify-between h-full space-y-3.5 sm:space-y-5">
              <div>
                <h2 className="font-display font-bold text-lg sm:text-3xl text-[#0F172A] leading-tight break-words">
                  {book.title}
                </h2>
                <p className="text-xs sm:text-base text-slate-600 mt-1 sm:mt-2 font-medium">
                  By {book.author}
                </p>

                {/* Rating & Review Stats */}
                <div className="mt-2.5 sm:mt-4 flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 flex-wrap">
                  <div className="flex items-center gap-1 font-semibold text-[#0F172A]">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                    <span>{book.rating.toFixed(2)}</span>
                  </div>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-500">{book.ratingsCount} reviews</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-mono text-[10px] sm:text-xs text-[#0F4C81] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#0F4C81]/20">
                    {book.format}
                  </span>
                </div>

                {/* Description */}
                <div className="mt-3.5 sm:mt-5 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 sm:space-y-3">
                  <p>{book.description}</p>
                </div>

                {/* Tags */}
                <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs text-slate-600 bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="pt-4 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                {/* Read Book CTA */}
                <button
                  onClick={() => openReader(book.id)}
                  className="w-full sm:flex-1 py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md shadow-[#2563EB]/25 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#14B8A6]" />
                  <span>
                    {progress && progress.progressPercent > 0
                      ? `Continue Reading (${progress.progressPercent}%)`
                      : 'Read Book Online'}
                  </span>
                </button>

                {/* Save to Library Toggle */}
                <button
                  onClick={() => toggleSaveBook(book.id)}
                  className={`w-full sm:w-auto py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                    saved
                      ? 'bg-[#14B8A6] text-white border-[#14B8A6] shadow-md shadow-[#14B8A6]/25'
                      : 'bg-[#F0F9FF] text-[#0F4C81] border-[#0F4C81]/25 hover:border-[#0F4C81] hover:bg-[#E0F2FE]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                  <span>{saved ? 'Saved in Library' : 'Save to Library'}</span>
                </button>

                {/* Add to Reading List dropdown */}
                <div className="relative w-full sm:w-auto">
                  <button
                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0F4C81] border border-[#0F4C81]/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4 text-[#2563EB]" />
                    <span>
                      {currentStatus
                        ? statusOptions.find((s) => s.value === currentStatus)?.label
                        : 'Reading List'}
                    </span>
                  </button>

                  {statusDropdownOpen && (
                    <div className="absolute left-0 right-0 sm:left-auto sm:right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-full sm:w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                        Set Study Status
                      </div>
                      {statusOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setBookReadingStatus(book.id, opt.value);
                            setStatusDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs flex items-start gap-2.5 transition-colors ${
                            currentStatus === opt.value
                              ? 'bg-[#F0F9FF] text-[#0F4C81] font-semibold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="mt-0.5">
                            {currentStatus === opt.value ? (
                              <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{opt.label}</div>
                            <div className="text-[10px] text-slate-400 font-normal">
                              {opt.desc}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Publication Specifications */}
          <div className="bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE]/50 to-white rounded-2xl p-4 sm:p-6 border-2 border-[#0F4C81]/15 shadow-xs">
            <h3 className="font-display font-bold text-xs sm:text-sm text-[#0F4C81] mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
              <span>Publication & Bibliographic Details</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-semibold block mb-0.5">Publisher</span>
                <span className="font-bold text-[#0F172A]">{book.publisher}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block mb-0.5">Publication Year</span>
                <span className="font-bold text-[#0F172A]">{book.year}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block mb-0.5">Length</span>
                <span className="font-bold text-[#0F172A] tabular-nums">
                  {book.pages} pages
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block mb-0.5">Academic Level</span>
                <span className="font-bold text-[#0F172A]">{book.level}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block mb-0.5">Format</span>
                <span className="font-bold text-[#0F172A]">{book.format}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block mb-0.5">ISBN-13</span>
                <span className="font-mono text-[11px] font-bold text-[#0F172A]">{book.isbn}</span>
              </div>
            </div>
          </div>

          {/* Table of Contents Preview */}
          <div>
            <h3 className="font-display font-semibold text-lg text-[#0F172A] mb-3">
              Table of Contents ({book.chapters.length} Chapters Available in Reader)
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              {book.chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() => openReader(book.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#F0F9FF] text-[#0F4C81] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {ch.number}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#2563EB] transition-colors">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>~{ch.readingTimeMinutes} min read</span>
                        <span>·</span>
                        <span>{ch.content.length} sections</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#0F4C81] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Recommendations in Same Category */}
          {relatedBooks.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-display font-semibold text-lg text-[#0F172A] mb-4">
                More in {book.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedBooks.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => openBookDetails(rel.id)}
                    className="p-3 rounded-xl border border-slate-200/80 hover:border-[#2563EB]/40 bg-white hover:shadow-md cursor-pointer transition-all flex items-center gap-3"
                  >
                    <BookCoverVisual
                      title={rel.title}
                      author={rel.author}
                      category={rel.category}
                      coverImage={rel.coverImage}
                      accentColor={rel.accentColor}
                      secondaryColor={rel.secondaryColor}
                      size="sm"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-semibold text-[#0F172A] line-clamp-2 hover:text-[#2563EB]">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {rel.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
