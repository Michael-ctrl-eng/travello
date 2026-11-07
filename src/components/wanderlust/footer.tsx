"use client";

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const socials = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="wl-footer">
      <div className="wl-footer-inner">
        <div className="wl-footer-socials">
          {socials.map(({ Icon, label }) => (
            <a key={label} href="#top" aria-label={label} className="wl-social">
              <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="wl-footer-links">
          <a href="#top">Privacy</a>
          <a href="#top">Terms</a>
          <a href="#top">Sitemap</a>
        </div>

        <div className="wl-footer-brand">
          © 2026 WanderLust · Apple Edition — crafted with obsessive attention to detail.
        </div>
      </div>
    </footer>
  );
}
