"use client";

import { MapPin, Star, Zap } from "lucide-react";
import type { Listing } from "@/lib/wanderlust/data";
import { formatPrice, type CurrencyCode } from "@/lib/wanderlust/currency";

interface ListingGridProps {
  listings: Listing[];
  currency: CurrencyCode;
  showTax: boolean;
  query: string;
}

export default function ListingGrid({
  listings,
  currency,
  showTax,
  query,
}: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="wl-empty">
        <h3>No stays found</h3>
        <p>
          {query
            ? `Nothing matches “${query}”. Try another destination.`
            : "Try a different filter."}
        </p>
      </div>
    );
  }

  return (
    <div className="wl-grid" id="collection">
      {listings.map((listing, i) => (
        <a
          key={listing.id}
          href="#collection"
          className="wl-listing-link"
          aria-label={`${listing.title}, ${listing.location}, ${formatPrice(listing.price, currency)} per night`}
        >
          <article
            className="wl-card"
            style={{ ["--d" as string]: `${(i % 6) * 60}ms` }}
          >
            <div className="wl-card-media">
              <img src={listing.image} alt={listing.title} loading="lazy" />
              <div className="wl-card-overlay" aria-hidden="true" />

              {/* Glass price chip floating on the image */}
              <span className="wl-price-chip">
                <Zap size={11} className="wl-price-bolt" aria-hidden="true" />
                <span className="wl-price-amount">
                  {formatPrice(listing.price, currency)}
                </span>
                <span className="wl-price-unit">
                  / night
                  {showTax && <i className="wl-tax-info">&nbsp;+ 14% VAT</i>}
                </span>
              </span>

              <span className="wl-rating-chip" title={`${listing.rating} rating`}>
                <Star size={11} aria-hidden="true" />
                {listing.rating.toFixed(2)}
              </span>
            </div>

            <div className="wl-card-body">
              <h3 className="wl-card-title">{listing.title}</h3>
              <p className="wl-card-location">
                <MapPin size={12} aria-hidden="true" />
                {listing.location}, {listing.country}
              </p>
            </div>
          </article>
        </a>
      ))}
    </div>
  );
}
