import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import AccountingBookkeeping from "./pages/services/AccountingBookkeeping.jsx";
import VATConsulting from "./pages/services/VATConsulting.jsx";
import AuditingAssurance from "./pages/services/AuditingAssurance.jsx";
import ICVCertification from "./pages/services/ICVCertification.jsx";
import PayrollServices from "./pages/services/PayrollServices.jsx";
import BusinessConsultancy from "./pages/services/BusinessConsultancy.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/accounting" element={<AccountingBookkeeping />} />
          <Route path="/services/vat-consulting" element={<VATConsulting />} />
          <Route path="/services/auditing" element={<AuditingAssurance />} />
          <Route path="/services/icv-certification" element={<ICVCertification />} />
          <Route path="/services/payroll" element={<PayrollServices />} />
          <Route path="/services/business-consultancy" element={<BusinessConsultancy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
