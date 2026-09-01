import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal.jsx";
import AmbientBackground from "./AmbientBackground.jsx";
import { useWhatsAppLink } from "../hooks/useWhatsAppLink.js";

export default function CTA() {
  const { t } = useTranslation();
  const whatsappLink = useWhatsAppLink();
  const lines = t("home.cta.lines", { returnObjects: true });

  return (
    <section className="on-dark relative overflow-hidden bg-ink py-28 dark:bg-black">
      <AmbientBackground />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(700px circle at 50% 40%, rgba(255,255,255,0.14), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <ScrollReveal>
          <p className="font-display text-xs uppercase tracking-widest text-accent">{t("home.cta.label")}</p>
          <h2 className="mt-4 font-display text-display-lg text-white">
            {lines.map((line, index) => (
              <span key={line} className={`block ${index === lines.length - 1 ? "text-accent" : ""}`}>
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">{t("home.cta.subtitle")}</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="clip-corner mt-9 inline-block bg-accent px-8 py-4 font-display text-xs uppercase tracking-wide text-accent-contrast shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-deep"
          >
            {t("home.cta.button")}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
