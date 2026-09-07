import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "", intensity = 10 }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || window.innerWidth < 768);
  }, []);

  if (isMobile) return <div className={className}>{children}</div>;

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setTransform({
      rotateX: -((e.clientY - rect.top) / rect.height - 0.5) * intensity,
      rotateY: ((e.clientX - rect.left) / rect.width - 0.5) * intensity,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform({ rotateX: 0, rotateY: 0 })}
      animate={transform}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
