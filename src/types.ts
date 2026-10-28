export interface Cabin {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  guestsMax: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  heroImage: string;
  images: string[];
  features: string[];
  architecturalHighlights: {
    title: string;
    description: string;
  }[];
}

export interface BookingSearch {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  iconName: string;
}

export interface ReservationConfirmation {
  bookingId: string;
  cabin: Cabin;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  addOns: AddOn[];
  nightlyTotal: number;
  cleaningFee: number;
  serviceFee: number;
  tax: number;
  grandTotal: number;
  guestName: string;
  guestEmail: string;
  specialRequests?: string;
  createdAt: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'architecture' | 'interiors' | 'lakeside' | 'nightfall';
  src: string;
  aspect: string;
  caption: string;
  details: string;
}
