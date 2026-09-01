import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal.jsx";
import AmbientBackground from "./AmbientBackground.jsx";

export default function Process() {
  const { t } = useTranslation();
  const steps = t("home.process.steps", { returnObjects: true });

  return (
    <section id="process" className="on-dark relative overflow-hidden bg-ink py-28 dark:bg-black">
      <AmbientBackground gridSize={70} />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-accent">{t("home.process.label")}</p>
          <h2 className="mt-4 font-display text-display-lg text-white">{t("home.process.heading")}</h2>
          <p className="mt-4 text-white/60">{t("home.process.subtitle")}</p>
        </ScrollReveal>

        <div className="relative mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute inset-x-0 top-[52px] hidden h-px bg-white/10 lg:block" />
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-accent/25 hover:bg-white/[0.07]"
              >
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-lg text-accent-contrast">
                  {index + 1}
                  <motion.span
                    className="absolute inset-0 rounded-full bg-accent/30 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <h3 className="mt-6 font-display text-lg uppercase tracking-wide text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
