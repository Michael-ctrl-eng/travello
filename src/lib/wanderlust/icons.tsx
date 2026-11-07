/**
 * WanderLust icon set — handcrafted, SF-Symbols-inspired duotone glyphs.
 * Solid fills with soft two-tone accents, rounded joins.
 * No third-party icon fonts, no generic stroke icons.
 */

import type { ReactNode, SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function Svg({ size = 20, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* Brand — airplane climbing north-east */
export function PlaneIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <g transform="rotate(45 12 12)">
        <path
          d="M12 2.6c.9 0 1.6 1.3 1.6 2.8v3.5l8 4.4v2l-8-2v4.6l2.4 1.8v1.7L12 20.9l-4 .5v-1.7l2.4-1.8v-4.6l-8 2v-2l8-4.4V5.4c0-1.5.7-2.8 1.6-2.8Z"
          fill="currentColor"
          strokeLinejoin="round"
        />
      </g>
    </Svg>
  );
}

export function SearchIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <circle cx="11" cy="11" r="6.6" stroke="currentColor" strokeWidth="2" />
      <path
        d="m15.8 15.8 4.7 4.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

/* Map pin — solid teardrop with punched hole */
export function MapPinIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.5c-4.1 0-7.4 3.2-7.4 7.2 0 5.2 5.6 9.6 6.8 10.5.4.3.9.3 1.2 0 1.2-.9 6.8-5.3 6.8-10.5 0-4-3.3-7.2-7.4-7.2Zm0 5.7a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6Z"
        fill="currentColor"
      />
    </Svg>
  );
}

export function CalendarIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15.5"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M8 2.8v4M16 2.8v4M3.5 9.6h17"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="8" cy="13.2" r="1.2" fill="currentColor" />
      <circle cx="12" cy="13.2" r="1.2" fill="currentColor" />
      <circle cx="16" cy="13.2" r="1.2" fill="currentColor" opacity=".4" />
      <circle cx="8" cy="16.8" r="1.2" fill="currentColor" opacity=".4" />
      <circle cx="12" cy="16.8" r="1.2" fill="currentColor" opacity=".4" />
    </Svg>
  );
}

export function UsersIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <circle cx="16.6" cy="8.9" r="2.7" fill="currentColor" opacity=".42" />
      <path
        d="M14.7 15c2.9.2 5.8 2.1 5.8 5.1H17c0-2.2-.8-3.9-2.3-5.1Z"
        fill="currentColor"
        opacity=".42"
      />
      <circle cx="9.2" cy="8.3" r="3.4" fill="currentColor" />
      <path
        d="M9.2 13.9c-3.2 0-5.7 2.2-5.7 6.2h11.4c0-4-2.5-6.2-5.7-6.2Z"
        fill="currentColor"
      />
    </Svg>
  );
}

export function StarIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="m12 3.1 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.5l6-.9L12 3.1Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function HeartIcon({
  size = 20,
  filled = false,
  ...props
}: IconProps & { filled?: boolean }) {
  return (
    <Svg size={size} {...props}>
      <path
        d="M12 20.8C7 17 2.6 13.1 2.6 8.9 2.6 6 4.8 4 7.2 4c1.9 0 3.8 1 4.8 2.9C13 5 14.9 4 16.8 4c2.4 0 4.6 2 4.6 4.9 0 4.2-4.4 8.1-9.4 11.9Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 1.2 : 2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BoltIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="M13.2 2.2 4.6 13.7h5.6L9.3 21.8l8.9-11.5h-5.6l.6-8.1Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronLeftIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="m14.6 5.5-6.5 6.5 6.5 6.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="m9.4 5.5 6.5 6.5-6.5 6.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronDownIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="m5.5 9.4 6.5 6.5 6.5-6.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function MenuIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="M4 9h16M4 15h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CloseIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

/* ---------- Filter rail glyphs ---------- */

/* Flame — solid with hollow core */
export function FlameIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.6c.7 1.7 1.7 3 2.9 4.3 1.4 1.6 2.9 3.4 2.9 6 0 4-2.9 6.9-6.4 6.9-3.5 0-6.4-2.9-6.4-6.9 0-2.4 1.2-4.2 2.6-5.8.4 1.1 1.1 1.9 2.1 2.3-.4-2.2.1-4.6 2.3-6.8Zm0 10.6c-1.9 1.2-3.4 2.4-3.4 4 0 1.9 1.5 3.4 3.4 3.4s3.4-1.5 3.4-3.4c0-1.6-1.5-2.8-3.4-4Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BedIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="M3 6.8v12.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M21 10.2v9"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <rect
        x="3"
        y="13.2"
        width="18"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M6.3 13.2v-1.4a1.7 1.7 0 0 1 1.7-1.7h2.4a1.7 1.7 0 0 1 1.7 1.7v1.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CityIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <rect x="3" y="9.2" width="5.6" height="11.3" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="10" y="4" width="6.2" height="16.5" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="17.4" y="12" width="3.6" height="8.5" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12.2 7.4h1.8M12.2 10.6h1.8M12.2 13.8h1.8M5.1 12.6h1.4M5.1 15.8h1.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  );
}

