"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeIcon,
  StarIcon,
  UsersIcon,
} from "@/lib/wanderlust/icons";
import { COLLECTIONS, SANCTUARY_IMAGE, type FilterId } from "@/lib/wanderlust/data";

/* ============================================================
   Collections band — Blacklane's "Arrive at your best" cards
   ============================================================ */

interface CollectionsProps {
  onPick: (filter: FilterId) => void;
}

export function Collections({ onPick }: CollectionsProps) {
  const scrollCards = (distance: number) => {
    const el = document.getElementById("wl-col-row");
    el?.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className="wl-band" id="collections">
      <div className="wl-container">
        <p className="wl-band-eyebrow rise">Curated collections</p>
        <h2 className="wl-band-title rise" style={{ ["--d" as string]: "60ms" }}>
          Travel at your best.
        </h2>
        <p className="wl-band-sub rise" style={{ ["--d" as string]: "120ms" }}>
          Effortless escapes, tailored to you.
        </p>

        <div className="wl-col-row-wrap rise" style={{ ["--d" as string]: "180ms" }}>
          <div className="wl-col-row" id="wl-col-row">
            {COLLECTIONS.map((c) => (
              <article className="wl-col-card" key={c.id}>
                <button
                  type="button"
                  className="wl-col-card-btn"
                  onClick={() => onPick(c.filter)}
                  aria-label={`Explore ${c.eyebrow} stays`}
                >
                  <div className="wl-col-media">
                    <img src={c.image} alt={c.eyebrow} loading="lazy" />
                  </div>
                  <p className="wl-col-eyebrow">{c.eyebrow}</p>
                  <h3 className="wl-col-title">{c.title}</h3>
                  <p className="wl-col-copy">{c.copy}</p>
                  <span className="wl-col-link">Explore stays</span>
                </button>
              </article>
            ))}
          </div>

          <div className="wl-col-arrows">
            <button
              type="button"
              className="wl-col-arrow"
              aria-label="Scroll collections left"
              onClick={() => scrollCards(-420)}
            >
              <ChevronLeftIcon size={18} />
            </button>
            <button
              type="button"
              className="wl-col-arrow"
              aria-label="Scroll collections right"
              onClick={() => scrollCards(420)}
            >
              <ChevronRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Sanctuary — Blacklane's "Step in. Breathe out." split feature
   ============================================================ */

export function Sanctuary() {
  return (
    <section className="wl-sanctuary" id="sanctuary">
      <div className="wl-container wl-sanct-grid">
        <div className="wl-sanct-copy">
          <h2 className="wl-band-title rise">Step in. Breathe out.</h2>
          <p className="wl-band-sub rise" style={{ ["--d" as string]: "60ms" }}>
            Thoughtful details and quiet comfort turn every stay into your
            personal sanctuary.
          </p>

          <ul className="wl-sanct-list">
            <li className="rise" style={{ ["--d" as string]: "120ms" }}>
              <h3>A welcome like no other</h3>
              <p>
                Your host greets you by name, the fire is lit, and local
                delicacies wait on the table.
              </p>
            </li>
            <li className="rise" style={{ ["--d" as string]: "180ms" }}>
              <h3>You set the tone</h3>
              <p>
                Sunrise coffee on the terrace or a midnight swim under the
                stars — the pace is entirely yours.
              </p>
            </li>
            <li className="rise" style={{ ["--d" as string]: "240ms" }}>
              <h3>Recharge your batteries</h3>
              <p>
                Silence, space and a view worth waking for. Return home
                lighter than you arrived.
              </p>
            </li>
          </ul>
        </div>

        <div className="wl-sanct-media rise" style={{ ["--d" as string]: "150ms" }}>
          <img src={SANCTUARY_IMAGE} alt="Tuscan farmhouse estate at golden hour" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Excellence — Blacklane's 3-benefit cream section
   ============================================================ */

export function Excellence() {
  return (
    <section className="wl-excellence" id="excellence">
      <div className="wl-container">
        <h2 className="wl-band-title rise">Expect excellence.</h2>
        <p className="wl-band-sub rise" style={{ ["--d" as string]: "60ms" }}>
          Leave refreshed and ready for what&apos;s next.
        </p>

        <div className="wl-ex-grid">
          <div className="wl-ex-item rise" style={{ ["--d" as string]: "100ms" }}>
            <span className="wl-ex-icon" aria-hidden="true">
              <GlobeIcon size={22} />
            </span>
            <h3>Available worldwide</h3>
            <p>Iconic stays across 12 destinations in 10 countries — and growing.</p>
          </div>
          <div className="wl-ex-item rise" style={{ ["--d" as string]: "160ms" }}>
            <span className="wl-ex-icon" aria-hidden="true">
              <StarIcon size={22} />
            </span>
            <h3>Hand-picked stays</h3>
            <p>Only the most extraordinary places make the collection, each one visited and verified.</p>
          </div>
          <div className="wl-ex-item rise" style={{ ["--d" as string]: "220ms" }}>
            <span className="wl-ex-icon" aria-hidden="true">
              <UsersIcon size={22} />
            </span>
            <h3>One price, any party</h3>
            <p>
              Solo traveller or a group of eight — your total never changes
              when you add guests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Trust strip — Blacklane's divider-separated logo row
   ============================================================ */

export function TrustStrip() {
  return (
    <section className="wl-trust-strip" aria-label="Why book with WanderLust">
      <div className="wl-container">
        <div className="wl-trust-row">
          <span className="wl-trust-item">
            <strong>4.9</strong> average rating
          </span>
          <span className="wl-trust-sep" aria-hidden="true" />
          <span className="wl-trust-item">
            <strong>12</strong> iconic destinations
          </span>
          <span className="wl-trust-sep" aria-hidden="true" />
          <span className="wl-trust-item">
            <strong>USD</strong> &amp; <strong>EGP</strong> pricing
          </span>
          <span className="wl-trust-sep" aria-hidden="true" />
          <span className="wl-trust-item">
            <strong>Zero</strong> per-guest fees
          </span>
        </div>
      </div>
    </section>
  );
}
