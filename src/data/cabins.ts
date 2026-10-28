import { Cabin, AddOn, GalleryPhoto } from '../types';

// Placeholder figures (prices, sizes) are marked "to confirm" on the page.
// Replace them with the client's real details.

export const CABINS: Cabin[] = [
  {
    id: 'furnished-residence',
    name: 'The Furnished Residence',
    subtitle: 'Short & medium stays',
    location: 'Huna Heights, Nairobi, Kenya',
    pricePerNight: 580,
    rating: 0,
    reviewsCount: 0,
    guestsMax: 4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 0,
    description:
      'A fully furnished two-bedroom apartment at Huna Heights for short and medium stays. It comes ready to move into, with an equipped kitchen, a comfortable living area and everything you need for a stay in Nairobi.',
    heroImage: '/images/huna-heights-hero.jpg',
    images: [
      '/images/huna-heights-hero.jpg',
      '/images/cabin-interior-lounge.jpg',
      '/images/cabin-bedroom-morning.jpg',
      '/images/cabin-sauna-deck.jpg',
      '/images/cabin-dining-kitchen.jpg',
    ],
    features: [
      'Two bedrooms, fully furnished',
      'Equipped kitchen',
      'Flexible stays, nightly to monthly',
    ],
    architecturalHighlights: [
      {
        title: 'Fully Furnished',
        description: 'Furniture, linen and kitchenware in place, so you can arrive and settle straight in.',
      },
      {
        title: 'Flexible Stays',
        description: 'Book for a few nights, a few weeks or a few months.',
      },
      {
        title: '3D Tour Coming Soon',
        description: 'A virtual walk-through of the residence will be added here.',
      },
    ],
  },
  {
    id: 'two-bedroom-apartment',
    name: 'Two-Bedroom Apartment',
    subtitle: 'Long-term lease',
    location: 'Huna Heights, Nairobi, Kenya',
    pricePerNight: 720,
    rating: 0,
    reviewsCount: 0,
    guestsMax: 4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 0,
    description:
      'An unfurnished two-bedroom apartment for long-term lease, with open-plan living, a fitted kitchen, full-height black-framed glazing and a private balcony. Monthly rent and lease terms on request.',
    heroImage: '/images/cabin-sauna-deck.jpg',
    images: [
      '/images/cabin-sauna-deck.jpg',
      '/images/cabin-interior-lounge.jpg',
      '/images/cabin-bedroom-morning.jpg',
    ],
    features: [
      'Open-plan living and kitchen',
      'Full-height glazing',
      'Private balcony',
    ],
    architecturalHighlights: [
      {
        title: 'Full-Height Glazing',
        description: 'Black-framed windows bring daylight deep into the living space.',
      },
      {
        title: 'Private Balcony',
        description: 'Your own outdoor space, off the living area.',
      },
    ],
  },
  {
    id: 'three-bedroom-apartment',
    name: 'Three-Bedroom Apartment',
    subtitle: 'Long-term lease',
    location: 'Huna Heights, Nairobi, Kenya',
    pricePerNight: 640,
    rating: 0,
    reviewsCount: 0,
    guestsMax: 4,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 0,
    description:
      'A generous three-bedroom apartment for long-term lease, suited to families, with a fitted wood-finish kitchen, bright living spaces and a private balcony. Monthly rent and lease terms on request.',
    heroImage: '/images/cabin-dining-kitchen.jpg',
    images: [
      '/images/cabin-dining-kitchen.jpg',
      '/images/cabin-interior-lounge.jpg',
      '/images/cabin-bedroom-morning.jpg',
    ],
    features: [
      'Fitted wood-finish kitchen',
      'Bright living spaces',
      'Private balcony',
    ],
    architecturalHighlights: [
      {
        title: 'Fitted Kitchen',
        description: 'Wood-finish units with space to cook and dine together.',
      },
      {
        title: 'Room for a Family',
        description: 'Three bedrooms with separate living and dining space.',
      },
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Huna Heights',
    category: 'architecture',
    src: '/images/huna-heights-hero.jpg',
    aspect: 'aspect-[16/10]',
    caption: 'Huna Heights Apartments, Nairobi.',
    details: 'Photo to be replaced with the building exterior',
  },
  {
    id: 'gal-2',
    title: 'Living Room',
    category: 'interiors',
    src: '/images/cabin-interior-lounge.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Open-plan living with full-height glazing.',
    details: 'Photo to be replaced',
  },
  {
    id: 'gal-3',
    title: 'Outdoor Space',
    category: 'outdoor',
    src: '/images/cabin-sauna-deck.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Private balconies and outdoor space.',
    details: 'Photo to be replaced',
  },
  {
    id: 'gal-4',
    title: 'Bedroom',
    category: 'interiors',
    src: '/images/cabin-bedroom-morning.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Bright, quiet bedrooms.',
    details: 'Photo to be replaced',
  },
  {
    id: 'gal-5',
    title: 'Kitchen & Dining',
    category: 'interiors',
    src: '/images/cabin-dining-kitchen.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Fitted kitchen with dining space.',
    details: 'Photo to be replaced',
  },
  {
    id: 'gal-6',
    title: 'Evening',
    category: 'evening',
    src: '/images/cabin-twilight-monolith.png',
    aspect: 'aspect-[4/3]',
    caption: 'Huna Heights in the evening.',
    details: 'Photo to be replaced',
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'airport-pickup',
    name: 'Airport Pickup (JKIA or Wilson)',
    price: 95,
    description: 'A driver meets you on arrival and brings you to Huna Heights. Price to confirm.',
    iconName: 'Flame',
  },
  {
    id: 'welcome-groceries',
    name: 'Welcome Grocery Pack',
    price: 180,
    description: 'Fridge and cupboards stocked with essentials before you arrive. Price to confirm.',
    iconName: 'Utensils',
  },
  {
    id: 'extra-housekeeping',
    name: 'Extra Housekeeping',
    price: 60,
    description: 'Additional cleaning and fresh linen during your stay. Price to confirm.',
    iconName: 'Sparkles',
  },
  {
    id: 'late-checkout',
    name: 'Late Check-Out',
    price: 85,
    description: 'Keep the apartment until the afternoon on your last day, subject to availability. Price to confirm.',
    iconName: 'Wine',
  },
];

// Building facts shown under the hero. All to confirm with the client.
export const PRESS_ACCOLADES = [
  {
    publication: 'Secure Parking',
    quote: 'Gated, on-site parking for residents.',
  },
  {
    publication: '24/7 Security',
    quote: 'Manned entrance and controlled access.',
  },
  {
    publication: 'Reliable Water',
    quote: 'Borehole supply backed by county water.',
  },
  {
    publication: 'Backup Power',
    quote: 'Standby generator for common areas and apartments.',
  },
];
