import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {/* ✅ Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-3">InsuraSphere</h3>
          <p className="text-sm text-blue-100">
            One Dynamic Platform for All Your Insurance Needs — Life, Health,
            Vehicle, and Travel protection made simple.
          </p>
        </div>

        {/* ✅ Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-blue-100">
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <a href="#products" className="hover:text-white transition">
                Products
              </a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-white transition">
                Policy Calculator
              </a>
            </li>
            <li>
              <a href="#feedback" className="hover:text-white transition">
                Feedback
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* ✅ Policies Section */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Policies</h4>
          <ul className="space-y-2 text-blue-100">
            <li>Life Insurance</li>
            <li>Health Insurance</li>
            <li>Auto Insurance</li>
            <li>Travel Insurance</li>
            <li>Claim & Renewal</li>
          </ul>
        </div>

        {/* ✅ Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Contact Us</h4>
          <p className="flex items-center space-x-2 text-blue-100">
            <FaEnvelope /> <span>support@insurasphere.com</span>
          </p>
          <p className="flex items-center space-x-2 mt-2 text-blue-100">
            <FaPhone /> <span>+91 98765 43210 (24x7 Support)</span>
          </p>

          {/* ✅ Social Links */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://linkedin.com"
              className="text-blue-200 hover:text-white transition"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="text-blue-200 hover:text-white transition"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Bottom Line */}
      <div className="text-center text-blue-200 text-sm mt-10 border-t border-blue-600 pt-4">
        © {new Date().getFullYear()} InsuraSphere. All rights reserved. |
        <Link to="/terms" className="hover:text-white ml-1">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
}
