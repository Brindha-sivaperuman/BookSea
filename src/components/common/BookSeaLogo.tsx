import React from 'react';

interface BookSeaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  inverted?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BookSeaLogo: React.FC<BookSeaLogoProps> = ({
  size = 'md',
  showTagline = false,
  inverted = false,
  className = '',
  onClick,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* BookSea Emblem: Open Book with Flowing Ocean Waves */}
      <div
        className={`relative ${iconDimensions} rounded-xl flex items-center justify-center p-1.5 transition-transform duration-200 hover:scale-105 ${
          inverted
            ? 'bg-white/10 ring-1 ring-white/20'
            : 'bg-gradient-to-br from-[#0F4C81] to-[#2563EB] shadow-sm shadow-[#0F4C81]/20'
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Book Spine and Pages Base */}
          <path
            d="M24 10C19.5 7.5 13 8 8 10.5V36.5C13 34 19.5 33.5 24 36C28.5 33.5 35 34 40 36.5V10.5C35 8 28.5 7.5 24 10Z"
            fill={inverted ? '#0F4C81' : '#F0F9FF'}
            fillOpacity={inverted ? '0.3' : '0.95'}
          />
          {/* Left Book Wing / Ocean Current 1 */}
          <path
            d="M8 10.5C13 8 19.5 7.5 24 10V36C19.5 33.5 13 34 8 36.5V10.5Z"
            stroke={inverted ? '#F0F9FF' : '#0F4C81'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Book Wing / Ocean Current 2 */}
          <path
            d="M24 10C28.5 7.5 35 8 40 10.5V36.5C35 34 28.5 33.5 24 36V10Z"
            stroke={inverted ? '#38BDF8' : '#2563EB'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center Spine Divider */}
          <path
            d="M24 10V36"
            stroke={inverted ? '#14B8A6' : '#14B8A6'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Ocean Wave Motif across the pages */}
          <path
            d="M12 22C15 20.5 18 22 21 21"
            stroke={inverted ? '#14B8A6' : '#14B8A6'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M27 21C30 22 33 20.5 36 22"
            stroke={inverted ? '#38BDF8' : '#2563EB'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 28C15 26.5 18 28 21 27"
            stroke={inverted ? '#93C5FD' : '#0F4C81'}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M27 27C30 28 33 26.5 36 28"
            stroke={inverted ? '#14B8A6' : '#14B8A6'}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Wordmark & Optional Tagline */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-display font-bold tracking-tight ${textSize} ${
              inverted ? 'text-white' : 'text-[#0F4C81]'
            }`}
          >
            Book<span className="text-[#2563EB]">Sea</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
        </div>
        {showTagline && (
          <span
            className={`text-[11px] font-medium tracking-wide mt-1 ${
              inverted ? 'text-blue-200/80' : 'text-slate-500'
            }`}
          >
            Discover • Read • Learn
          </span>
        )}
      </div>
    </div>
  );
};
