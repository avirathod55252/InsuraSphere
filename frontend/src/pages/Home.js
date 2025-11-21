import React from "react";
import Hero from "../components/Hero";
import ProductShowcase from "../components/ProductShowcase";
import PolicyCalculator from "../components/PolicyCalculator";
import FeedbackSlider from "../components/FeedbackSlider";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Hero />
      <ProductShowcase />

      {/* ✅ Policy Calculator */}
      <section id="calculator" className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Policy Calculator
        </h2>
        <PolicyCalculator />
      </section>

      {/* ✅ Feedback Section */}
      <section
        id="feedback"
        className="py-16 bg-gradient-to-r from-white via-blue-50 to-white"
      >
        <FeedbackSlider />
      </section>

      {/* ✅ Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <ContactForm />
      </section>

      <Footer />
    </div>
  );
}
