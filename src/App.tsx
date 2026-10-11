/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LibraryProvider, useLibrary } from './context/LibraryContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { ExploreView } from './components/views/ExploreView';
import { CategoriesView } from './components/views/CategoriesView';
import { MyLibraryView } from './components/views/MyLibraryView';
import { AboutView } from './components/views/AboutView';
import { ReaderView } from './components/reader/ReaderView';
import { BookDetailModal } from './components/books/BookDetailModal';
import { AuthModal } from './components/modals/AuthModal';
import { UserProfileModal } from './components/modals/UserProfileModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainContent: React.FC = () => {
  const { currentView } = useLibrary();

  // If in immersive digital reading experience
  if (currentView === 'reader') {
    return (
      <div className="min-h-screen">
        <ReaderView />
        <BookDetailModal />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ocean-pattern text-[#0F172A] selection:bg-[#14B8A6]/20 selection:text-[#0F4C81]">
      <Header />
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'categories' && <CategoriesView />}
        {currentView === 'library' && <MyLibraryView />}
        {currentView === 'about' && <AboutView />}
      </main>
      <Footer />

      {/* Global Modals & Notifications */}
      <BookDetailModal />
      <AuthModal />
      <UserProfileModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <LibraryProvider>
      <MainContent />
    </LibraryProvider>
  );
}
