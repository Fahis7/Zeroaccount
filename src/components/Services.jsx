import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";
import { services } from "../data/services.js";

function CompactServiceCard({ title, description, icon, path, badge, t }) {
  return (
    <Link
      to={path}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:hover:border-accent/20 dark:hover:shadow-accent/5"
    >
      {/* Badge */}
      {badge && (
        <span className="absolute end-3 top-3 z-10 rounded-full border border-accent/30 bg-accent-wash px-2 py-0.5 font-display text-[9px] uppercase tracking-wide text-accent-deep dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
          {badge}
        </span>
      )}

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-1 bg-gradient-to-br from-accent/15 via-transparent to-accent/5 blur-xl" />
      </div>

      {/* Left accent bar */}
      <div className="absolute inset-y-0 left-0 w-0.5 bg-accent/0 transition-all duration-300 group-hover:bg-accent/60" />

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        {/* Icon */}
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 text-accent transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-accent/15 dark:from-accent/20 dark:to-accent/10">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={icon} />
          </svg>
        </div>

        {/* Title */}
        <h3 className="font-display text-sm uppercase tracking-wide text-ink transition-colors group-hover:text-accent dark:text-white dark:group-hover:text-accent">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted dark:text-[#9A9FA5] line-clamp-3">
          {description}
        </p>

        {/* Arrow */}
        <div className="mt-4 inline-flex items-center gap-1 font-display text-[11px] uppercase tracking-wide text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
          {t("home.services.learnMore")}
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const items = t("home.services.items", { returnObjects: true });

  // Split into featured (first 4) and secondary (last 4)
  const featured = items.slice(0, 4);
  const secondary = items.slice(4);

  return (
    <section id="services" className="bg-surface py-28 dark:bg-[#0D0F12]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-accent">
            {t("home.services.label")}
          </p>
          <h2 className="mt-4 font-display text-display-lg text-ink dark:text-white">
            {t("home.services.heading")}
          </h2>
          <p className="mt-4 text-muted dark:text-[#9A9FA5]">{t("home.services.subtitle")}</p>
        </ScrollReveal>

        {/* Top row - 4 primary services */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.08}>
              <CompactServiceCard
                title={service.title}
                description={service.description}
                icon={services[index].icon}
                path={services[index].path}
                badge={
                  services[index].key === "taxRegistration"
                    ? t("services.taxRegistration.badgeShort")
                    : undefined
                }
                t={t}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom row - 4 secondary services */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {secondary.map((service, index) => {
            const sIdx = index + 4;
            return (
              <ScrollReveal key={service.title} delay={index * 0.08 + 0.3}>
                <CompactServiceCard
                  title={service.title}
                  description={service.description}
                  icon={services[sIdx].icon}
                  path={services[sIdx].path}
                  badge={undefined}
                  t={t}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
