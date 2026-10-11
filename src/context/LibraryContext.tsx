import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Book,
  ReadingListItem,
  ReadingProgress,
  ReadingStatus,
  UserProfile,
  ReadingTheme,
  ReaderFontSize,
  ReaderFontFamily,
} from '../types';
import { BOOKS_DATA } from '../data/booksData';

export type AppView = 'home' | 'explore' | 'categories' | 'library' | 'about' | 'reader';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info';
}

interface LibraryContextType {
  // Navigation & View state
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedBookId: string | null;
  setSelectedBookId: (id: string | null) => void;
  activeCategoryFilter: string | null;
  setActiveCategoryFilter: (category: string | null) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  // Modals
  isBookDetailsOpen: boolean;
  openBookDetails: (bookId: string) => void;
  closeBookDetails: () => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;

  // Reader
  readerBookId: string | null;
  openReader: (bookId: string) => void;
  closeReader: () => void;

  // Library & Reading List
  savedBookIds: string[];
  toggleSaveBook: (bookId: string) => void;
  isBookSaved: (bookId: string) => boolean;

  readingList: ReadingListItem[];
  setBookReadingStatus: (bookId: string, status: ReadingStatus) => void;
  removeBookFromReadingList: (bookId: string) => void;
  getBookReadingStatus: (bookId: string) => ReadingStatus | null;

  // Reading Progress
  readingProgress: Record<string, ReadingProgress>;
  updateReadingProgress: (bookId: string, chapterIndex: number, percent: number) => void;
  getBookProgress: (bookId: string) => ReadingProgress | undefined;

  // User Profile (Local Demo)
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  resetAllDemoData: () => void;

  // Toast notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info') => void;
  dismissToast: (id: string) => void;
}

