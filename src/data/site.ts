// All Huna Heights content lives here. Edit this file to update the site.
//
// Anything marked `confirm: true` is a sensible placeholder that the client
// still has to confirm. While REVIEW_MODE is on, those items show a small
// "to confirm" tag on the page so Martin and the client can see them.

export const REVIEW_MODE = true;

// Offerings that depend on the furniture supplier deal. Set to false to hide
// the section, its nav link and its enquiry option in one go.
export const SHOW_FURNISHED_RESIDENCE = true;
export const SHOW_FURNISHING_COLLECTION = true;

export const BRAND = {
  name: 'Huna Heights',
  line: 'Apartments',
  city: 'Nairobi, Kenya',
  welcome: 'Karibu nyumbani',
};

// Contacts. Replace the placeholders with the client's real details.
export const CONTACTS = {
  whatsapp: { number: '254700000000', display: '+254 700 000 000', confirm: true },
  phone: { number: '+254700000000', display: '+254 700 000 000', confirm: true },
  address: { text: 'Nairobi, Kenya', mapQuery: 'Nairobi, Kenya', confirm: true },
  leasing: { label: 'Leasing team', email: 'leasing@hunaheights.co.ke', confirm: true },
  stays: { label: 'Reservations', email: 'stay@hunaheights.co.ke', confirm: true },
  furnishing: { label: 'Property Manager', email: 'manager@hunaheights.co.ke', confirm: true },
  general: { label: 'General enquiries', email: 'info@hunaheights.co.ke', confirm: true },
};

// Photos. Drop the client's photos into /public/images with these names and
// they appear automatically. Until then an elegant placeholder is shown.
export const PHOTOS = {
  hero: '/images/huna-exterior.jpg',
  exteriorAlt: '/images/huna-exterior-2.jpg',
  kitchen: '/images/huna-kitchen.jpg',
  living: '/images/huna-living.jpg',
  bedroom: '/images/huna-bedroom.jpg',
  bathroom: '/images/huna-bathroom.jpg',
  balcony: '/images/huna-balcony.jpg',
  stairwell: '/images/huna-stairwell.jpg',
  furnished: '/images/huna-furnished-living.jpg',
  furnishing: '/images/huna-furnishing.jpg',
};

export const INTRO = {
  heading: 'Modern apartments, made for calm city living.',
  body: [
    'Huna Heights is a contemporary residential building in Nairobi, with bright, generously glazed apartments, private balconies and a secure, well-kept setting.',
    'Lease a home for the long term, or stay a while in our furnished two-bedroom residence.',
  ],
};

export const FACTS = [
  { title: 'Secure parking', text: 'Gated, on-site parking for residents.', confirm: true },
  { title: '24/7 security', text: 'Manned entrance and controlled access.', confirm: true },
  { title: 'Reliable water', text: 'Borehole supply backed by county water.', confirm: true },
  { title: 'Backup power', text: 'Standby generator for common areas and units.', confirm: true },
];

export type Unit = {
  id: string;
  name: string;
  beds: number;
  baths: number;
  size: string;
  rent: string;
  availability: string;
  photo: string;
  features: string[];
  confirm?: boolean;
};

export const UNITS: Unit[] = [
  {
    id: 'two-bed',
    name: 'Two-bedroom apartment',
    beds: 2,
    baths: 2,
    size: 'Size on request',
    rent: 'Rent on request',
    availability: 'Enquire for availability',
    photo: PHOTOS.living,
    features: ['Open-plan living and kitchen', 'Full-height glazing', 'Private balcony'],
    confirm: true,
  },
  {
    id: 'three-bed',
    name: 'Three-bedroom apartment',
    beds: 3,
    baths: 2,
    size: 'Size on request',
    rent: 'Rent on request',
    availability: 'Enquire for availability',
    photo: PHOTOS.kitchen,
    features: ['Fitted wood-finish kitchen', 'Master en-suite', 'Private balcony'],
    confirm: true,
  },
];

export const FURNISHED = {
  eyebrow: 'Short stays',
  heading: 'The Furnished Residence',
  body: 'A fully furnished two-bedroom apartment for short and medium stays, ready to move into with everything you need for a comfortable stay in Nairobi.',
  points: ['Two bedrooms, fully furnished', 'Equipped kitchen and living area', 'Flexible stays, nightly to monthly'],
  rate: 'Rates on request',
  tourUrl: '', // Paste the 3D tour link here when it is ready.
  photo: PHOTOS.furnished,
};

export const FURNISHING = {
  eyebrow: 'Interiors',
  heading: 'The Interior Furnishing Collection',
  body: 'Curated furniture and interior packages, chosen to suit Huna Heights apartments. Residents can furnish their home in one step, coordinated by our Property Manager.',
  packages: [
    { name: 'Essentials', text: 'Living, dining and bedroom basics to move in straight away.' },
    { name: 'Complete', text: 'A fully furnished home, including soft furnishings and lighting.' },
    { name: 'Bespoke', text: 'Pieces selected with you, to your brief and budget.' },
  ],
  photo: PHOTOS.furnishing,
};

export const GALLERY = [
  { src: PHOTOS.hero, label: 'Building exterior', wide: true },
  { src: PHOTOS.kitchen, label: 'Kitchen' },
  { src: PHOTOS.living, label: 'Living room' },
  { src: PHOTOS.bedroom, label: 'Bedroom' },
  { src: PHOTOS.balcony, label: 'Balcony' },
  { src: PHOTOS.stairwell, label: 'Stairwell detail', wide: true },
];

export type EnquiryType = 'leasing' | 'stays' | 'furnishing' | 'general';

export const ENQUIRY_TYPES: { id: EnquiryType; label: string }[] = [
  { id: 'leasing', label: 'Leasing an apartment' },
  ...(SHOW_FURNISHED_RESIDENCE ? [{ id: 'stays' as const, label: 'A stay at the Furnished Residence' }] : []),
  ...(SHOW_FURNISHING_COLLECTION ? [{ id: 'furnishing' as const, label: 'Furnishing packages' }] : []),
  { id: 'general', label: 'Something else' },
];

export const whatsappLink = (text: string) =>
  `https://wa.me/${CONTACTS.whatsapp.number}?text=${encodeURIComponent(text)}`;
