// src/pages/LifeInsurance.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LifeInsurance() {
  const navigate = useNavigate();

  function handleBuy() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue!");
      navigate("/login");
      return;
    }
    navigate("/customer-dashboard");
  }

  // Simple static life insurance data
  const plans = [
    {
      id: 1,
      planName: "Basic Life Cover",
      coverageAmount: 500000,
      premium: 499,
      duration: 10,
      description: "Ideal life cover for individuals starting their journey.",
    },
    {
      id: 2,
      planName: "Family Protection Plan",
      coverageAmount: 1000000,
      premium: 899,
      duration: 15,
      description: "Ensures financial security for your whole family.",
    },
    {
      id: 3,
      planName: "Premium Life Shield",
      coverageAmount: 2000000,
      premium: 1499,
      duration: 20,
      description: "High coverage plan with long-term protection.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Life Insurance Plans
      </h1>

      <div className="space-y-5">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 rounded-lg p-5 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {plan.planName}
            </h3>

            <p className="text-gray-700">
              <strong>Coverage Amount:</strong> ₹{plan.coverageAmount}
            </p>

            <p className="text-gray-700">
              <strong>Premium:</strong> ₹{plan.premium}
            </p>

            <p className="text-gray-700">
              <strong>Description:</strong> {plan.description}
            </p>

            <p className="text-gray-700 mb-3">
              <strong>Duration:</strong> {plan.duration} years
            </p>

            <button
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleBuy}
            >
              Buy Life Insurance
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
