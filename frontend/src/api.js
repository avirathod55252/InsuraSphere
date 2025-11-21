// 🔥 Use full backend API URL
const API = "https://insurasphere.onrender.com/api";

// Helper POST function
async function post(path, body, token) {
  const res = await fetch(API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Server Error: " + text);
  }

  return res.json();
}

export default {
  // AUTH
  signup: (data) => post("/auth/signup", data),

  signin: (data) => post("/auth/signin", data),

  me: async (token) => {
    const res = await fetch(`${API}/auth/me`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (!res.ok) throw new Error("not auth");
    return res.json();
  },

  // POLICIES
  getPolicies: () =>
    fetch(`${API}/policies`).then(async (r) => {
      if (!r.ok) {
        const text = await r.text();
        throw new Error(text);
      }
      return r.json();
    }),

  createPolicy: (data, token) => post("/policies", data, token),

  // APPLICATIONS
  applyPolicy: (data, token) => post("/applications", data, token),

  getApplications: (token) =>
    fetch(`${API}/applications`, {
      headers: { Authorization: "Bearer " + token },
    }).then(async (r) => {
      if (!r.ok) {
        const text = await r.text();
        throw new Error(text);
      }
      return r.json();
    }),

  decideApplication: (id, decision, token) =>
    post(`/applications/${id}/decision`, { decision }, token),

  // FILE UPLOAD
  uploadFile: (formData) =>
    fetch(`${API}/upload`, {
      method: "POST",
      body: formData,
    }).then(async (r) => {
      if (!r.ok) {
        const text = await r.text();
        throw new Error(text);
      }
      return r.json();
    }),
};
