import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";

const storedLang = localStorage.getItem("lang");
const initialLang = storedLang === "ar" || storedLang === "en" ? storedLang : "en";

function applyDirection(lang) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
  document.documentElement.classList.toggle("font-arabic", lang === "ar");
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: initialLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

applyDirection(initialLang);

i18n.on("languageChanged", (lang) => {
  localStorage.setItem("lang", lang);
  applyDirection(lang);
});

export default i18n;
