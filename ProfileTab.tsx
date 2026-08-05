import React, { useState } from 'react';

interface ProfileTabProps {
  savedCount: number;
  bookingsCount: number;
  onOpenMobileAppModal?: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  savedCount,
  bookingsCount,
  onOpenMobileAppModal,
}) => {
  const [tenantName, setTenantName] = useState('Amina Njeri');
  const [phone, setPhone] = useState('+254 712 345 678');
  const [email, setEmail] = useState('amina.njeri@gmail.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-[#201a1d]">Tenant Profile</h1>
        <p className="text-[#504349] text-sm mt-1">
          Manage your personal account, M-Pesa defaults, and notification preferences.
        </p>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#f1dee7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkdLtkxhYwkAzL_8_6VcAf6JpSHKayeX-D-i4Z2j1rw2i_b89tCYdBfmA0I1i0KWsTYUHGZToNbJJiGhm06YDclx-riWH6Wm2ukmP40qGoyJsTYAKfVbfNHLc0w7ZBcFs7CqS4o6isQAVyi9EGztmzMGCKDOQTbCSycYsnO6rAZ_MEMwRXSP6PcfX8D9YJvn_AFtMVrLD8xrxyrsLTnXO699IWNVpDEdL4RiKvalkYXxrRYJBKysqoPA"
            alt="Profile Avatar"
            className="w-20 h-20 rounded-full border-4 border-[#faf1f5] object-cover shadow-xs"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-bold text-[#201a1d]">{tenantName}</h2>
              <span className="material-symbols-outlined text-[#e040a0] text-lg" title="Verified Tenant">verified</span>
            </div>
            <p className="text-xs text-[#504349]">{email}</p>
            <p className="text-xs font-mono text-[#715765] mt-0.5">{phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-around sm:justify-end">
          <div className="bg-[#faf1f5] px-4 py-2.5 rounded-2xl text-center min-w-[90px]">
            <p className="text-lg font-bold text-[#e040a0]">{savedCount}</p>
            <p className="text-[10px] font-bold text-[#504349] uppercase">Saved Homes</p>
          </div>

          <div className="bg-[#faf1f5] px-4 py-2.5 rounded-2xl text-center min-w-[90px]">
            <p className="text-lg font-bold text-[#e040a0]">{bookingsCount}</p>
            <p className="text-[10px] font-bold text-[#504349] uppercase">Bookings</p>
          </div>
        </div>
      </div>

      {/* Account Settings Form */}
      <div className="bg-white rounded-3xl p-6 border border-[#f1dee7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
        <h3 className="text-lg font-bold text-[#201a1d] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#e040a0]">manage_accounts</span>
          Account Information
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#201a1d] mb-1">Full Name</label>
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#201a1d] mb-1">M-Pesa Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#201a1d] mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
            />
          </div>

          {savedSuccess && (
            <div className="bg-[#ffd8ed] text-[#390026] text-xs font-bold p-3 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Profile preferences updated successfully!
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#e040a0] text-white font-bold rounded-full text-xs md:text-sm hover:bg-[#390026] transition-colors shadow-2xs"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Mobile App Download & APK Build Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#f1dee7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#201a1d] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e040a0]">install_mobile</span>
            Android & iOS Mobile Application Center
          </h3>
          <p className="text-xs text-[#504349]">
            Install the MAKAO Progressive Web App (PWA) on your phone or generate store-ready Android APK and iOS Xcode projects.
          </p>
        </div>
        <button
          onClick={onOpenMobileAppModal}
          className="px-5 py-2.5 bg-[#e040a0] text-white font-bold rounded-full text-xs hover:bg-[#390026] transition-colors whitespace-nowrap shadow-2xs flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">get_app</span>
          Open Mobile App Hub
        </button>
      </div>

      {/* Landlord Portal Banner */}
      <div className="bg-gradient-to-r from-[#ffd8ed] to-[#faf1f5] rounded-3xl p-6 border border-[#ffd8ed] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-[#390026] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e040a0]">real_estate_agent</span>
            Are you a Landlord or Property Manager?
          </h3>
          <p className="text-xs text-[#504349]">
            List your apartments, townhomes, or bedsitters on MAKAO to reach thousands of verified Kenyan tenants.
          </p>
        </div>
        <button
          onClick={() => alert('Landlord Partner Registration initiated. MAKAO representative will contact you.')}
          className="px-5 py-2.5 bg-[#e040a0] text-white font-bold rounded-full text-xs hover:bg-[#390026] transition-colors whitespace-nowrap shadow-2xs"
        >
          List Your Property
        </button>
      </div>
    </div>
  );
};
