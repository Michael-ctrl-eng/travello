"use client";

import { PlaneIcon } from "@/lib/wanderlust/icons";

export default function Footer() {
  return (
    <footer className="wl-footer">
      <div className="wl-footer-inner">
        <div className="wl-footer-brand-row">
          <PlaneIcon size={18} className="wl-footer-plane" />
          <span className="wl-footer-word">WanderLust</span>
        </div>
        <p className="wl-footer-tag">Be a traveller.</p>
        <p className="wl-footer-copy">
          © {new Date().getFullYear()} WanderLust. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
