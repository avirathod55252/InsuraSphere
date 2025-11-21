import React, { useEffect, useState } from "react";
import api from "../api";
import PolicyCard from "../components/PolicyCard";

export default function CustomerDashboard({ user }) {
  const [policies, setPolicies] = useState([]);
  const [apps, setApps] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Form Fields
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [govId, setGovId] = useState("");
  const [file, setFile] = useState(null);
  const [uploadRes, setUploadRes] = useState(null);

  useEffect(() => {
    api.getPolicies().then(setPolicies);
    const t = localStorage.getItem("token");
    api.getApplications(t).then(setApps);
  }, []);

  // Age Calculator
  function calculateAge(date) {
    const dob = new Date(date);
    const diff = Date.now() - dob.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
  }

  function applyClicked(policy) {
    setSelectedPolicy(policy);
    setOpenForm(true);
  }

  async function submitApplication() {
    if (!dob) return alert("Please enter Date of Birth");
    const age = calculateAge(dob);
    if (age < 18) return alert("You must be at least 18 years old to apply.");

    if (!mobile || mobile.length !== 10)
      return alert("Please enter a valid 10-digit mobile number");

    if (!govId) return alert("Government ID / Aadhar Number required");

    if (!file) return alert("Please upload required documents");

    // Upload file
    const fd = new FormData();
    fd.append("file", file);
    const uploadResult = await api.uploadFile(fd);

    setUploadRes(uploadResult);

    const token = localStorage.getItem("token");

    await api.applyPolicy(
      {
        policyId: selectedPolicy.id,
        dob,
        mobile,
        govId,
        document: uploadResult.file?.filename || "",
      },
      token
    );

    api.getApplications(token).then(setApps);

    alert("Application submitted successfully!");
    setOpenForm(false);
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* LEFT SIDE CONTENT */}
      <div className="col-span-2 space-y-6">
        {/* Available Policies */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Available Insurance Policies
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {policies.map((p) => (
              <PolicyCard key={p.id} p={p} onApply={() => applyClicked(p)} />
            ))}
          </div>
        </div>

        {/* Upload Section (Optional Demo Section) */}
        <div className="mt-6 bg-white p-5 shadow-md rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800">
            Document Upload (Example Section)
          </h3>
          <input
            type="file"
            className="border p-2 rounded"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={async () => {
              const fd = new FormData();
              fd.append("file", file);
              const r = await api.uploadFile(fd);
              setUploadRes(r);
            }}
            className="ml-2 px-4 py-1 bg-blue-600 text-white rounded shadow"
          >
            Upload
          </button>

          {uploadRes && (
            <pre className="mt-2 text-sm bg-gray-100 p-3 rounded">
              {JSON.stringify(uploadRes, null, 2)}
            </pre>
          )}
        </div>
      </div>

      {/* RIGHT SIDE – APPLICATIONS */}
      <div className="bg-white p-5 rounded-lg shadow-md h-fit">
        <h2 className="text-xl font-bold mb-3 text-blue-700">
          Your Policy Applications
        </h2>
        <ul className="space-y-3">
          {apps.map((a) => (
            <li
              key={a.id}
              className="border p-3 rounded-lg shadow-sm bg-gray-50"
            >
              <div className="font-semibold">{a.policyId}</div>
              <div className="text-sm">Status: {a.status}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* APPLY FORM DRAWER */}
      {openForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end">
          <div className="bg-white w-[380px] h-full shadow-xl p-6 animate-slide-left">
            <h2 className="text-xl font-bold mb-4">
              Apply for {selectedPolicy?.name}
            </h2>

            {/* DOB */}
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              className="w-full mt-1 mb-3 border p-2 rounded"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            {/* Mobile */}
            <label className="block font-medium">Mobile Number</label>
            <input
              type="number"
              className="w-full mt-1 mb-3 border p-2 rounded"
              placeholder="10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            {/* Govt ID */}
            <label className="block font-medium">
              Government ID (Aadhar / PAN)
            </label>
            <input
              type="text"
              className="w-full mt-1 mb-3 border p-2 rounded"
              placeholder="Enter ID Number"
              value={govId}
              onChange={(e) => setGovId(e.target.value)}
            />

            {/* File Upload */}
            <label className="block font-medium">Upload Document</label>
            <input
              type="file"
              className="w-full mt-1 mb-3"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              className="w-full bg-blue-600 text-white py-2 rounded mt-3 shadow"
              onClick={submitApplication}
            >
              Submit Application
            </button>

            <button
              className="w-full border text-gray-700 py-2 rounded mt-2"
              onClick={() => setOpenForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
