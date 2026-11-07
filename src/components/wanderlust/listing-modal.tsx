"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BoltIcon,
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  UsersIcon,
} from "@/lib/wanderlust/icons";
import type { Listing } from "@/lib/wanderlust/data";
import { convert, formatPrice, type CurrencyCode } from "@/lib/wanderlust/currency";

interface ListingModalProps {
  listing: Listing;
  currency: CurrencyCode;
  showTax: boolean;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onClose: () => void;
}

function isoDay(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export default function ListingModal({
  listing,
  currency,
  showTax,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  onClose,
}: ListingModalProps) {
  const [checkIn, setCheckIn] = useState(() =>
    initialCheckIn ? initialCheckIn : isoDay(7),
  );
  const [checkOut, setCheckOut] = useState(() =>
    initialCheckOut ? initialCheckOut : isoDay(10),
  );
  const [guests, setGuests] = useState(() =>
    initialGuests ? Math.min(8, Math.max(1, initialGuests)) : 2,
  );
  const [status, setStatus] = useState<"form" | "done">("form");

  const today = useMemo(() => isoDay(0), []);

  /* Escape to close + lock page scroll while open */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [onClose]);

  const nights = useMemo(() => {
    const inMs = Date.parse(checkIn);
    const outMs = Date.parse(checkOut);
    if (Number.isNaN(inMs) || Number.isNaN(outMs)) return 1;
    const diff = Math.round((outMs - inMs) / 86_400_000);
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const subtotal = listing.price * nights;
  const vat = showTax ? Math.round(subtotal * 0.14) : 0;
  const total = subtotal + vat;
  const nightsLabel = nights === 1 ? "1 night" : `${nights} nights`;
  /* Guest count never enters the price — the total is per stay, not per guest. */

  return (
    <div
      className="wl-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="wl-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={listing.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="wl-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <CloseIcon size={16} />
        </button>

        <div className="wl-modal-media">
          <img src={listing.image} alt={listing.title} />
          <span className="wl-price-chip">
            <span className="wl-price-amount">
              {formatPrice(listing.price, currency)}
            </span>
            <span className="wl-price-unit">/ night</span>
          </span>
        </div>

        {status === "form" ? (
          <div className="wl-modal-body">
            <h2 className="wl-modal-title">{listing.title}</h2>
            <p className="wl-modal-meta">
              <StarIcon size={13} className="wl-card-star" />
              <strong>{listing.rating.toFixed(2)}</strong>
              <em>({listing.reviews.toLocaleString("en-US")} reviews)</em>
              <span className="wl-modal-place">
                <MapPinIcon size={13} />
                {listing.location}, {listing.country}
              </span>
            </p>

            <p className="wl-modal-desc">{listing.description}</p>

            <ul className="wl-highlights" aria-label="Highlights">
              {listing.highlights.map((h) => (
                <li key={h}>
                  <BoltIcon size={12} className="wl-highlight-bolt" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="wl-modal-form">
              <div className="wl-form-row">
                <div className="wl-field wl-field--modal">
                  <span className="wl-field-icon wl-field-icon--green" aria-hidden="true">
                    <CalendarIcon size={15} />
                  </span>
                  <label htmlFor="m-in">Check in</label>
                  <input
                    id="m-in"
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="wl-field wl-field--modal">
                  <span className="wl-field-icon wl-field-icon--orange" aria-hidden="true">
                    <CalendarIcon size={15} />
                  </span>
                  <label htmlFor="m-out">Check out</label>
                  <input
                    id="m-out"
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <div className="wl-guests-row">
                <span className="wl-guests-label">
                  <span className="wl-field-icon wl-field-icon--teal" aria-hidden="true">
                    <UsersIcon size={15} />
                  </span>
                  Guests
                </span>
                <span className="wl-stepper">
                  <button
                    type="button"
                    aria-label="Fewer guests"
                    disabled={guests <= 1}
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  >
                    <MinusIcon size={14} />
                  </button>
                  <strong aria-live="polite">{guests}</strong>
                  <button
                    type="button"
                    aria-label="More guests"
                    disabled={guests >= 8}
                    onClick={() => setGuests((g) => Math.min(8, g + 1))}
                  >
                    <PlusIcon size={14} />
                  </button>
                </span>
              </div>
              <p className="wl-guests-note">
                Add up to 8 guests at no extra cost — the price is per stay,
                not per guest.
              </p>
            </div>

            <div className="wl-breakdown">
              <div className="wl-bd-row">
                <span>
                  {formatPrice(listing.price, currency)} × {nightsLabel}
                </span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              {showTax && (
                <div className="wl-bd-row">
                  <span>VAT (14%)</span>
                  <span>{formatPrice(vat, currency)}</span>
                </div>
              )}
              <div className="wl-bd-row wl-bd-total">
                <span>Total</span>
                <span aria-live="polite">{formatPrice(total, currency)}</span>
              </div>
              <p className="wl-bd-note wl-bd-note--flat">
                Same total for 1–8 guests · {guests} travelling
              </p>
              <p className="wl-bd-note">
                {convert(listing.price, currency) !== listing.price
                  ? `Charged in USD · shown in ${currency}`
                  : `Charged in USD`}
              </p>
            </div>

            <button
              type="button"
              className="wl-btn wl-btn-apple wl-modal-cta"
              onClick={() => setStatus("done")}
            >
              Reserve
            </button>
          </div>
        ) : (
          <div className="wl-modal-body wl-modal-done">
            <span className="wl-done-badge" aria-hidden="true">
              <CheckIcon size={26} />
            </span>
            <h2 className="wl-modal-title">Reservation confirmed</h2>
            <p className="wl-modal-desc">
              Your stay at {listing.title} is booked. A confirmation with the
              full itinerary is on its way.
            </p>
            <div className="wl-breakdown wl-done-summary">
              <div className="wl-bd-row">
                <span>Destination</span>
                <span>
                  {listing.location}, {listing.country}
                </span>
              </div>
              <div className="wl-bd-row">
                <span>Dates</span>
                <span>
                  {checkIn} → {checkOut} · {nightsLabel}
                </span>
              </div>
              <div className="wl-bd-row">
                <span>Guests</span>
                <span>{guests}</span>
              </div>
              <div className="wl-bd-row wl-bd-total">
                <span>Paid</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
            </div>
            <button
              type="button"
              className="wl-btn wl-btn-glass wl-modal-cta"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
