import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TravelInsurance() {
  const navigate = useNavigate();

  const [days, setDays] = useState("");
  const [country, setCountry] = useState("");
  const [premium, setPremium] = useState(0);

  function calculatePremium() {
    if (days && country) {
      const base = 50;
      const cost = days * 10 + base;
      setPremium(cost);
    }
  }

  function handleBuy() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue!");
      navigate("/login");
      return;
    }

    // Redirect logged-in customers to dashboard
    navigate("/customer-dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Travel Insurance
      </h1>

      <p className="text-gray-600 mb-4">
        Calculate your premium and purchase your travel insurance instantly.
      </p>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Number of Days"
          className="border p-2 w-full"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <input
          type="text"
          placeholder="Travel Country"
          className="border p-2 w-full"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={calculatePremium}
        >
          Calculate Premium
        </button>

        {premium > 0 && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            <p className="text-blue-800 font-semibold">
              Estimated Premium: ₹{premium}
            </p>

            <button
              className="mt-3 w-full bg-green-600 text-white py-2 rounded"
              onClick={handleBuy}
            >
              Buy Travel Insurance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
