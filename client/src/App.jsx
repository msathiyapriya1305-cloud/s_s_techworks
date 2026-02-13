import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

import RequestProject from "./pages/RequestProject";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
return ( <BrowserRouter> <Routes>

    {/* PUBLIC ROUTES */}
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/portfolio" element={<Portfolio />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/request" element={<RequestProject />} />

    {/* ✅ ADMIN SHORTCUT */}
    <Route path="/admin" element={<Navigate to="/admin/login" />} />

    {/* ADMIN LOGIN */}
    <Route path="/admin/login" element={<AdminLogin />} />

    {/* PROTECTED DASHBOARD */}
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />

    {/* FALLBACK */}
    <Route path="*" element={<h1>Page Not Found</h1>} />

  </Routes>
</BrowserRouter>


);
}
