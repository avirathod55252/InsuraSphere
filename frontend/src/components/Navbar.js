import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaHeartbeat,
  FaCar,
  FaPlane,
  FaCalculator,
  FaCommentDots,
  FaHeadset,
  FaRedo,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import logo from "../assests/logo.png";

export default function Navbar({ user, setUser }) {
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* ✅ Logo and Title */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={logo}
            alt="InsuraSphere Logo"
            className="w-12 h-12 rounded-full bg-white p-1"
          />
          <Link to="/" className="text-2xl font-bold tracking-wide">
            InsuraSphere
          </Link>
        </div>

        {/* ✅ Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {/* Products Dropdown */}
          <div className="relative group">
            <button className="hover:text-blue-200 flex items-center gap-2">
              <FaShieldAlt className="text-lg" />
              Products
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white text-blue-700 rounded-lg shadow-md hidden group-hover:block">
              <ul className="text-sm">
                <li
                  onClick={() => scrollToSection("#products")}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
                >
                  <FaHeartbeat /> Life Insurance
                </li>
                <li
                  onClick={() => scrollToSection("#products")}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
                >
                  <FaShieldAlt /> Health Insurance
                </li>
                <li
                  onClick={() => scrollToSection("#products")}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
                >
                  <FaCar /> Vehicle Insurance
                </li>
                <li
                  onClick={() => scrollToSection("#products")}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
                >
                  <FaPlane /> Travel Insurance
                </li>
              </ul>
            </div>
          </div>

          {/* Claims */}
          <button
            onClick={() => scrollToSection("#contact")}
            className="hover:text-blue-200 flex items-center gap-2"
          >
            <FaFileInvoiceDollar /> Claims
          </button>

          {/* Renew */}
          <button
            onClick={() => scrollToSection("#contact")}
            className="hover:text-blue-200 flex items-center gap-2"
          >
            <FaRedo /> Renew Policy
          </button>

          {/* Support */}
          <button
            onClick={() => scrollToSection("#contact")}
            className="hover:text-blue-200 flex items-center gap-2"
          >
            <FaHeadset /> Support
          </button>

          {/* Calculator */}
          <button
            onClick={() => scrollToSection("#calculator")}
            className="hover:text-blue-200 flex items-center gap-2"
          >
            <FaCalculator /> Calculator
          </button>

          {/* Feedback */}
          <button
            onClick={() => scrollToSection("#feedback")}
            className="hover:text-blue-200 flex items-center gap-2"
          >
            <FaCommentDots /> Feedback
          </button>
        </div>

        {/* ✅ User Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm">
                {user.name}{" "}
                <span className="opacity-80 text-xs">({user.role})</span>
              </span>
              <button
                onClick={logout}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100 text-sm font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
