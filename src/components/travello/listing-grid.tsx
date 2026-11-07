"use client";

import { GlobeIcon, HeartIcon, MapPinIcon, StarIcon } from "@/lib/travello/icons";
import type { Listing } from "@/lib/travello/data";
import { formatPrice, type CurrencyCode } from "@/lib/travello/currency";

interface ListingGridProps {
  listings: Listing[];
  currency: CurrencyCode;
  showTax: boolean;
  query: string;
  saved: ReadonlySet<string>;
  savedOnly: boolean;
  onOpen: (listing: Listing) => void;
  onToggleSave: (id: string) => void;
}

export default function ListingGrid({
  listings,
  currency,
  showTax,
  query,
  saved,
  savedOnly,
  onOpen,
  onToggleSave,
}: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="wl-empty">
        <span className="wl-empty-icon" aria-hidden="true">
          <GlobeIcon size={26} />
        </span>
        {savedOnly && saved.size === 0 ? (
          <>
            <h3>Nothing saved yet</h3>
            <p>Tap the heart on any stay to keep it here.</p>
          </>
        ) : (
          <>
            <h3>No stays found</h3>
            <p>
              {query
                ? `Nothing matches “${query}”. Try another destination.`
                : "Try a different filter."}
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="wl-grid" id="collection">
      {listings.map((listing, i) => {
        const isSaved = saved.has(listing.id);
        return (
          <div
            key={listing.id}
            className="wl-card-wrap"
            style={{ ["--d" as string]: `${(i % 6) * 60}ms` }}
          >
            <button
              type="button"
              className="wl-card-btn"
              onClick={() => onOpen(listing)}
              aria-label={`View ${listing.title}, ${listing.location}, ${formatPrice(listing.price, currency)} per night`}
            >
              <article className="wl-card">
                <div className="wl-card-media">
                  <img src={listing.image} alt={listing.title} loading="lazy" />
                  <div className="wl-card-overlay" aria-hidden="true" />

                  {/* Glass price chip floating on the image */}
                  <span className="wl-price-chip">
                    <span className="wl-price-amount">
                      {formatPrice(listing.price, currency)}
                    </span>
                    <span className="wl-price-unit">
                      / night
                      {showTax && <i className="wl-tax-info">&nbsp;+ 14% VAT</i>}
                    </span>
                  </span>
                </div>

                <div className="wl-card-body">
                  <h3 className="wl-card-title">{listing.title}</h3>
                  <p className="wl-card-meta">
                    <span className="wl-card-rating">
                      <StarIcon size={12} className="wl-card-star" />
                      {listing.rating.toFixed(2)}
                      <em>({listing.reviews.toLocaleString("en-US")})</em>
                    </span>
                    <span className="wl-card-place">
                      <MapPinIcon size={12} />
                      {listing.location}, {listing.country}
                    </span>
                  </p>
                </div>
              </article>
            </button>

            {/* Save heart — glass chip, pops when toggled */}
            <button
              type="button"
              className={`wl-heart-chip${isSaved ? " is-saved" : ""}`}
              aria-pressed={isSaved}
              aria-label={isSaved ? `Remove ${listing.title} from saved` : `Save ${listing.title}`}
              onClick={() => onToggleSave(listing.id)}
            >
              <HeartIcon size={15} filled={isSaved} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
