import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Runs on every route change, independent of AnimatePresence's exit/enter
// animation lifecycle — scrolling happens as soon as the new route mounts.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
