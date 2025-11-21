// src/pages/AutoInsurance.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AutoInsurance() {
  const [carValue, setCarValue] = useState(500000);
  const [ndYear, setNdYear] = useState(1);

  const navigate = useNavigate();

  const premium = ((carValue * 2.5) / 100 + ndYear * 200).toFixed(2);

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
    <div className="min-h-screen bg-yellow-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-yellow-700 mb-4">
          Auto Insurance
        </h1>

        <p className="text-gray-600 mb-6">
          Auto insurance protects your vehicle against accidents, theft, and
          damage. It includes coverage for third-party liabilities as well.
        </p>

        <div className="space-y-8">
          {/* Benefits */}
          <section>
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">
              Benefits
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Accident and damage protection</li>
              <li>Theft coverage</li>
              <li>Third-party liability protection</li>
              <li>Cashless repair at network garages</li>
            </ul>
          </section>

          {/* Documents */}
          <section>
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">
              Documents Required
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>RC Book</li>
              <li>Driving License</li>
              <li>Pollution Certificate</li>
              <li>ID Proof</li>
            </ul>
          </section>

          {/* Claim Process */}
          <section>
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">
              Claim Process
            </h2>
            <ol className="list-decimal pl-6 text-gray-700">
              <li>Inform insurer immediately after accident</li>
              <li>Submit claim form and photos</li>
              <li>Surveyor inspects vehicle</li>
              <li>Claim approved and repair starts</li>
            </ol>
          </section>

          {/* Calculator */}
          <section>
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">
              🧮 Premium Calculator
            </h2>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700">
                    Car Value (₹)
                  </label>
                  <input
                    type="number"
                    value={carValue}
                    onChange={(e) => setCarValue(Number(e.target.value))}
                    className="mt-1 w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-700">
                    No. of Driving Years
                  </label>
                  <input
                    type="number"
                    value={ndYear}
                    onChange={(e) => setNdYear(Number(e.target.value))}
                    className="mt-1 w-full border p-2 rounded"
                  />
                </div>
              </div>

              <p className="mt-4 text-lg font-semibold text-yellow-700">
                Premium: ₹{premium}/year
              </p>
            </div>
          </section>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleBuy}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg text-lg hover:bg-yellow-700 transition"
          >
            Buy Auto Insurance
          </button>
        </div>
      </div>
    </div>
  );
}
