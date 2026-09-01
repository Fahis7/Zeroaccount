import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LogoFull from "./LogoFull.jsx";
import { services } from "../data/services.js";
import { useWhatsAppLink } from "../hooks/useWhatsAppLink.js";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Footer() {
  const { t } = useTranslation();
  const whatsappLink = useWhatsAppLink();
  const companyLinks = t("footer.companyLinks", { returnObjects: true });

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-white dark:border-white/5 dark:bg-[#0D0F12]">
      {/* ─── Subtle background glow (dark only) ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl dark:bg-accent/5" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* ─── Brand ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <Link to="/" aria-label="Zero Accounting home">
              <LogoFull variant="auto" className="text-[28px]" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600 dark:text-white/60">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex gap-3">
              {["linkedin", "twitter", "facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent dark:border-white/10 dark:text-white/40 dark:hover:border-accent/50 dark:hover:bg-accent/10 dark:hover:text-accent"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 4.2C21.1 4.7 20.2 5 19.3 5.2C20.2 4.6 20.9 3.8 21.2 2.8C20.3 3.3 19.3 3.7 18.3 3.9C17.4 3 16.1 2.5 14.8 2.5C12.1 2.5 9.9 4.7 9.9 7.4C9.9 7.9 10 8.3 10.1 8.7C6.9 8.5 3.9 6.5 1.9 3.6C1.4 4.5 1.1 5.5 1.1 6.6C1.1 8.6 2.1 10.4 3.6 11.5C2.8 11.5 2.1 11.3 1.5 10.9C1.5 12.5 2.7 13.9 4.3 14.3C3.9 14.4 3.4 14.5 2.9 14.5C2.5 14.5 2.2 14.4 1.9 14.3C2.5 15.8 4 16.9 5.8 17C4.6 18 3.1 18.6 1.5 18.6C1 18.6 0.5 18.5 0 18.4C1.9 19.5 4.1 20.1 6.4 20.1C14.8 20.1 19.5 13.2 19.5 7.2C19.5 7 19.5 6.8 19.5 6.6C20.4 5.9 21.2 5.1 22 4.2Z" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ─── Services ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display text-sm uppercase tracking-widest text-accent">
              {t("footer.servicesTitle")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.key}>
                  <Link
                    to={service.path}
                    className="group relative inline-block text-sm text-gray-600 transition-colors hover:text-accent dark:text-white/60 dark:hover:text-accent"
                  >
                    {t(`services.${service.key}.hero.breadcrumb`)}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ─── Company ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-sm uppercase tracking-widest text-accent">
              {t("footer.companyTitle")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group relative inline-block text-sm text-gray-600 transition-colors hover:text-accent dark:text-white/60 dark:hover:text-accent"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ─── Contact ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display text-sm uppercase tracking-widest text-accent">
              {t("footer.contactTitle")}
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-white/60">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-accent"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <a href="tel:+971504228440" className="hover:text-accent transition-colors">+971 50 422 8440</a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-white/60">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-accent"
                >
                  <path d="M4 4h16v16H4V4zm0 0l8 9 8-9" />
                </svg>
                <a href="mailto:raeez@zeroaccounting.ae" className="hover:text-accent transition-colors">raeez@zeroaccounting.ae</a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-white/60">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-accent"
                >
                  <path d="M12 21s-7-6.1-7-11a7 7 0 0114 0c0 4.9-7 11-7 11z M12 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                </svg>
                <span>{t("contact.info.location")}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-white/60">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="mt-0.5 shrink-0 text-accent"
                >
                  <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.5.1-.2 0-.4 0-.5C10.7 9 10 7.5 9.8 7c-.2-.5-.4-.5-.6-.5H8.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
                  <path d="M12 2.1a9.9 9.9 0 00-8.5 15L2 22l5.1-1.3A9.9 9.9 0 1012 2.1zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20.1z" />
                </svg>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                  +971 50 422 8440
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-8 text-xs text-gray-500 dark:border-white/5 dark:text-white/40 sm:flex-row"
        >
          <span>{t("footer.copyright")}</span>
          <span className="font-display uppercase tracking-[0.2em] text-accent/80 dark:text-accent/60">
            {t("footer.tagline")}
          </span>
        </motion.div>
      </div>
    </footer>
  );
}