import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaUserShield } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import api from "../api";

export default function Auth({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const res = isSignUp
        ? await api.signup(form)
        : await api.signin({ email: form.email, password: form.password });

      if (res.token) {
        localStorage.setItem("token", res.token);
        setUser(res.user);
        toast.success(
          isSignUp ? "Account created successfully!" : "Logged in successfully!"
        );
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={submit} className="space-y-4">
          {isSignUp && (
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 ring-blue-400">
              <FaUser className="text-blue-500 mr-2" />
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Full Name"
                className="w-full outline-none"
                required
              />
            </div>
          )}

          <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 ring-blue-400">
            <FaEnvelope className="text-blue-500 mr-2" />
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email Address"
              className="w-full outline-none"
              type="email"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 ring-blue-400">
            <FaLock className="text-blue-500 mr-2" />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              className="w-full outline-none"
              required
            />
          </div>

          {isSignUp && (
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 ring-blue-400">
              <FaUserShield className="text-blue-500 mr-2" />
              <select
                name="role"
                value={form.role}
                onChange={onChange}
                className="w-full outline-none bg-transparent"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-700 hover:underline font-medium"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "New here? Create an account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
