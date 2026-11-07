"use client";

import {
  BedIcon,
  CastleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CityIcon,
  FlameIcon,
  LeafIcon,
  MountainIcon,
  SailboatIcon,
  SnowflakeIcon,
  TentIcon,
  WavesIcon,
} from "@/lib/wanderlust/icons";
import type { ComponentType } from "react";
import { FILTERS, type FilterId } from "@/lib/wanderlust/data";

const FILTER_ICONS: Record<FilterId, ComponentType<{ size?: number }>> = {
  trending: FlameIcon,
  rooms: BedIcon,
  cities: CityIcon,
  mountains: MountainIcon,
  castles: CastleIcon,
  pools: WavesIcon,
  camping: TentIcon,
  farms: LeafIcon,
  arctic: SnowflakeIcon,
  boats: SailboatIcon,
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
          <ChevronLeftIcon size={16} />
        </button>

        <div id="wl-filters" className="wl-filters">
          <button
            type="button"
            className={`wl-filter${active === "all" ? " is-active" : ""}`}
            onClick={() => onActiveChange("all")}
          >
            <div aria-hidden="true">
              <GlobeGlyph />
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
                  <Icon size={17} />
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
          <ChevronRightIcon size={16} />
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

/* Compact globe glyph for the "All" chip */
function GlobeGlyph() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="3.9" ry="8.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.2 12h17.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
