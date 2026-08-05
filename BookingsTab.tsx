import React from 'react';
import { Booking } from '../types';

interface BookingsTabProps {
  bookings: Booking[];
  onExploreMore: () => void;
}

export const BookingsTab: React.FC<BookingsTabProps> = ({
  bookings,
  onExploreMore,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#201a1d]">Rental Transactions & Bookings</h1>
          <p className="text-[#504349] text-sm mt-1">
            Track your property viewings, lease agreements, and deposit records.
          </p>
        </div>

        <button
          onClick={onExploreMore}
          className="px-5 py-2.5 bg-[#e040a0] text-white font-bold rounded-full text-xs md:text-sm hover:bg-[#390026] transition-colors shadow-xs self-start"
        >
          Book Another Viewing
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-[#f4ebef] max-w-lg mx-auto my-12 space-y-4">
          <div className="w-16 h-16 bg-[#faf1f5] text-[#e040a0] rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">event_busy</span>
          </div>
          <h3 className="text-xl font-bold text-[#201a1d]">No Active Bookings</h3>
          <p className="text-sm text-[#504349]">
            When you schedule a viewing or reserve a home on MAKAO, your timeline and agreement receipts will appear here.
          </p>
          <button
            onClick={onExploreMore}
            className="px-6 py-3 bg-[#e040a0] text-white font-bold rounded-full text-sm hover:bg-[#390026] transition-colors shadow-sm"
          >
            Find a Home
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-3xl p-6 border border-[#f1dee7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={booking.propertyImage}
                  alt={booking.propertyTitle}
                  className="w-full sm:w-28 h-28 rounded-2xl object-cover shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#ffd8ed] text-[#390026] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      {booking.status}
                    </span>
                    <span className="text-xs text-[#715765] font-mono">Ref: {booking.id}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#201a1d]">{booking.propertyTitle}</h3>
                  <p className="text-xs text-[#504349] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#e040a0]">location_on</span>
                    {booking.location}
                  </p>

                  <div className="pt-2 text-xs text-[#201a1d] space-x-4">
                    <span>Rent: <strong className="text-[#e040a0]">KES {booking.monthlyRentKes.toLocaleString()}/mo</strong></span>
                    {booking.viewingDate && (
                      <span>Viewing: <strong>{booking.viewingDate}</strong></span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-[#f4ebef]">
                {booking.paymentRef && (
                  <div className="bg-[#faf1f5] px-3.5 py-2 rounded-xl text-center">
                    <p className="text-[10px] text-[#715765] uppercase font-bold">M-Pesa Confirmation</p>
                    <p className="text-xs font-mono font-bold text-[#201a1d]">{booking.paymentRef}</p>
                  </div>
                )}

                <button
                  onClick={() => alert(`Showing tenancy agreement draft for ${booking.propertyTitle}`)}
                  className="px-5 py-2.5 bg-[#e040a0] text-white font-bold rounded-full text-xs hover:bg-[#390026] transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">description</span>
                  View Lease Agreement
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
