import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenAiModal: () => void;
  onOpenMobileAppModal: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiModal,
  onOpenMobileAppModal,
  savedCount
}) => {
  return (
    <>
      {/* TopAppBar (Desktop) */}
      <header className="hidden md:flex justify-between items-center w-full px-8 md:px-16 py-4 bg-[#fffbff] shadow-xs sticky top-0 z-50 border-b border-[#f4ebef]">
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => setActiveTab('home')}
        >
          <span 
            className="material-symbols-outlined text-[#e040a0] text-3xl group-hover:scale-105 transition-transform"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            apartment
          </span>
          <span className="font-bold text-3xl tracking-tight text-[#e040a0]">
            MAKAO
          </span>
        </div>

        <nav className="flex gap-2 items-center">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-5 py-2.5 rounded-full font-bold transition-all ${
              activeTab === 'home'
                ? 'bg-[#ffd8ed] text-[#390026]'
                : 'text-[#504349] hover:bg-[#faf1f5]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-5 py-2.5 rounded-full font-bold transition-all ${
              activeTab === 'explore'
                ? 'bg-[#ffd8ed] text-[#390026]'
                : 'text-[#504349] hover:bg-[#faf1f5]'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2.5 rounded-full font-bold transition-all relative ${
              activeTab === 'saved'
                ? 'bg-[#ffd8ed] text-[#390026]'
                : 'text-[#504349] hover:bg-[#faf1f5]'
            }`}
          >
            Saved
            {savedCount > 0 && (
              <span className="ml-2 bg-[#e040a0] text-white text-xs px-2 py-0.5 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-full font-bold transition-all ${
              activeTab === 'bookings'
                ? 'bg-[#ffd8ed] text-[#390026]'
                : 'text-[#504349] hover:bg-[#faf1f5]'
            }`}
          >
            Bookings
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileAppModal}
            className="flex items-center gap-1.5 bg-[#e040a0] text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-[#390026] transition-colors shadow-xs"
            title="Get Mobile App / Package APK"
          >
            <span className="material-symbols-outlined text-lg">get_app</span>
            <span>Mobile App</span>
          </button>

          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-2 bg-[#faf1f5] hover:bg-[#ffd8ed] text-[#e040a0] px-4 py-2 rounded-full font-semibold border border-[#ffd8ed] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
            <span>AI Matchmaker</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#e040a0] rounded-full"
          >
            <img
              alt="User profile avatar"
              className="w-10 h-10 rounded-full border-2 border-[#f4ebef] object-cover hover:border-[#e040a0] transition-colors"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkdLtkxhYwkAzL_8_6VcAf6JpSHKayeX-D-i4Z2j1rw2i_b89tCYdBfmA0I1i0KWsTYUHGZToNbJJiGhm06YDclx-riWH6Wm2ukmP40qGoyJsTYAKfVbfNHLc0w7ZBcFs7CqS4o6isQAVyi9EGztmzMGCKDOQTbCSycYsnO6rAZ_MEMwRXSP6PcfX8D9YJvn_AFtMVrLD8xrxyrsLTnXO699IWNVpDEdL4RiKvalkYXxrRYJBKysqoPA"
            />
          </button>
        </div>
      </header>

      {/* TopAppBar (Mobile) */}
      <header className="md:hidden flex justify-between items-center w-full px-5 py-3.5 bg-[#fffbff] shadow-xs sticky top-0 z-50 border-b border-[#f4ebef]">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('home')}
        >
          <span
            className="material-symbols-outlined text-[#e040a0] text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            apartment
          </span>
          <span className="text-2xl font-bold text-[#e040a0]">MAKAO</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMobileAppModal}
            className="p-2 rounded-full bg-[#e040a0] text-white hover:bg-[#390026] transition-colors"
            title="Download / Install Mobile App"
          >
            <span className="material-symbols-outlined text-xl">get_app</span>
          </button>

          <button
            onClick={onOpenAiModal}
            className="p-2 rounded-full bg-[#faf1f5] text-[#e040a0] hover:bg-[#ffd8ed] transition-colors"
            title="AI Property Assistant"
          >
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className="focus:outline-none focus:ring-2 focus:ring-[#e040a0] rounded-full"
          >
            <img
              alt="User profile avatar"
              className="w-8 h-8 rounded-full border-2 border-[#f4ebef] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1RtkbSLRmkTxXTkL5YkVh4fW_DuknX0BmKIpWSt4wKx3D_LZzchuBPlYL0Ky_xCsTsH95Bin3NOiVe3-HmiLUYVc-HBuG9ivzn8iuHXdSOKTdqDRTjxP6Ns_P-whjj3ux4VBudVYC98BbT9d2fDEN1w80ThASxdW6xw6_L280TRm-nrv8i_yrj0mpUn169bKQ2RphDnRzNapjmMy_wQKZnb8CAH1hFRDg8-GcKuuPuMGF7QKRlMhH-A"
            />
          </button>
        </div>
      </header>
    </>
  );
};
