import { useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Preloader from "../components/Preloader.jsx";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function MainLayout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Preloader onComplete={handlePreloaderComplete} />

      {!loading && (
        <>
          <ScrollToTop />
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}
