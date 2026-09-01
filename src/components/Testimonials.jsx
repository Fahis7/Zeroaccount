import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal.jsx";
import TestimonialCard from "./TestimonialCard.jsx";
import { testimonialInitialsColors } from "../data/testimonials.js";

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t("home.testimonials.items", { returnObjects: true });

  // ── Guard against missing or invalid data ──
  const testimonialItems = Array.isArray(items) ? items : [];

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

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonialItems.length === 0 ? (
            <p className="col-span-full text-center text-muted dark:text-[#9A9FA5]">
              No testimonials available.
            </p>
          ) : (
            testimonialItems.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name ?? index} delay={index * 0.08}>
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  quote={testimonial.quote}
                  colorClass={testimonialInitialsColors[index % testimonialInitialsColors.length]}
                />
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
