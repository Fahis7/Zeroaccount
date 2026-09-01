import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Shared ambient treatment extracted from Hero.jsx / WhyZero.jsx: layered radial
// gradients that slowly cycle color, a faint grid overlay, a few drifting shapes,
// and a soft glow that follows the pointer. Used to bring PageHero, CTA, and
// Process up to the same background language without touching those two files.

const floatShape = {
  initial: { y: 0, rotate: 0 },
  animate: (delay) => ({
    y: [0, -20, 0, 20, 0],
    rotate: [0, 10, -10, 5, 0],
    transition: { duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: delay || 0 },
  }),
};

const shapes = [
  { w: 32, h: 32, top: "14%", left: "8%", delay: 0 },
  { w: 20, h: 20, top: "22%", right: "12%", delay: 1.2 },
  { w: 14, h: 14, top: "64%", left: "10%", delay: 0.6 },
  { w: 26, h: 26, bottom: "18%", right: "8%", delay: 2.0 },
  { w: 10, h: 10, top: "45%", left: "20%", delay: 0.3 },
  { w: 18, h: 18, bottom: "30%", right: "16%", delay: 1.8 },
];

export default function AmbientBackground({ gridSize = 60 }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const glowX = useTransform(springX, (v) => v * 0.4);
  const glowY = useTransform(springY, (v) => v * 0.4);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 700);
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    const handleMouseMove = (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
      mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile, prefersReducedMotion]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 20%, rgba(255,255,255,0.09), transparent 50%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,255,255,0.06), transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,255,255,0.03), transparent 60%)
          `,
        }}
      />
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(255,255,255,0.07), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(255,255,255,0.07), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.07), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(255,255,255,0.07), transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      )}

      {!isMobile && !prefersReducedMotion && (
        <motion.div className="absolute inset-0" style={{ x: glowX, y: glowY }}>
          <div
            className="absolute h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.10), transparent 60%)",
              filter: "blur(70px)",
            }}
          />
        </motion.div>
      )}

      {!prefersReducedMotion &&
        shapes.map((el, idx) => (
          <motion.div
            key={idx}
            custom={el.delay}
            variants={floatShape}
            initial="initial"
            animate="animate"
            className="absolute border border-white/8 rounded-full"
            style={{
              width: el.w,
              height: el.h,
              top: el.top,
              left: el.left,
              right: el.right,
              bottom: el.bottom,
              background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
            }}
          />
        ))}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
    </div>
  );
}
