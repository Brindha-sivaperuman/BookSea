import React from 'react';
import {
  Cpu,
  Brain,
  BarChart3,
  Globe,
  Wrench,
  Briefcase,
  BookOpen,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { BookCategory } from '../../types';

interface CategoryCardProps {
  id: BookCategory;
  name: string;
  iconName: string;
  description: string;
  bookCount: number;
  color: string;
  onClick: () => void;
  isSelected?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  iconName,
  description,
  bookCount,
  color,
  onClick,
  isSelected = false,
}) => {
  const getIcon = () => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Brain':
        return <Brain className="w-6 h-6" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6" />;
      case 'Globe':
        return <Globe className="w-6 h-6" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'FileText':
        return <FileText className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group cursor-pointer p-5 sm:p-6 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between ${
        isSelected
          ? 'bg-white border-[#2563EB] ring-2 ring-[#2563EB]/25 shadow-lg'
          : 'bg-gradient-to-br from-white via-white to-[#F0F9FF] border-[#0F4C81]/15 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#0F4C81]/10 hover:-translate-y-1'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 text-white shadow-md shadow-[#0F4C81]/15"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, #0F4C81 100%)`,
            }}
          >
            {getIcon()}
          </div>
          <span className="text-xs font-mono font-bold text-[#0F4C81] bg-[#E0F2FE] px-2.5 py-1 rounded-lg border border-[#0F4C81]/15">
            {bookCount} {bookCount === 1 ? 'course text' : 'course texts'}
          </span>
        </div>

        <h3 className="font-display font-bold text-[#0F172A] text-lg group-hover:text-[#2563EB] transition-colors leading-snug">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-[#0F4C81]/10 flex items-center justify-between text-xs font-bold text-[#0F4C81] group-hover:text-[#2563EB]">
        <span>Explore Subject</span>
        <div className="w-6 h-6 rounded-full bg-[#F0F9FF] group-hover:bg-[#2563EB] group-hover:text-white flex items-center justify-center transition-all">
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
