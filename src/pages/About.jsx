import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import BenefitsGrid from "../components/BenefitsGrid.jsx";
import Stats from "../components/Stats.jsx";
import ContactForm from "../components/ContactForm.jsx";
import AmbientBackground from "../components/AmbientBackground.jsx";

export default function About() {
  const { t } = useTranslation();
  const heroLines = t("about.hero.lines", { returnObjects: true });
  const whoWeAreHeading = t("about.whoWeAre.heading", { returnObjects: true });
  const apartHeading = t("about.whatSetsUsApart.heading", { returnObjects: true });
  const apartItems = t("about.whatSetsUsApart.items", { returnObjects: true });
  const ctaHeading = t("about.cta.heading", { returnObjects: true });

  return (
    <>
      <PageHero
        lines={heroLines}
        crumbs={[{ label: t("nav.home"), path: "/" }, { label: t("about.hero.breadcrumb") }]}
      />

      <section className="bg-surface py-24 dark:bg-[#0D0F12]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollReveal>
            <p className="font-display text-xs uppercase tracking-widest text-accent">{t("about.whoWeAre.label")}</p>
            <h2 className="mt-4 font-display text-display-lg text-ink dark:text-white">
              {whoWeAreHeading.map((line, i) => (
                <span key={line} className={`block ${i === whoWeAreHeading.length - 1 ? "text-accent" : ""}`}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted dark:text-[#9A9FA5]">
              {t("about.whoWeAre.body")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-surface-raised py-24 dark:bg-[#0D0F12]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="max-w-2xl">
            <p className="font-display text-xs uppercase tracking-widest text-accent">
              {t("about.whatSetsUsApart.label")}
            </p>
            <h2 className="mt-4 font-display text-display-lg text-ink dark:text-white">
              {apartHeading.map((line, i) => (
                <span key={line} className={`block ${i === apartHeading.length - 1 ? "text-accent" : ""}`}>
                  {line}
                </span>
              ))}
            </h2>
          </ScrollReveal>

          <div className="mt-14">
            <BenefitsGrid items={apartItems} columns={3} />
          </div>
        </div>
      </section>

      <Stats />

      <section className="on-dark relative overflow-hidden bg-ink py-24 dark:bg-black">
        <AmbientBackground />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-display-lg text-white">
              {ctaHeading.map((line, i) => (
                <span key={line} className={`block ${i === ctaHeading.length - 1 ? "text-accent" : ""}`}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-md text-white/70">{t("about.cta.subtitle")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
