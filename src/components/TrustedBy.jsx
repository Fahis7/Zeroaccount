import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal.jsx";

const clientLogos = [
  { name: "AGLAIIA", src: "/logos/aglaiia.jpg", dark: false },
  { name: "Atelier", src: "/logos/atelier.jpg", dark: true },
  { name: "Padel Beast", src: "/logos/padelbeast.jpg", dark: true },
  { name: "LOUD", src: "/logos/loud.png", dark: true },
  { name: "Native", src: "/logos/native.png", dark: false },
  { name: "Cravers", src: "/logos/cravers.png", dark: true },
  { name: "The Charm Bar", src: "/logos/charmbar.jpg", dark: false },
  { name: "MAZE", src: "/logos/maze.jpg", dark: true },
  { name: "Aklina", src: "/logos/aklina.png", dark: false },
  { name: "Al Daya", src: "/logos/aldaya.jpg", dark: false },
  { name: "Tinker Labs", src: "/logos/tinkerlabs.jpg", dark: false },
  { name: "YOLO Events", src: "/logos/yolo.jpg", dark: false },
];

export default function TrustedBy() {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless loop
  const duplicated = [...clientLogos, ...clientLogos];

  return (
    <section className="relative border-y border-gray-200/60 bg-white py-12 dark:border-white/10 dark:bg-[#0D0F12]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-display text-xs uppercase tracking-widest text-muted dark:text-[#9A9FA5]">
            {t("home.trusted.label")}
          </p>

          {/* ─── Marquee Container ─── */}
          <div className="relative mt-8 overflow-hidden">
            {/* Left fade overlay */}
            <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#0D0F12]" />
            
            {/* Right fade overlay */}
            <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#0D0F12]" />

            {/* Marquee track */}
            <div
              className={`flex w-max items-center gap-12 sm:gap-16 whitespace-nowrap will-change-transform ${
                isPaused ? "animate-marquee-paused" : "animate-marquee"
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {duplicated.map((logo, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    logo.dark
                      ? "opacity-80 hover:opacity-100 dark:invert dark:opacity-70 dark:hover:opacity-100"
                      : "opacity-80 hover:opacity-100 dark:opacity-70 dark:hover:opacity-100"
                  }`}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-10 w-auto max-w-[100px] object-contain sm:h-12 sm:max-w-[130px]"
                    loading="lazy"
                  />
                </div>
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
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-paused {
          animation: marquee 35s linear infinite;
          animation-play-state: paused;
        }
        @media (hover: none) {
          .animate-marquee {
            animation-duration: 45s;
          }
        }
      `}</style>
    </section>
  );
}
