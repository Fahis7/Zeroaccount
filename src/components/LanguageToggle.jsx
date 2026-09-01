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
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-display text-xs uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
        onDark
          ? "border-white/30 text-white hover:border-accent hover:text-accent"
          : "border-line bg-white/80 text-ink backdrop-blur-sm hover:border-accent hover:text-accent dark:border-white/10 dark:bg-[#1A1D22]/80 dark:text-[#E8EAED]"
      }`}
    >
      {isArabic ? "EN" : "عربي"}
    </button>
  );
}
