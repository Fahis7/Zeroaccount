export default function LogoIcon({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="3" />
      <line x1="9" y1="39" x2="39" y2="9" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