const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  university: 'Pacific Coast University',
  major: 'Computer Science & Software Systems',
  yearOfStudy: 'Junior (3rd Year)',
  readingTheme: 'light',
  fontSize: 'md',
  fontFamily: 'sans',
  joinedDate: 'September 2025',
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);
  const [readerBookId, setReaderBookId] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Local Storage Initialization
  const [savedBookIds, setSavedBookIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('booksea_saved_books');
      return stored ? JSON.parse(stored) : ['algo-modern-approach', 'research-scientific-craft'];
    } catch {
      return ['algo-modern-approach', 'research-scientific-craft'];
    }
  });

  const [readingList, setReadingList] = useState<ReadingListItem[]>(() => {
    try {
      const stored = localStorage.getItem('booksea_reading_list');
      return stored
        ? JSON.parse(stored)
        : [
            { bookId: 'algo-modern-approach', status: 'reading', addedAt: Date.now() - 86400000 * 2 },
            { bookId: 'ai-modern-exploration', status: 'want_to_read', addedAt: Date.now() - 86400000 * 5 },
          ];
    } catch {
      return [
        { bookId: 'algo-modern-approach', status: 'reading', addedAt: Date.now() - 86400000 * 2 },
      ];
    }
  });

  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress>>(() => {
    try {
      const stored = localStorage.getItem('booksea_reading_progress');
      return stored
        ? JSON.parse(stored)
        : {
            'algo-modern-approach': {
              bookId: 'algo-modern-approach',
              currentChapterIndex: 1,
              progressPercent: 42,
              lastReadTimestamp: Date.now() - 3600000 * 3,
            },
          };
    } catch {
      return {};
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('booksea_user_profile');
      return stored ? JSON.parse(stored) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('booksea_saved_books', JSON.stringify(savedBookIds));
    } catch {
      // ignore
    }
  }, [savedBookIds]);

  useEffect(() => {
    try {
      localStorage.setItem('booksea_reading_list', JSON.stringify(readingList));
    } catch {
      // ignore
    }
  }, [readingList]);

  useEffect(() => {
    try {
      localStorage.setItem('booksea_reading_progress', JSON.stringify(readingProgress));
    } catch {
      // ignore
    }
  }, [readingProgress]);

  useEffect(() => {
    try {
      localStorage.setItem('booksea_user_profile', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSaveBook = (bookId: string) => {
    const book = BOOKS_DATA.find((b) => b.id === bookId);
    setSavedBookIds((prev) => {
      const exists = prev.includes(bookId);
      if (exists) {
        showToast(`Removed "${book ? book.title : 'Book'}" from My Library`, 'info');
        return prev.filter((id) => id !== bookId);
      } else {
        showToast(`Saved "${book ? book.title : 'Book'}" to My Library`, 'success');
        return [...prev, bookId];
      }
    });
  };

  const isBookSaved = (bookId: string) => savedBookIds.includes(bookId);

  const setBookReadingStatus = (bookId: string, status: ReadingStatus) => {
    const book = BOOKS_DATA.find((b) => b.id === bookId);
    setReadingList((prev) => {
      const filtered = prev.filter((item) => item.bookId !== bookId);
      return [...filtered, { bookId, status, addedAt: Date.now() }];
    });

    const statusLabels: Record<ReadingStatus, string> = {
      want_to_read: 'Want to Read',
      reading: 'Currently Reading',
      finished: 'Finished',
    };
    showToast(`Marked "${book ? book.title : 'Book'}" as ${statusLabels[status]}`, 'success');
  };

  const removeBookFromReadingList = (bookId: string) => {
    const book = BOOKS_DATA.find((b) => b.id === bookId);
    setReadingList((prev) => prev.filter((item) => item.bookId !== bookId));
    showToast(`Removed "${book ? book.title : 'Book'}" from Reading List`, 'info');
  };

  const getBookReadingStatus = (bookId: string) => {
    const item = readingList.find((i) => i.bookId === bookId);
    return item ? item.status : null;
  };

  const updateReadingProgress = (bookId: string, chapterIndex: number, percent: number) => {
    setReadingProgress((prev) => ({
      ...prev,
      [bookId]: {
        bookId,
        currentChapterIndex: chapterIndex,
        progressPercent: Math.min(100, Math.max(0, percent)),
        lastReadTimestamp: Date.now(),
      },
    }));

    // Auto mark as reading in reading list if not finished
    setReadingList((prev) => {
      const current = prev.find((i) => i.bookId === bookId);
      if (!current) {
        return [...prev, { bookId, status: percent >= 100 ? 'finished' : 'reading', addedAt: Date.now() }];
      }
      if (percent >= 100 && current.status !== 'finished') {
        return prev.map((item) =>
          item.bookId === bookId ? { ...item, status: 'finished' } : item
        );
      }
      if (current.status === 'want_to_read') {
        return prev.map((item) =>
          item.bookId === bookId ? { ...item, status: 'reading' } : item
        );
      }
      return prev;
    });
  };

  const getBookProgress = (bookId: string) => readingProgress[bookId];

  const openBookDetails = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsBookDetailsOpen(true);
  };

  const closeBookDetails = () => {
    setIsBookDetailsOpen(false);
  };

  const openReader = (bookId: string) => {
    setIsBookDetailsOpen(false);
    setReaderBookId(bookId);
    setCurrentView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeReader = () => {
    setReaderBookId(null);
    setCurrentView('home');
  };

  const updateUserProfile = (partial: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...partial }));
    showToast('Profile preferences updated', 'success');
  };

  const resetAllDemoData = () => {
    try {
      localStorage.removeItem('booksea_saved_books');
      localStorage.removeItem('booksea_reading_list');
      localStorage.removeItem('booksea_reading_progress');
      localStorage.removeItem('booksea_user_profile');
    } catch {
      // ignore
    }
    setSavedBookIds(['algo-modern-approach']);
    setReadingList([{ bookId: 'algo-modern-approach', status: 'reading', addedAt: Date.now() }]);
    setReadingProgress({});
    setUserProfile(DEFAULT_USER_PROFILE);
    showToast('Reset demo state to initial configuration', 'info');
  };

  return (
    <LibraryContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedBookId,
        setSelectedBookId,
        activeCategoryFilter,
        setActiveCategoryFilter,
        globalSearchQuery,
        setGlobalSearchQuery,

        isBookDetailsOpen,
        openBookDetails,
        closeBookDetails,
        isAuthOpen,
        setIsAuthOpen,
        isProfileOpen,
        setIsProfileOpen,

        readerBookId,
        openReader,
        closeReader,

        savedBookIds,
        toggleSaveBook,
        isBookSaved,

        readingList,
        setBookReadingStatus,
        removeBookFromReadingList,
        getBookReadingStatus,

        readingProgress,
        updateReadingProgress,
        getBookProgress,

        userProfile,
        updateUserProfile,
        resetAllDemoData,

        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