/* Mountains — duotone solid peaks */
export function MountainIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="M2.9 19.6 8.4 8.3l3.2 5.5-2.2 5.8H2.9Z"
        fill="currentColor"
        opacity=".38"
      />
      <path
        d="M9.4 19.6 15.2 5.7l6.3 13.9H9.4Z"
        fill="currentColor"
      />
    </Svg>
  );
}

export function CastleIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="M4 20.2V8.6l2 1.6 2-1.6 2 1.6 2-1.6 2 1.6 2-1.6 2 1.6 2-1.6v11.6H4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10.4 20.2v-4.3a1.6 1.6 0 0 1 3.2 0v4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 10.2V5.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M12 5.6 14.8 6.7 12 7.8V5.6Z" fill="currentColor" strokeLinejoin="round" />
    </Svg>
  );
}

export function WavesIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="M2.5 8.6c2.4 0 2.4 1.8 4.8 1.8s2.4-1.8 4.8-1.8 2.4 1.8 4.8 1.8 2.4-1.8 4.6-1.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2.5 14.6c2.4 0 2.4 1.8 4.8 1.8s2.4-1.8 4.8-1.8 2.4 1.8 4.8 1.8 2.4-1.8 4.6-1.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".45"
      />
    </Svg>
  );
}

/* Tent — solid with door cutout */
export function TentIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4 3.4 19.6h17.2L12 4Zm0 4.8-2.8 8.4h5.6L12 8.8Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M2.4 21h19.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".45"
      />
    </Svg>
  );
}

export function LeafIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.4 18.6C5.4 10.4 12 4.8 20 4.8c0 8-5.6 14.4-13.7 14.4H5.4Zm2.9-2.6c4.5-.5 8-3.3 10-7.6-4.6-.4-8.3 2.4-10 7.6Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/* Snowflake — three rotated spokes with branch ticks */
export function SnowflakeIcon({ size = 20, ...props }: IconProps) {
  const spoke = (
    <path
      d="M12 3.1v17.8M12 6.1 9.7 3.8M12 6.1l2.3-2.3M12 17.9l-2.3 2.3m2.3-2.3 2.3 2.3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  );
  return (
    <Svg size={size} {...props}>
      {spoke}
      <g transform="rotate(60 12 12)">{spoke}</g>
      <g transform="rotate(120 12 12)">{spoke}</g>
    </Svg>
  );
}

/* Sailboat — duotone sails + solid hull */
export function SailboatIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="M11.2 5.4v10H4.6c.9-4.7 3.4-8.4 6.6-10Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M12.8 4.2c3.2 1 5.2 3.7 5.6 7.3h-5.6V4.2Z"
        fill="currentColor"
        opacity=".42"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.1v13.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M3.4 17.4h17.2l-2.3 3.1H5.7l-2.3-3.1Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function GlobeIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="3.9" ry="8.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.2 12h17.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="m5 12.6 4.6 4.6L19 7.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PlusIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path
        d="M12 5.5v13M5.5 12h13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MinusIcon({ size = 20, ...props }: IconProps) {
  return (
    <Svg size={size} {...props}>
      <path d="M5.5 12h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}
