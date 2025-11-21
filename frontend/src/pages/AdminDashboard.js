import React, { useEffect, useState } from "react";
import api from "../api";
import PolicyCard from "../components/PolicyCard";

export default function AdminDashboard() {
  const [policies, setPolicies] = useState([]);
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({
    type: "Life",
    title: "",
    premium: 0,
    details: "",
  });

  // Modal for viewing full application info
  const [openModal, setOpenModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    api.getPolicies().then(setPolicies);
    const t = localStorage.getItem("token");
    api.getApplications(t).then(setApps);
  }, []);

  function create(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    api
      .createPolicy(form, token)
      .then(() => api.getPolicies().then(setPolicies));
  }

  function decide(id, d) {
    const token = localStorage.getItem("token");
    api
      .decideApplication(id, d, token)
      .then(() => api.getApplications(token).then(setApps));
  }

  function viewInfo(app) {
    setSelectedApp(app);
    setOpenModal(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Policies Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Existing Policies
            </h2>
            {policies.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {policies.map((p) => (
                  <PolicyCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No policies available yet.</p>
            )}
          </div>

          {/* Create Policy Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Create New Policy
            </h3>
            <form onSubmit={create} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Policy Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  >
                    <option>Life</option>
                    <option>Health</option>
                    <option>Auto</option>
                    <option>Home</option>
                    <option>Travel</option>
                    <option>Pet</option>
                    <option>Cyber Security Insurance</option>
                    <option>Business Insurance</option>
                    <option>Disability Insurance</option>
                    <option>Long-term Care Insurance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Premium
                  </label>
                  <input
                    type="number"
                    value={form.premium}
                    onChange={(e) =>
                      setForm({ ...form, premium: Number(e.target.value) })
                    }
                    placeholder="e.g. 5000"
                    className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Policy Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter title"
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Details
                </label>
                <textarea
                  value={form.details}
                  onChange={(e) =>
                    setForm({ ...form, details: e.target.value })
                  }
                  rows="3"
                  placeholder="Enter policy details..."
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Create Policy
              </button>
            </form>
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Customer Applications
          </h2>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {apps.length > 0 ? (
              apps.map((a) => (
                <div
                  key={a.id}
                  className="border border-gray-200 rounded-md p-4 hover:shadow-sm transition"
                >
                  <div className="text-gray-700 font-medium">
                    Policy ID: {a.policyId}
                  </div>
                  <div className="text-sm text-gray-500">App ID: {a.id}</div>

                  <div
                    className={`mt-1 font-semibold ${
                      a.status === "approved"
                        ? "text-green-600"
                        : a.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {a.status}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => viewInfo(a)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      View Info
                    </button>

                    <button
                      onClick={() => decide(a.id, "approved")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => decide(a.id, "rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No applications found.</p>
            )}
          </div>
        </div>
      </div>

      {/* View Info Modal */}
      {openModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Application Details
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Application ID:</strong> {selectedApp.id}
              </p>
              <p>
                <strong>Policy ID:</strong> {selectedApp.policyId}
              </p>
              <p>
                <strong>Status:</strong> {selectedApp.status}
              </p>

              {/* If customer sent extra fields */}
              {selectedApp.data && (
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(selectedApp.data, null, 2)}
                </pre>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
