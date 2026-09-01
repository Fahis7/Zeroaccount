import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";

const targets = [500, 18, 60, 98];
const suffixes = ["+", "+", "+", "%"];

export default function Stats() {
  const { t } = useTranslation();
  const items = t("home.stats.items", { returnObjects: true });

  return (
    <section className="bg-surface py-20 dark:bg-[#0D0F12]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:shadow-2xl dark:shadow-accent/5"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 via-transparent to-accent/5 blur-2xl" />
                </div>
                <div className="relative z-10 font-display text-4xl text-accent-deep dark:text-accent">
                  <AnimatedCounter target={targets[index]} suffix={suffixes[index]} />
                </div>
                <div className="relative z-10 mt-2 text-sm uppercase tracking-wide text-gray-600 dark:text-white/60">
                  {stat.label}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
