import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";
import TestimonialCard from "./TestimonialCard.jsx";
import { testimonialInitialsColors } from "../data/testimonials.js";

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t("home.testimonials.items", { returnObjects: true });
  const testimonialItems = Array.isArray(items) ? items : [];

  const cardsPerView = 2;
  const totalPages = Math.ceil(testimonialItems.length / cardsPerView);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (newPage) => {
      setDirection(newPage > page ? 1 : -1);
      setPage(newPage);
    },
    [page]
  );

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const startIdx = page * cardsPerView;
  const visibleCards = testimonialItems.slice(startIdx, startIdx + cardsPerView);

  return (
    <section id="clients" className="bg-surface-raised py-28 dark:bg-[#0D0F12]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-accent">
            {t("home.testimonials.label")}
          </p>
          <h2 className="mt-4 font-display text-display-lg text-ink dark:text-white">
            {t("home.testimonials.heading")}
          </h2>
          <p className="mt-4 text-muted dark:text-[#9A9FA5]">{t("home.testimonials.subtitle")}</p>
        </ScrollReveal>

        {/* ─── Carousel ─── */}
        <div className="relative mt-16 overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {visibleCards.map((testimonial, index) => {
                const globalIndex = startIdx + index;
                return (
                  <TestimonialCard
                    key={testimonial.name ?? globalIndex}
                    name={testimonial.name}
                    role={testimonial.role}
                    quote={testimonial.quote}
                    colorClass={testimonialInitialsColors[globalIndex % testimonialInitialsColors.length]}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Navigation dots + arrows ─── */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo((page - 1 + totalPages) % totalPages)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/80 text-ink transition-colors hover:bg-accent hover:text-white dark:border-white/10 dark:text-white dark:hover:bg-accent"
            aria-label="Previous reviews"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-8 bg-accent"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400 dark:bg-white/20 dark:hover:bg-white/40"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo((page + 1) % totalPages)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/80 text-ink transition-colors hover:bg-accent hover:text-white dark:border-white/10 dark:text-white dark:hover:bg-accent"
            aria-label="Next reviews"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* ─── Google badge ─── */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted dark:text-[#9A9FA5]">
          <svg viewBox="0 0 24 24" width="18" height="18" className="text-accent">
            <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span>All reviews from Google</span>
        </div>
      </div>
    </section>
  );
}
