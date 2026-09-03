import { useLayoutEffect, useRef, useState } from "react";
import LogoIcon from "./LogoIcon.jsx";

const variantClasses = {
  light: "text-white",
  dark: "text-ink",
  auto: "text-ink dark:text-white",
};

function Bracket({ side, className = "" }) {
  const d =
    side === "open"
      ? "M13 4C4 4 3 17 3 36C3 55 4 68 13 68"
      : "M7 4C16 4 17 17 17 36C17 55 16 68 7 68";

  return (
    <svg viewBox="0 0 20 72" className={className} aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

// `transform: scaleX()` repaints the glyphs narrower but leaves the original
// layout box in place, so naively scaling text opens a gap before the next
// inline sibling. Measure the untransformed box (offsetWidth is unaffected
// by transform) and pull the trailing edge in by the amount the scale removed.
function Condensed({ children, scale = 0.72 }) {
  const ref = useRef(null);
  const [trim, setTrim] = useState(0);

  useLayoutEffect(() => {
    function measure() {
      if (ref.current) setTrim(ref.current.offsetWidth * (1 - scale));
    }
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure);
  }, [scale, children]);

  return (
    <span
      ref={ref}
      className="inline-block font-display font-bold leading-none"
      style={{ transform: `scaleX(${scale})`, transformOrigin: "left center", marginRight: -trim }}
    >
      {children}
    </span>
  );
}

export default function LogoFull({ variant = "auto", className = "", iconClassName = "", showIcon = true }) {
  const colorClass = variantClasses[variant] ?? variantClasses.auto;

  return (
    <span className={`inline-flex items-center gap-2.5 ${colorClass} ${className}`}>
      {showIcon && <LogoIcon className={iconClassName || "h-[1.3em] w-[1.3em] shrink-0"} />}
      <span dir="ltr" className="flex flex-col leading-none">
        <span className="flex items-center">
          <Condensed>ZER</Condensed>
          <Bracket side="open" className="h-[1.05em] w-[0.22em]" />
          <Condensed>O</Condensed>
          <Bracket side="close" className="h-[1.05em] w-[0.22em]" />
        </span>
        <span className="mt-1.5 font-body text-[0.24em] font-normal tracking-[0.3em]">
          ACCOUNTING
        </span>
      </span>
    </span>
  );
}
