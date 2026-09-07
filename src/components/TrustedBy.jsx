import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal.jsx";

const clientLogos = [
  { name: "AGLAIIA", src: "/logos/aglaiia.jpg" },
  { name: "Atelier", src: "/logos/atelier.jpg" },
  { name: "Padel Beast", src: "/logos/padelbeast.jpg" },
  { name: "LOUD", src: "/logos/loud.png" },
  { name: "Native", src: "/logos/native.png" },
  { name: "Cravers", src: "/logos/cravers.png" },
  { name: "The Charm Bar", src: "/logos/charmbar.jpg" },
  { name: "MAZE", src: "/logos/maze.jpg" },
  { name: "Aklina", src: "/logos/aklina.png" },
  { name: "Al Daya", src: "/logos/aldaya.jpg" },
  { name: "Tinker Labs", src: "/logos/tinkerlabs.jpg" },
  { name: "YOLO Events", src: "/logos/yolo.jpg" },
];

export default function TrustedBy() {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);

  const duplicated = [...clientLogos, ...clientLogos];

  return (
    <section className="relative border-y border-gray-200/60 bg-white py-14 dark:border-white/10 dark:bg-[#0D0F12]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-display text-xs uppercase tracking-widest text-muted dark:text-[#9A9FA5]">
            {t("home.trusted.label")}
          </p>

          {/* ─── Marquee Container ─── */}
          <div className="relative mt-10 overflow-hidden">
            {/* Left fade */}
            <div className="absolute inset-y-0 left-0 z-10 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent dark:from-[#0D0F12]" />
            {/* Right fade */}
            <div className="absolute inset-y-0 right-0 z-10 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent dark:from-[#0D0F12]" />

            {/* Marquee track */}
            <div
              className={`flex w-max items-center gap-6 sm:gap-14 md:gap-20 whitespace-nowrap will-change-transform ${
                isPaused ? "animate-marquee-paused" : "animate-marquee"
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {duplicated.map((logo, index) => (
                <div
                  key={index}
                  className="group flex-shrink-0"
                >
                  <div className="flex h-10 w-20 items-center justify-center rounded-lg bg-gray-100/80 p-2 sm:h-14 sm:w-28 sm:p-3 transition-all duration-300 group-hover:bg-gray-100 dark:bg-white/5 dark:group-hover:bg-white/10 md:h-16 md:w-36 md:p-4">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-full w-full object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 dark:invert dark:opacity-70 dark:group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
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
