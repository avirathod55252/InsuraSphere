// src/pages/HealthInsurance.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ ADD THIS

export default function HealthInsurance() {
  const [coverage, setCoverage] = useState(500000);
  const [claimPercent, setClaimPercent] = useState(80);
  const navigate = useNavigate(); // ⬅️ NAVIGATE

  const claimAmount = ((coverage * claimPercent) / 100).toFixed(2);
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
    <div className="min-h-screen bg-blue-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Health Insurance
        </h1>
        <p className="text-gray-600 mb-6">
          Health insurance provides coverage for medical expenses incurred due
          to illness, injury, or hospitalization. It ensures that you and your
          family receive the best healthcare without financial stress.
        </p>

        {/* Sections */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Benefits
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Cashless treatment at network hospitals</li>
              <li>Pre and post-hospitalization coverage</li>
              <li>Tax benefits under Section 80D</li>
              <li>Coverage for critical illnesses and surgeries</li>
              <li>Family floater options for dependents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Documents Required
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Identity Proof (Aadhaar, PAN, Passport)</li>
              <li>Address Proof</li>
              <li>Recent Medical Reports</li>
              <li>Passport-size Photographs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Claim Process
            </h2>
            <ol className="list-decimal pl-6 text-gray-700">
              <li>
                Inform insurer or hospital before admission (for planned cases).
              </li>
              <li>Provide policy and identity documents at hospital desk.</li>
              <li>Hospital sends claim form and bills to insurer.</li>
              <li>
                Claim is reviewed and amount is settled directly or reimbursed.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              🧮 Claim Calculator
            </h2>
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Coverage (₹)
                  </label>
                  <input
                    type="number"
                    value={coverage}
                    onChange={(e) => setCoverage(Number(e.target.value))}
                    className="w-full mt-1 border rounded-lg p-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Claim Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={claimPercent}
                    onChange={(e) => setClaimPercent(Number(e.target.value))}
                    className="w-full mt-1 border rounded-lg p-2"
                  />
                </div>
              </div>
              <p className="mt-4 text-lg font-semibold text-blue-700">
                💰 Claim Amount: ₹{claimAmount}
              </p>
            </div>
          </section>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleBuy}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Buy Health Insurance
          </button>
        </div>
      </div>
    </div>
  );
}
