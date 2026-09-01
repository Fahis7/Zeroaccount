import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AmbientBackground from "./AmbientBackground.jsx";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function PageHero({ lines, crumbs }) {
  return (
    <section className="on-dark relative flex min-h-[60vh] items-center overflow-hidden bg-ink pt-32 pb-20 dark:bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink to-[#0A0F1D] dark:from-black dark:via-black dark:to-[#050608]" />
      <AmbientBackground gridSize={70} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(600px circle at 20% 20%, rgba(255,255,255,0.12), transparent 60%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-5xl px-6 lg:px-8"
      >
        {crumbs && crumbs.length > 0 && (
          <motion.nav variants={item} className="mb-8 flex flex-wrap items-center gap-2 text-xs text-white/50">
            {crumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {crumb.path ? (
                  <Link to={crumb.path} className="transition-colors hover:text-accent">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={index === crumbs.length - 1 ? "text-white/80" : ""}>{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <h1 className="font-display text-display-xl text-white">
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
      </motion.div>
    </section>
  );
}
