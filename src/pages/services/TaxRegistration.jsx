import { useTranslation } from "react-i18next";
import ServicePageTemplate from "../../components/ServicePageTemplate.jsx";

export default function TaxRegistration() {
  const { t } = useTranslation();
  return <ServicePageTemplate serviceKey="taxRegistration" badge={t("services.taxRegistration.badge")} />;
}
