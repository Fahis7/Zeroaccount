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
          className="absolute border border-teal-400/10 rounded-full"
          style={{
            width: el.w,
            height: el.h,
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
            background: "radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

// ─── Classy UAE Skyline ─────────────────────────────────────────────
function ClassyUAESkyline() {
  return (
    <svg
      viewBox="0 0 500 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="classyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#15BCDF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#0A8E9F" stopOpacity="1" />
          <stop offset="100%" stopColor="#15BCDF" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <line x1="20" y1="220" x2="480" y2="220" stroke="url(#classyGrad)" strokeWidth="1" strokeDasharray="6 4" strokeLinecap="round" />

      {/* Burj Khalifa */}
      <g stroke="url(#classyGrad)" fill="none">
        <rect x="235" y="30" width="30" height="190" rx="2" strokeWidth="1.2" />
        <rect x="242" y="50" width="16" height="170" rx="1" strokeWidth="0.8" />
        <rect x="246" y="70" width="8" height="150" strokeWidth="0.6" />
        <line x1="250" y1="10" x2="250" y2="30" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="250" cy="8" r="2" fill="url(#classyGrad)" />
        <line x1="235" y1="60" x2="265" y2="60" strokeWidth="0.6" strokeDasharray="3 3" />
        <line x1="235" y1="100" x2="265" y2="100" strokeWidth="0.6" strokeDasharray="3 3" />
        <line x1="235" y1="140" x2="265" y2="140" strokeWidth="0.6" strokeDasharray="3 3" />
        <line x1="235" y1="180" x2="265" y2="180" strokeWidth="0.6" strokeDasharray="3 3" />
      </g>

      {/* Burj Al Arab */}
      <g stroke="url(#classyGrad)" fill="none">
        <path d="M 390 220 L 390 110 Q 420 70 450 110 L 450 220" strokeWidth="1.2" />
        <path d="M 396 220 L 396 115 Q 420 80 444 115 L 444 220" strokeWidth="0.8" />
        <ellipse cx="420" cy="100" rx="18" ry="5" strokeWidth="1" />
        <line x1="402" y1="100" x2="438" y2="100" strokeWidth="0.8" />
        <line x1="392" y1="150" x2="448" y2="150" strokeWidth="0.6" strokeDasharray="3 3" />
        <line x1="394" y1="190" x2="446" y2="190" strokeWidth="0.6" strokeDasharray="3 3" />
      </g>

      {/* Emirates Towers */}
      <g stroke="url(#classyGrad)" fill="none">
        <polygon points="60,220 60,110 80,80 100,110 100,220" strokeWidth="1.2" />
        <polygon points="68,220 68,115 80,90 92,115 92,220" strokeWidth="0.8" />
        <line x1="60" y1="140" x2="100" y2="140" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="60" y1="180" x2="100" y2="180" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="76" y1="60" x2="76" y2="80" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="84" y1="70" x2="84" y2="85" strokeWidth="0.8" strokeLinecap="round" />
      </g>

      {/* Dubai Frame */}
      <g stroke="url(#classyGrad)" fill="none">
        <rect x="140" y="90" width="36" height="130" rx="2" strokeWidth="1.2" />
        <rect x="148" y="105" width="20" height="100" rx="1" strokeWidth="0.8" />
        <line x1="140" y1="120" x2="176" y2="120" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="140" y1="160" x2="176" y2="160" strokeWidth="0.6" strokeDasharray="2 2" />
      </g>

      {/* Modern Buildings */}
      <g stroke="url(#classyGrad)" fill="none">
        <rect x="30" y="130" width="14" height="90" strokeWidth="0.8" />
        <line x1="37" y1="110" x2="37" y2="130" strokeWidth="0.8" strokeLinecap="round" />
        <rect x="10" y="160" width="10" height="60" strokeWidth="0.8" />
        <line x1="15" y1="140" x2="15" y2="160" strokeWidth="0.6" strokeLinecap="round" />
        <rect x="270" y="80" width="18" height="140" strokeWidth="1.2" />
        <line x1="279" y1="60" x2="279" y2="80" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="270" y1="110" x2="288" y2="110" strokeWidth="0.6" strokeDasharray="3 3" />
        <line x1="270" y1="150" x2="288" y2="150" strokeWidth="0.6" strokeDasharray="3 3" />
        <line x1="270" y1="190" x2="288" y2="190" strokeWidth="0.6" strokeDasharray="3 3" />
        <rect x="298" y="120" width="14" height="100" strokeWidth="0.8" />
        <line x1="305" y1="100" x2="305" y2="120" strokeWidth="0.6" strokeLinecap="round" />
        <rect x="320" y="150" width="12" height="70" strokeWidth="0.8" />
        <line x1="326" y1="130" x2="326" y2="150" strokeWidth="0.6" strokeLinecap="round" />
        <rect x="460" y="170" width="12" height="50" strokeWidth="0.8" />
        <rect x="480" y="190" width="10" height="30" strokeWidth="0.6" />
      </g>

      {/* Subtle stars */}
      <g fill="url(#classyGrad)" opacity="0.4">
        <circle cx="80" cy="30" r="1" />
        <circle cx="350" cy="40" r="1" />
        <circle cx="200" cy="25" r="1" />
        <circle cx="420" cy="35" r="1" />
        <circle cx="170" cy="50" r="0.8" opacity="0.3" />
        <circle cx="310" cy="60" r="0.8" opacity="0.3" />
        <circle cx="480" cy="45" r="0.8" opacity="0.3" />
        <circle cx="120" cy="40" r="0.8" opacity="0.3" />
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
              radial-gradient(ellipse 60% 50% at 20% 80%, rgba(45,212,191,0.08), transparent 60%),
              radial-gradient(ellipse 50% 40% at 80% 20%, rgba(6,182,212,0.05), transparent 50%)
            `,
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 60% 50% at 20% 80%, rgba(45,212,191,0.10), transparent 60%)",
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(6,182,212,0.10), transparent 60%)",
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.06), transparent 60%)",
              "radial-gradient(ellipse 60% 50% at 20% 80%, rgba(45,212,191,0.10), transparent 60%)",
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
              background: "radial-gradient(circle, rgba(45,212,191,0.15), transparent 60%)",
              filter: "blur(100px)",
              opacity: 0.5,
              transition: "opacity 0.4s ease",
            }}
          />
        </motion.div>
      )}

      {/* ─── Content ─── */}
      <div className="relative mx-auto max-w-7xl grid grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ─── Left: Shifted Left Classy Skyline ─── */}
        <ScrollReveal direction="left" className="flex justify-center items-center h-full">
          <motion.div
            style={{
              rotateX: (isMobile || prefersReducedMotion) ? 0 : rotateX,
              rotateY: (isMobile || prefersReducedMotion) ? 0 : rotateY,
              perspective: 1200,
            }}
            // 🎯 Shifted Left: -ml-8 moves it 32px left from center
            className="relative w-full max-w-4xl aspect-[2/1] flex items-center justify-center -ml-8"
          >
            {/* Pulsing glow behind the skyline */}
            <motion.div
              animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-accent/10 blur-3xl"
            />

            {/* Skyline SVG */}
            <div className="relative z-10 w-full h-full">
              <ClassyUAESkyline />
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
                  <div className="relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-wash text-accent-deep transition-all duration-300 group-hover:bg-accent group-hover:text-white dark:bg-accent/10 dark:text-accent dark:group-hover:bg-accent dark:group-hover:text-white">
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