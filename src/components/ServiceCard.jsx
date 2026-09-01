import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function ServiceCard({ title, description, icon, path }) {
  const { t } = useTranslation();
  const cardRef = useRef(null);

  // ── 3D tilt ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, (v) => v * -0.05);
  const rotateY = useTransform(springX, (v) => v * 0.05);
  const scale = useTransform(springX, (v) => 1 + Math.abs(v) * 0.02);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:backdrop-blur-sm dark:shadow-2xl dark:shadow-accent/5"
    >
      {/* ─── Animated gradient overlay on hover ─── */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-1 bg-gradient-to-br from-accent/25 via-transparent to-accent/5 blur-2xl" />
      </div>

      {/* ─── Left accent bar (animated) ─── */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-accent/60"
        initial={{ height: "0%", top: "50%" }}
        whileHover={{ height: "100%", top: "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* ─── Content (relative, z‑index) ─── */}
      <div className="relative z-10 p-7">
        {/* ─── Icon with animated glow ─── */}
        <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/20 dark:from-accent/20 dark:to-accent/10">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <path d={icon} />
          </svg>
          {/* Pulsing ring behind icon on hover */}
          <motion.span
            className="absolute inset-0 rounded-xl bg-accent/20"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.8, opacity: 0.4 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* ─── Title ─── */}
        <h3 className="font-display text-lg uppercase tracking-wide text-ink transition-colors group-hover:text-accent dark:text-white dark:group-hover:text-accent">
          {title}
        </h3>

        {/* ─── Description ─── */}
        <p className="mt-3 text-sm leading-relaxed text-muted dark:text-[#9A9FA5]">
          {description}
        </p>

        {/* ─── Learn More Link ─── */}
        <Link
          to={path}
          className="mt-5 inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wide text-accent transition-all duration-300 hover:gap-3"
        >
          {t("home.services.learnMore")}
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}