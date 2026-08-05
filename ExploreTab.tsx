import React, { useState, useMemo } from 'react';
import { Property, PropertyCategory } from '../types';
import { PropertyCard } from './PropertyCard';

interface ExploreTabProps {
  properties: Property[];
  savedPropertyIds: string[];
  onToggleSave: (propertyId: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  initialSearchQuery?: string;
  initialCategory?: PropertyCategory;
}

export const ExploreTab: React.FC<ExploreTabProps> = ({
  properties,
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
  initialSearchQuery = '',
  initialCategory = 'All',
}) => {
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>(initialCategory);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [minBedrooms, setMinBedrooms] = useState<number>(0);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Search term
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesLocation = p.location.toLowerCase().includes(query);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesSubtitle && !matchesDesc) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // City
      if (selectedCity !== 'All' && p.city !== selectedCity) {
        return false;
      }

      // Max Price
      if (p.priceKes > maxPrice) {
        return false;
      }

      // Bedrooms
      if (minBedrooms > 0 && p.bedrooms < minBedrooms) {
        return false;
      }

      return true;
    });
  }, [properties, search, selectedCategory, selectedCity, maxPrice, minBedrooms]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#201a1d]">Explore Rentals</h1>
        <p className="text-[#504349] text-sm mt-1">
          Search thousands of verified listings across Kenya with instant lease booking.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-5 rounded-3xl border border-[#f1dee7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
        {/* Search Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#715765]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by neighborhood, street, or amenity (e.g. Lavington, Westlands, Borehole)"
            className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-full py-3 pl-12 pr-10 text-sm text-[#201a1d] focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#715765] hover:text-[#e040a0]"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>

        {/* Dropdowns & Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Location / City */}
          <div>
            <label className="block text-xs font-bold text-[#201a1d] mb-1">Region / City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-xl px-3 py-2 text-xs font-semibold text-[#201a1d] focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
            >
              <option value="All">All Regions (Kenya)</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Nairobi Environs">Nairobi Environs (Kiambu / Ruaka)</option>
              <option value="Mombasa">Mombasa & Coast</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-[#201a1d] mb-1">Housing Type</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as PropertyCategory)}
              className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-xl px-3 py-2 text-xs font-semibold text-[#201a1d] focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
            >
              <option value="All">All Collections</option>
              <option value="1 Bedroom">1 Bedroom</option>
              <option value="2 Bedroom">2 Bedroom</option>
              <option value="3 Bedroom">3 Bedroom</option>
              <option value="Studio">Studio</option>
              <option value="Bedsitter">Bedsitter</option>
              <option value="Single Room">Single Room</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-xs font-bold text-[#201a1d] mb-1">Min Bedrooms</label>
            <select
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(Number(e.target.value))}
              className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-xl px-3 py-2 text-xs font-semibold text-[#201a1d] focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
            >
              <option value={0}>Any Bedrooms</option>
              <option value={1}>1+ Bedrooms</option>
              <option value={2}>2+ Bedrooms</option>
              <option value={3}>3+ Bedrooms</option>
              <option value={4}>4+ Bedrooms</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#201a1d]">Max Rent (KES)</label>
              <span className="text-xs font-bold text-[#e040a0]">
                {maxPrice >= 200000 ? 'Any Price' : `KES ${maxPrice.toLocaleString()}`}
              </span>
            </div>
            <input
              type="range"
              min={15000}
              max={200000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#e040a0]"
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm font-bold text-[#201a1d]">
          Showing {filteredProperties.length} available propert{filteredProperties.length === 1 ? 'y' : 'ies'}
        </p>

        {(search || selectedCategory !== 'All' || selectedCity !== 'All' || maxPrice < 200000 || minBedrooms > 0) && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedCity('All');
              setMaxPrice(200000);
              setMinBedrooms(0);
            }}
            className="text-xs font-bold text-[#e040a0] hover:underline flex items-center gap-1"
          >
            <span>Clear all filters</span>
            <span className="material-symbols-outlined text-xs">close</span>
          </button>
        )}
      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-[#f4ebef] space-y-3">
          <span className="material-symbols-outlined text-4xl text-[#e040a0]">search_off</span>
          <h3 className="text-lg font-bold text-[#201a1d]">No Properties Found</h3>
          <p className="text-xs text-[#504349]">
            Try adjusting your search criteria or price filter to view more listings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={savedPropertyIds.includes(property.id)}
              onToggleSave={onToggleSave}
              onClick={() => onSelectProperty(property)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
