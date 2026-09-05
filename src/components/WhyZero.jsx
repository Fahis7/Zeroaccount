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

// ─── Realistic UAE Skyline (Upgraded Architectural Edition) ─────────
function RealisticUAESkyline() {
  return (
    <svg
      viewBox="0 0 1000 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xl"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        {/* Dynamic theme-aware gradients */}
        <linearGradient id="skyDome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.12" />
          <stop offset="45%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.03" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>

        {/* Realistic Glass Facade Gradients */}
        <linearGradient id="primaryGlass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="28%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.25" />
          <stop offset="70%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="shadedGlass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.75" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id="highlightEdge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="beaconBeam" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="waterSurface" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="25%" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>

        {/* Precision Micro Windows */}
        <pattern id="microWindows" width="6" height="10" patternUnits="userSpaceOnUse">
          <rect x="1" y="2" width="1.5" height="3.5" rx="0.4" fill="rgb(var(--accent-rgb))" opacity="0.4" />
          <rect x="3.5" y="6" width="1.5" height="3" rx="0.4" fill="currentColor" opacity="0.3" />
        </pattern>

        <filter id="bloomSoft">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="laserSharp">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* ── 1. ATMOSPHERE & AMBIENT GLOW ── */}
      <rect x="0" y="0" width="1000" height="520" fill="url(#skyDome)" />
      
      {/* City Center Horizon Aura */}
      <circle cx="500" cy="380" r="260" fill="rgb(var(--accent-rgb))" opacity="0.06" filter="url(#bloomSoft)" />
      <ellipse cx="230" cy="390" rx="140" ry="70" fill="currentColor" opacity="0.04" filter="url(#bloomSoft)" />

      {/* ── 2. BACKGROUND SILHOUETTES (Far Depth Layer) ── */}
      <g opacity="0.25">
        <rect x="40" y="290" width="46" height="110" rx="1" fill="currentColor" />
        <rect x="100" y="260" width="38" height="140" rx="1" fill="currentColor" />
        <rect x="155" y="240" width="55" height="160" rx="2" fill="currentColor" />
        <rect x="290" y="275" width="42" height="125" rx="1" fill="currentColor" />
        <rect x="345" y="250" width="36" height="150" rx="1" fill="currentColor" />
        <rect x="635" y="280" width="50" height="120" rx="1" fill="currentColor" />
        <rect x="710" y="240" width="44" height="160" rx="2" fill="currentColor" />
        <rect x="850" y="265" width="55" height="135" rx="1" fill="currentColor" />
        <rect x="915" y="285" width="40" height="115" rx="1" fill="currentColor" />
      </g>

      {/* ── 3. ABU DHABI: ALDAR HQ DISC (Left Midground) ── */}
      <g opacity="0.85">
        {/* Outer Coin Shell */}
        <circle cx="105" cy="345" r="48" fill="url(#shadedGlass)" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Diagonal Structural Bracing Grid (Diagrid) */}
        <ellipse cx="105" cy="345" rx="36" ry="46" fill="url(#primaryGlass)" />
        <path d="M70 345 H140 M105 300 V390 M80 320 L130 370 M80 370 L130 320" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      </g>

      {/* ── 4. DUBAI: MUSEUM OF THE FUTURE (Torus with Calligraphy Lines) ── */}
      <g opacity="0.9">
        {/* Outer Ring */}
        <ellipse cx="255" cy="340" rx="66" ry="46" fill="url(#primaryGlass)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        {/* Void Hole */}
        <ellipse cx="255" cy="338" rx="28" ry="18" fill="currentColor" fillOpacity="0.8" />
        {/* Arabic Calligraphy Slit Windows */}
        <path d="M210 325 Q235 315 260 322" stroke="rgb(var(--accent-rgb))" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        <path d="M220 345 Q240 338 250 355" stroke="rgb(var(--accent-rgb))" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <path d="M270 320 Q290 328 305 342" stroke="rgb(var(--accent-rgb))" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
        <path d="M260 358 Q285 352 295 340" stroke="rgb(var(--accent-rgb))" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* ── 5. BURJ KHALIFA (Centerpiece Hero Architecture) ── */}
      <g>
        {/* Spire Searchlight Beam */}
        <polygon points="498 25 502 25 515 0 485 0" fill="url(#beaconBeam)" />

        {/* Atmospheric Back-Silhouette */}
        <path
          d="M482 400 L482 355 L474 355 L474 305 L480 305 L480 255 L486 255 L486 205 L491 205 L491 155 L495 155 L495 95 L499 50 L501 50 L505 95 L505 155 L509 155 L509 205 L514 205 L514 255 L520 255 L520 305 L526 305 L526 355 L518 355 L518 400 Z"
          fill="currentColor"
          fillOpacity="0.5"
        />

        {/* Left Wing Facet (Shadowed) */}
        <path
          d="M482 400 L482 355 L474 355 L474 305 L480 305 L480 255 L486 255 L486 205 L491 205 L491 155 L495 155 L495 95 L499 50 L499 400 Z"
          fill="url(#shadedGlass)"
        />

        {/* Right Wing Facet (Glass Highlight) */}
        <path
          d="M499 50 L501 50 L505 95 L505 155 L509 155 L509 205 L514 205 L514 255 L520 255 L520 305 L526 305 L526 355 L518 355 L518 400 L499 400 Z"
          fill="url(#primaryGlass)"
        />

        {/* Central Spine Fin (Sharp Highlight) */}
        <line x1="500" y1="50" x2="500" y2="400" stroke="url(#highlightEdge)" strokeWidth="1.2" />

        {/* Steel Needle Spire */}
        <line x1="500" y1="50" x2="500" y2="18" stroke="currentColor" strokeWidth="1.5" />
        <line x1="500" y1="18" x2="500" y2="6" stroke="rgb(var(--accent-rgb))" strokeWidth="0.8" />
        
        {/* Red FAA Aviation Beacon */}
        <circle cx="500" cy="6" r="2.5" fill="rgb(var(--accent-rgb))" filter="url(#laserSharp)" />
        <circle cx="500" cy="6" r="1" fill="#FFF" />

        {/* Window Lit Bands along Tier Transitions */}
        <rect x="488" y="210" width="24" height="2" fill="rgb(var(--accent-rgb))" opacity="0.6" />
        <rect x="482" y="260" width="36" height="2" fill="rgb(var(--accent-rgb))" opacity="0.6" />
        <rect x="476" y="310" width="48" height="2" fill="rgb(var(--accent-rgb))" opacity="0.5" />
        <rect x="480" y="315" width="40" height="80" fill="url(#microWindows)" opacity="0.4" />
      </g>

      {/* ── 6. EMIRATES TOWERS (Triangular Profile) ── */}
      <g>
        {/* Tower One (Hotel) */}
        <path d="M570 400 L570 185 L585 145 L600 185 L600 400 Z" fill="url(#primaryGlass)" />
        <path d="M570 185 L585 145 L585 400 L570 400 Z" fill="url(#shadedGlass)" />
        <line x1="585" y1="145" x2="585" y2="115" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="585" cy="115" r="1.5" fill="rgb(var(--accent-rgb))" />

        {/* Tower Two (Offices) */}
        <path d="M608 400 L608 215 L622 178 L636 215 L636 400 Z" fill="url(#primaryGlass)" />
        <path d="M608 215 L622 178 L622 400 L608 400 Z" fill="url(#shadedGlass)" />
        <line x1="622" y1="178" x2="622" y2="152" stroke="currentColor" strokeWidth="1" />
        <circle cx="622" cy="152" r="1.5" fill="rgb(var(--accent-rgb))" />

        {/* Diagonal Slanted Floor Slices */}
        <line x1="572" y1="200" x2="598" y2="200" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="572" y1="230" x2="598" y2="230" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="610" y1="235" x2="634" y2="235" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
      </g>

      {/* ── 7. BURJ AL ARAB (Sail Architecture) ── */}
      <g>
        {/* Mast Spine */}
        <path d="M725 400 L725 210 L725 155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="725" y1="155" x2="725" y2="135" stroke="currentColor" strokeWidth="1.2" />
        
        {/* Curved Outer Bow (Exoskeleton Truss) */}
        <path d="M725 155 C720 220 740 310 770 400" stroke="currentColor" strokeWidth="2.8" fill="none" opacity="0.8" />
        
        {/* White Teflon Sail Membrane */}
        <path d="M725 160 Q768 220 760 395 L726 395 Z" fill="url(#primaryGlass)" />

        {/* Cantilevered Helipad */}
        <line x1="708" y1="195" x2="732" y2="195" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <ellipse cx="714" cy="195" rx="8" ry="2.2" fill="rgb(var(--accent-rgb))" opacity="0.8" />

        {/* Diagonal Cross-Braces */}
        <path d="M726 240 L755 265 M726 290 L762 315 M726 340 L768 365" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.4" />
      </g>

      {/* ── 8. SHEIKH ZAYED GRAND MOSQUE ACCENTS (Right Edge) ── */}
      <g opacity="0.6">
        {/* Main Dome */}
        <path d="M840 400 L840 365 Q860 338 880 365 L880 400 Z" fill="url(#primaryGlass)" />
        <circle cx="860" cy="336" r="1.5" fill="rgb(var(--accent-rgb))" />
        {/* Slender Minaret Spire */}
        <line x1="895" y1="400" x2="895" y2="310" stroke="currentColor" strokeWidth="2" />
        <line x1="895" y1="310" x2="895" y2="295" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="895" cy="294" r="1.2" fill="rgb(var(--accent-rgb))" />
      </g>

      {/* ── 9. ESPLANADE, MARINA WATER & REFLECTIONS ── */}
      {/* Ground Horizon Bar */}
      <line x1="0" y1="400" x2="1000" y2="400" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
      <rect x="0" y="401" width="1000" height="119" fill="url(#waterSurface)" />

      {/* Shimmering Water Reflections */}
      <g opacity="0.5">
        <ellipse cx="500" cy="415" rx="42" ry="3" fill="rgb(var(--accent-rgb))" filter="url(#laserSharp)" opacity="0.7" />
        <ellipse cx="500" cy="435" rx="28" ry="2" fill="currentColor" opacity="0.4" />
        <ellipse cx="500" cy="460" rx="14" ry="1.5" fill="rgb(var(--accent-rgb))" opacity="0.3" />

        <ellipse cx="585" cy="416" rx="18" ry="2" fill="currentColor" opacity="0.4" />
        <ellipse cx="740" cy="418" rx="25" ry="2.5" fill="rgb(var(--accent-rgb))" opacity="0.4" />
        <ellipse cx="255" cy="414" rx="30" ry="2" fill="currentColor" opacity="0.3" />
      </g>
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
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Skyline Image */}
            <div className="relative z-10 w-full h-full">
              <img
                src="/burj.jpg"
                alt="UAE Skyline"
                className="w-full max-h-[350px] sm:max-h-[500px] lg:max-h-[700px] rounded-2xl object-cover object-top opacity-90 shadow-lg dark:opacity-80"
                loading="lazy"
              />
              {/* Subtle gradient overlay to blend with page */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-surface/60 via-transparent to-transparent dark:from-[#0D0F12]/60" />
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