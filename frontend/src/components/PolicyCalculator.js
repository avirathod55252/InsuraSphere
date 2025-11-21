import React, { useState } from "react";

export default function PolicyCalculator() {
  const [premium, setPremium] = useState("");
  const [coverage, setCoverage] = useState("");
  const [years, setYears] = useState("");
  const [total, setTotal] = useState(null);

  const calculate = () => {
    if (!premium || !coverage || !years) {
      alert("Please enter all values");
      return;
    }
    const result =
      parseFloat(premium) * parseFloat(years) + parseFloat(coverage) * 0.05;
    setTotal(result.toFixed(2));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
        Policy Premium Calculator
      </h3>
      <div className="space-y-3">
        <input
          type="number"
          placeholder="Monthly Premium (₹)"
          value={premium}
          onChange={(e) => setPremium(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Coverage Amount (₹)"
          value={coverage}
          onChange={(e) => setCoverage(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Years"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={calculate}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Calculate
        </button>
        {total && (
          <div className="text-center text-blue-800 font-semibold mt-3">
            Estimated Total Cost: ₹{total}
          </div>
        )}
      </div>
    </div>
  );
}
