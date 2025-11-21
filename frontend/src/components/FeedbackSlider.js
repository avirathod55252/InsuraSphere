import React, { useState, useEffect } from "react";

const feedbacks = [
  {
    name: "Riya Sharma",
    text: "InsuraSphere made my claim process super fast!",
    rating: 5,
  },
  {
    name: "Amit Patel",
    text: "Affordable plans with great coverage.",
    rating: 4,
  },
  { name: "Neha Joshi", text: "Excellent customer service 24/7!", rating: 5 },
  { name: "Raj Mehta", text: "Very transparent and trustworthy.", rating: 5 },
  { name: "Priya Singh", text: "Highly recommend to all families.", rating: 4 },
];

export default function FeedbackSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % feedbacks.length),
      3000
    );
    return () => clearInterval(timer);
  }, []);

  const feedback = feedbacks[index];

  return (
    <div className="max-w-3xl mx-auto text-center bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        What Our Customers Say
      </h2>
      <p className="text-gray-700 italic text-lg mb-4">“{feedback.text}”</p>
      <h3 className="font-semibold text-blue-600">— {feedback.name}</h3>
      <div className="flex justify-center mt-3">
        {Array(feedback.rating)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="text-yellow-400 text-xl">
              ★
            </span>
          ))}
      </div>
    </div>
  );
}
