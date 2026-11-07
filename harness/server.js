/**
 * Preview harness — renders the REAL wanderlust views with mock data
 * so the new Apple theme can be verified without MongoDB/Cloudinary/Mapbox.
 * This file is NOT part of the wanderlust repo.
 */
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");

const REPO = path.join(__dirname, "..", "wanderlust");

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(REPO, "views"));
app.use(express.static(path.join(REPO, "public")));

/* ---------- mock helpers ---------- */
class FakeId {
  constructor(id) { this.id = id; }
  equals(o) { return !!o && String(o.id) === String(this.id); }
  toString() { return this.id; }
}
const uid = (n) => new FakeId(String(n));

const seed = require(path.join(REPO, "init", "data.js"));
const sampleListings = seed.sampleListings || seed.data || seed;

const owner = { _id: uid("owner1"), username: "siyam" };
const reviewer = { _id: uid("rev1"), username: "aarav" };
const reviewer2 = { _id: uid("rev2"), username: "meera" };

const allListings = sampleListings.map((l, i) => ({
  ...l,
  _id: uid(`L${i}`),
  owner,
}));

const first = allListings[0];
const showListing = {
  ...first,
  reviews: [
    {
      _id: uid("r1"),
      rating: 5,
      comment: "Absolutely stunning stay — the view from the terrace is unreal at sunrise. Would book again in a heartbeat.",
      author: reviewer,
    },
    {
      _id: uid("r2"),
      rating: 4,
      comment: "Beautiful property and incredibly hospitable hosts. Walking distance to everything.",
      author: reviewer2,
    },
  ],
};

const bookings = [
  {
    _id: uid("b1"),
    listing: { ...allListings[1] },
    checkIn: new Date(2026, 10, 20),
    checkOut: new Date(2026, 10, 25),
    totalPrice: 32500,
    status: "Paid",
  },
  {
    _id: uid("b2"),
    listing: { ...allListings[2] },
    checkIn: new Date(2026, 11, 2),
    checkOut: new Date(2026, 11, 6),
    totalPrice: 7200,
    status: "Pending",
  },
];

/* ---------- locals ---------- */
app.use((req, res, next) => {
  res.locals.success = [];
  res.locals.error = [];
  res.locals.currUser = null;
  if (req.query.user === "1") res.locals.currUser = { _id: owner._id, username: "siyam" };
  if (req.query.flash === "success") res.locals.success = "Welcome back — your listing was published successfully.";
  if (req.query.flash === "error") res.locals.error = "Something went wrong. Please try again.";
  next();
});

/* ---------- routes ---------- */
app.get("/listings", (req, res) => res.render("listings/index.ejs", { allListings }));
app.get("/listings/new", (req, res) => res.render("listings/new.ejs"));
app.get("/listings/demo/edit", (req, res) =>
  res.render("listings/edit.ejs", { listing: showListing, originalImageUrl: showListing.image.url })
);
app.get("/listings/:id", (req, res) =>
  res.render("listings/show.ejs", { listing: showListing, mapToken: "" })
);
app.get("/login", (req, res) => res.render("users/login.ejs"));
app.get("/signup", (req, res) => res.render("users/signup.ejs"));
app.get("/bookings/my-reservations", (req, res) =>
  res.render("bookings/index.ejs", { bookings })
);
app.get("/bookings/success", (req, res) => res.render("bookings/success.ejs", { booking: bookings[0] }));
app.get("/error-demo", (req, res) =>
  res.render("error.ejs", { err: { message: "Page Not Found!", statusCode: 404 } })
);
app.get("/", (req, res) => res.redirect("/listings"));

app.listen(4173, () => console.log("harness on http://127.0.0.1:4173"));
