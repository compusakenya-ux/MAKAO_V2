import React from 'react';
import { PropertyCategory } from '../types';

interface CollectionsBarProps {
  selectedCategory: PropertyCategory;
  onSelectCategory: (category: PropertyCategory) => void;
}

interface CollectionItem {
  id: PropertyCategory;
  label: string;
  icon: string;
}

const COLLECTIONS: CollectionItem[] = [
  { id: 'All', label: 'All Homes', icon: 'grid_view' },
  { id: '1 Bedroom', label: '1 Bedroom', icon: 'bedroom_parent' },
  { id: '2 Bedroom', label: '2 Bedroom', icon: 'bedroom_parent' },
  { id: '3 Bedroom', label: '3 Bedroom', icon: 'bedroom_parent' },
  { id: 'Studio', label: 'Studio', icon: 'home_work' },
  { id: 'Bedsitter', label: 'Bedsitter', icon: 'single_bed' },
  { id: 'Single Room', label: 'Single Room', icon: 'person' },
];

export const CollectionsBar: React.FC<CollectionsBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#201a1d]">Explore Collections</h3>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => onSelectCategory('All')}
            className="text-sm font-bold text-[#e040a0] hover:underline flex items-center gap-1"
          >
            <span>Reset filter</span>
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      <div className="flex overflow-x-auto gap-4 pb-2 -mx-5 px-5 md:mx-0 md:px-0 hide-scrollbar">
        {COLLECTIONS.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className="flex flex-col items-center gap-3 min-w-[95px] group focus:outline-none"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#e040a0] text-white shadow-md scale-105'
                    : 'bg-[#faf1f5] text-[#e040a0] group-hover:bg-[#ffd8ed]'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
              </div>
              <span
                className={`text-sm font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'text-[#e040a0] font-bold'
                    : 'text-[#504349] group-hover:text-[#e040a0]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
