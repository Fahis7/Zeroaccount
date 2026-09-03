import { useTranslation } from "react-i18next";
import PageHero from "./PageHero.jsx";
import ScrollReveal from "./ScrollReveal.jsx";
import BenefitsGrid from "./BenefitsGrid.jsx";
import FAQAccordion from "./FAQAccordion.jsx";
import AmbientBackground from "./AmbientBackground.jsx";
import { useWhatsAppLink } from "../hooks/useWhatsAppLink.js";

function StackedHeading({ lines, className = "" }) {
  return (
    <h2 className={`font-display text-display-lg text-ink dark:text-white ${className}`}>
      {lines.map((line, i) => (
        <span key={line} className={`block ${i === lines.length - 1 ? "text-accent" : ""}`}>
          {line}
        </span>
      ))}
    </h2>
  );
}

export default function ServicePageTemplate({ serviceKey }) {
  const { t } = useTranslation();
  const whatsappLink = useWhatsAppLink();
  const ns = `services.${serviceKey}`;

  const heroLines = t(`${ns}.hero.lines`, { returnObjects: true });
  const breadcrumb = t(`${ns}.hero.breadcrumb`);
  const introHeading = t(`${ns}.intro.heading`, { returnObjects: true });
  const paragraphs = t(`${ns}.intro.paragraphs`, { returnObjects: true });
  const sections = t(`${ns}.sections`, { returnObjects: true });
  const faq = t(`${ns}.faq`, { returnObjects: true });
  const ctaText = t(`${ns}.cta`);

  return (
    <>
      <PageHero
        lines={heroLines}
        crumbs={[
          { label: t("nav.home"), path: "/" },
          { label: t("nav.services") },
          { label: breadcrumb },
        ]}
      />

      <section className="bg-surface py-24 dark:bg-[#0D0F12]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollReveal>
            <StackedHeading lines={introHeading} />
            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted dark:text-[#9A9FA5]">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.heading.join("-")}
          className={`py-24 ${
            index % 2 === 0
              ? "bg-surface-raised dark:bg-[#0D0F12]"
              : "bg-surface dark:bg-[#0D0F12]"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ScrollReveal className="max-w-2xl">
              <StackedHeading lines={section.heading} />
            </ScrollReveal>

            {section.type === "text" ? (
              <ScrollReveal delay={0.1}>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted dark:text-[#9A9FA5]">
                  {section.body}
                </p>
              </ScrollReveal>
            ) : (
              <div className="mt-14">
                <BenefitsGrid items={section.items} columns={section.columns} />
              </div>
            )}
          </div>
        </section>
      ))}

      {faq.length > 0 && (
        <section className="bg-surface py-24 dark:bg-[#0D0F12]">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <ScrollReveal className="mb-14 text-center">
              <p className="font-display text-xs uppercase tracking-widest text-accent">FAQ</p>
              <h2 className="mt-4 font-display text-display-lg text-ink dark:text-white">
                {t("common.faqHeading")}
              </h2>
            </ScrollReveal>
            <FAQAccordion items={faq} />
          </div>
        </section>
      )}

      <section className="on-dark relative overflow-hidden bg-ink py-24 dark:bg-black">
        <AmbientBackground />
        <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-display-md text-white">{ctaText}</h2>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="clip-corner bg-accent px-7 py-3.5 font-display text-xs uppercase tracking-wide text-accent-contrast shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                {t("common.whatsappButton")}
              </a>
              <a
                href="tel:+971504228440"
                className="clip-corner border border-white/20 px-7 py-3.5 font-display text-xs uppercase tracking-wide text-white transition-colors hover:border-white/40"
              >
                {t("common.callButton")}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
