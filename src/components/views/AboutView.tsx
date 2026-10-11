import React from 'react';
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Heart,
  Globe,
  Award,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { BookSeaLogo } from '../common/BookSeaLogo';
import { useLibrary } from '../../context/LibraryContext';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useLibrary();

  const testimonials = [
    {
      name: 'Maya Lin',
      major: 'Computer Science, Junior',
      university: 'State Polytechnic University',
      quote:
        'Between algorithm problem sets and systems labs, having clean, open-access textbook readers in one unified tab saved me over $400 this semester alone. The distraction-free reading mode is a game changer.',
    },
    {
      name: 'Marcus Bell',
      major: 'Data Science & Economics, Senior',
      university: 'Cascadia University',
      quote:
        'The search across subjects is incredibly fast. Rather than digging through clunky legacy university portal proxies, BookSea gives me direct access to foundational reading material in seconds.',
    },
    {
      name: 'Elena Rostova',
      major: 'Biomedical Engineering, 2nd Year',
      university: 'Midwest Institute of Technology',
      quote:
        'The reading progress tracker and personalized library help me organize syllabus deadlines without stress. BookSea feels like a modern academic tool built by students who understand our workflow.',
    },
  ];

  const faqs = [
    {
      q: 'Is BookSea really free for college students?',
      a: 'Yes. BookSea is designed to curate open educational resources (OER), peer-reviewed academic textbooks, and institutional digital publications with zero paywalls or recurring subscription fees for students.',
    },
    {
      q: 'Does BookSea save my reading progress across devices?',
      a: 'Your active reading progress, bookmarks, and library queue are saved securely in your browser session using persistent local storage. Cloud institutional single-sign-on integration is also supported in production campus rollouts.',
    },
    {
      q: 'Can professors and teaching assistants recommend textbooks on BookSea?',
      a: 'Yes. Faculty members can create curated course reading lists and direct students to specific chapter permalinks for required weekly readings.',
    },
    {
      q: 'What formats are supported in the BookSea reader?',
      a: 'BookSea supports interactive digital textbooks with adjustable typography, dark/sepia reading themes, structured chapter tables of contents, and responsive mobile rendering.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F0F9FF] text-xs font-semibold text-[#0F4C81] border border-[#0F4C81]/20">
          <GraduationCap className="w-4 h-4 text-[#14B8A6]" />
          <span>About BookSea</span>
        </div>

        <h1 className="font-display font-bold text-2xl sm:text-5xl text-[#0F172A] tracking-tight leading-tight">
          Empowering College Students Through Digital Knowledge.
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
          BookSea was born from a simple belief: access to quality academic textbooks and research
          should be fast, convenient, and empowering for every college student.
        </p>

        <div className="pt-2 text-xs sm:text-sm font-semibold text-[#0F4C81]">
          Discover • Read • Learn
        </div>
      </div>

      {/* Core Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#0F4C81] text-white flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-base sm:text-lg text-[#0F172A]">
            Zero Textbook Barriers
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Eliminating high textbook costs by curating peer-reviewed, open-access academic literature
            and open courseware.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-base sm:text-lg text-[#0F172A]">
            Fast Discovery
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Search by title, author, syllabus topic, or course level with instant responsive filters
            designed for rapid study prep.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#14B8A6] text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-base sm:text-lg text-[#0F172A]">
            Comfortable Reader
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Designed for long study hours with light, sepia, and dark themes, dynamic font resizing, and
            chapter navigation.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#0F4C81] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-base sm:text-lg text-[#0F172A]">
            Student-Centric Privacy
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            No surveillance tracking, no intrusive advertisements, and complete student control over
            reading lists and profile records.
          </p>
        </div>
      </div>

      {/* Student Testimonials */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-1">
            Campus Voices
          </div>
          <h2 className="font-display font-bold text-xl sm:text-3xl text-[#0F172A]">
            Loved by Students Across Universities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100">
                <div className="font-display font-bold text-sm text-[#0F172A]">{t.name}</div>
                <div className="text-xs text-slate-500">{t.major}</div>
                <div className="text-xs text-[#0F4C81] font-medium mt-0.5">{t.university}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6] mb-1">
            Questions & Answers
          </div>
          <h2 className="font-display font-bold text-xl sm:text-3xl text-[#0F172A]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 sm:p-6 space-y-2">
              <h3 className="font-display font-semibold text-sm sm:text-base text-[#0F172A]">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center py-4 sm:py-6">
        <button
          onClick={() => {
            setCurrentView('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-5 sm:px-8 py-3.5 bg-[#0F4C81] hover:bg-[#2563EB] text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-colors inline-flex items-center justify-center gap-2"
        >
          <span>Ready to Explore? Browse Textbooks Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
