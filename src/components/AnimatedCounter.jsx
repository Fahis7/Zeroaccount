import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
