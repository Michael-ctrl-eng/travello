/**
 * Preview harness — renders the REAL WanderLust EJS views + CSS with mock
 * data (no MongoDB required) so the Apple Edition theme can be visually
 * verified in a headless browser.
 */
const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");

const base = path.join(__dirname, "..", "wanderlust");
const { CURRENCIES, DEFAULT_CURRENCY, formatPrice } = require(path.join(base, "utils", "currency.js"));

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(base, "views"));
app.use(express.static(path.join(base, "public")));

app.locals.WL_CURRENCY = { currencies: CURRENCIES, default: DEFAULT_CURRENCY };
app.locals.fmtPrice = (usd) => formatPrice(usd, "USD");
app.locals.currUser = null;
app.locals.success = "";
app.locals.error = "";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=60`;
const owner = { _id: "host1", username: "cleopatra" };

const listings = [
  { _id: "l1", title: "Taj Mahal View Suite", description: "Enjoy breathtaking views of the historic Taj Mahal right from your private terrace.", image: { url: img("photo-1564507592333-c60657eea523") }, price: 42, location: "Agra", country: "India", geometry: { type: "Point", coordinates: [78.0081, 27.1751] }, owner,
    reviews: [
      { author: { _id: "u1", username: "zahi" }, rating: 5, comment: "Absolutely magical at sunrise." },
      { author: { _id: "u2", username: "nour" }, rating: 4, comment: "Great stay, would return." }
    ] },
  { _id: "l2", title: "Beachfront Luxury Villa in Goa", description: "Step directly onto the sandy beaches of North Goa with a private pool.", image: { url: img("photo-1540555700478-4be289fbecef") }, price: 77, location: "Goa", country: "India", geometry: { type: "Point", coordinates: [73.7553, 15.552] }, owner, reviews: [] },
  { _id: "l3", title: "Charming Hilltop Cabin", description: "Cozy wooden cabin nestled in the snow-capped hills of Manali.", image: { url: img("photo-1502784444187-359ac186c5bb") }, price: 21, location: "Manali", country: "India", geometry: { type: "Point", coordinates: [77.1887, 32.2396] }, owner, reviews: [] },
  { _id: "l4", title: "Royal Heritage Palace Stay", description: "Live like royalty in a historic palace in the Pink City of Jaipur.", image: { url: img("photo-1476514525535-07fb3b4ae5f1") }, price: 54, location: "Jaipur", country: "India", geometry: { type: "Point", coordinates: [75.8189, 26.9124] }, owner, reviews: [] },
  { _id: "l5", title: "Modern Apartment with Skyline View", description: "High-rise luxury apartment with panoramic views of the Mumbai skyline.", image: { url: img("photo-1501785888041-af3ef285b470") }, price: 38, location: "Mumbai", country: "India", geometry: { type: "Point", coordinates: [72.8777, 19.076] }, owner, reviews: [] },
  { _id: "l6", title: "Alleppey Houseboat Experience", description: "Float down the peaceful backwaters of Kerala in a luxury houseboat.", image: { url: img("photo-1520250497591-112f2f40a3f4") }, price: 48, location: "Alleppey, Kerala", country: "India", geometry: { type: "Point", coordinates: [76.3388, 9.4981] }, owner, reviews: [] },
  { _id: "l7", title: "Luxury Penthouse in Manhattan", description: "Central Park views, marble flooring, private rooftop terrace.", image: { url: img("photo-1566073771259-6a8506099945") }, price: 113, location: "New York City", country: "United States", geometry: { type: "Point", coordinates: [-74.006, 40.7128] }, owner, reviews: [] },
  { _id: "l8", title: "Chic Studio near Eiffel Tower", description: "Sunlit studio in the 7th arrondissement of Paris.", image: { url: img("photo-1502602898657-3e91760cbb34") }, price: 60, location: "Paris", country: "France", geometry: { type: "Point", coordinates: [2.3522, 48.8566] }, owner, reviews: [] },
  { _id: "l9", title: "Traditional Ryokan in Kyoto", description: "Tatami mats and private onsens in historic Kyoto.", image: { url: img("photo-1493976040374-85c8e12f0c0e") }, price: 57, location: "Kyoto", country: "Japan", geometry: { type: "Point", coordinates: [135.7681, 35.0116] }, owner, reviews: [] },
  { _id: "l10", title: "Overwater Bungalow in Bora Bora", description: "Turquoise lagoon waters directly below your bedroom.", image: { url: img("photo-1507525428034-b723cf961d3e") }, price: 143, location: "Bora Bora", country: "French Polynesia", geometry: { type: "Point", coordinates: [-151.7415, -16.5004] }, owner, reviews: [] }
];

const bookings = [
  { _id: "b1", listing: listings[0], checkIn: new Date("2026-11-20"), checkOut: new Date("2026-11-25"), totalPrice: 42 * 5, status: "Paid" },
  { _id: "b2", listing: listings[6], checkIn: new Date("2026-12-02"), checkOut: new Date("2026-12-06"), totalPrice: 113 * 4, status: "Pending" }
];

app.get("/listings", (req, res) => res.render("listings/index.ejs", { allListings: listings }));
app.get("/listings/new", (req, res) => res.render("listings/new.ejs", {}));
app.get("/listings/:id/edit", (req, res) => {
  const listing = listings.find((l) => l._id === req.params.id) || listings[0];
  res.render("listings/edit.ejs", { listing, originalImageUrl: listing.image.url });
});
app.get("/listings/:id", (req, res) => {
  const listing = listings.find((l) => l._id === req.params.id) || listings[0];
  res.render("listings/show.ejs", { listing, mapToken: "pk.preview-token" });
});
app.get("/login", (req, res) => res.render("users/login.ejs", {}));
app.get("/signup", (req, res) => res.render("users/signup.ejs", {}));
app.get("/bookings/my-reservations", (req, res) => res.render("bookings/index.ejs", { bookings }));
app.get("/bookings/success-preview", (req, res) => res.render("bookings/success.ejs", { booking: bookings[0] }));

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`preview on http://localhost:${PORT}`));
