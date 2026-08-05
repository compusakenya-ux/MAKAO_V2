import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (propertyId: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onClick,
}) => {
  return (
    <article
      onClick={onClick}
      className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-[#f4ebef]"
    >
      <div className="relative w-full h-52 md:h-60 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
          <span className="material-symbols-outlined text-[#e040a0] text-base">
            {property.badgeIcon}
          </span>
          <span className="text-xs font-bold text-[#201a1d]">
            {property.badgeText}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleSave(property.id, e)}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isSaved
              ? 'bg-[#e040a0] text-white shadow-md'
              : 'bg-white/85 text-[#201a1d] hover:text-[#e040a0] hover:bg-white backdrop-blur-xs'
          }`}
          title={isSaved ? 'Remove from saved' : 'Save property'}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{
              fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            favorite
          </span>
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xl font-bold text-[#201a1d] group-hover:text-[#e040a0] transition-colors truncate pr-2">
              {property.title}
            </h4>
            <div className="flex items-center gap-1 shrink-0 bg-[#faf1f5] px-2.5 py-1 rounded-full">
              <span
                className="material-symbols-outlined text-[#715765] text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="text-xs font-bold text-[#201a1d]">
                {property.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#504349] mb-4">
            {property.subtitle}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-[#f1dee7] pt-4">
          <div>
            <p className="text-xl font-extrabold text-[#201a1d]">
              KES {property.priceKes.toLocaleString()}{' '}
              <span className="text-sm font-normal text-[#504349]">/ mo</span>
            </p>
          </div>
          <span className="text-sm font-bold text-[#e040a0] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
            View details
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </span>
        </div>
      </div>
    </article>
  );
};
