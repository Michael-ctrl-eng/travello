"use client";

import { useEffect, useState } from "react";
import {
  CloseIcon,
  HeartIcon,
  MenuIcon,
  PlaneIcon,
  SearchIcon,
} from "@/lib/travello/icons";
import type { CurrencyCode } from "@/lib/travello/currency";

interface NavbarProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  query: string;
  onQueryChange: (q: string) => void;
  savedCount: number;
  showSaved: boolean;
  onToggleSaved: () => void;
}

export default function Navbar({
  currency,
  onCurrencyChange,
  query,
  onQueryChange,
  savedCount,
  showSaved,
  onToggleSaved,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Transparent over the hero → dark frosted glass once scrolled */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`wl-navbar${scrolled ? " is-scrolled" : ""}`}>
      <div className="wl-navbar-inner">
        <a className="wl-brand" href="#top" aria-label="Travello home">
          <PlaneIcon className="wl-logo" size={24} />
          <span className="wl-brand-word">Travello</span>
        </a>

        <div className="wl-nav-center">
          <a className="wl-nav-link" href="#collections">
            Collections
          </a>
          <a className="wl-nav-link" href="#sanctuary">
            The experience
          </a>
          <a className="wl-nav-link" href="#collection">
            Explore stays
          </a>
        </div>

        <div className="wl-nav-tools">
          <form
            className="wl-nav-search wl-hide-sm"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="wl-search-input"
              type="search"
              placeholder="Search destination"
              aria-label="Search destinations"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
            />
            <button className="wl-search-btn" type="submit" aria-label="Search">
              <SearchIcon size={15} />
            </button>
          </form>

          {/* Saved stays filter */}
          <button
            type="button"
            className={`wl-saved-chip${showSaved ? " is-active" : ""}`}
            aria-pressed={showSaved}
            onClick={onToggleSaved}
            title="Show saved stays"
          >
            <HeartIcon size={14} filled={showSaved || savedCount > 0} />
            <span className="wl-saved-label">Saved</span>
            <span className="wl-saved-count">{savedCount}</span>
          </button>

          {/* Currency — translucent segmented control (USD / EGP) */}
          <div
            className="wl-currency-switch"
            role="group"
            aria-label="Display currency"
            data-active={currency}
          >
            <span className="wl-currency-knob" aria-hidden="true" />
            {(["USD", "EGP"] as CurrencyCode[]).map((code) => (
              <button
                key={code}
                type="button"
                className={`wl-currency-opt${currency === code ? " is-active" : ""}`}
                data-currency={code}
                aria-pressed={currency === code}
                title={code === "USD" ? "US Dollar" : "Egyptian Pound"}
                onClick={() => onCurrencyChange(code)}
              >
                <span className="wl-currency-glyph" aria-hidden="true">
                  {code === "USD" ? "$" : "E£"}
                </span>
                <span className="wl-currency-code">{code}</span>
              </button>
            ))}
          </div>

          <a className="wl-nav-link wl-nav-link-pill wl-hide-md" href="#collection">
            Log in
          </a>

          <button
            className="wl-burger"
            type="button"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile floating frosted sheet */}
      {open && (
        <div className="wl-mobile-sheet">
          <a className="wl-nav-link" href="#collections" onClick={() => setOpen(false)}>
            Collections
          </a>
          <a className="wl-nav-link" href="#sanctuary" onClick={() => setOpen(false)}>
            The experience
          </a>
          <a className="wl-nav-link" href="#collection" onClick={() => setOpen(false)}>
            Explore stays
          </a>
          <a
            className="wl-nav-link wl-nav-link-pill"
            href="#collection"
            onClick={() => setOpen(false)}
          >
            Log in
          </a>
        </div>
      )}
    </nav>
  );
}
