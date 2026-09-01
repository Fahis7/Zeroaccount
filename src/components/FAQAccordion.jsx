import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <ScrollReveal key={faq.question} delay={index * 0.05}>
            <motion.div
              layout
              transition={{ layout: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:shadow-2xl dark:shadow-accent/5"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              >
                <span className="font-display text-sm uppercase tracking-wide text-ink dark:text-white">
                  {faq.question}
                </span>
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-wash text-accent-deep transition-colors dark:bg-accent/10 dark:text-accent">
                  <span className="absolute h-px w-3 bg-current" />
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute h-3 w-px bg-current"
                  />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600 dark:text-white/60">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
