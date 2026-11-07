"use client";

import { CalendarDays, MapPin, Search, Sparkles, Star, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="wl-hero">
      <p className="wl-hero-eyebrow rise" style={{ ["--d" as string]: "0ms" }}>
        <Sparkles size={13} aria-hidden="true" /> The WanderLust Collection
      </p>
      <h1 className="wl-hero-title rise" style={{ ["--d" as string]: "80ms" }}>
        Explore the world,
        <br />
        <span className="wl-hero-gradient">beautifully.</span>
      </h1>
      <p className="wl-hero-sub rise" style={{ ["--d" as string]: "160ms" }}>
        Exceptional stays in the world&rsquo;s most breathtaking destinations —
        designed to feel effortless.
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
            <MapPin size={16} strokeWidth={2} />
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
            <CalendarDays size={16} strokeWidth={2} />
          </span>
          <label htmlFor="wb-in">Check in</label>
          <input id="wb-in" type="date" />
        </div>

        <span className="wl-booking-divider" aria-hidden="true" />

        <div className="wl-field wl-field--date">
          <span className="wl-field-icon wl-field-icon--orange" aria-hidden="true">
            <CalendarDays size={16} strokeWidth={2} />
          </span>
          <label htmlFor="wb-out">Check out</label>
          <input id="wb-out" type="date" />
        </div>

        <span className="wl-booking-divider" aria-hidden="true" />

        <div className="wl-field wl-field--guests">
          <span className="wl-field-icon wl-field-icon--violet" aria-hidden="true">
            <Users size={16} strokeWidth={2} />
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
          <Search size={17} strokeWidth={2.4} aria-hidden="true" />
          <span>Search</span>
        </button>
      </form>

      {/* Trust chips */}
      <div className="wl-hero-chips rise" style={{ ["--d" as string]: "320ms" }}>
        <span className="wl-chip">
          <Star size={13} className="wl-chip-star" aria-hidden="true" />
          4.9 · 12k reviews
        </span>
        <span className="wl-chip">2,400+ curated stays</span>
        <span className="wl-chip">92 countries</span>
      </div>
    </section>
  );
}
