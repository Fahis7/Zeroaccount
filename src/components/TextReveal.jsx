import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Reveals text line-by-line with a clip/mask effect on scroll.
 * Wrap around any heading. Children are treated as the visible text.
 */
export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          delay,
          duration,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
