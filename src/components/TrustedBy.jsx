import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal.jsx";

const companies = ["Meraas", "Almarai", "Emaar", "DP World", "Majid Al Futtaim", "Etisalat"];

export default function TrustedBy() {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="relative border-y border-gray-200/60 bg-white py-12 dark:border-white/10 dark:bg-[#0D0F12]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-display text-xs uppercase tracking-widest text-muted dark:text-[#9A9FA5]">
            {t("home.trusted.label")}
          </p>

          {/* ─── Marquee Container ─── */}
          <div className="relative mt-6 overflow-hidden">
            {/* Left fade overlay */}
            <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#0D0F12]" />
            
            {/* Right fade overlay */}
            <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#0D0F12]" />

            {/* Marquee track */}
            <div
              className={`flex w-max gap-8 sm:gap-12 whitespace-nowrap will-change-transform ${
                isPaused ? "animate-marquee-paused" : "animate-marquee"
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {duplicatedCompanies.map((name, index) => (
                <span
                  key={index}
                  className="font-display text-xl uppercase tracking-wide text-ink/25 transition-all duration-300 hover:text-accent hover:scale-110 dark:text-white/20 dark:hover:text-accent"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Marquee Keyframes ─── */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-paused {
          animation: marquee 25s linear infinite;
          animation-play-state: paused;
        }
        /* Pause on hover via JS toggles class, but we also want to handle touch devices */
        @media (hover: none) {
          .animate-marquee {
            animation-duration: 35s; /* slower on touch devices */
          }
        }
      `}</style>
    </section>
  );
}