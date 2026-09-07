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
              <LogoFull variant="auto" size="lg" showIcon={false} />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600 dark:text-white/60">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/zero-accounting-4742bb326/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent dark:border-white/10 dark:text-white/40 dark:hover:border-accent/50 dark:hover:bg-accent/10 dark:hover:text-accent"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/zeroaccounting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent dark:border-white/10 dark:text-white/40 dark:hover:border-accent/50 dark:hover:bg-accent/10 dark:hover:text-accent"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/zero_accounting?utm_source=qr&igsi=czhucHdzaXdjMXRz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent dark:border-white/10 dark:text-white/40 dark:hover:border-accent/50 dark:hover:bg-accent/10 dark:hover:text-accent"
              >
                <span className="sr-only">{t("footer.social.instagram")}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
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
                <a href="https://maps.google.com/?q=Khalifa+Complex+B+Mezzanine+Floor+Abu+Dhabi+UAE" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{t("contact.info.location")}</a>
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