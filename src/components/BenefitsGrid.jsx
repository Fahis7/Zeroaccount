import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";

const icons = [
  "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4",
  "M13 2L4.5 12.5H11L10 22l8.5-10.5H12L13 2z",
  "M6 18L18 6M7 9a2 2 0 100-4 2 2 0 000 4zm10 10a2 2 0 100-4 2 2 0 000 4z",
  "M12 8v4l3 2M12 21a9 9 0 100-18 9 9 0 000 18z",
  "M4 4h16v16H4V4zm0 5h16M8 4v16",
  "M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7L6 21l1.6-7L2.2 9.3l7.1-.7L12 2z",
  "M4 8h16v11H4V8zm4 0V5a2 2 0 012-2h4a2 2 0 012 2v3M4 13h16",
  "M12 15a3 3 0 100-6 3 3 0 000 6zM4 12a8 8 0 0116 0M4 12a8 8 0 008 8m-8-8a8 8 0 008-8",
];

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function BenefitsGrid({ items, columns = 3 }) {
  return (
    <div className={`grid grid-cols-1 gap-5 ${columnClasses[columns] ?? columnClasses[3]}`}>
      {items.map((benefit, index) => (
        <ScrollReveal key={benefit.title} delay={index * 0.06}>
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group relative h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:shadow-2xl dark:shadow-accent/5"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 via-transparent to-accent/5 blur-2xl" />
            </div>
            <div className="relative z-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent-deep transition-transform duration-300 group-hover:scale-110 dark:from-accent/20 dark:to-accent/10 dark:text-accent">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={icons[index % icons.length]} />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-base uppercase tracking-wide text-ink dark:text-white">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/60">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  );
}
