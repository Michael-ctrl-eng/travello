/**
 * WanderLust — destination collection.
 * Real places, real photography. Prices per night in USD;
 * EGP is a display conversion. Tags power the filter rail.
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
  reviews: number;
  tags: string[];
  highlights: string[];
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
    id: "giza-pyramids",
    title: "Pyramids View Royal Camp",
    description:
      "Wake up facing the last standing Wonder of the Ancient World. A luxury desert camp with linen tents, terrace dining, and the Giza plateau lit up at your feet.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3c0d35ab2491.webp",
    price: 65,
    location: "Giza, Cairo",
    country: "Egypt",
    rating: 4.95,
    reviews: 1284,
    tags: ["trending", "castles", "camping"],
    highlights: ["Guided Great Pyramid & Sphinx tour", "Sunset camel ride in the desert", "Terrace dinner facing the pyramids"],
  },
  {
    id: "hurghada-reef",
    title: "Hurghada Reef House",
    description:
      "A private Red Sea villa steps from the coral reef. Morning snorkel with turtles, afternoon on your own stretch of turquoise, evenings grilling fresh catch on the dock.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1882b807d944.jpg",
    price: 84,
    location: "Hurghada",
    country: "Egypt",
    rating: 4.89,
    reviews: 962,
    tags: ["trending", "pools", "boats"],
    highlights: ["House reef snorkeling from the dock", "Giftun Island boat trip included", "Private pool & sea-view terrace"],
  },
  {
    id: "luxor-nile",
    title: "Nilebank Suite, Luxor",
    description:
      "A stone terrace suite on the West Bank of the Nile, feluccas drifting past Karnak's columns at dawn. Walk to the Valley of the Kings before the tour buses arrive.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3c50b364b70e.jpg",
    price: 58,
    location: "Luxor",
    country: "Egypt",
    rating: 4.91,
    reviews: 743,
    tags: ["cities", "castles"],
    highlights: ["Sunrise felucca on the Nile", "Private guide to Valley of the Kings", "Karnak sound-and-light show tickets"],
  },
  {
    id: "alaska-aurora",
    title: "Denali Aurora Cabin",
    description:
      "A glass-roofed cabin two hours from Fairbanks. Wood stove, hot sauna, and a front-row seat when the sky catches fire over the Alaska Range.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9cd4bb70db4f.png",
    price: 132,
    location: "Denali, Alaska",
    country: "United States",
    rating: 4.97,
    reviews: 1587,
    tags: ["trending", "arctic", "mountains", "camping"],
    highlights: ["Glass roof for northern-light viewing", "Private wood-fired sauna", "Dog-sledding day trip"],
  },
  {
    id: "hawaii-maui",
    title: "Maui Cliffside Bungalow",
    description:
      "Perched above a black-sand cove on the Road to Hana. Whale watching from the hammock, banana bread a valley away, and waterfalls you will have to yourself.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7b0b8ead1814.jpeg",
    price: 149,
    location: "Maui, Hawaii",
    country: "United States",
    rating: 4.93,
    reviews: 2031,
    tags: ["trending", "pools", "boats"],
    highlights: ["Infinity pool over the Pacific", "Guided Hana waterfall hike", "Snorkel gear & kayaks included"],
  },
  {
    id: "santorini-caldera",
    title: "Santorini Cave House",
    description:
      "A whitewashed cave house carved into the caldera wall in Oia. Private plunge pool, blue domes next door, and the best sunset in the Aegean from your own terrace.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cdccb47e365d.jpg",
    price: 96,
    location: "Oia, Santorini",
    country: "Greece",
    rating: 4.88,
    reviews: 1712,
    tags: ["cities", "rooms", "pools"],
    highlights: ["Caldera-view plunge pool", "Sunset terrace above Oia", "Catamaran cruise with dinner"],
  },
  {
    id: "cappadocia-balloons",
    title: "Cappadocia Balloon Lodge",
    description:
      "A cave suite in Göreme where one hundred hot-air balloons rise past your window at dawn. Solar-heated stone rooms, terrace breakfast, valleys out the back door.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8c05977fe4e9.jpg",
    price: 73,
    location: "Göreme, Cappadocia",
    country: "Türkiye",
    rating: 4.92,
    reviews: 1198,
    tags: ["trending", "rooms", "camping"],
    highlights: ["Sunrise balloon-flight pickup", "Carved cave suite with skylight", "Red Valley e-bike tour"],
  },
  {
    id: "iceland-lodge",
    title: "Aurora Glass Lodge, Iceland",
    description:
      "A remote glass lodge under the aurora oval, an hour from Reykjavík. Geothermal hot tub, black-sand coast nearby, and silence you can hear.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c564d8e1bda9.jpg",
    price: 118,
    location: "South Coast, Iceland",
    country: "Iceland",
    rating: 4.96,
    reviews: 1355,
    tags: ["arctic", "camping", "mountains"],
    highlights: ["Panoramic glass bedroom", "Geothermal hot tub", "Glacier lagoon & ice-cave tour"],
  },
  {
    id: "maldives-lagoon",
    title: "Maldives Overwater Villa",
    description:
      "A thatched overwater villa on a private lagoon. Glass floor panels, a ladder straight into the reef, and a chef who asks what you caught today.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ed4b62ef7f55.jpg",
    price: 210,
    location: "North Malé Atoll",
    country: "Maldives",
    rating: 4.98,
    reviews: 2467,
    tags: ["trending", "pools", "boats"],
    highlights: ["Glass floor over the lagoon", "Private butler & seaplane transfer", "Night snorkeling with manta rays"],
  },
  {
    id: "zermatt-chalet",
    title: "Matterhorn View Chalet",
    description:
      "A timber chalet above Zermatt with the Matterhorn framed in every window. Ski-in access, raclette fireplace, and a spa that faces the north face.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/feed5671f1dd.jpg",
    price: 145,
    location: "Zermatt",
    country: "Switzerland",
    rating: 4.94,
    reviews: 1093,
    tags: ["mountains", "rooms", "arctic"],
    highlights: ["Ski-in / ski-out in winter", "Alpine spa with Matterhorn view", "Gornergrat railway sunrise trip"],
  },
  {
    id: "petra-treasury",
    title: "Petra Cliff Retreat",
    description:
      "A stone retreat in the hills above Wadi Musa, ten minutes from the Siq. Bedouin hosts, candlelit Petra by Night, and trails into the desert from the garden.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/784360d29f25.jpg",
    price: 89,
    location: "Wadi Musa, Petra",
    country: "Jordan",
    rating: 4.9,
    reviews: 867,
    tags: ["castles", "cities", "camping"],
    highlights: ["Petra by Night candlelit entry", "Bedouin desert dinner", "Little Petra & Wadi Rum day tour"],
  },
  {
    id: "tuscany-farmhouse",
    title: "Tuscan Farmhouse Estate",
    description:
      "A restored farmhouse on a working olive estate outside Siena. Cypress-lined drive, a long table under the pergola, and a pool that glows at golden hour.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cec52259d3f6.jpg",
    price: 67,
    location: "Siena, Tuscany",
    country: "Italy",
    rating: 4.87,
    reviews: 1421,
    tags: ["farms", "rooms", "pools"],
    highlights: ["Olive-oil & wine tasting on site", "Truffle hunting in autumn", "Cooking class with the estate chef"],
  },
];
