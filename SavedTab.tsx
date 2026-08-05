import React from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface SavedTabProps {
  savedProperties: Property[];
  onToggleSave: (propertyId: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  onExploreMore: () => void;
}

export const SavedTab: React.FC<SavedTabProps> = ({
  savedProperties,
  onToggleSave,
  onSelectProperty,
  onExploreMore,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#201a1d]">Saved Homes</h1>
          <p className="text-[#504349] text-sm mt-1">
            {savedProperties.length === 0
              ? 'You have no saved properties yet.'
              : `You have ${savedProperties.length} saved property listing${
                  savedProperties.length > 1 ? 's' : ''
                }.`}
          </p>
        </div>

        {savedProperties.length > 0 && (
          <button
            onClick={onExploreMore}
            className="px-5 py-2.5 bg-[#faf1f5] text-[#e040a0] font-bold rounded-full text-xs md:text-sm hover:bg-[#ffd8ed] transition-colors border border-[#ffd8ed] self-start"
          >
            Explore More Properties
          </button>
        )}
      </div>

      {savedProperties.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-[#f4ebef] max-w-lg mx-auto my-12 space-y-4">
          <div className="w-16 h-16 bg-[#faf1f5] text-[#e040a0] rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">favorite_border</span>
          </div>
          <h3 className="text-xl font-bold text-[#201a1d]">No Saved Favorites Yet</h3>
          <p className="text-sm text-[#504349]">
            Tap the heart icon on any property listing to save it here for quick access later.
          </p>
          <button
            onClick={onExploreMore}
            className="px-6 py-3 bg-[#e040a0] text-white font-bold rounded-full text-sm hover:bg-[#390026] transition-colors shadow-sm"
          >
            Start Exploring
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={true}
              onToggleSave={onToggleSave}
              onClick={() => onSelectProperty(property)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
