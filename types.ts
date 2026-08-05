export type PropertyCategory = 
  | 'All'
  | '1 Bedroom' 
  | '2 Bedroom' 
  | '3 Bedroom' 
  | 'Studio' 
  | 'Bedsitter' 
  | 'Single Room';

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  category: PropertyCategory;
  priceKes: number;
  badgeText: string;
  badgeIcon: 'check_circle' | 'schedule' | 'verified' | 'star';
  rating: number;
  reviewCount: number;
  featured?: boolean;
  images: string[];
  description: string;
  amenities: string[];
  landlord: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
    verified: boolean;
  };
  depositKes: number;
  serviceChargeKes: number;
  availableDate: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  location: string;
  monthlyRentKes: number;
  moveInDate: string;
  status: 'Pending Viewing' | 'Viewing Confirmed' | 'Lease Signed' | 'Completed';
  viewingDate?: string;
  paymentRef?: string;
  createdAt: string;
}

export type TabType = 'home' | 'explore' | 'saved' | 'bookings' | 'profile';
