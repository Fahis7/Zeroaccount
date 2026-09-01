import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const directionOffsets = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  className = "",
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const offset = directionOffsets[direction] ?? directionOffsets.up;

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
