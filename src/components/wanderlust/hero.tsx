"use client";

import {
  CalendarIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  UsersIcon,
} from "@/lib/wanderlust/icons";

export default function Hero() {
  return (
    <section className="wl-hero">
      <p className="wl-hero-eyebrow rise" style={{ ["--d" as string]: "0ms" }}>
        Be a traveller
      </p>
      <h1 className="wl-hero-title rise" style={{ ["--d" as string]: "80ms" }}>
        Explore the world,
        <br />
        <span className="wl-hero-gradient">beautifully.</span>
      </h1>
      <p className="wl-hero-sub rise" style={{ ["--d" as string]: "160ms" }}>
        From the Pyramids of Giza to the auroras of Alaska — real places worth
        crossing the world for.
      </p>

      {/* Glass booking bar — every field gets its own frosted icon tile */}
      <form
        className="wl-booking-bar rise"
        style={{ ["--d" as string]: "240ms" }}
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="wl-field wl-field--dest">
          <span className="wl-field-icon wl-field-icon--cyan" aria-hidden="true">
            <MapPinIcon size={16} />
          </span>
          <label htmlFor="wb-dest">Where</label>
          <input
            id="wb-dest"
            type="text"
            placeholder="Search destinations"
            autoComplete="off"
          />
        </div>

        <span className="wl-booking-divider" aria-hidden="true" />

        <div className="wl-field wl-field--date">
          <span className="wl-field-icon wl-field-icon--green" aria-hidden="true">
            <CalendarIcon size={16} />
          </span>
          <label htmlFor="wb-in">Check in</label>
          <input id="wb-in" type="date" />
        </div>

        <span className="wl-booking-divider" aria-hidden="true" />

        <div className="wl-field wl-field--date">
          <span className="wl-field-icon wl-field-icon--orange" aria-hidden="true">
            <CalendarIcon size={16} />
          </span>
          <label htmlFor="wb-out">Check out</label>
          <input id="wb-out" type="date" />
        </div>

        <span className="wl-booking-divider" aria-hidden="true" />

        <div className="wl-field wl-field--guests">
          <span className="wl-field-icon wl-field-icon--teal" aria-hidden="true">
            <UsersIcon size={16} />
          </span>
          <label htmlFor="wb-guests">Who</label>
          <input
            id="wb-guests"
            type="text"
            placeholder="Add guests"
            inputMode="numeric"
            autoComplete="off"
          />
        </div>

        <button type="submit" className="wl-btn wl-btn-apple wl-booking-search" aria-label="Search stays">
          <SearchIcon size={17} />
          <span>Search</span>
        </button>
      </form>

      {/* Trust chips */}
      <div className="wl-hero-chips rise" style={{ ["--d" as string]: "320ms" }}>
        <span className="wl-chip">
          <StarIcon size={13} className="wl-chip-star" />
          4.9 average rating
        </span>
        <span className="wl-chip">12 iconic destinations</span>
        <span className="wl-chip">Prices in USD &amp; EGP</span>
      </div>
    </section>
  );
}
