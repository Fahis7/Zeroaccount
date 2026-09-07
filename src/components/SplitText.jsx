import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animates text word-by-word or character-by-character.
 * Usage: <SplitText text="Hello World" className="text-4xl" />
 */
export default function SplitText({
  text,
  className = "",
  by = "word", // "word" | "char"
  delay = 0,
  stagger = 0.05,
  once = true,
  as: Tag = "span",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const units = by === "char" ? text.split("") : text.split(" ");

  return (
    <Tag ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {units.map((unit, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, rotateX: -80 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, rotateX: 0 }
                : { y: "110%", opacity: 0, rotateX: -80 }
            }
            transition={{
              delay: delay + i * stagger,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "bottom", willChange: "transform" }}
          >
            {unit}{by === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
