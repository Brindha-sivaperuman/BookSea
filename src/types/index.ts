export interface Chapter {
  id: string;
  number: number;
  title: string;
  readingTimeMinutes: number;
  content: string[];
}

export type BookCategory =
  | 'Computer Science'
  | 'Artificial Intelligence'
  | 'Data Science'
  | 'Web Development'
  | 'Engineering'
  | 'Business and Management'
  | 'Literature and Fiction'
  | 'Research and Academic Papers';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  rating: number;
  ratingsCount: number;
  year: number;
  publisher: string;
  isbn: string;
  pages: number;
  format: 'Digital Textbook' | 'Open Research' | 'Monograph' | 'Course Reader';
  level: 'Undergraduate' | 'Introductory' | 'Advanced' | 'Graduate';
  description: string;
  coverImage?: string;
  accentColor: string;
  secondaryColor?: string;
  chapters: Chapter[];
  tags: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
}

export type ReadingStatus = 'want_to_read' | 'reading' | 'finished';

export interface ReadingProgress {
  bookId: string;
  currentChapterIndex: number;
  progressPercent: number;
  lastReadTimestamp: number;
  notes?: string[];
}

export interface ReadingListItem {
  bookId: string;
  status: ReadingStatus;
  addedAt: number;
}

export type ReadingTheme = 'light' | 'sepia' | 'dark';
export type ReaderFontSize = 'sm' | 'md' | 'lg' | 'xl';
export type ReaderFontFamily = 'sans' | 'serif';

export interface UserProfile {
  name: string;
  email: string;
  university: string;
  major: string;
  yearOfStudy: string;
  readingTheme: ReadingTheme;
  fontSize: ReaderFontSize;
  fontFamily: ReaderFontFamily;
  joinedDate: string;
}
