import { motion, useMotionValue, useSpring, useTransform, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal.jsx";

// ─── Icons for features ─────────────────────────────────────────────
const icons = [
  "M9 12l2 2 4-4M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z",
  "M12 8v4l3 2M12 21a9 9 0 100-18 9 9 0 000 18z",
  "M12 3l2.5 4.5L19 9l-3.5 3.4.8 4.9L12 15l-4.3 2.3.8-4.9L5 9l4.5-1.5L12 3z",
];

// ─── Floating background shapes ──────────────────────────────────────
function FloatingShapes() {
  const shapes = [
    { w: 50, h: 50, top: "5%", left: "3%", delay: 0 },
    { w: 30, h: 30, top: "20%", right: "8%", delay: 1.2 },
    { w: 20, h: 20, top: "70%", left: "10%", delay: 0.6 },
    { w: 40, h: 40, bottom: "15%", right: "5%", delay: 2.0 },
    { w: 15, h: 15, top: "45%", left: "20%", delay: 0.4 },
    { w: 25, h: 25, bottom: "30%", right: "12%", delay: 1.8 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((el, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 0.15,
            scale: 1,
            y: [0, -40, 0, 40, 0],
            x: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 10 + idx * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay,
          }}
          className="absolute border border-accent/10 rounded-full"
          style={{
            width: el.w,
            height: el.h,
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
            background: "radial-gradient(circle, rgb(var(--accent-rgb) / 0.06), transparent 70%)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

// ─── Realistic UAE Skyline ────────────────────────────────────────────

// ─── Realistic UAE Skyline ────────────────────────────────────────────
function RealisticUAESkyline() {
  return (
    <svg
      viewBox="0 0 600 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        {/* Subtle sky gradient - blends with page */}
        <linearGradient id="uaeSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.04" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
        </linearGradient>
        {/* Ground fade */}
        <linearGradient id="desert" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
        </linearGradient>
        {/* Building gradients */}
        <linearGradient id="bDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="bMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="bFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
        </linearGradient>
        {/* Window glow */}
        <linearGradient id="wGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.2" />
        </linearGradient>
        {/* Reflection gradient */}
        <linearGradient id="reflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <filter id="spireGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Sky backdrop */}
      <rect x="0" y="0" width="600" height="280" fill="url(#uaeSky)" />

      {/* Sun/moon disc */}
      <circle cx="480" cy="60" r="30" fill="currentColor" opacity="0.04" />
      <circle cx="480" cy="60" r="20" fill="currentColor" opacity="0.03" />

      {/* ═══ FAR BACKGROUND BUILDINGS ═══ */}
      <rect x="10" y="210" width="14" height="50" rx="1" fill="url(#bFar)" />
      <rect x="28" y="195" width="10" height="65" rx="1" fill="url(#bFar)" />
      <rect x="40" y="205" width="12" height="55" rx="1" fill="url(#bFar)" />
      <rect x="520" y="200" width="12" height="60" rx="1" fill="url(#bFar)" />
      <rect x="538" y="215" width="16" height="45" rx="1" fill="url(#bFar)" />
      <rect x="558" y="210" width="10" height="50" rx="1" fill="url(#bFar)" />

      {/* ═══ LEFT CLUSTER ═══ */}

      {/* Mosque with dome and minarets */}
      <rect x="58" y="200" width="50" height="60" rx="2" fill="url(#bMid)" />
      {/* Main dome */}
      <ellipse cx="83" cy="200" rx="20" ry="16" fill="url(#bMid)" />
      {/* Dome crescent */}
      <path d="M83 183 L83 178" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <path d="M81 178 Q83 175 85 178 Q83 176.5 81 178Z" fill="currentColor" opacity="0.6" />
      {/* Left minaret */}
      <rect x="55" y="165" width="6" height="95" rx="1" fill="url(#bDark)" />
      <ellipse cx="58" cy="165" rx="4" ry="3" fill="url(#bDark)" />
      <path d="M58 160 L58 157" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      {/* Right minaret */}
      <rect x="103" y="170" width="6" height="90" rx="1" fill="url(#bDark)" />
      <ellipse cx="106" cy="170" rx="4" ry="3" fill="url(#bDark)" />
      <path d="M106 165 L106 162" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      {/* Mosque windows - arched */}
      <path d="M70 225 Q70 220 73 220 Q76 220 76 225 L76 235 L70 235Z" fill="url(#wGlow)" opacity="0.5" />
      <path d="M80 225 Q80 220 83 220 Q86 220 86 225 L86 235 L80 235Z" fill="url(#wGlow)" opacity="0.6" />
      <path d="M90 225 Q90 220 93 220 Q96 220 96 225 L96 235 L90 235Z" fill="url(#wGlow)" opacity="0.4" />

      {/* ═══ DUBAI FRAME ═══ */}
      {/* Outer frame */}
      <rect x="125" y="115" width="8" height="145" fill="url(#bDark)" />
      <rect x="170" y="115" width="8" height="145" fill="url(#bDark)" />
      <rect x="125" y="110" width="53" height="12" rx="1" fill="url(#bDark)" />
      <rect x="125" y="248" width="53" height="12" rx="1" fill="url(#bDark)" />
      {/* Inner glass */}
      <rect x="133" y="122" width="37" height="126" fill="currentColor" opacity="0.03" />
      {/* Frame windows */}
      <rect x="128" y="140" width="3" height="4" fill="url(#wGlow)" opacity="0.4" />
      <rect x="128" y="165" width="3" height="4" fill="url(#wGlow)" opacity="0.5" />
      <rect x="128" y="190" width="3" height="4" fill="url(#wGlow)" opacity="0.3" />
      <rect x="128" y="215" width="3" height="4" fill="url(#wGlow)" opacity="0.5" />
      <rect x="173" y="140" width="3" height="4" fill="url(#wGlow)" opacity="0.5" />
      <rect x="173" y="165" width="3" height="4" fill="url(#wGlow)" opacity="0.3" />
      <rect x="173" y="190" width="3" height="4" fill="url(#wGlow)" opacity="0.5" />
      <rect x="173" y="215" width="3" height="4" fill="url(#wGlow)" opacity="0.4" />

      {/* ═══ MUSEUM OF THE FUTURE (Torus shape) ═══ */}
      <ellipse cx="210" cy="200" rx="22" ry="32" fill="url(#bMid)" />
      <ellipse cx="210" cy="200" rx="12" ry="18" fill="currentColor" opacity="0.03" />
      {/* Arabic calligraphy hint - decorative lines on the torus */}
      <path d="M192 185 Q195 183 198 185" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
      <path d="M192 195 Q195 193 198 195" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
      <path d="M192 205 Q195 203 198 205" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
      <path d="M192 215 Q195 213 198 215" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
      <path d="M222 185 Q225 183 228 185" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
      <path d="M222 195 Q225 193 228 195" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
      <path d="M222 205 Q225 203 228 205" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
      <path d="M222 215 Q225 213 228 215" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
      {/* Base */}
      <rect x="195" y="232" width="30" height="28" rx="2" fill="url(#bMid)" />

      {/* ═══ CAYAN TOWER (twisted) ═══ */}
      <path d="M245 260 L245 130 Q250 125 255 130 L257 260Z" fill="url(#bMid)" />
      <path d="M247 260 L248 140 Q251 136 254 140 L255 260Z" fill="url(#bDark)" opacity="0.3" />
      <rect x="248" y="150" width="3" height="3" fill="url(#wGlow)" opacity="0.4" />
      <rect x="248" y="170" width="3" height="3" fill="url(#wGlow)" opacity="0.5" />
      <rect x="248" y="190" width="3" height="3" fill="url(#wGlow)" opacity="0.3" />
      <rect x="248" y="210" width="3" height="3" fill="url(#wGlow)" opacity="0.5" />
      <rect x="248" y="230" width="3" height="3" fill="url(#wGlow)" opacity="0.4" />

      {/* ═══ BURJ KHALIFA (centerpiece with stepped tiers) ═══ */}
      <g filter="url(#spireGlow)">
        {/* Spire */}
        <line x1="300" y1="8" x2="300" y2="38" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
        <circle cx="300" cy="8" r="3" fill="rgb(var(--accent-rgb))" opacity="0.4" />
        <circle cx="300" cy="8" r="6" fill="rgb(var(--accent-rgb))" opacity="0.1" />
        
        {/* Stepped tiers - the iconic Burj Khalifa shape */}
        {/* Top narrow tier */}
        <path d="M296 38 L296 70 L304 70 L304 38 Q300 32 296 38Z" fill="url(#bDark)" />
        {/* Second tier */}
        <path d="M293 70 L293 110 L307 110 L307 70Z" fill="url(#bDark)" />
        {/* Third tier */}
        <path d="M290 110 L290 155 L310 155 L310 110Z" fill="url(#bDark)" />
        {/* Fourth tier */}
        <path d="M286 155 L286 200 L314 200 L314 155Z" fill="url(#bDark)" />
        {/* Base widest tier */}
        <path d="M282 200 L282 260 L318 260 L318 200Z" fill="url(#bDark)" />

        {/* Vertical accent lines (setbacks) */}
        <line x1="300" y1="38" x2="300" y2="260" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <line x1="293" y1="70" x2="293" y2="260" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        <line x1="307" y1="70" x2="307" y2="260" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
      </g>

      {/* Burj Khalifa windows - golden glow */}
      {[55, 80, 95, 120, 140, 165, 185, 210, 230, 245].map((y, i) => (
        <g key={`bk-${i}`}>
          <rect x={y < 70 ? 297 : y < 110 ? 295 : y < 155 ? 293 : y < 200 ? 289 : 285}
                y={y} width="2.5" height="3" fill="url(#wGlow)"
                opacity={[0.5, 0.7, 0.4, 0.6, 0.5, 0.3, 0.6, 0.4, 0.7, 0.5][i]} />
          <rect x={y < 70 ? 301 : y < 110 ? 303 : y < 155 ? 305 : y < 200 ? 309 : 312}
                y={y} width="2.5" height="3" fill="url(#wGlow)"
                opacity={[0.4, 0.6, 0.5, 0.3, 0.7, 0.5, 0.4, 0.6, 0.3, 0.6][i]} />
        </g>
      ))}

      {/* ═══ EMIRATES TOWERS (twin towers) ═══ */}
      {/* Tower 1 - taller */}
      <path d="M340 260 L340 100 L345 80 L350 100 L350 260Z" fill="url(#bDark)" />
      <line x1="345" y1="70" x2="345" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      {/* Tower 2 - shorter */}
      <path d="M356 260 L356 125 L360 110 L364 125 L364 260Z" fill="url(#bDark)" />
      <line x1="360" y1="102" x2="360" y2="110" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      {/* Windows */}
      <rect x="342" y="115" width="2.5" height="3" fill="url(#wGlow)" opacity="0.5" />
      <rect x="346" y="115" width="2.5" height="3" fill="url(#wGlow)" opacity="0.4" />
      <rect x="342" y="145" width="2.5" height="3" fill="url(#wGlow)" opacity="0.3" />
      <rect x="346" y="145" width="2.5" height="3" fill="url(#wGlow)" opacity="0.6" />
      <rect x="342" y="175" width="2.5" height="3" fill="url(#wGlow)" opacity="0.5" />
      <rect x="346" y="175" width="2.5" height="3" fill="url(#wGlow)" opacity="0.4" />
      <rect x="342" y="205" width="2.5" height="3" fill="url(#wGlow)" opacity="0.6" />
      <rect x="346" y="205" width="2.5" height="3" fill="url(#wGlow)" opacity="0.3" />
      <rect x="358" y="140" width="2.5" height="3" fill="url(#wGlow)" opacity="0.4" />
      <rect x="358" y="170" width="2.5" height="3" fill="url(#wGlow)" opacity="0.5" />
      <rect x="358" y="200" width="2.5" height="3" fill="url(#wGlow)" opacity="0.6" />

      {/* ═══ BURJ AL ARAB (sail shape) ═══ */}
      <path d="M400 260 L395 260 L390 140 Q390 110 410 95 L410 100 Q400 115 398 140 L400 260Z" fill="url(#bDark)" />
      <path d="M410 260 L415 260 L418 150 Q418 120 410 100Z" fill="url(#bMid)" />
      {/* Helipad */}
      <ellipse cx="405" cy="100" rx="8" ry="3" fill="url(#bDark)" />
      {/* Interior glow */}
      <path d="M400 160 Q405 150 410 160 Q405 155 400 160Z" fill="url(#wGlow)" opacity="0.4" />
      <path d="M398 190 Q405 175 412 190 Q405 180 398 190Z" fill="url(#wGlow)" opacity="0.3" />
      <path d="M397 220 Q405 205 414 220 Q405 210 397 220Z" fill="url(#wGlow)" opacity="0.35" />

      {/* ═══ RIGHT CLUSTER - More towers ═══ */}
      <rect x="435" y="150" width="14" height="110" rx="1" fill="url(#bMid)" />
      <rect x="438" y="160" width="2.5" height="3" fill="url(#wGlow)" opacity="0.4" />
      <rect x="444" y="160" width="2.5" height="3" fill="url(#wGlow)" opacity="0.5" />
      <rect x="438" y="185" width="2.5" height="3" fill="url(#wGlow)" opacity="0.5" />
      <rect x="444" y="185" width="2.5" height="3" fill="url(#wGlow)" opacity="0.3" />
      <rect x="438" y="210" width="2.5" height="3" fill="url(#wGlow)" opacity="0.6" />
      <rect x="444" y="210" width="2.5" height="3" fill="url(#wGlow)" opacity="0.4" />
      <rect x="438" y="235" width="2.5" height="3" fill="url(#wGlow)" opacity="0.3" />
      <rect x="444" y="235" width="2.5" height="3" fill="url(#wGlow)" opacity="0.5" />

      <rect x="455" y="170" width="12" height="90" rx="1" fill="url(#bMid)" />
      <rect x="458" y="180" width="2.5" height="3" fill="url(#wGlow)" opacity="0.5" />
      <rect x="458" y="205" width="2.5" height="3" fill="url(#wGlow)" opacity="0.4" />
      <rect x="458" y="230" width="2.5" height="3" fill="url(#wGlow)" opacity="0.6" />

      {/* ═══ PALM TREES ═══ */}
      {/* Left palm */}
      <path d="M480 260 L482 210" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M482 210 Q490 195 498 205" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M482 210 Q475 192 468 202" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M482 210 Q488 190 495 196" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M482 210 Q476 190 470 196" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M482 210 Q482 192 482 200" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.3" />

      {/* Right palm */}
      <path d="M510 260 L512 220" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <path d="M512 220 Q518 207 524 215" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M512 220 Q506 205 500 212" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M512 220 Q516 202 522 208" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.3" />
      <path d="M512 220 Q508 202 502 208" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.3" />

      {/* ═══ GROUND LINE & DESERT ═══ */}
      <rect x="0" y="258" width="600" height="62" fill="url(#desert)" />
      <line x1="5" y1="260" x2="595" y2="260" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />

      {/* Desert dunes subtle wave */}
      <path d="M0 265 Q50 258 100 265 Q150 270 200 265 Q250 258 300 265 Q350 270 400 265 Q450 258 500 265 Q550 270 600 265 L600 280 L0 280Z" fill="currentColor" opacity="0.04" />

      {/* ═══ REFLECTIONS ═══ */}
      <g opacity="0.08" transform="translate(0, 520) scale(1, -1)">
        {/* Burj Khalifa reflection */}
        <rect x="290" y="260" width="20" height="40" fill="currentColor" />
        {/* Frame reflection */}
        <rect x="130" y="260" width="45" height="25" fill="currentColor" />
        {/* Emirates Towers reflection */}
        <rect x="340" y="260" width="25" height="20" fill="currentColor" />
      </g>

      {/* Subtle stars / birds */}
      <circle cx="50" cy="40" r="1" fill="currentColor" opacity="0.15" />
      <circle cx="150" cy="25" r="0.8" fill="currentColor" opacity="0.12" />
      <circle cx="420" cy="35" r="1" fill="currentColor" opacity="0.1" />
      <circle cx="550" cy="50" r="0.8" fill="currentColor" opacity="0.13" />
      {/* Birds */}
      <path d="M130 55 Q133 52 136 55" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.15" />
      <path d="M140 50 Q142 48 144 50" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.12" />
      <path d="M440 45 Q443 42 446 45" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.13" />
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function WhyZero() {
  const { t } = useTranslation();
  const items = t("home.why.items", { returnObjects: true });
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 700;

  // ── Mouse tracking ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const glowX = useTransform(springX, (v) => v * 30);
  const glowY = useTransform(springY, (v) => v * 30);
  const rotateX = useTransform(springY, (v) => v * -0.01);
  const rotateY = useTransform(springX, (v) => v * 0.01);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative overflow-hidden bg-surface-raised py-28 dark:bg-[#0D0F12]"
    >
      {/* ─── Animated Background ─── */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 20% 80%, rgb(var(--accent-rgb) / 0.07), transparent 60%),
              radial-gradient(ellipse 50% 40% at 80% 20%, rgb(var(--accent-rgb) / 0.04), transparent 50%)
            `,
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 60% 50% at 20% 80%, rgb(var(--accent-rgb) / 0.08), transparent 60%)",
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgb(var(--accent-rgb) / 0.08), transparent 60%)",
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgb(var(--accent-rgb) / 0.05), transparent 60%)",
              "radial-gradient(ellipse 60% 50% at 20% 80%, rgb(var(--accent-rgb) / 0.08), transparent 60%)",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <FloatingShapes />
      </div>

      {/* ─── Mouse‑Following Glow ─── */}
      {!isMobile && !prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ x: glowX, y: glowY }}
        >
          <div
            className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              background: "radial-gradient(circle, rgb(var(--accent-rgb) / 0.12), transparent 60%)",
              filter: "blur(100px)",
              opacity: 0.5,
              transition: "opacity 0.4s ease",
            }}
          />
        </motion.div>
      )}

      {/* ─── Content ─── */}
      <div className="relative mx-auto max-w-7xl grid grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ─── Left: Skyline Aligned Left ─── */}
        <ScrollReveal direction="left" className="flex justify-start items-center h-full">
          <motion.div
            style={{
              rotateX: (isMobile || prefersReducedMotion) ? 0 : rotateX,
              rotateY: (isMobile || prefersReducedMotion) ? 0 : rotateY,
              perspective: 1200,
            }}
            className="relative w-full max-w-4xl aspect-[2/1] flex items-center justify-center"
          >
            {/* Pulsing glow behind the skyline */}
            <motion.div
              animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-accent/10 blur-3xl"
            />

            {/* Skyline SVG */}
            <div className="relative z-10 w-full h-full">
              <RealisticUAESkyline />
            </div>
          </motion.div>
        </ScrollReveal>

        {/* ─── Right: Text & Feature Items ─── */}
        <div className="flex flex-col justify-center">
          <ScrollReveal direction="right">
            <p className="font-display text-xs uppercase tracking-widest text-accent">
              {t("home.why.label")}
            </p>
            <h2 className="mt-4 font-display text-display-lg text-ink dark:text-white">
              {t("home.why.heading")}
            </h2>
          </ScrollReveal>

          <div className="mt-10 space-y-8">
            {items.map((entry, index) => (
              <ScrollReveal key={entry.title} direction="right" delay={index * 0.1}>
                <motion.div
                  className="group relative flex gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 dark:hover:bg-white/5 hover:shadow-lg hover:shadow-accent/5"
                  whileHover={{ x: 8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-wash text-accent-deep transition-all duration-300 group-hover:bg-accent group-hover:text-accent-contrast dark:bg-accent/10 dark:text-accent dark:group-hover:bg-accent dark:group-hover:text-accent-contrast">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:scale-110"
                    >
                      <path d={icons[index % icons.length]} />
                    </svg>
                    <motion.span
                      className="absolute inset-0 rounded-full bg-accent/20 opacity-0 group-hover:opacity-100"
                      animate={!prefersReducedMotion && isInView ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-wide text-ink transition-colors group-hover:text-accent dark:text-white dark:group-hover:text-accent">
                      {entry.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted dark:text-[#9A9FA5]">
                      {entry.description}
                    </p>
                  </div>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent/40 transition-all duration-300 group-hover:w-full"
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}