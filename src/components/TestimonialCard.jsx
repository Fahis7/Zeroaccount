import { motion } from "framer-motion";

export default function TestimonialCard({ name, role, quote, colorClass }) {
  // Extract first letters for initials
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:backdrop-blur-sm dark:shadow-2xl"
    >
      {/* ─── Decorative gradient bar ─── */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 via-transparent to-accent/5 blur-2xl" />
      </div>

      {/* ─── Left accent stripe ─── */}
      <div
        className={`absolute inset-y-0 left-0 w-1 rounded-l-full transition-all duration-300 group-hover:w-1.5 ${colorClass}`}
      />

      {/* ─── Large quote mark ─── */}
      <div className="absolute -top-2 right-4 text-7xl font-serif text-accent/10 dark:text-accent/20 select-none">
        “
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 p-6">
        {/* ─── Avatar + Name ─── */}
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${colorClass}`}
          >
            {initials}
          </div>
          <div>
            <h4 className="font-display text-base font-semibold text-ink dark:text-white">
              {name}
            </h4>
            <p className="text-xs text-muted dark:text-[#9A9FA5]">{role}</p>
          </div>
        </div>

        {/* ─── Quote ─── */}
        <blockquote className="mt-4 text-sm leading-relaxed text-muted dark:text-[#9A9FA5]">
          “{quote}”
        </blockquote>

        {/* ─── Rating stars (optional – add if you have rating data) ─── */}
        <div className="mt-4 flex gap-0.5 text-accent">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              className="opacity-80"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
