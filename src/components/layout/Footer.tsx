import React from 'react';
import { BookSeaLogo } from '../common/BookSeaLogo';
import { useLibrary, AppView } from '../../context/LibraryContext';
import { BookOpen, ShieldCheck, Sparkles, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setActiveCategoryFilter, showToast } = useLibrary();

  const handleNav = (view: AppView, category?: string) => {
    if (category) {
      setActiveCategoryFilter(category);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A2540] text-slate-300 border-t border-[#0F4C81]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-14 border-b border-white/10">
          {/* Col 1 & 2: Brand Lockup & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <BookSeaLogo size="lg" inverted showTagline />
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-sm pt-2">
              BookSea is the smart digital library platform engineered for college students and researchers.
              Empowering modern higher education with accessible open textbooks, distraction-free reading,
              and academic discovery.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#14B8A6] font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#14B8A6]" />
              <span>Certified Open Academic Resource Partner</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-xs sm:text-sm tracking-wide uppercase">
              Platform
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('explore')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Explore Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('categories')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Browse Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('library')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  My Library & Lists
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  About BookSea
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Academic Disciplines */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-xs sm:text-sm tracking-wide uppercase">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300/80">
              <li>
                <button
                  onClick={() => handleNav('explore', 'Computer Science')}
                  className="hover:text-[#14B8A6] transition-colors"
                >
                  Computer Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('explore', 'Artificial Intelligence')}
                  className="hover:text-[#14B8A6] transition-colors"
                >
                  Artificial Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('explore', 'Data Science')}
                  className="hover:text-[#14B8A6] transition-colors"
                >
                  Data Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('explore', 'Web Development')}
                  className="hover:text-[#14B8A6] transition-colors"
                >
                  Web Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('explore', 'Research and Academic Papers')}
                  className="hover:text-[#14B8A6] transition-colors"
                >
                  Academic Papers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Student Resources */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-xs sm:text-sm tracking-wide uppercase">
              Campus & Support
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300/80">
              <p className="text-xs text-slate-400">
                Institutional access provided for participating universities and self-guided scholars.
              </p>
              <div className="pt-2 space-y-1.5 text-xs">
                <a
                  href="#support"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('BookSea Support Desk: support@booksea.edu · Response within 24h', 'info');
                  }}
                  className="flex items-center gap-1.5 text-[#14B8A6] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@booksea.edu</span>
                </a>
                <span className="block text-slate-400">Hours: Mon-Fri 8:00 - 20:00 PST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} BookSea. All rights reserved. Designed for College Students.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 sm:gap-x-6 gap-y-1.5">
            <button
              onClick={() => handleNav('about')}
              className="hover:text-slate-200 transition-colors"
            >
              Academic Charter
            </button>
            <button
              onClick={() => handleNav('about')}
              className="hover:text-slate-200 transition-colors"
            >
              Student Privacy
            </button>
            <button
              onClick={() => handleNav('about')}
              className="hover:text-slate-200 transition-colors"
            >
              Terms of Educational Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
