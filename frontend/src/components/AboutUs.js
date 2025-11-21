import React from "react";
import { FaShieldAlt, FaUsers, FaHandshake, FaGlobe } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Header */}
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
          About InsuraSphere
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          At <span className="font-semibold text-blue-700">InsuraSphere</span>,
          we’re transforming the way people experience insurance. Our mission is
          to make buying, claiming, and managing insurance policies seamless,
          transparent, and reliable — all from a single, secure platform.
        </p>

        {/* ✅ Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Our Mission</h3>
            <p className="text-gray-600 mt-2">
              To empower every individual with financial protection through
              accessible and affordable insurance solutions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaUsers className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Our Vision</h3>
            <p className="text-gray-600 mt-2">
              To be the most trusted digital insurance ecosystem, connecting
              insurers and customers through innovation and trust.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaHandshake className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Our Values</h3>
            <p className="text-gray-600 mt-2">
              Integrity, Transparency, and Customer-Centricity drive every
              decision we make.
            </p>
          </div>
        </div>

        {/* ✅ Global Presence / Community */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
          <FaGlobe className="text-5xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-blue-700 mb-3">
            A Growing Community
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            With thousands of happy customers across India and growing global
            reach, InsuraSphere is redefining how people interact with insurance
            — bringing simplicity, security, and satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}
