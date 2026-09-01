import { useState } from "react";
import { useTranslation } from "react-i18next";

const inputClasses =
  "w-full rounded-xl border border-gray-200/80 bg-white/60 px-4 py-3 text-sm text-ink outline-none backdrop-blur-sm transition-colors placeholder:text-gray-400 focus:border-accent focus:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-[#E8EAED]";

export default function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-7 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-[#1A1D22]/80 dark:shadow-2xl sm:p-9">
      <h3 className="font-display text-xl uppercase tracking-wide text-ink dark:text-white">
        {t("contact.form.heading")}
      </h3>

      {submitted ? (
        <p className="mt-6 rounded-xl border border-accent/30 bg-accent-wash px-4 py-3 text-sm text-accent-deep dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
          {t("contact.form.success")}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-white/60">
                {t("contact.form.name")}
              </label>
              <input
                type="text"
                required
                placeholder={t("contact.form.namePlaceholder")}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-white/60">
                {t("contact.form.email")}
              </label>
              <input
                type="email"
                required
                placeholder={t("contact.form.emailPlaceholder")}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-white/60">
                {t("contact.form.phone")}
              </label>
              <input
                type="tel"
                placeholder={t("contact.form.phonePlaceholder")}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-white/60">
                {t("contact.form.subject")}
              </label>
              <input
                type="text"
                placeholder={t("contact.form.subjectPlaceholder")}
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-white/60">
              {t("contact.form.message")}
            </label>
            <textarea
              required
              rows={5}
              placeholder={t("contact.form.messagePlaceholder")}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="clip-corner bg-accent px-7 py-3.5 font-display text-xs uppercase tracking-wide text-accent-contrast shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
          >
            {t("contact.form.submit")}
          </button>
        </form>
      )}
    </div>
  );
}
