import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${form.name}, we’ll contact you soon!`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-lg mx-auto bg-blue-50 p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Interested? Fill the Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}
