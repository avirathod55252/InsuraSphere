import React from "react";

export default function Hero() {
  return (
    <section className="text-center py-16 bg-gradient-to-r from-blue-50 via-white to-blue-100">
      <h1 className="text-4xl font-bold text-blue-700">
        Welcome to <span className="text-blue-600">InsuraSphere</span>
      </h1>
      <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
        One Dynamic Platform for All Your Insurance Needs — protecting Life,
        Health, Vehicles, and more.
      </p>
      <div className="mt-6">
        <a
          href="#products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
        >
          Explore Policies
        </a>
      </div>
    </section>
  );
}
