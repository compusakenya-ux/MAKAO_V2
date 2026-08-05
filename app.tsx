import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HeroBanner } from './components/HeroBanner';
import { CollectionsBar } from './components/CollectionsBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { MobileAppModal } from './components/MobileAppModal';
import { SavedTab } from './components/SavedTab';
import { BookingsTab } from './components/BookingsTab';
import { ProfileTab } from './components/ProfileTab';
import { ExploreTab } from './components/ExploreTab';

import {
  INITIAL_PROPERTIES,
  HERO_FEATURED_COMMUNITY,
  INITIAL_BOOKINGS,
} from './data/mockData';
import { Property, PropertyCategory, TabType, Booking } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([
    'oakwood-haven',
    'sunset-pines',
  ]);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Selected property modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Category filter on Home tab
  const [homeCategory, setHomeCategory] = useState<PropertyCategory>('All');

  // Search input on Home tab
  const [homeSearch, setHomeSearch] = useState('');

  // AI Assistant modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Mobile App & APK Download modal
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState<'none' | 'iphone' | 'android'>('none');

  // Toggle favorite
  const handleToggleSave = (propertyId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedPropertyIds((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Add booking
  const handleBookProperty = (
    property: Property,
    moveInDate: string,
    viewingDate: string
  ) => {
    const newBooking: Booking = {
      id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      location: property.location,
      monthlyRentKes: property.priceKes,
      moveInDate,
      viewingDate: viewingDate ? `Date: ${viewingDate}` : 'To be confirmed',
      status: 'Viewing Confirmed',
      paymentRef: `MPESA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setBookings((prev) => [newBooking, ...prev]);
  };

  // Saved properties
  const savedProperties = properties.filter((p) =>
    savedPropertyIds.includes(p.id)
  );

  // Filtered properties on Home tab
  const homeFilteredProperties = properties.filter((p) => {
    if (homeCategory !== 'All' && p.category !== homeCategory) {
      return false;
    }
    if (homeSearch.trim()) {
      const q = homeSearch.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const renderAppContent = () => (
    <div className="bg-[#fffbff] text-[#201a1d] min-h-screen pb-24 md:pb-12 font-sans selection:bg-[#ffd8ed] selection:text-[#390026]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenMobileAppModal={() => setIsMobileModalOpen(true)}
        savedCount={savedPropertyIds.length}
      />

      {/* Main Container */}
      <main className="px-5 md:px-16 pt-6 md:pt-8 max-w-[1280px] mx-auto">
        {activeTab === 'home' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Greeting Headline */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#201a1d] tracking-tight leading-tight max-w-3xl">
              Kenya's one-stop for all your Rental Transactions
            </h1>

            {/* Floating Pill Search Bar */}
            <div className="relative w-full max-w-2xl mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-full overflow-hidden border border-[#f1dee7] bg-white group focus-within:ring-2 focus-within:ring-[#e040a0]">
              <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-[#504349] z-10 text-xl">
                search
              </span>
              <input
                value={homeSearch}
                onChange={(e) => setHomeSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setActiveTab('explore');
                  }
                }}
                className="w-full bg-white border-none py-4 pl-14 pr-32 text-base text-[#201a1d] placeholder-[#504349] focus:outline-none rounded-full"
                placeholder="Where do you want to live?"
                type="text"
              />
              <button
                onClick={() => {
                  if (homeSearch.trim()) {
                    setActiveTab('explore');
                  } else {
                    setIsAiModalOpen(true);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#e040a0] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#390026] transition-colors shadow-xs"
              >
                Search
              </button>
            </div>

            {/* Hero Section 3D Illustration */}
            <HeroBanner
              onSelectFeatured={() => {
                const sunnydale = properties.find((p) => p.id === 'oakwood-haven') || properties[0];
                setSelectedProperty(sunnydale);
              }}
            />

            {/* Explore Collections Horizontal Scroll */}
            <CollectionsBar
              selectedCategory={homeCategory}
              onSelectCategory={(cat) => setHomeCategory(cat)}
            />

            {/* Top Family Picks Section */}
            <section className="mb-12 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#201a1d]">Top Family Picks</h3>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-sm font-bold text-[#e040a0] hover:underline flex items-center gap-0.5"
                >
                  <span>See all</span>
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>

              {homeFilteredProperties.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl text-center border border-[#f4ebef] text-sm text-[#504349]">
                  No properties found matching "{homeSearch || homeCategory}".
                  <button
                    onClick={() => {
                      setHomeSearch('');
                      setHomeCategory('All');
                    }}
                    className="ml-2 font-bold text-[#e040a0] underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {homeFilteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isSaved={savedPropertyIds.includes(property.id)}
                      onToggleSave={handleToggleSave}
                      onClick={() => setSelectedProperty(property)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'explore' && (
          <ExploreTab
            properties={properties}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
            onSelectProperty={(p) => setSelectedProperty(p)}
            initialSearchQuery={homeSearch}
            initialCategory={homeCategory}
          />
        )}

        {activeTab === 'saved' && (
          <SavedTab
            savedProperties={savedProperties}
            onToggleSave={handleToggleSave}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onExploreMore={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'bookings' && (
          <BookingsTab
            bookings={bookings}
            onExploreMore={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            savedCount={savedPropertyIds.length}
            bookingsCount={bookings.length}
            onOpenMobileAppModal={() => setIsMobileModalOpen(true)}
          />
        )}

        {/* Global Footer */}
        <footer className="mt-16 mb-10 p-8 bg-[#faf1f5] rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4 text-[#504349] border border-[#f1dee7]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e040a0]">call</span>
            <span className="font-bold text-[#201a1d]">+254 700 000 000</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e040a0]">mail</span>
            <span className="font-bold text-[#201a1d]">hello@makao.co.ke</span>
          </div>

          <div className="text-xs font-semibold text-[#82737a]">
            © 2024 MAKAO Kenya. All rights reserved.
          </div>
        </footer>
      </main>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
        onToggleSave={(id) => handleToggleSave(id)}
        onBookProperty={handleBookProperty}
      />

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectSearchQuery={(q) => {
          setHomeSearch(q);
          setActiveTab('explore');
        }}
      />

      {/* Mobile App Download & APK Export Hub Modal */}
      <MobileAppModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        deviceFrame={deviceFrame}
        setDeviceFrame={setDeviceFrame}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedPropertyIds.length}
      />
    </div>
  );

  if (deviceFrame === 'none') {
    return renderAppContent();
  }

  return (
    <div className="min-h-screen bg-[#201a1d] flex flex-col items-center justify-center p-4 sm:p-8 select-none">
      {/* Device Frame Control Bar */}
      <div className="mb-4 flex items-center gap-3 bg-[#390026] text-white px-5 py-2.5 rounded-full text-xs font-bold border border-[#ffd8ed]/30 shadow-lg">
        <span className="flex items-center gap-1.5 text-[#ffd8ed]">
          <span className="material-symbols-outlined text-base">smartphone</span>
          {deviceFrame === 'iphone' ? 'iPhone 16 Pro View' : 'Android Pixel 9 View'}
        </span>
        <button
          onClick={() => setIsMobileModalOpen(true)}
          className="hover:underline text-white flex items-center gap-1 ml-2"
        >
          <span className="material-symbols-outlined text-sm">get_app</span>
          Download App / APK
        </button>
        <button
          onClick={() => setDeviceFrame('none')}
          className="bg-[#e040a0] px-3 py-1 rounded-full text-white hover:bg-white hover:text-[#390026] transition-colors ml-2"
        >
          Exit Frame
        </button>
      </div>

      {/* Mobile Device Mockup */}
      <div
        className={`relative bg-[#fffbff] overflow-hidden shadow-2xl transition-all duration-300 ${
          deviceFrame === 'iphone'
            ? 'w-[390px] h-[844px] rounded-[52px] border-[14px] border-[#390026] outline outline-4 outline-[#ffd8ed]/40'
            : 'w-[412px] h-[892px] rounded-[48px] border-[12px] border-[#181014] outline outline-4 outline-[#e040a0]/40'
        }`}
      >
        {/* Notch / Dynamic Island */}
        {deviceFrame === 'iphone' ? (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[60] flex items-center justify-end px-2 gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#181014] border border-gray-800" />
          </div>
        ) : (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-[60]" />
        )}

        {/* Mobile Status Bar */}
        <div className="bg-[#fffbff] px-7 pt-3 pb-1 flex justify-between items-center text-[11px] font-bold text-[#201a1d] select-none border-b border-[#f4ebef] z-50 relative">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="material-symbols-outlined text-xs">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-xs">wifi</span>
            <span className="material-symbols-outlined text-xs">battery_5_bar</span>
          </div>
        </div>

        {/* Scaled App Viewport */}
        <div className="h-[calc(100%-36px)] overflow-y-auto">
          {renderAppContent()}
        </div>

        {/* iPhone Home Indicator Bar */}
        {deviceFrame === 'iphone' && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full z-[60]" />
        )}
      </div>
    </div>
  );
}
