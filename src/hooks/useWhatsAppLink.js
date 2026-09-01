import { useTranslation } from "react-i18next";

const WHATSAPP_NUMBER = "971504228440";

export function useWhatsAppLink() {
  const { t } = useTranslation();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("whatsappMessage"))}`;
}
