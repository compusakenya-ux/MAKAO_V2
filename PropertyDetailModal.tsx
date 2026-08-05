import React, { useState, useEffect } from 'react';
import { Property } from '../types';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onBookProperty: (property: Property, moveInDate: string, viewingDate: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onBookProperty,
}) => {
  if (!property) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [viewingDate, setViewingDate] = useState('2026-08-08');
  const [moveInDate, setMoveInDate] = useState('2026-09-01');
  const [mpesaPhone, setMpesaPhone] = useState('0712345678');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // AI neighborhood guide state
  const [neighborhoodGuide, setNeighborhoodGuide] = useState<string | null>(null);
  const [loadingGuide, setLoadingGuide] = useState(false);

  useEffect(() => {
    setActiveImgIndex(0);
    setShowBookingForm(false);
    setBookingSuccess(false);

    // Fetch AI neighborhood guide
    const fetchGuide = async () => {
      setLoadingGuide(true);
      try {
        const res = await fetch('/api/ai/neighborhood-guide', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ location: property.location }),
        });
        const data = await res.json();
        setNeighborhoodGuide(data.summary || null);
      } catch (e) {
        console.error('Failed to load neighborhood guide', e);
      } finally {
        setLoadingGuide(false);
      }
    };

    fetchGuide();
  }, [property]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
      onBookProperty(property, moveInDate, viewingDate);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-[#fffbff] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col border border-[#f1dee7] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close & Favorite */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f4ebef] bg-[#fffbff]/90 sticky top-0 z-10 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e040a0]">apartment</span>
            <span className="font-bold text-[#201a1d] text-lg">{property.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-full transition-colors ${
                isSaved ? 'bg-[#ffd8ed] text-[#e040a0]' : 'bg-[#faf1f5] text-[#504349] hover:bg-[#ffd8ed]'
              }`}
              title={isSaved ? 'Saved' : 'Save'}
            >
              <span 
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#faf1f5] text-[#504349] hover:bg-[#e040a0] hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Photo Gallery */}
          <div>
            <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-3 shadow-inner">
              <img
                src={property.images[activeImgIndex]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-xs font-semibold">
                Photo {activeImgIndex + 1} of {property.images.length}
              </div>
            </div>

            {/* Thumbnail selector */}
            {property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImgIndex === idx ? 'border-[#e040a0] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#faf1f5] p-5 rounded-2xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#ffd8ed] text-[#390026] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">{property.badgeIcon}</span>
                  {property.badgeText}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold bg-white text-[#201a1d] px-2.5 py-1 rounded-full shadow-2xs">
                  <span className="material-symbols-outlined text-[#715765] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  {property.rating.toFixed(1)} ({property.reviewCount} reviews)
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#201a1d] mb-1">{property.title}</h1>
              <p className="text-[#504349] font-medium flex items-center gap-1 text-sm md:text-base">
                <span className="material-symbols-outlined text-base text-[#e040a0]">location_on</span>
                {property.subtitle}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#f1dee7] text-right md:text-right">
              <p className="text-xs text-[#504349] font-bold uppercase">Monthly Rent</p>
              <p className="text-2xl font-extrabold text-[#e040a0]">
                KES {property.priceKes.toLocaleString()}
              </p>
              <p className="text-xs text-[#715765] mt-0.5">Deposit: KES {property.depositKes.toLocaleString()}</p>
            </div>
          </div>

          {/* Specifications Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#f4ebef] p-3.5 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-[#e040a0] text-2xl">bed</span>
              <div>
                <p className="text-xs text-[#504349] font-medium">Bedrooms</p>
                <p className="font-bold text-[#201a1d]">{property.bedrooms === 0 ? 'Studio / Bedsitter' : `${property.bedrooms} Bedrooms`}</p>
              </div>
            </div>

            <div className="bg-[#f4ebef] p-3.5 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-[#e040a0] text-2xl">bathtub</span>
              <div>
                <p className="text-xs text-[#504349] font-medium">Bathrooms</p>
                <p className="font-bold text-[#201a1d]">{property.bathrooms} Baths</p>
              </div>
            </div>

            <div className="bg-[#f4ebef] p-3.5 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-[#e040a0] text-2xl">square_foot</span>
              <div>
                <p className="text-xs text-[#504349] font-medium">Floor Area</p>
                <p className="font-bold text-[#201a1d]">{property.sqft} sqft</p>
              </div>
            </div>

            <div className="bg-[#f4ebef] p-3.5 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-[#e040a0] text-2xl">calendar_today</span>
              <div>
                <p className="text-xs text-[#504349] font-medium">Availability</p>
                <p className="font-bold text-[#201a1d]">{property.availableDate}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-[#201a1d] mb-2">About this Home</h3>
            <p className="text-[#504349] leading-relaxed text-sm md:text-base">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="text-lg font-bold text-[#201a1d] mb-3">Key Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#faf1f5] px-3.5 py-2.5 rounded-xl text-xs md:text-sm text-[#201a1d] font-semibold">
                  <span className="material-symbols-outlined text-[#e040a0] text-base">check_circle</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Neighborhood Guide */}
          <div className="bg-gradient-to-r from-[#faf1f5] to-[#ffd8ed]/30 p-5 rounded-2xl border border-[#ffd8ed]">
            <div className="flex items-center gap-2 mb-2 text-[#e040a0]">
              <span className="material-symbols-outlined">auto_awesome</span>
              <h4 className="font-bold text-sm md:text-base">MAKAO AI Neighborhood Insights ({property.location})</h4>
            </div>
            {loadingGuide ? (
              <div className="text-xs text-[#504349] animate-pulse">Generating neighborhood summary...</div>
            ) : neighborhoodGuide ? (
              <div className="text-xs md:text-sm text-[#504349] leading-relaxed whitespace-pre-line">
                {neighborhoodGuide}
              </div>
            ) : (
              <p className="text-xs text-[#504349]">
                Prime location with excellent access to commercial hubs, reliable water supply, and gated 24/7 security.
              </p>
            )}
          </div>

          {/* Landlord & Contact Section */}
          <div className="bg-[#f4ebef] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={property.landlord.avatar}
                alt={property.landlord.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-bold text-[#201a1d]">{property.landlord.name}</p>
                  {property.landlord.verified && (
                    <span className="material-symbols-outlined text-[#e040a0] text-sm" title="Verified Landlord">verified</span>
                  )}
                </div>
                <p className="text-xs text-[#504349]">Verified MAKAO Property Manager</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${property.landlord.phone}`}
                className="flex-1 sm:flex-initial text-center px-4 py-2.5 bg-white text-[#201a1d] font-bold text-xs md:text-sm rounded-full border border-[#d4c2cb] hover:bg-[#faf1f5] transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">call</span>
                Call Landlord
              </a>
              <button
                onClick={() => setShowBookingForm(true)}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#e040a0] text-white font-bold text-xs md:text-sm rounded-full hover:bg-[#390026] transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">event_available</span>
                Schedule Viewing
              </button>
            </div>
          </div>

          {/* Booking & Viewing Modal / Accordion */}
          {showBookingForm && (
            <div className="bg-white p-6 rounded-2xl border-2 border-[#e040a0] shadow-lg animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#201a1d] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#e040a0]">calendar_month</span>
                  Book Property Viewing / Reserve
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-[#504349] hover:text-[#e040a0]"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {bookingSuccess ? (
                <div className="bg-[#faf1f5] p-6 rounded-2xl text-center space-y-3">
                  <div className="w-14 h-14 bg-[#e040a0] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <span className="material-symbols-outlined text-3xl">check</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-[#201a1d]">Viewing Scheduled Successfully!</h4>
                  <p className="text-sm text-[#504349]">
                    Your request for <strong className="text-[#201a1d]">{property.title}</strong> has been logged.
                    Landlord <strong className="text-[#201a1d]">{property.landlord.name}</strong> will contact you on {mpesaPhone}.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setShowBookingForm(false);
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-[#e040a0] text-white font-bold rounded-full hover:bg-[#390026] transition-colors text-sm"
                    >
                      View in My Bookings
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#201a1d] mb-1">
                        Preferred Viewing Date
                      </label>
                      <input
                        type="date"
                        value={viewingDate}
                        onChange={(e) => setViewingDate(e.target.value)}
                        className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#201a1d] mb-1">
                        Target Move-In Date
                      </label>
                      <input
                        type="date"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                        className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#201a1d] mb-1">
                      M-Pesa Contact Phone Number
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#715765] text-lg">
                        phone
                      </span>
                      <input
                        type="tel"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="e.g. 0712345678"
                        className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-xl pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-[#e040a0] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-[#faf1f5] p-3.5 rounded-xl text-xs text-[#504349] space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>Rent Deposit (1 mo refundable):</span>
                      <span className="text-[#201a1d]">KES {property.depositKes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>MAKAO Viewing Reservation Fee:</span>
                      <span className="text-[#e040a0]">FREE</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="px-4 py-2.5 rounded-full text-xs font-bold text-[#504349] hover:bg-[#faf1f5]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-[#e040a0] text-white font-bold rounded-full text-xs md:text-sm hover:bg-[#390026] transition-colors shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Viewing Appointment'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
