import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { useWhatsAppLink } from "../hooks/useWhatsAppLink.js";

export default function Contact() {
  const { t } = useTranslation();
  const whatsappLink = useWhatsAppLink();
  const heroLines = t("contact.hero.lines", { returnObjects: true });
  const heading = t("contact.heading", { returnObjects: true });

  return (
    <>
      <PageHero
        lines={heroLines}
        crumbs={[{ label: t("nav.home"), path: "/" }, { label: t("contact.hero.breadcrumb") }]}
      />

      <section className="bg-surface py-24 dark:bg-[#0D0F12]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="max-w-2xl">
            <h2 className="font-display text-display-lg text-ink dark:text-white">
              {heading.map((line, i) => (
                <span key={line} className={`block ${i === heading.length - 1 ? "text-accent" : ""}`}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-muted dark:text-[#9A9FA5]">{t("contact.subtitle")}</p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
            <ScrollReveal className="lg:col-span-3">
              <ContactForm />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1} className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:shadow-2xl">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent-deep dark:from-accent/20 dark:to-accent/10 dark:text-accent">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-xs uppercase tracking-wide text-muted dark:text-[#9A9FA5]">
                      {t("contact.info.phoneLabel")}
                    </div>
                    <a href="tel:+971504228440" className="mt-1 block text-sm font-medium text-ink dark:text-white">
                      +971 50 422 8440
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:shadow-2xl">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent-deep dark:from-accent/20 dark:to-accent/10 dark:text-accent">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16v16H4V4zm0 0l8 9 8-9" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-xs uppercase tracking-wide text-muted dark:text-[#9A9FA5]">
                      {t("contact.info.emailLabel")}
                    </div>
                    <a href="mailto:raeez@zeroaccounting.ae" className="mt-1 block text-sm font-medium text-ink dark:text-white">
                      raeez@zeroaccounting.ae
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:shadow-2xl">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent-deep dark:from-accent/20 dark:to-accent/10 dark:text-accent">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-6.1-7-11a7 7 0 0114 0c0 4.9-7 11-7 11z M12 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-xs uppercase tracking-wide text-muted dark:text-[#9A9FA5]">
                      {t("contact.info.locationLabel")}
                    </div>
                    <div className="mt-1 text-sm font-medium text-ink dark:text-white">
                      {t("contact.info.location")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:shadow-2xl">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.5.1-.2 0-.4 0-.5C10.7 9 10 7.5 9.8 7c-.2-.5-.4-.5-.6-.5H8.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
                      <path d="M12 2.1a9.9 9.9 0 00-8.5 15L2 22l5.1-1.3A9.9 9.9 0 1012 2.1zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20.1z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-xs uppercase tracking-wide text-muted dark:text-[#9A9FA5]">
                      {t("contact.info.whatsappLabel")}
                    </div>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-sm font-medium text-ink dark:text-white"
                    >
                      +971 50 422 8440
                    </a>
                  </div>
                </div>

                <div className="h-56 overflow-hidden rounded-2xl border border-gray-200/80 shadow-lg dark:border-white/10 dark:shadow-2xl">
                  <iframe
                    title="Zero Accounting location"
                    src="https://maps.google.com/maps?q=Khalifa+Complex+B+Opposite+Abu+Dhabi+Mall+Abu+Dhabi+UAE&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="h-full w-full grayscale"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
