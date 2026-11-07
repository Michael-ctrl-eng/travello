/**
 * WanderLust — Sample collection (ported from init/data.js)
 * Prices are stored per-night in USD; tags power the filter rail.
 */

export interface Listing {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number; // USD / night
  location: string;
  country: string;
  rating: number; // 0–5
  tags: string[];
}

export const FILTERS = [
  { id: "trending", label: "Trending" },
  { id: "rooms", label: "Rooms" },
  { id: "cities", label: "Cities" },
  { id: "mountains", label: "Mountains" },
  { id: "castles", label: "Castles" },
  { id: "pools", label: "Pools" },
  { id: "camping", label: "Camping" },
  { id: "farms", label: "Farms" },
  { id: "arctic", label: "Arctic" },
  { id: "boats", label: "Boats" },
] as const;

export type FilterId = (typeof FILTERS)[number]["id"];

export const listings: Listing[] = [
  {
    id: "taj-mahal-suite",
    title: "Taj Mahal View Suite",
    description:
      "Enjoy breathtaking views of the historic Taj Mahal right from your private terrace. This luxury suite offers standard amenities and fine Indian hospitality.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 42,
    location: "Agra",
    country: "India",
    rating: 4.94,
    tags: ["trending", "cities"],
  },
  {
    id: "goa-beachfront-villa",
    title: "Beachfront Luxury Villa in Goa",
    description:
      "Step directly onto the sandy beaches of North Goa. Features a private pool, open sky showers, and a personal chef for the ultimate coastal vacation.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 77,
    location: "Goa",
    country: "India",
    rating: 4.88,
    tags: ["trending", "pools"],
  },
  {
    id: "manali-hilltop-cabin",
    title: "Charming Hilltop Cabin",
    description:
      "Escape the heat in this cozy wooden cabin nestled in the snow-capped hills of Manali. Perfect for hiking and hot chocolate sessions.",
    image:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 21,
    location: "Manali",
    country: "India",
    rating: 4.79,
    tags: ["mountains", "camping"],
  },
  {
    id: "jaipur-royal-palace",
    title: "Royal Heritage Palace Stay",
    description:
      "Live like royalty in a historic palace in the Pink City of Jaipur. Marvel at traditional artwork, inner courtyards, and grand architecture.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 54,
    location: "Jaipur",
    country: "India",
    rating: 4.91,
    tags: ["castles", "trending"],
  },
  {
    id: "mumbai-skyline-apartment",
    title: "Modern Apartment with Skyline View",
    description:
      "Stay in the heart of India's commercial capital. High-rise luxury apartment with panoramic views of the Mumbai skyline and Arabian sea.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 38,
    location: "Mumbai",
    country: "India",
    rating: 4.72,
    tags: ["cities", "rooms"],
  },
  {
    id: "alleppey-houseboat",
    title: "Alleppey Houseboat Experience",
    description:
      "Float down the peaceful backwaters of Kerala in a traditional luxury houseboat. Includes freshly caught sea bass and local delicacies.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 48,
    location: "Alleppey, Kerala",
    country: "India",
    rating: 4.85,
    tags: ["boats", "trending"],
  },
  {
    id: "manhattan-penthouse",
    title: "Luxury Penthouse in Manhattan",
    description:
      "Indulge in high-end living in New York City with Central Park views, marble flooring, and access to a private rooftop terrace.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 113,
    location: "New York City",
    country: "United States",
    rating: 4.97,
    tags: ["rooms", "cities", "trending"],
  },
  {
    id: "paris-eiffel-studio",
    title: "Chic Studio near Eiffel Tower",
    description:
      "A cozy, sunlit studio located in the 7th arrondissement of Paris, just a 5-minute walk from the Eiffel Tower and local bistros.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 60,
    location: "Paris",
    country: "France",
    rating: 4.83,
    tags: ["rooms", "cities"],
  },
  {
    id: "kyoto-traditional-ryokan",
    title: "Traditional Ryokan in Kyoto",
    description:
      "Unwind on tatami mats and enjoy private hot spring onsens in a historic district of Kyoto. Perfect for a mindful, cultural experience.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 57,
    location: "Kyoto",
    country: "Japan",
    rating: 4.96,
    tags: ["trending", "rooms"],
  },
  {
    id: "borabora-overwater-bungalow",
    title: "Overwater Bungalow in Bora Bora",
    description:
      "Wake up to turquoise lagoon waters directly below your bedroom. Features glass floor view portals and private lagoon swim docks.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 143,
    location: "Bora Bora",
    country: "French Polynesia",
    rating: 4.99,
    tags: ["pools", "boats", "trending"],
  },
];
