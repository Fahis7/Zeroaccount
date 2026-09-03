import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal.jsx";
import ServiceCard from "./ServiceCard.jsx";
import { services } from "../data/services.js";

export default function Services() {
  const { t } = useTranslation();
  const items = t("home.services.items", { returnObjects: true });

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

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.08}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={services[index % services.length].icon}
                path={services[index % services.length].path}
                badge={
                  services[index % services.length].key === "taxRegistration"
                    ? t("services.taxRegistration.badgeShort")
                    : undefined
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
