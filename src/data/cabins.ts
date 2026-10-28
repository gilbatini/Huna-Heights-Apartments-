import { Cabin, AddOn, GalleryPhoto } from '../types';

export const CABINS: Cabin[] = [
  {
    id: 'the-obsidian-pavilion',
    name: 'The Obsidian Pavilion',
    subtitle: 'Cantilevered Highland Water Sanctuary',
    location: 'Tigoni, Nairobi Highlands, Kenya',
    pricePerNight: 580,
    rating: 4.98,
    reviewsCount: 84,
    guestsMax: 4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1850,
    description:
      'Perched weightlessly over a secluded private spring lake in the cool, misty tea ridges of Tigoni—just 35 minutes from Nairobi. Clad in artisanal charred cedar (Shou Sugi Ban) with 270-degree acoustic glass, it provides uninterrupted communion with highland mists, indigenous bamboo groves, and mirror-still waters.',
    heroImage: '/src/assets/images/huna_heights_hero_1793195294156.jpg',
    images: [
      '/src/assets/images/huna_heights_hero_1793195294156.jpg',
      '/src/assets/images/cabin_interior_lounge_1793190492660.jpg',
      '/src/assets/images/cabin_bedroom_morning_1793190494030.jpg',
      '/src/assets/images/cabin_sauna_deck_1793190494974.jpg',
      '/src/assets/images/cabin_dining_kitchen_1793190494811.jpg',
    ],
    features: [
      'Cantilevered water terrace',
      'Floating cedar barrel sauna & cold plunge',
      'Triple-pane insulated acoustic glass',
      'Minimalist basalt stone fireplace',
      'Highland climate geothermal regulation',
      '100% Off-grid solar microgrid system',
    ],
    architecturalHighlights: [
      {
        title: 'Artisanal Charred Cedar',
        description: 'Sustainable cedar timber hand-charred using Shou Sugi Ban methods for weatherproof durability in Nairobi highland mists.',
      },
      {
        title: 'Acoustic Water Horizon',
        description: 'Submerged floating foundation absorbs vibration, echoing only gentle water ripples and the calls of indigenous birds.',
      },
      {
        title: 'Continuous Horizon Glazing',
        description: 'Frameless acoustic glass dissolves the threshold between cozy interior fireplace warmth and the expansive twilight waters.',
      },
    ],
  },
  {
    id: 'oloiden-monolith-naivasha',
    name: 'The Oloiden Monolith',
    subtitle: 'Great Rift Valley Water Horizon',
    location: 'Lake Naivasha, Great Rift Valley, Kenya',
    pricePerNight: 720,
    rating: 4.96,
    reviewsCount: 62,
    guestsMax: 2,
    bedrooms: 1,
    bathrooms: 1.5,
    sqft: 1420,
    description:
      'An architectural sanctuary anchored along the quiet volcanic waters of Lake Oloiden in the Great Rift Valley, an easy scenic drive from Nairobi. Designed for absolute stillness, golden acacia reflections, and flamingos gliding across the horizon.',
    heroImage: '/src/assets/images/cabin_sauna_deck_1793190494974.jpg',
    images: [
      '/src/assets/images/cabin_sauna_deck_1793190494974.jpg',
      '/src/assets/images/cabin_interior_lounge_1793190492660.jpg',
      '/src/assets/images/cabin_bedroom_morning_1793190494030.jpg',
    ],
    features: [
      'Private floating Nordic barrel sauna',
      'Solar-heated lakeside deck & plunge',
      'Equatorial stargazing skylight above king suite',
      'Custom acoustic sound dampening',
    ],
    architecturalHighlights: [
      {
        title: 'Volcanic Basalt Thermal Mass',
        description: 'Constructed with local Rift Valley volcanic stone to maintain refreshing indoor coolness under the equatorial sun.',
      },
      {
        title: 'Equatorial Sky Aperture',
        description: 'Calibrated ceiling glazing angled for panoramic observation of the Southern Cross and the equatorial Milky Way.',
      },
    ],
  },
  {
    id: 'ngong-ridge-pavilion',
    name: 'The Ngong Ridge Pavilion',
    subtitle: 'Karen & Ngong Forest Sanctuary',
    location: 'Ngong Hills Edge, Nairobi, Kenya',
    pricePerNight: 640,
    rating: 4.99,
    reviewsCount: 77,
    guestsMax: 4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1980,
    description:
      'Floating along a tranquil highland spring dam on the forested slopes of the Ngong Hills bordering Karen, Nairobi. Melds East African modernism with raw basalt stone, smoked oak finishes, and sweeping sunset panoramas.',
    heroImage: '/src/assets/images/cabin_dining_kitchen_1793190494811.jpg',
    images: [
      '/src/assets/images/cabin_dining_kitchen_1793190494811.jpg',
      '/src/assets/images/cabin_interior_lounge_1793190492660.jpg',
      '/src/assets/images/cabin_bedroom_morning_1793190494030.jpg',
    ],
    features: [
      'Private wooden pontoon & sundowner deck',
      'Monolithic basalt chef kitchen',
      'Submerged evening water glow illumination',
      'Aromatic cedar soaking tub with forest vista',
    ],
    architecturalHighlights: [
      {
        title: 'Monolithic Basalt Island',
        description: 'Carved from an unbroken block of Rift Valley basalt stone, forming the sculptural centerpiece of the living space.',
      },
      {
        title: 'Zero-Disturbance Pylons',
        description: 'Low-impact submerged pylons preserve riparian wetland flora while stabilizing the cabin through seasonal rain tides.',
      },
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Huna Heights Floating Monolith at Dusk',
    category: 'architecture',
    src: '/src/assets/images/huna_heights_hero_1793195294156.jpg',
    aspect: 'aspect-[16/10]',
    caption: 'Cantilevered architectural timber pavilion reflecting over calm highland waters in Tigoni, Nairobi.',
    details: 'Yakisugi charred wood exterior · 270° Glazing · Zero water disturbance',
  },
  {
    id: 'gal-2',
    title: 'Minimalist Sunken Lounge & Water Horizon',
    category: 'interiors',
    src: '/src/assets/images/cabin_interior_lounge_1793190492660.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Low-profile charcoal seating oriented toward the tranquil twilight lake horizon with warm linear cove illumination.',
    details: 'Charred cedar paneling · Basalt table · Concealed floor-wash lighting',
  },
  {
    id: 'gal-3',
    title: 'Floating Barrel Sauna & Steaming Cedar Plunge',
    category: 'lakeside',
    src: '/src/assets/images/cabin_sauna_deck_1793190494974.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Nordic timber barrel sauna with circular portal and integrated sunken hot tub overlooking calm water reflections.',
    details: 'Wood-fired sauna stove · Red cedar timber · Direct lake plunge ladder',
  },
  {
    id: 'gal-4',
    title: 'Morning Highland Mist in Master Suite',
    category: 'interiors',
    src: '/src/assets/images/cabin_bedroom_morning_1793190494030.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Soft dawn mist rising through the indigenous highland canopy seen through glass beside natural linen bedding.',
    details: 'Natural white oak frame · Organic flax linen · Motorized black-out shades',
  },
  {
    id: 'gal-5',
    title: 'Sculptural Basalt Kitchen & Smoked Oak Dining',
    category: 'interiors',
    src: '/src/assets/images/cabin_dining_kitchen_1793190494811.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Handcrafted basalt stone monolith island with slender brass pendant lights framing the misty evergreen backdrop.',
    details: 'Brushed Kenyan basalt · Induction suite · Smoked oak dining table',
  },
  {
    id: 'gal-6',
    title: 'Huna Heights Twilight Water Geometry',
    category: 'nightfall',
    src: '/src/assets/images/huna_heights_hero_1793195294156.jpg',
    aspect: 'aspect-[4/3]',
    caption: 'Warm ambient glow spilling across the calm lake surface under the equatorial night sky.',
    details: '3000K warm interior warmth · Glare-free marine orientation',
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'nordic-sauna-ritual',
    name: 'Highland Sauna & Eucalyptus Herbal Ritual',
    price: 95,
    description: 'Fresh highland eucalyptus steam ritual on the floating dock, cold freshwater plunge, and organic purple tea infusion.',
    iconName: 'Flame',
  },
  {
    id: 'private-chef-tasting',
    name: 'Lakeside 4-Course Private Chef Tasting',
    price: 180,
    description: 'Curated modern Kenyan cuisine prepared on-site over acacia embers, paired with select biodynamic wines.',
    iconName: 'Utensils',
  },
  {
    id: 'astronomy-stargazing-kit',
    name: 'Equatorial Stargazing & Celestron Telescope Tour',
    price: 60,
    description: 'Computerized telescope session on the pontoon exploring the Southern Cross and the equatorial Milky Way.',
    iconName: 'Sparkles',
  },
  {
    id: 'artisanal-provisions',
    name: 'Nairobi Artisan Hearth & Peaberry Coffee Box',
    price: 85,
    description: 'Seasoned cedar firewood, Mount Kenya single-origin peaberry coffee, local artisanal cheeses, and fresh sourdough.',
    iconName: 'Wine',
  },
];

export const PRESS_ACCOLADES = [
  {
    publication: 'Architectural Digest East Africa',
    quote: 'The pinnacle of floating architecture in Kenya — a sublime lesson in cedar, silence, and highland water.',
  },
  {
    publication: 'Travel + Leisure',
    quote: 'Huna Heights redefines East African luxury retreats — an architectural haven hovering over Nairobi’s misty waters.',
  },
  {
    publication: 'Condé Nast Traveler',
    quote: 'Ranked #1 Most Secluded Architectural Retreat in Kenya for discerning global travelers.',
  },
  {
    publication: 'Business Daily Africa',
    quote: 'A masterclass in sustainable off-grid biophilic design just outside Nairobi’s urban hum.',
  },
];
