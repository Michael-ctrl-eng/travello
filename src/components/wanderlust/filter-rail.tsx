"use client";

import {
  BedDouble,
  Building2,
  Castle,
  ChevronLeft,
  ChevronRight,
  Flame,
  MountainSnow,
  Sailboat,
  Snowflake,
  Sprout,
  Tent,
  Waves,
} from "lucide-react";
import { FILTERS, type FilterId } from "@/lib/wanderlust/data";

const FILTER_ICONS: Record<FilterId, typeof Flame> = {
  trending: Flame,
  rooms: BedDouble,
  cities: Building2,
  mountains: MountainSnow,
  castles: Castle,
  pools: Waves,
  camping: Tent,
  farms: Sprout,
  arctic: Snowflake,
  boats: Sailboat,
};

interface FilterRailProps {
  active: FilterId | "all";
  onActiveChange: (f: FilterId | "all") => void;
  showTax: boolean;
  onShowTaxChange: (v: boolean) => void;
}

export default function FilterRail({
  active,
  onActiveChange,
  showTax,
  onShowTaxChange,
}: FilterRailProps) {
  const scrollFilters = (distance: number) => {
    const el = document.getElementById("wl-filters");
    el?.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <div className="wl-filters-wrapper">
      <div className="wl-filters-container">
        <button
          className="wl-rail-btn"
          type="button"
          onClick={() => scrollFilters(-200)}
          aria-label="Scroll filters left"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        <div id="wl-filters" className="wl-filters">
          <button
            type="button"
            className={`wl-filter${active === "all" ? " is-active" : ""}`}
            onClick={() => onActiveChange("all")}
          >
            <div aria-hidden="true">
              <Sparkle />
            </div>
            <p>All</p>
          </button>
          {FILTERS.map((f) => {
            const Icon = FILTER_ICONS[f.id];
            return (
              <button
                key={f.id}
                type="button"
                className={`wl-filter${active === f.id ? " is-active" : ""}`}
                onClick={() => onActiveChange(f.id)}
              >
                <div aria-hidden="true">
                  <Icon size={17} strokeWidth={1.9} />
                </div>
                <p>{f.label}</p>
              </button>
            );
          })}
        </div>

        <button
          className="wl-rail-btn"
          type="button"
          onClick={() => scrollFilters(200)}
          aria-label="Scroll filters right"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="wl-tax-toggle">
        <div className="wl-switch-row">
          <input
            type="checkbox"
            role="switch"
            className="wl-switch"
            id="taxSwitch"
            checked={showTax}
            onChange={(e) => onShowTaxChange(e.target.checked)}
          />
          <label htmlFor="taxSwitch">Display total after taxes</label>
        </div>
      </div>
    </div>
  );
}

/* tiny inline sparkles glyph for the "All" chip */
function Sparkle() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    </svg>
  );
}
