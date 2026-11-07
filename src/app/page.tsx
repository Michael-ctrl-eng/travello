"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/wanderlust/navbar";
import Hero from "@/components/wanderlust/hero";
import FilterRail from "@/components/wanderlust/filter-rail";
import ListingGrid from "@/components/wanderlust/listing-grid";
import Footer from "@/components/wanderlust/footer";
import { listings, type FilterId } from "@/lib/wanderlust/data";
import { DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/wanderlust/currency";

export default function WanderLustPage() {
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [filter, setFilter] = useState<FilterId | "all">("all");
  const [showTax, setShowTax] = useState(false);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      const matchesFilter = filter === "all" || l.tags.includes(filter);
      const haystack = `${l.title} ${l.location} ${l.country}`.toLowerCase();
      const matchesQuery = q === "" || haystack.includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div className="wl-app" id="top">
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        query={query}
        onQueryChange={setQuery}
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
        />
      </main>

      <Footer />
    </div>
  );
}
