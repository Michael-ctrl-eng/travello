"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/travello/navbar";
import Hero from "@/components/travello/hero";
import {
  Collections,
  Excellence,
  Sanctuary,
  TrustStrip,
} from "@/components/travello/landing-sections";
import FilterRail from "@/components/travello/filter-rail";
import ListingGrid from "@/components/travello/listing-grid";
import ListingModal from "@/components/travello/listing-modal";
import Footer from "@/components/travello/footer";
import { listings, type FilterId, type Listing } from "@/lib/travello/data";
import { DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/travello/currency";

function isoDay(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export default function TravelloPage() {
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [filter, setFilter] = useState<FilterId | "all">("all");
  const [showTax, setShowTax] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<ReadonlySet<string>>(new Set());
  const [savedOnly, setSavedOnly] = useState(false);
  const [selected, setSelected] = useState<Listing | null>(null);

  /* Shared search state — hero widget feeds the listings + booking modal */
  const [checkIn, setCheckIn] = useState(() => isoDay(7));
  const [checkOut, setCheckOut] = useState(() => isoDay(10));
  const [month, setMonth] = useState("");
  const [guests, setGuests] = useState(2);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      const matchesFilter = filter === "all" || l.tags.includes(filter);
      const matchesSaved = !savedOnly || saved.has(l.id);
      const haystack = `${l.title} ${l.location} ${l.country}`.toLowerCase();
      const matchesQuery = q === "" || haystack.includes(q);
      return matchesFilter && matchesQuery && matchesSaved;
    });
  }, [filter, query, savedOnly, saved]);

  const scrollToCollection = () => {
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pickCollection = (f: FilterId) => {
    setFilter(f);
    setSavedOnly(false);
    scrollToCollection();
  };

  const pickDestination = (q: string) => {
    setQuery(q);
    setFilter("all");
    setSavedOnly(false);
    scrollToCollection();
  };

  return (
    <div className="wl-app" id="top">
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        query={query}
        onQueryChange={setQuery}
        savedCount={saved.size}
        showSaved={savedOnly}
        onToggleSaved={() => setSavedOnly((v) => !v)}
      />

      <main>
        <Hero
          query={query}
          onQueryChange={setQuery}
          guests={guests}
          onGuestsChange={setGuests}
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          month={month}
          onMonthChange={setMonth}
          onSearch={scrollToCollection}
        />

        <Collections onPick={pickCollection} />
        <Sanctuary />
        <Excellence />
        <TrustStrip />

        <section className="wl-listings">
          <div className="wl-container">
            <div className="wl-listings-head">
              <h2 className="wl-band-title">Explore the collection</h2>
              <p className="wl-band-sub">
                Hand-picked stays, one transparent price — whatever your party
                size.
              </p>
            </div>

            <FilterRail
              active={filter}
              onActiveChange={setFilter}
              showTax={showTax}
              onShowTaxChange={setShowTax}
            />
            <ListingGrid
              listings={visible}
              currency={currency}
              showTax={showTax}
              query={query}
              saved={saved}
              savedOnly={savedOnly}
              onOpen={setSelected}
              onToggleSave={toggleSave}
            />
          </div>
        </section>
      </main>

      <Footer onPickFilter={pickCollection} onPickDestination={pickDestination} />

      {selected && (
        <ListingModal
          key={selected.id}
          listing={selected}
          currency={currency}
          showTax={showTax}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          initialGuests={guests}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
