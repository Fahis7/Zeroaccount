import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import LanguageToggle from "./LanguageToggle.jsx";
import LogoFull from "./LogoFull.jsx";
import { services } from "../data/services.js";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the mobile menu when tapping outside it (and outside its controls), on Escape, or on route change.
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        controlsRef.current &&
        !controlsRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const linkColor = scrolled
    ? "text-ink/80 hover:text-ink dark:text-[#9A9FA5] dark:hover:text-white"
    : "text-white/80 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-line/60 bg-surface/85 backdrop-blur-xl dark:border-[#2A2D32]/60 dark:bg-[#0D0F12]/85"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" aria-label="Zero Accounting home">
          <LogoFull
            variant={scrolled ? "auto" : "light"}
            className="text-[26px] transition-colors sm:text-[30px]"
            showIcon={false}
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" end className={`font-display text-xs uppercase tracking-wide transition-colors ${linkColor}`}>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/about" className={`font-display text-xs uppercase tracking-wide transition-colors ${linkColor}`}>
            {t("nav.about")}
          </NavLink>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 font-display text-xs uppercase tracking-wide transition-colors ${linkColor}`}
            >
              {t("nav.services")}
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute start-0 top-full mt-3 w-72 rounded-2xl border border-gray-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#1A1D22]/95"
                >
                  {services.map((service) => (
                    <Link
                      key={service.key}
                      to={service.path}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-ink transition-colors hover:bg-accent-wash hover:text-accent-deep dark:text-[#E8EAED] dark:hover:bg-accent/10 dark:hover:text-accent"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 text-accent"
                      >
                        <path d={service.icon} />
                      </svg>
                      {t(`services.${service.key}.hero.breadcrumb`)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/blog" className={`font-display text-xs uppercase tracking-wide transition-colors ${linkColor}`}>
            {t("nav.blog")}
          </NavLink>
          <NavLink to="/contact" className={`font-display text-xs uppercase tracking-wide transition-colors ${linkColor}`}>
            {t("nav.contact")}
          </NavLink>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle onDark={!scrolled} />
          <ThemeToggle onDark={!scrolled} />
          <Link
            to="/contact"
            className={`clip-corner-sm bg-accent px-5 py-2 font-display text-xs uppercase tracking-wide text-accent-contrast shadow-glow transition-all hover:bg-accent-deep ${
              scrolled ? "" : "on-dark"
            }`}
          >
            {t("nav.cta")}
          </Link>
        </div>

        {/* ─── Mobile controls: language + theme + hamburger, always visible ─── */}
        <div ref={controlsRef} className="flex items-center gap-2 lg:hidden">
          <LanguageToggle onDark={!scrolled} />
          <ThemeToggle onDark={!scrolled} />
          <button
            type="button"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
              scrolled
                ? "border-line text-ink dark:border-[#2A2D32] dark:text-white"
                : "border-white/30 text-white"
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-40 overflow-hidden rounded-b-2xl border-t border-line/60 bg-surface/95 backdrop-blur-xl lg:hidden dark:border-[#2A2D32]/60 dark:bg-[#0D0F12]/95"
          >
            <div className="flex max-h-[75vh] flex-col gap-1 overflow-y-auto px-6 py-6">
              <Link to="/" onClick={() => setMenuOpen(false)} className="py-2 font-display text-sm uppercase tracking-wide text-ink dark:text-[#E8EAED]">
                {t("nav.home")}
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="py-2 font-display text-sm uppercase tracking-wide text-ink dark:text-[#E8EAED]">
                {t("nav.about")}
              </Link>

              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex items-center justify-between py-2 font-display text-sm uppercase tracking-wide text-ink dark:text-[#E8EAED]"
              >
                {t("nav.services")}
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden ps-4"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.key}
                        to={service.path}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 text-sm text-muted dark:text-[#9A9FA5]"
                      >
                        {t(`services.${service.key}.hero.breadcrumb`)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to="/blog" onClick={() => setMenuOpen(false)} className="py-2 font-display text-sm uppercase tracking-wide text-ink dark:text-[#E8EAED]">
                {t("nav.blog")}
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="py-2 font-display text-sm uppercase tracking-wide text-ink dark:text-[#E8EAED]">
                {t("nav.contact")}
              </Link>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="clip-corner-sm mt-3 bg-accent px-5 py-2.5 text-center font-display text-xs uppercase tracking-wide text-accent-contrast"
              >
                {t("nav.cta")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
