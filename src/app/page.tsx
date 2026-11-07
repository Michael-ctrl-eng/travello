"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/wanderlust/navbar";
import Hero from "@/components/wanderlust/hero";
import FilterRail from "@/components/wanderlust/filter-rail";
import ListingGrid from "@/components/wanderlust/listing-grid";
import ListingModal from "@/components/wanderlust/listing-modal";
import Footer from "@/components/wanderlust/footer";
import { listings, type FilterId, type Listing } from "@/lib/wanderlust/data";
import { DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/wanderlust/currency";

export default function WanderLustPage() {
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [filter, setFilter] = useState<FilterId | "all">("all");
  const [showTax, setShowTax] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<ReadonlySet<string>>(new Set());
  const [savedOnly, setSavedOnly] = useState(false);
  const [selected, setSelected] = useState<Listing | null>(null);

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

      <main className="wl-main">
        <Hero />
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
      </main>

      <Footer />

      {selected && (
        <ListingModal
          key={selected.id}
          listing={selected}
          currency={currency}
          showTax={showTax}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
