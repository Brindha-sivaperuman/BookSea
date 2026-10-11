import React, { useState } from 'react';
import {
  Bookmark,
  BookOpen,
  Clock,
  CheckCircle2,
  Trash2,
  ArrowRight,
  Sparkles,
  Search,
  BookMarked,
  Layers,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { BOOKS_DATA } from '../../data/booksData';
import { BookCard } from '../books/BookCard';
import { BookCoverVisual } from '../common/BookCoverVisual';
import { ReadingStatus } from '../../types';

type LibraryTab = 'saved' | 'reading_list' | 'progress';

export const MyLibraryView: React.FC = () => {
  const {
    savedBookIds,
    readingList,
    readingProgress,
    toggleSaveBook,
    removeBookFromReadingList,
    setBookReadingStatus,
    openBookDetails,
    openReader,
    setCurrentView,
  } = useLibrary();

  const [activeTab, setActiveTab] = useState<LibraryTab>('saved');
  const [readingListFilter, setReadingListFilter] = useState<'all' | ReadingStatus>('all');

  // Saved books
  const savedBooks = savedBookIds
    .map((id) => BOOKS_DATA.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  // Reading list books
  const filteredReadingListItems = readingList.filter((item) => {
    if (readingListFilter === 'all') return true;
    return item.status === readingListFilter;
  });

  const readingListBooks = filteredReadingListItems
    .map((item) => ({
      item,
      book: BOOKS_DATA.find((b) => b.id === item.bookId),
    }))
    .filter((entry): entry is { item: typeof entry.item; book: NonNullable<typeof entry.book> } =>
      Boolean(entry.book)
    );

  // In-progress books
  const progressBookIds = Object.keys(readingProgress);
  const progressBooks = progressBookIds
    .map((id) => ({
      progress: readingProgress[id],
      book: BOOKS_DATA.find((b) => b.id === id),
    }))
    .filter((entry): entry is { progress: typeof entry.progress; book: NonNullable<typeof entry.book> } =>
      Boolean(entry.book)
    )
    .sort((a, b) => b.progress.lastReadTimestamp - a.progress.lastReadTimestamp);

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6] mb-1">
            Student Workstation
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#0F172A]">
            My Library & Study Queue
          </h1>
          <p className="text-xs sm:text-base text-slate-600 mt-1.5 sm:mt-2">
            Organize your course readings, track chapter progress, and revisit saved references.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentView('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto justify-center px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm shadow-[#2563EB]/25 transition-all flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-[#14B8A6]" />
          <span>Find More Books</span>
        </button>
      </div>

      {/* Segmented Tab Controls (Zero-Pill discipline: clean segmented control) */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1.5 sm:p-2 border-2 border-[#0F4C81]/15 shadow-md shadow-[#0F4C81]/5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
        <button
          onClick={() => setActiveTab('saved')}
          className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between sm:justify-center gap-2 ${
            activeTab === 'saved'
              ? 'bg-[#0F4C81] text-white shadow-sm shadow-[#0F4C81]/25'
              : 'text-slate-600 hover:text-[#0F4C81] hover:bg-[#F0F9FF]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 shrink-0" />
            <span>Saved Books</span>
          </div>
          <span
            className={`font-mono text-xs px-2 py-0.5 rounded-md font-bold ${
              activeTab === 'saved' ? 'bg-[#14B8A6] text-white' : 'bg-[#E0F2FE] text-[#0F4C81]'
            }`}
          >
            {savedBooks.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reading_list')}
          className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between sm:justify-center gap-2 ${
            activeTab === 'reading_list'
              ? 'bg-[#0F4C81] text-white shadow-sm shadow-[#0F4C81]/25'
              : 'text-slate-600 hover:text-[#0F4C81] hover:bg-[#F0F9FF]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Reading Queue</span>
          </div>
          <span
            className={`font-mono text-xs px-2 py-0.5 rounded-md font-bold ${
              activeTab === 'reading_list' ? 'bg-[#14B8A6] text-white' : 'bg-[#E0F2FE] text-[#0F4C81]'
            }`}
          >
            {readingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('progress')}
          className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between sm:justify-center gap-2 ${
            activeTab === 'progress'
              ? 'bg-[#0F4C81] text-white shadow-sm shadow-[#0F4C81]/25'
              : 'text-slate-600 hover:text-[#0F4C81] hover:bg-[#F0F9FF]'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Reading History</span>
          </div>
          <span
            className={`font-mono text-xs px-2 py-0.5 rounded-md font-bold ${
              activeTab === 'progress' ? 'bg-[#14B8A6] text-white' : 'bg-[#E0F2FE] text-[#0F4C81]'
            }`}
          >
            {progressBooks.length}
          </span>
        </button>
      </div>

      {/* TAB 1: SAVED BOOKS */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          {savedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {savedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F0F9FF] border border-[#0F4C81]/20 text-[#0F4C81] mx-auto flex items-center justify-center">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#0F172A]">
                Your Saved Library is Empty
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Bookmark textbooks and papers while browsing to curate your personal reference shelf
                for the semester.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('explore')}
                  className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#2563EB] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Browse Catalog</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: READING LIST WITH STATUS FILTERS */}
      {activeTab === 'reading_list' && (
        <div className="space-y-6">
          {/* Sub-filter tabs with horizontal overflow */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 text-xs -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
            <span className="font-semibold text-slate-500 mr-1 shrink-0 hidden sm:inline">Status:</span>
            {(
              [
                { id: 'all', label: 'All Items' },
                { id: 'want_to_read', label: 'Want to Read' },
                { id: 'reading', label: 'Currently Reading' },
                { id: 'finished', label: 'Finished' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setReadingListFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 ${
                  readingListFilter === f.id
                    ? 'bg-[#0F4C81] text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {readingListBooks.length > 0 ? (
            <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {readingListBooks.map(({ item, book }) => (
                <div
                  key={book.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
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
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 flex-wrap">
                        <span className="text-[#0F4C81] font-semibold">{book.category}</span>
                        <span>·</span>
                        <span>{book.format}</span>
                      </div>
                      <h3
                        onClick={() => openBookDetails(book.id)}
                        className="font-display font-semibold text-sm sm:text-base text-[#0F172A] hover:text-[#2563EB] cursor-pointer line-clamp-1"
                      >
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{book.author}</p>
                    </div>
                  </div>

                  {/* Actions & Status Pill */}
                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Status Select */}
                    <select
                      value={item.status}
                      onChange={(e) =>
                        setBookReadingStatus(book.id, e.target.value as ReadingStatus)
                      }
                      className="text-xs font-semibold bg-[#F0F9FF] border border-[#0F4C81]/20 text-[#0F4C81] rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                    >
                      <option value="want_to_read">Want to Read</option>
                      <option value="reading">Currently Reading</option>
                      <option value="finished">Finished</option>
                    </select>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openReader(book.id)}
                        className="px-3 sm:px-3.5 py-1.5 bg-[#0F4C81] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read</span>
                      </button>

                      <button
                        onClick={() => removeBookFromReadingList(book.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove from list"
                        aria-label="Remove book from list"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F0F9FF] border border-[#0F4C81]/20 text-[#0F4C81] mx-auto flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#0F172A]">
                No items in this study status
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Add books to your reading list from any book card or details page to plan your syllabus
                reading schedule.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('explore')}
                  className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#2563EB] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Discover Books</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: READING PROGRESS & HISTORY */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          {progressBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {progressBooks.map(({ progress, book }) => (
                <div
                  key={book.id}
                  className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
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
                      <span className="text-[10px] sm:text-[11px] font-semibold text-[#0F4C81] uppercase tracking-wider block">
                        {book.category}
                      </span>
                      <h3
                        onClick={() => openBookDetails(book.id)}
                        className="font-display font-bold text-sm sm:text-base text-[#0F172A] hover:text-[#2563EB] cursor-pointer line-clamp-1 mt-0.5"
                      >
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{book.author}</p>

                      <div className="mt-3 sm:mt-4">
                        <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
                          <span>
                            Ch. {progress.currentChapterIndex + 1} of {book.chapters.length}
                          </span>
                          <span className="font-mono text-[#0F4C81] font-bold">
                            {progress.progressPercent}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#14B8A6] h-full rounded-full transition-all duration-300"
                            style={{ width: `${progress.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5 text-xs text-slate-500">
                    <span className="text-[11px] sm:text-xs text-slate-500">
                      Active: {new Date(progress.lastReadTimestamp).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => openReader(book.id)}
                      className="w-full xs:w-auto justify-center px-4 py-2 bg-[#0F4C81] hover:bg-[#2563EB] text-white rounded-lg font-semibold shadow-sm transition-colors flex items-center gap-1.5 text-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Continue Reading</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center max-w-lg mx-auto border border-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F0F9FF] border border-[#0F4C81]/20 text-[#0F4C81] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-xl text-[#0F172A]">
                No reading progress recorded yet
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Open any book in the digital reader to begin tracking your reading milestones.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('explore')}
                  className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#2563EB] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Start Reading Now</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
