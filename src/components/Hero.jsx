import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedCounter from "./AnimatedCounter.jsx";

// ─── Animation Variants ──────────────────────────────────────────────

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const floatShape = {
  initial: { y: 0, rotate: 0 },
  animate: (delay) => ({
    y: [0, -20, 0, 20, 0],
    rotate: [0, 10, -10, 5, 0],
    transition: {
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay || 0,
    },
  }),
};

// ─── Floating Orbs (No lines) ──────────────────────────────────────
function FloatingOrbs() {
  const orbs = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 18,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 14 + Math.random() * 20,
    delay: Math.random() * 8,
    opacity: 0.1 + Math.random() * 0.25,
    color: Math.random() > 0.6 ? "rgba(13,148,136," : "rgba(6,182,212,",
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `${orb.color}${orb.opacity})`,
            boxShadow: `0 0 ${orb.size * 2}px ${orb.color}${orb.opacity * 0.4})`,
          }}
          animate={{
            x: [0, 20, -15, 10, 0],
            y: [0, -15, 25, -10, 0],
            scale: [1, 1.15, 0.85, 1.1, 1],
            opacity: [orb.opacity, orb.opacity * 1.6, orb.opacity * 0.5, orb.opacity * 1.3, orb.opacity],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // ── Mouse tracking ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const glowX = useTransform(springX, (v) => v * 0.4);
  const glowY = useTransform(springY, (v) => v * 0.4);
  const parallaxX = useTransform(springX, (v) => v * 0.08);
  const parallaxY = useTransform(springY, (v) => v * 0.08);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
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
  }, [mouseX, mouseY]);

  const lines = t("home.hero.lines", { returnObjects: true });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-24 dark:bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ─── Animated Gradient Background ──────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 20%, rgba(13,148,136,0.25), transparent 50%),
              radial-gradient(ellipse 60% 50% at 80% 80%, rgba(6,182,212,0.15), transparent 50%),
              radial-gradient(ellipse 50% 40% at 50% 50%, rgba(16,185,129,0.08), transparent 60%)
            `,
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(13,148,136,0.20), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(6,182,212,0.20), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.20), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(13,148,136,0.20), transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ─── Floating Orbs (No connecting lines) ─────────────── */}
      <FloatingOrbs />

      {/* ─── Mouse‑Following Glow ───────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ x: glowX, y: glowY }}
      >
        <div
          className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: "50%",
            top: "50%",
            background: "radial-gradient(circle, rgba(13,148,136,0.15), transparent 60%)",
            filter: "blur(80px)",
            opacity: isHovering ? 1 : 0.6,
            transition: "opacity 0.6s ease",
          }}
        />
        <div
          className="absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: "50%",
            top: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.10), transparent 60%)",
            filter: "blur(60px)",
            opacity: isHovering ? 0.8 : 0.3,
            transition: "opacity 0.8s ease",
          }}
        />
      </motion.div>

      {/* ─── Floating Shapes ────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { w: 40, h: 40, top: "12%", left: "8%", delay: 0, shape: "circle" },
          { w: 24, h: 24, top: "18%", right: "12%", delay: 1.2, shape: "diamond" },
          { w: 16, h: 16, top: "65%", left: "6%", delay: 0.6, shape: "circle" },
          { w: 32, h: 32, bottom: "20%", right: "8%", delay: 2.0, shape: "circle" },
          { w: 12, h: 12, top: "45%", left: "15%", delay: 0.3, shape: "diamond" },
          { w: 20, h: 20, bottom: "35%", right: "18%", delay: 1.8, shape: "circle" },
          { w: 8, h: 8, top: "30%", right: "25%", delay: 0.9, shape: "circle" },
          { w: 48, h: 48, bottom: "10%", left: "25%", delay: 2.5, shape: "circle" },
        ].map((el, idx) => (
          <motion.div
            key={idx}
            custom={el.delay}
            variants={floatShape}
            initial="initial"
            animate="animate"
            className="absolute border border-white/8"
            style={{
              width: el.w,
              height: el.h,
              top: el.top,
              left: el.left,
              right: el.right,
              bottom: el.bottom,
              borderRadius: el.shape === "circle" ? "50%" : "2px",
              transform: `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`,
              background:
                el.shape === "circle"
                  ? "radial-gradient(circle, rgba(13,148,136,0.12), transparent 70%)"
                  : "rgba(13,148,136,0.06)",
              boxShadow: el.shape === "circle"
                ? "0 0 40px rgba(13,148,136,0.05)"
                : "none",
            }}
          />
        ))}
      </div>

      {/* ─── Subtle Grid Overlay ───────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Main Content ────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="relative mx-auto max-w-5xl px-6 py-24 text-center lg:px-8"
        style={{
          x: parallaxX,
          y: parallaxY,
        }}
      >
        {/* ─── Eyebrow ── */}
        <motion.span
          variants={item}
          className="inline-block border border-white/15 bg-white/5 px-4 py-1.5 font-display text-xs uppercase tracking-wide text-accent"
        >
          {t("home.hero.eyebrow")}
        </motion.span>

        {/* ─── Staircase Headline ── */}
        <h1 className="mt-8 font-display text-display-xl text-white">
          {lines.map((line, index) => (
            <motion.span
              key={line}
              variants={item}
              className={`block ${index === lines.length - 1 ? "text-accent" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* ─── Subtitle ── */}
        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          {t("home.hero.subtitle")}
        </motion.p>

        {/* ─── Buttons ── */}
        <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="clip-corner bg-accent px-7 py-3.5 font-display text-xs uppercase tracking-wide text-ink shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-deep"
          >
            {t("home.hero.cta1")}
          </Link>
          <a
            href="#services"
            className="clip-corner border border-white/20 px-7 py-3.5 font-display text-xs uppercase tracking-wide text-white transition-colors hover:border-white/40"
          >
            {t("home.hero.cta2")}
          </a>
        </motion.div>

        {/* ─── Stats ── */}
        <motion.div
          variants={item}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-10"
        >
          <div>
            <div className="font-display text-3xl text-white">
              <AnimatedCounter target={500} suffix="+" />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-white/60">
              {t("home.hero.stat1Label")}
            </div>
          </div>
          <div>
            <div className="font-display text-3xl text-white">
              <AnimatedCounter target={15} suffix="+" />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-white/60">
              {t("home.hero.stat2Label")}
            </div>
          </div>
          <div>
            <div className="font-display text-3xl text-white">
              <AnimatedCounter target={98} suffix="%" />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-white/60">
              {t("home.hero.stat3Label")}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}