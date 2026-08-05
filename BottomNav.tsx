import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 py-2.5 pb-5 bg-[#fffbff] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] rounded-t-3xl border-t border-[#f4ebef]">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all rounded-full ${
          activeTab === 'home'
            ? 'text-[#390026] bg-[#ffd8ed] font-bold'
            : 'text-[#504349] hover:text-[#e040a0]'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl mb-0.5"
          style={{
            fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          home
        </span>
        <span className="text-xs">Home</span>
      </button>

      <button
        onClick={() => setActiveTab('explore')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all rounded-full ${
          activeTab === 'explore'
            ? 'text-[#390026] bg-[#ffd8ed] font-bold'
            : 'text-[#504349] hover:text-[#e040a0]'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl mb-0.5"
          style={{
            fontVariationSettings: activeTab === 'explore' ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          search
        </span>
        <span className="text-xs">Explore</span>
      </button>

      <button
        onClick={() => setActiveTab('saved')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all rounded-full relative ${
          activeTab === 'saved'
            ? 'text-[#390026] bg-[#ffd8ed] font-bold'
            : 'text-[#504349] hover:text-[#e040a0]'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl mb-0.5"
          style={{
            fontVariationSettings: activeTab === 'saved' ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          favorite
        </span>
        <span className="text-xs">Saved</span>
        {savedCount > 0 && (
          <span className="absolute top-1 right-2 w-4 h-4 bg-[#e040a0] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {savedCount}
          </span>
        )}
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all rounded-full ${
          activeTab === 'profile'
            ? 'text-[#390026] bg-[#ffd8ed] font-bold'
            : 'text-[#504349] hover:text-[#e040a0]'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl mb-0.5"
          style={{
            fontVariationSettings: activeTab === 'profile' ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          person
        </span>
        <span className="text-xs">Profile</span>
      </button>
    </nav>
  );
};
