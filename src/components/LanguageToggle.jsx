import { useTranslation } from "react-i18next";

export default function LanguageToggle({ onDark = false }) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const handleToggle = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle language"
      className={`border px-3.5 py-1.5 font-display text-xs uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
        onDark
          ? "border-white/30 text-white hover:border-accent hover:text-accent"
          : "border-line text-ink hover:border-accent hover:text-accent dark:border-[#2A2D32] dark:text-[#E8EAED]"
      }`}
    >
      {isArabic ? "EN" : "عربي"}
    </button>
  );
}
