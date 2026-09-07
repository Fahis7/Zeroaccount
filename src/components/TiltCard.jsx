import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Wraps content with a 3D tilt effect on hover.
 * Usage: <TiltCard className="..."><div>Card content</div></TiltCard>
 */
export default function TiltCard({ children, className = "", intensity = 10 }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform({
      rotateX: -y * intensity,
      rotateY: x * intensity,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={transform}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
