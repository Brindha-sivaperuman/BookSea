import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  List,
  Type,
  Sun,
  Moon,
  Coffee,
  Bookmark,
  CheckCircle,
  Clock,
  BookOpen,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { BOOKS_DATA } from '../../data/booksData';
import { ReadingTheme, ReaderFontSize, ReaderFontFamily } from '../../types';

export const ReaderView: React.FC = () => {
  const {
    readerBookId,
    closeReader,
    openBookDetails,
    updateReadingProgress,
    getBookProgress,
    userProfile,
    updateUserProfile,
    showToast,
  } = useLibrary();

  const book = BOOKS_DATA.find((b) => b.id === readerBookId);

  // Fallback if no book selected
  if (!book) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <p className="text-slate-500 mb-4">No book is currently loaded in the reader.</p>
        <button
          onClick={closeReader}
          className="px-4 py-2 bg-[#0F4C81] text-white rounded-lg text-sm font-semibold"
        >
          Return to Library
        </button>
      </div>
    );
  }

  const existingProgress = getBookProgress(book.id);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(
    existingProgress ? Math.min(existingProgress.currentChapterIndex, book.chapters.length - 1) : 0
  );
  const [tocOpen, setTocOpen] = useState(false);
  const [typographySettingsOpen, setTypographySettingsOpen] = useState(false);

  // Settings
  const [theme, setTheme] = useState<ReadingTheme>(userProfile.readingTheme || 'light');
  const [fontSize, setFontSize] = useState<ReaderFontSize>(userProfile.fontSize || 'md');
  const [fontFamily, setFontStyle] = useState<ReaderFontFamily>(userProfile.fontFamily || 'sans');

  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Compute progress percent
  const totalChapters = book.chapters.length;
  const currentChapter = book.chapters[currentChapterIdx] || book.chapters[0];
  const progressPercent = Math.round(((currentChapterIdx + 1) / totalChapters) * 100);

  // Track progress when chapter changes
  useEffect(() => {
    updateReadingProgress(book.id, currentChapterIdx, progressPercent);
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentChapterIdx, book.id]);

  const handleNextChapter = () => {
    if (currentChapterIdx < totalChapters - 1) {
      setCurrentChapterIdx((prev) => prev + 1);
    } else {
      updateReadingProgress(book.id, currentChapterIdx, 100);
      showToast(`Finished "${book.title}"! Marked as completed in My Library.`, 'success');
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIdx > 0) {
      setCurrentChapterIdx((prev) => prev - 1);
    }
  };

  const handleThemeChange = (newTheme: ReadingTheme) => {
    setTheme(newTheme);
    updateUserProfile({ readingTheme: newTheme });
  };

  const handleFontSizeChange = (size: ReaderFontSize) => {
    setFontSize(size);
    updateUserProfile({ fontSize: size });
  };

  const handleFontFamilyChange = (fam: ReaderFontFamily) => {
    setFontStyle(fam);
    updateUserProfile({ fontFamily: fam });
  };

  // Styling maps based on theme
  const themeStyles = {
    light: {
      bg: 'bg-[#F0F9FF]',
      paper: 'bg-white text-[#0F172A]',
      headerBg: 'bg-white/95 border-slate-200/80',
      border: 'border-slate-200',
      muted: 'text-slate-500',
      accent: 'text-[#0F4C81]',
      tocBg: 'bg-white',
    },
    sepia: {
      bg: 'bg-[#F4ECD8]',
      paper: 'bg-[#FDF6E2] text-[#433422]',
      headerBg: 'bg-[#EFE3C7]/95 border-[#DFD1B1]',
      border: 'border-[#DFD1B1]',
      muted: 'text-[#7D6B53]',
      accent: 'text-[#87501F]',
      tocBg: 'bg-[#FDF6E2]',
    },
    dark: {
      bg: 'bg-[#090D16]',
      paper: 'bg-[#0F172A] text-slate-100',
      headerBg: 'bg-[#0F172A]/95 border-slate-800',
      border: 'border-slate-800',
      muted: 'text-slate-400',
      accent: 'text-[#38BDF8]',
      tocBg: 'bg-[#0F172A]',
    },
  }[theme];

  // Font size classes for body
  const fontSizeClass = {
    sm: 'text-sm sm:text-base leading-relaxed',
    md: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  return (
    <div className={`min-h-screen ${themeStyles.bg} transition-colors duration-200 flex flex-col`}>
      {/* Top Reader Navigation Bar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b px-2.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${themeStyles.headerBg}`}
      >
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <button
            onClick={() => {
              openBookDetails(book.id);
              closeReader();
            }}
            className={`p-1.5 sm:p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold shrink-0 ${themeStyles.accent} hover:bg-black/5 dark:hover:bg-white/5`}
            title="Back to Details"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Details</span>
          </button>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0" />

          {/* Book Info */}
          <div className="max-w-[110px] xs:max-w-[160px] sm:max-w-md truncate min-w-0">
            <h1 className="text-xs sm:text-sm font-semibold truncate leading-tight">
              {book.title}
            </h1>
            <p className={`text-[10px] sm:text-[11px] truncate ${themeStyles.muted}`}>
              Ch. {currentChapter.number} of {totalChapters}
            </p>
          </div>
        </div>

        {/* Reader Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Table of Contents Button */}
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className={`p-1.5 sm:p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
              tocOpen
                ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                : `${themeStyles.border} hover:bg-black/5`
            }`}
            title="Table of Contents"
          >
            <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">Contents</span>
          </button>

          {/* Typography & Theme Settings Button */}
          <button
            onClick={() => setTypographySettingsOpen(!typographySettingsOpen)}
            className={`p-1.5 sm:p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
              typographySettingsOpen
                ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                : `${themeStyles.border} hover:bg-black/5`
            }`}
            title="Appearance Settings"
          >
            <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">Appearance</span>
          </button>

          {/* Done / Exit */}
          <button
            onClick={closeReader}
            className="px-2.5 sm:px-3 py-1.5 bg-[#0F4C81] hover:bg-[#2563EB] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
          >
            <span>Exit</span><span className="hidden xs:inline"> Reader</span>
          </button>
        </div>
      </header>

      {/* Reading Progress Line */}
      <div className="w-full bg-slate-200/60 dark:bg-slate-800 h-1">
        <div
          className="bg-[#14B8A6] h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Secondary Appearance Drawer */}
      {typographySettingsOpen && (
        <div
          className={`border-b px-3 sm:px-4 py-3 shadow-md animate-in slide-in-from-top-1 ${themeStyles.headerBg}`}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-xs">
            {/* Theme Selectors */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className={`font-semibold ${themeStyles.muted}`}>Theme:</span>
              <button
                onClick={() => handleThemeChange('light')}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border flex items-center gap-1 font-medium ${
                  theme === 'light'
                    ? 'bg-white border-[#0F4C81] text-[#0F4C81] shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => handleThemeChange('sepia')}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border flex items-center gap-1 font-medium ${
                  theme === 'sepia'
                    ? 'bg-[#FDF6E2] border-[#87501F] text-[#87501F] shadow-sm'
                    : 'bg-[#F4ECD8] text-[#7D6B53] border-[#DFD1B1]'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Sepia</span>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border flex items-center gap-1 font-medium ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-[#38BDF8] text-[#38BDF8] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Font Size Selectors */}
              <div className="flex items-center gap-1.5">
                <span className={`font-semibold ${themeStyles.muted}`}>Size:</span>
                {(['sm', 'md', 'lg', 'xl'] as ReaderFontSize[]).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleFontSizeChange(sz)}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center font-bold uppercase text-[10px] sm:text-xs ${
                      fontSize === sz
                        ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                        : 'border-slate-300 hover:bg-black/5'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Font Family */}
              <div className="flex items-center gap-1.5">
                <span className={`font-semibold ${themeStyles.muted}`}>Font:</span>
                <button
                  onClick={() => handleFontFamilyChange('sans')}
                  className={`px-2 py-1 rounded-lg border font-medium text-[11px] sm:text-xs ${
                    fontFamily === 'sans'
                      ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                      : 'border-slate-300 hover:bg-black/5'
                  }`}
                >
                  Sans
                </button>
                <button
                  onClick={() => handleFontFamilyChange('serif')}
                  className={`px-2 py-1 rounded-lg border font-serif font-medium text-[11px] sm:text-xs ${
                    fontFamily === 'serif'
                      ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                      : 'border-slate-300 hover:bg-black/5'
                  }`}
                >
                  Serif
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Area: Table of Contents + Reader Body */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full relative">
        {/* Table of Contents Drawer/Sidebar */}
        {tocOpen && (
          <>
            {/* Mobile Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
              onClick={() => setTocOpen(false)}
            />
            <aside
              className={`w-72 max-w-[82vw] shrink-0 border-r p-4 sm:p-5 overflow-y-auto space-y-4 shadow-2xl md:shadow-none z-50 md:z-30 fixed md:static inset-y-0 left-0 ${themeStyles.tocBg} ${themeStyles.border}`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h2 className="font-display font-semibold text-xs tracking-wider uppercase">
                  Table of Contents
                </h2>
                <button
                  onClick={() => setTocOpen(false)}
                  className="text-xs p-1 text-slate-400 hover:text-slate-600 rounded-md"
                >
                  Close
                </button>
              </div>

              <div className="space-y-1">
                {book.chapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentChapterIdx(idx);
                      setTocOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                      currentChapterIdx === idx
                        ? 'bg-[#0F4C81] text-white font-semibold'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span className="font-mono mt-0.5">{ch.number}.</span>
                    <div>
                      <div className="line-clamp-2">{ch.title}</div>
                      <div className="text-[10px] opacity-70 mt-0.5">
                        {ch.readingTimeMinutes} mins
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </aside>
          </>
        )}

        {/* Main Reading Paper Canvas */}
        <main
          ref={contentContainerRef}
          className="flex-1 overflow-y-auto py-4 sm:py-12 px-2.5 sm:px-8 lg:px-16 flex flex-col items-center"
        >
          <div
            className={`max-w-3xl w-full rounded-xl sm:rounded-2xl p-4 sm:p-12 md:p-16 shadow-lg border ${themeStyles.paper} ${themeStyles.border}`}
          >
            {/* Header info inside reading page */}
            <div className="pb-5 sm:pb-8 mb-5 sm:mb-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono mb-2 flex-wrap gap-1">
                <span className={themeStyles.muted}>
                  CHAPTER {currentChapter.number} OF {totalChapters}
                </span>
                <span className="text-[#14B8A6] font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ~{currentChapter.readingTimeMinutes} min read
                </span>
              </div>
              <h1 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl leading-tight">
                {currentChapter.title}
              </h1>
              <p className={`text-xs sm:text-sm mt-2 sm:mt-3 ${themeStyles.muted}`}>
                From {book.title} · {book.publisher}
              </p>
            </div>

            {/* Reading Content Area */}
            <article
              className={`reader-content ${fontSizeClass} ${
                fontFamily === 'serif' ? 'font-serif' : 'font-body'
              }`}
            >
              {currentChapter.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {pIdx === 0 && (
                    <span className="float-left text-3xl sm:text-5xl font-display font-bold mr-2.5 sm:mr-3 mt-0.5 sm:mt-1 leading-none text-[#0F4C81]">
                      {paragraph.charAt(0)}
                    </span>
                  )}
                  {pIdx === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ))}

              {/* Study Annotation Card */}
              <div className="my-8 sm:my-10 p-4 sm:p-5 rounded-xl border border-dashed border-[#0F4C81]/30 bg-[#F0F9FF]/60 dark:bg-slate-800/60 text-xs sm:text-sm">
                <div className="font-display font-semibold text-[#0F4C81] dark:text-[#38BDF8] mb-1 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-[#14B8A6]" />
                  <span>College Scholar Note</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  You are reading verified open academic demo curriculum prepared for BookSea.
                  Bookmark this section to resume on any device; your reading progress is
                  automatically stored locally in your session.
                </p>
              </div>
            </article>

            {/* Chapter Navigation Controls */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4">
              <button
                onClick={handlePrevChapter}
                disabled={currentChapterIdx === 0}
                className={`py-2 px-2.5 sm:py-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1 sm:gap-1.5 transition-colors shrink-0 ${
                  currentChapterIdx === 0
                    ? 'opacity-40 cursor-not-allowed border-slate-200'
                    : 'border-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Previous Chapter</span>
                <span className="xs:hidden">Prev</span>
              </button>

              <div className="text-[11px] sm:text-xs text-center font-mono opacity-60 shrink-0">
                {currentChapterIdx + 1} / {totalChapters}
              </div>

              <button
                onClick={handleNextChapter}
                className="py-2 px-2.5 sm:py-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#0F4C81] hover:bg-[#2563EB] shadow-sm flex items-center gap-1 sm:gap-1.5 transition-colors shrink-0"
              >
                <span className="hidden xs:inline">
                  {currentChapterIdx === totalChapters - 1
                    ? 'Finish Book'
                    : 'Next Chapter'}
                </span>
                <span className="xs:hidden">
                  {currentChapterIdx === totalChapters - 1
                    ? 'Finish'
                    : 'Next'}
                </span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
