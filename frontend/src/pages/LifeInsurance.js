import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LifeInsurance() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("/api/insurance/life");
        setPlans(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load life insurance plans");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  function handleBuy() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue!");
      navigate("/login");
      return;
    }

    navigate("/customer-dashboard");
  }

  if (loading)
    return (
      <h2 className="text-center mt-10">Loading Life Insurance Plans...</h2>
    );
  if (error) return <h2 className="text-red-600 text-center mt-10">{error}</h2>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Life Insurance Plans
      </h1>

      {plans.length === 0 ? (
        <p className="text-gray-600">No plans available</p>
      ) : (
        <div className="space-y-5">
          {plans.map((plan) => (
            <div
              key={plan._id}
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
      )}
    </div>
  );
}
