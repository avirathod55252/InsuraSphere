import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import api from "./api";

// Public Pages
import Home from "./pages/Home";
import AboutUs from "./components/AboutUs";
import TermsAndConditions from "./components/TermsAndConditions";

// Product Detail Pages
import LifeInsurance from "./pages/LifeInsurance";
import HealthInsurance from "./pages/HealthInsurance";
import AutoInsurance from "./pages/AutoInsurance";
import TravelInsurance from "./pages/TravelInsurance";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .me(token)
        .then((u) => setUser(u))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <div className="container mx-auto p-4">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          {/* PRODUCT ROUTES */}
          <Route path="/life-insurance" element={<LifeInsurance />} />
          <Route path="/health-insurance" element={<HealthInsurance />} />
          <Route path="/auto-insurance" element={<AutoInsurance />} />
          <Route path="/travel-insurance" element={<TravelInsurance />} />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              user ? (
                user.role === "admin" ? (
                  <Navigate to="/admin-dashboard" />
                ) : (
                  <Navigate to="/customer-dashboard" />
                )
              ) : (
                <Auth setUser={setUser} />
              )
            }
          />

          {/* CUSTOMER DASHBOARD */}
          <Route
            path="/customer-dashboard"
            element={
              user && user.role === "customer" ? (
                <CustomerDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin-dashboard"
            element={
              user && user.role === "admin" ? (
                <AdminDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
