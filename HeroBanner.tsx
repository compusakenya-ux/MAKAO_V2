import React from 'react';
import { HERO_FEATURED_COMMUNITY } from '../data/mockData';

interface HeroBannerProps {
  onSelectFeatured: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectFeatured }) => {
  return (
    <section 
      onClick={onSelectFeatured}
      className="mb-10 w-full h-[320px] md:h-[420px] rounded-[48px] md:rounded-[64px] overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.08)] cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
        style={{ backgroundImage: `url('${HERO_FEATURED_COMMUNITY.imageUrl}')` }}
      />

      {/* Dark Gradient Overlay for Crisp Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex items-end p-8 md:p-12">
        <div className="text-white">
          <div className="inline-flex items-center gap-1.5 bg-[#e040a0]/90 text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-xs">
            <span className="material-symbols-outlined text-sm">stars</span>
            {HERO_FEATURED_COMMUNITY.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2 leading-tight drop-shadow-sm">
            {HERO_FEATURED_COMMUNITY.title}
          </h2>
          <p className="text-white/90 text-sm md:text-base font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-base">location_on</span>
            {HERO_FEATURED_COMMUNITY.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
