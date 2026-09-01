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

// ─── Diagonal Lines Background ──────────────────────────────────────
function DiagonalLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated diagonal grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              rgba(13,148,136,0.04) 0px,
              rgba(13,148,136,0.04) 2px,
              transparent 2px,
              transparent 20px
            ),
            repeating-linear-gradient(
              45deg,
              rgba(6,182,212,0.03) 0px,
              rgba(6,182,212,0.03) 1px,
              transparent 1px,
              transparent 30px
            )
          `,
        }}
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Solid diagonal accent lines */}
      {[-2, -1, 0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px w-[200%]"
          style={{
            top: `${50 + i * 12}%`,
            left: "-50%",
            background: `linear-gradient(90deg, transparent, rgba(13,148,136,${0.03 + Math.abs(i) * 0.02}), transparent)`,
            transform: "rotate(-15deg)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// ─── Floating Geometric Shapes ──────────────────────────────────────
function GeometricShapes() {
  const shapes = [
    { type: "triangle", size: 60, x: 5, y: 15, delay: 0 },
    { type: "diamond", size: 30, x: 88, y: 12, delay: 1.2 },
    { type: "square", size: 40, x: 92, y: 70, delay: 0.6 },
    { type: "triangle", size: 25, x: 3, y: 75, delay: 0.4 },
    { type: "diamond", size: 50, x: 50, y: 90, delay: 2.0 },
    { type: "square", size: 20, x: 15, y: 45, delay: 0.8 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, i) => {
        let path = "";
        if (shape.type === "triangle") {
          const s = shape.size;
          path = `M0,${s} L${s/2},0 L${s},${s} Z`;
        } else if (shape.type === "diamond") {
          const s = shape.size;
          path = `M${s/2},0 L${s},${s/2} L${s/2},${s} L0,${s/2} Z`;
        } else {
          const s = shape.size;
          path = `M0,0 L${s},0 L${s},${s} L0,${s} Z`;
        }
        return (
          <motion.svg
            key={i}
            className="absolute"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              opacity: 0.15,
            }}
            viewBox={`0 0 ${shape.size} ${shape.size}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              x: [0, 20, -10, 15, 0],
              y: [0, -15, 10, -5, 0],
              rotate: [0, 15, -10, 8, 0],
              opacity: [0.1, 0.25, 0.08, 0.2, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            }}
          >
            <path
              d={path}
              stroke={i % 2 === 0 ? "#13A8C4" : "#15BCDF"}
              strokeWidth="1.5"
              fill="none"
            />
          </motion.svg>
        );
      })}
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
              radial-gradient(ellipse 80% 60% at 20% 20%, rgba(13,148,136,0.20), transparent 50%),
              radial-gradient(ellipse 60% 50% at 80% 80%, rgba(6,182,212,0.12), transparent 50%),
              radial-gradient(ellipse 50% 40% at 50% 50%, rgba(16,185,129,0.06), transparent 60%)
            `,
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(13,148,136,0.25), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(6,182,212,0.20), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.15), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(13,148,136,0.25), transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ─── Diagonal Lines ──────────────────────────────────── */}
      <DiagonalLines />

      {/* ─── Geometric Shapes ────────────────────────────────── */}
      <GeometricShapes />

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
            background: "radial-gradient(circle, rgba(13,148,136,0.15), rgba(6,182,212,0.08), transparent 60%)",
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
          className="inline-block border border-white/15 bg-white/5 px-5 py-1.5 font-display text-xs uppercase tracking-wide text-accent backdrop-blur-sm"
        >
          {t("home.hero.eyebrow")}
        </motion.span>

        {/* ─── Staircase Headline ── */}
        <h1 className="mt-8 font-display text-display-xl text-white">
          {lines.map((line, index) => (
            <motion.span
              key={line}
              variants={item}
              className={`block ${
                index === lines.length - 1
                  ? "bg-gradient-to-r from-accent via-cyan-300 to-accent bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient"
                  : ""
              }`}
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
            className="clip-corner bg-accent px-8 py-3.5 font-display text-xs uppercase tracking-wide text-ink shadow-glow transition-all hover:scale-105 hover:shadow-2xl hover:shadow-accent/30"
          >
            {t("home.hero.cta1")}
          </Link>
          <a
            href="#services"
            className="clip-corner border border-white/20 px-8 py-3.5 font-display text-xs uppercase tracking-wide text-white transition-all hover:border-accent/40 hover:bg-white/5 hover:scale-105"
          >
            {t("home.hero.cta2")}
          </a>
        </motion.div>

        {/* ─── Stats ── */}
        <motion.div
          variants={item}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-10"
        >
          <div className="group">
            <div className="font-display text-3xl text-white transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
              <AnimatedCounter target={500} suffix="+" />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-white/60 transition-colors duration-300 group-hover:text-white/80">
              {t("home.hero.stat1Label")}
            </div>
          </div>
          <div className="group">
            <div className="font-display text-3xl text-white transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
              <AnimatedCounter target={15} suffix="+" />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-white/60 transition-colors duration-300 group-hover:text-white/80">
              {t("home.hero.stat2Label")}
            </div>
          </div>
          <div className="group">
            <div className="font-display text-3xl text-white transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
              <AnimatedCounter target={98} suffix="%" />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-white/60 transition-colors duration-300 group-hover:text-white/80">
              {t("home.hero.stat3Label")}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ─── Gradient Animation Styles ──────────────────────────────── */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease-in-out infinite alternate;
          background-size: 200% 100%;
        }
      `}</style>
    </section>
  );
}