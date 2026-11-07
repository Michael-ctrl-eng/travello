"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
} from "@/lib/travello/icons";
import { HERO_IMAGE } from "@/lib/travello/data";

export type SearchMode = "night" | "flexible";

interface HeroProps {
  query: string;
  onQueryChange: (q: string) => void;
  guests: number;
  onGuestsChange: (g: number) => void;
  checkIn: string;
  checkOut: string;
  onCheckInChange: (v: string) => void;
  onCheckOutChange: (v: string) => void;
  month: string;
  onMonthChange: (m: string) => void;
  onSearch: () => void;
}

function isoDay(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Hero({
  query,
  onQueryChange,
  guests,
  onGuestsChange,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  month,
  onMonthChange,
  onSearch,
}: HeroProps) {
  const [mode, setMode] = useState<SearchMode>("night");
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);
  const today = isoDay(0);

  /* Close the guests popover on outside click / Escape */
  useEffect(() => {
    if (!guestsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!guestsRef.current?.contains(e.target as Node)) setGuestsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGuestsOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [guestsOpen]);

  const guestsLabel = guests === 1 ? "1 guest" : `${guests} guests`;

  return (
    <section className="wl-hero" aria-label="Search stays">
      <div className="wl-hero-bg" aria-hidden="true">
        <img src={HERO_IMAGE} alt="" fetchPriority="high" />
        <div className="wl-hero-shade" />
      </div>

      <div className="wl-hero-content">
        <h1 className="wl-hero-title rise" style={{ ["--d" as string]: "0ms" }}>
          The world awaits.
        </h1>
        <p className="wl-hero-sub rise" style={{ ["--d" as string]: "90ms" }}>
          Exceptional stays in the most extraordinary places on earth.
        </p>

        {/* Blacklane-style frosted booking widget */}
        <form
          className="wl-bw rise"
          style={{ ["--d" as string]: "180ms" }}
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <div className="wl-bw-tabs" role="tablist" aria-label="Search mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "night"}
              className={`wl-bw-tab${mode === "night" ? " is-active" : ""}`}
              onClick={() => setMode("night")}
            >
              By the night
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "flexible"}
              className={`wl-bw-tab${mode === "flexible" ? " is-active" : ""}`}
              onClick={() => setMode("flexible")}
            >
              Flexible dates
            </button>
          </div>

          <div className="wl-bw-body">
            <label className="wl-bw-field wl-bw-field--grow">
              <span className="wl-bw-label">Destination</span>
              <input
                className="wl-bw-input"
                type="text"
                placeholder="Where are you going?"
                autoComplete="off"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
              />
            </label>

            <span className="wl-bw-div" aria-hidden="true" />

            {mode === "night" ? (
              <>
                <label className="wl-bw-field">
                  <span className="wl-bw-label">Check in</span>
                  <input
                    className="wl-bw-input"
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => onCheckInChange(e.target.value)}
                  />
                </label>

                <span className="wl-bw-div" aria-hidden="true" />

                <label className="wl-bw-field">
                  <span className="wl-bw-label">Check out</span>
                  <input
                    className="wl-bw-input"
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => onCheckOutChange(e.target.value)}
                  />
                </label>
              </>
            ) : (
              <>
                <label className="wl-bw-field">
                  <span className="wl-bw-label">Any month</span>
                  <span className="wl-bw-selectwrap">
                    <select
                      className="wl-bw-input wl-bw-select"
                      value={month}
                      onChange={(e) => onMonthChange(e.target.value)}
                    >
                      <option value="">I&apos;m flexible</option>
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon size={14} className="wl-bw-chevron" />
                  </span>
                </label>

                <span className="wl-bw-div" aria-hidden="true" />

                <div className="wl-bw-field">
                  <span className="wl-bw-label">Travellers</span>
                  <span className="wl-bw-static">1 – 8</span>
                </div>
              </>
            )}

            <span className="wl-bw-div" aria-hidden="true" />

            {/* Guests with stepper popover */}
            <div className="wl-bw-field wl-bw-field--guests" ref={guestsRef}>
              <button
                type="button"
                className="wl-bw-guests-btn"
                aria-expanded={guestsOpen}
                aria-haspopup="dialog"
                onClick={() => setGuestsOpen((v) => !v)}
              >
                <span className="wl-bw-label">Guests</span>
                <span className="wl-bw-value">
                  {guestsLabel}
                  <ChevronDownIcon size={13} className="wl-bw-guests-chevron" />
                </span>
              </button>

              {guestsOpen && (
                <div className="wl-bw-pop" role="dialog" aria-label="Choose guests">
                  <div className="wl-bw-pop-row">
                    <span className="wl-bw-pop-text">
                      <strong>Guests</strong>
                      <em>Price never changes with guests</em>
                    </span>
                    <span className="wl-bw-stepper">
                      <button
                        type="button"
                        aria-label="Fewer guests"
                        disabled={guests <= 1}
                        onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                      >
                        <MinusIcon size={14} />
                      </button>
                      <strong aria-live="polite">{guests}</strong>
                      <button
                        type="button"
                        aria-label="More guests"
                        disabled={guests >= 8}
                        onClick={() => onGuestsChange(Math.min(8, guests + 1))}
                      >
                        <PlusIcon size={14} />
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="wl-bw-cta">
              <SearchIcon size={16} />
              <span>Search stays</span>
            </button>
          </div>
        </form>

        {/* Trust line */}
        <div className="wl-hero-trust rise" style={{ ["--d" as string]: "280ms" }}>
          <span className="wl-hero-trust-item">
            <StarIcon size={13} className="wl-hero-trust-star" />
            4.9 average rating
          </span>
          <span className="wl-hero-trust-dot" aria-hidden="true" />
          <span className="wl-hero-trust-item">12 iconic destinations</span>
          <span className="wl-hero-trust-dot" aria-hidden="true" />
          <span className="wl-hero-trust-item">No per-guest fees</span>
        </div>
      </div>
    </section>
  );
}
