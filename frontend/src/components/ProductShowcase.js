// src/components/ProductShowcase.jsx
import React from "react";
import {
  FaShieldAlt,
  FaHeartbeat,
  FaCar,
  FaPlane,
  FaBug,
  FaPaw,
  FaUniversity,
  FaLaptopCode,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductShowcase() {
  const navigate = useNavigate();

  const products = [
    {
      id: "life",
      icon: <FaShieldAlt />,
      title: "Life Insurance",
      desc: "Secure your family’s financial future with flexible plans.",
    },
    {
      id: "health",
      icon: <FaHeartbeat />,
      title: "Health Insurance",
      desc: "Comprehensive coverage for your medical needs and emergencies.",
    },
    {
      id: "auto",
      icon: <FaCar />,
      title: "Auto Insurance",
      desc: "Protection against accidents, damage and third-party liability.",
    },
    {
      id: "travel",
      icon: <FaPlane />,
      title: "Travel Insurance",
      desc: "Coverage for trip cancellation, medical emergencies, and delays.",
    },
    {
      id: "cyber",
      icon: <FaBug />,
      title: "Cyber Attack Insurance",
      desc: "Protect your business from data breaches and cyber risks.",
    },
    {
      id: "pet",
      icon: <FaPaw />,
      title: "Pet Insurance",
      desc: "Covers accidents, illnesses and wellness for your pets.",
    },
    {
      id: "tuition",
      icon: <FaUniversity />,
      title: "Tuition Insurance",
      desc: "Reimburses tuition if a student withdraws for covered reasons.",
    },
    {
      id: "electronic",
      icon: <FaLaptopCode />,
      title: "Electronic Equipment Insurance",
      desc: "Covers repair or replacement of your essential gadgets.",
    },
  ];

  return (
    <section
      id="products"
      className="py-16 bg-gradient-to-b from-white to-blue-50"
    >
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
        InsuraSphere Products
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Explore our wide range of insurance plans designed to protect your life,
        health, travel, and digital assets — ensuring complete peace of mind.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white hover:bg-blue-50 transition transform hover:scale-105 rounded-2xl p-6 text-center shadow-md hover:shadow-lg border border-blue-100"
          >
            <div className="text-5xl text-blue-600 mb-4 flex justify-center">
              {item.icon}
            </div>
            <h3 className="font-semibold text-lg text-blue-800">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>

            <div className="mt-4 flex justify-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                onClick={() => {
                  if (item.id === "life") navigate("/life-insurance");
                  else if (item.id === "health") navigate("/health-insurance");
                  else if (item.id === "auto") navigate("/auto-insurance");
                  else if (item.id === "travel") navigate("/travel-insurance");
                  else alert(`${item.title} details coming soon.`);
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
