import { Cabin, AddOn, GalleryPhoto } from '../types';

export const CABINS: Cabin[] = [
  {
    id: 'the-obsidian-pavilion',
    name: 'The Obsidian Pavilion',
    subtitle: 'Cantilevered Lake Monolith',
    location: 'Tawangmangu, Central Java',
    pricePerNight: 580,
    rating: 4.98,
    reviewsCount: 84,
    guestsMax: 4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1850,
    description:
      'Perched weightlessly over reflective glacial waters, The Obsidian Pavilion embodies pure biophilic minimalism. Clad in artisanal charred cedar (Shou Sugi Ban) with 270-degree acoustic acoustic glass, it provides uninterrupted communion with mountain mists and silent waters.',
    heroImage: '/assets/aistudio/imgi_93_5ab873255209595.6a9980e55fc17_974661a9.png',
    images: [
      '/assets/aistudio/imgi_93_5ab873255209595.6a9980e55fc17_974661a9.png',
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
      'Geothermal climate regulation',
      'Off-grid solar with microgrid reserve',
    ],
    architecturalHighlights: [
      {
        title: 'Yakisugi Charred Wood',
        description: 'Traditional Japanese preservation technique ensuring natural weather resistance and deep velvet charcoal tone.',
      },
      {
        title: 'Acoustic Sound Horizon',
        description: 'Architecturally isolated floating foundations absorb vibration, leaving only the natural acoustics of ripples and breeze.',
      },
      {
        title: 'Continuous Glazing Lines',
        description: 'Frameless glass transitions dissolve the threshold between intimate interior spaces and the vast expanse of twilight water.',
      },
    ],
  },
  {
    id: 'alpine-monolith-norway',
    name: 'The Lofoten Monolith',
    subtitle: 'Fjord Horizon Sanctuary',
    location: 'Lofoten Archipelagos, Norway',
    pricePerNight: 720,
    rating: 4.96,
    reviewsCount: 62,
    guestsMax: 2,
    bedrooms: 1,
    bathrooms: 1.5,
    sqft: 1420,
    description:
      'An architectural sanctuary anchored against dramatic granite cliffs and fjord tides. Designed for travelers seeking stillness, Northern Lights vantage points, and Scandinavian thermal wellness.',
    heroImage: '/src/assets/images/cabin_sauna_deck_1793190494974.jpg',
    images: [
      '/src/assets/images/cabin_sauna_deck_1793190494974.jpg',
      '/src/assets/images/cabin_interior_lounge_1793190492660.jpg',
      '/src/assets/images/cabin_bedroom_morning_1793190494030.jpg',
    ],
    features: [
      'Private Nordic fjord sauna',
      'Geothermal heated deck',
      'Stargazing skylight above king suite',
      'Custom Bang & Olufsen sound acoustics',
    ],
    architecturalHighlights: [
      {
        title: 'Thermal Mass Foundation',
        description: 'Embedded in solid coastal granite to retain natural mountain warmth throughout Arctic winter nights.',
      },
      {
        title: 'Aurora Zenith Aperture',
        description: 'Calibrated ceiling glazing tilted 38 degrees for effortless observation of the Aurora Borealis from bed.',
      },
    ],
  },
  {
    id: 'como-solitude-pavilion',
    name: 'Solitude Pavilion Como',
    subtitle: 'Private Cypress Promontory',
    location: 'Lake Como, Northern Italy',
    pricePerNight: 640,
    rating: 4.99,
    reviewsCount: 77,
    guestsMax: 4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1980,
    description:
      'Floating gently along the private wooded shoreline, Solitude Pavilion pairs Italian modernism with raw Alpine materials. Features a private timber pontoon for wooden speedboats and twilight dining.',
    heroImage: '/src/assets/images/cabin_dining_kitchen_1793190494811.jpg',
    images: [
      '/src/assets/images/cabin_dining_kitchen_1793190494811.jpg',
      '/src/assets/images/cabin_interior_lounge_1793190492660.jpg',
      '/src/assets/images/cabin_bedroom_morning_1793190494030.jpg',
    ],
    features: [
      'Private wooden boat dock',
      'Basalt monolithic chef kitchen',
      'Submerged evening lighting',
      'Aromatic cedar soaking tub',
    ],
    architecturalHighlights: [
      {
        title: 'Monolithic Basalt Island',
        description: 'Cut from a single block of volcanic basalt, functioning as the sculptural centerpiece of the living space.',
      },
      {
        title: 'Hydro-Suspension Pylons',
        description: 'Low-impact pylons preserve underwater flora while stabilizing the dwelling across shifting seasonal water levels.',
      },
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'The Floating Obsidian Monolith at Dusk',
    category: 'architecture',
    src: '/assets/aistudio/imgi_93_5ab873255209595.6a9980e55fc17_974661a9.png',
    aspect: 'aspect-[16/10]',
    caption: 'Cantilevered architectural timber pavilion reflecting over calm mountain lake at dusk.',
    details: 'Yakisugi charred wood exterior · 270° Glazing · Zero water disturbance',
  },
  {
    id: 'gal-2',
    title: 'Minimalist Sunken Lounge & Lake Horizon',
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
    caption: 'Nordic timber barrel sauna with circular portal and integrated sunken hot tub overlooking mountain reflections.',
    details: 'Wood-fired Harvia stove · Western red cedar · Direct lake access ladder',
  },
  {
    id: 'gal-4',
    title: 'Morning Forest Light in Master Suite',
    category: 'interiors',
    src: '/src/assets/images/cabin_bedroom_morning_1793190494030.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Soft dawn mist rising through pine forest seen through floor-to-ceiling glass beside natural linen bedding.',
    details: 'Natural white oak frame · Belgian flax linen · Motorized black-out shades',
  },
  {
    id: 'gal-5',
    title: 'Sculptural Basalt Kitchen & Smoked Oak Dining',
    category: 'interiors',
    src: '/src/assets/images/cabin_dining_kitchen_1793190494811.jpg',
    aspect: 'aspect-[16/9]',
    caption: 'Handcrafted basalt stone monolith island with slender brass pendant lights framing the misty evergreen backdrop.',
    details: 'Brushed basalt stone · Miele induction suite · Hans Wegner chairs',
  },
  {
    id: 'gal-6',
    title: 'Twilight Water Geometry & Architecture',
    category: 'nightfall',
    src: '/assets/aistudio/imgi_93_5ab873255209595.6a9980e55fc17_974661a9.png',
    aspect: 'aspect-[4/3]',
    caption: 'Warm ambient glow spilling across the calm lake surface under twilight skies.',
    details: '3000K warm interior warmth · Glare-free marine orientation',
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'nordic-sauna-ritual',
    name: 'Private Nordic Sauna & Herbal Infusion',
    price: 95,
    description: 'Eucalyptus and birch oil steam ritual with fresh plunge toweling and botanical tea service.',
    iconName: 'Flame',
  },
  {
    id: 'private-chef-tasting',
    name: 'Lakeside Private Chef 4-Course Tasting',
    price: 180,
    description: 'Curated seasonal menu prepared on-site over timber embers, paired with natural regional wines.',
    iconName: 'Utensils',
  },
  {
    id: 'astronomy-stargazing-kit',
    name: 'Deep Sky Telescope & Night Star Tour',
    price: 60,
    description: 'Celestron computerized computerized telescope setup on the private pontoon with star charts.',
    iconName: 'Sparkles',
  },
  {
    id: 'artisanal-provisions',
    name: 'Alpine Hearth Firewood & Biodynamic Wine Box',
    price: 85,
    description: 'Seasoned birch firewood bundles, local artisanal cheeses, crusty sourdough, and natural Pinot Noir.',
    iconName: 'Wine',
  },
];

export const PRESS_ACCOLADES = [
  {
    publication: 'Architectural Digest',
    quote: 'The pinnacle of floating architecture — a sublime lesson in silence, wood, and water.',
  },
  {
    publication: 'Dwell Magazine',
    quote: 'bincabnb sets a new world standard for minimalist sanctuaries immersed in nature.',
  },
  {
    publication: 'Wallpaper*',
    quote: 'Sensory architecture where human scale meets untamed alpine water.',
  },
  {
    publication: 'Condé Nast Traveler',
    quote: 'Ranked #1 Most Secluded Architectural Retreat for discerning travelers.',
  },
];
