import React, { useState } from 'react';
import { Book as BookIcon } from 'lucide-react';

interface BookCoverVisualProps {
  title: string;
  author: string;
  category: string;
  coverImage?: string;
  accentColor?: string;
  secondaryColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BookCoverVisual: React.FC<BookCoverVisualProps> = ({
  title,
  author,
  category,
  coverImage,
  accentColor = '#0F4C81',
  secondaryColor = '#2563EB',
  size = 'md',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-20 h-28 text-[9px]',
    md: 'w-36 h-48 sm:w-40 sm:h-56 text-[11px]',
    lg: 'w-48 h-64 sm:w-56 sm:h-76 text-xs',
    xl: 'w-56 h-76 sm:w-72 sm:h-96 text-sm',
  }[size];

  // If a valid image path exists and hasn't errored
  if (coverImage && !imageError) {
    return (
      <div
        className={`relative aspect-[3/4] ${sizeClasses} rounded-lg overflow-hidden shadow-md shadow-[#0F4C81]/15 border border-slate-200/80 bg-slate-100 group-hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <img
          src={coverImage}
          alt={`Cover of ${title}`}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle spine gradient and page depth sheen */}
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg pointer-events-none" />
      </div>
    );
  }

  // Elegant Academic Geometric Cover Fallback using BookSea Palette
  return (
    <div
      style={{
        background: `linear-gradient(145deg, ${accentColor} 0%, #082847 60%, ${secondaryColor} 100%)`,
      }}
      className={`relative aspect-[3/4] ${sizeClasses} rounded-lg overflow-hidden shadow-md shadow-[#0F4C81]/20 border border-white/20 p-3 sm:p-4 flex flex-col justify-between text-white group-hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Textbook Spine Fold simulation */}
      <div className="absolute inset-y-0 left-0 w-2.5 sm:w-3.5 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />

      {/* Modern Wave & Geometric Vector Grid Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 100 130"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M-10 40 Q25 10 60 45 T110 30"
            fill="none"
            stroke="#14B8A6"
            strokeWidth="1.5"
          />
          <path
            d="M-10 60 Q35 30 75 65 T110 50"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />
          <path
            d="M-10 80 Q45 50 85 85 T110 70"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
          />
          <circle cx="80" cy="25" r="18" fill="none" stroke="#14B8A6" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Top Category Tag & Series Imprint */}
      <div className="relative z-10 flex items-center justify-between gap-1">
        <span className="text-[10px] tracking-wider uppercase font-semibold text-[#14B8A6] truncate max-w-[85%]">
          {category}
        </span>
        <BookIcon className="w-3.5 h-3.5 text-white/50 shrink-0" />
      </div>

      {/* Middle Title & Author */}
      <div className="relative z-10 my-auto py-2">
        <h4 className="font-display font-bold leading-snug line-clamp-3 text-white drop-shadow-sm">
          {title}
        </h4>
        <div className="h-0.5 w-6 bg-[#14B8A6] my-2" />
        <p className="text-white/80 line-clamp-1 font-medium">{author}</p>
      </div>

      {/* Bottom Academic Imprint */}
      <div className="relative z-10 pt-1 border-t border-white/15 flex items-center justify-between text-[9px] text-white/60">
        <span className="truncate">BookSea Academic</span>
        <span className="font-mono text-[#14B8A6] font-semibold">ED.2026</span>
      </div>

      {/* Edge highlight */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" />
    </div>
  );
};
