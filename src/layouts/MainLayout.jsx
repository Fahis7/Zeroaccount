import { useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Preloader from "../components/Preloader.jsx";

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
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.main>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}
