<<<<<<< HEAD
// Use deployed backend URL
const API = "https://insurasphere.onrender.com/api";
=======
// 🔥 Use full backend URL for deployed frontend
const API = "https://insurasphere.onrender.com";
>>>>>>> 553ee3c177340b6472661fcb37f05cec79c5867d

async function post(path, body, token) {
  const res = await fetch(API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export default {
  signup: (data) => post("/auth/signup", data),

  signin: (data) => post("/auth/signin", data),

  me: async (token) => {
    const res = await fetch(`${API}/auth/me`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (!res.ok) throw new Error("not auth");
    return res.json();
  },

  getPolicies: () => fetch(`${API}/policies`).then((r) => r.json()),

  createPolicy: (data, token) => post("/policies", data, token),

  applyPolicy: (data, token) => post("/applications", data, token),

  getApplications: (token) =>
    fetch(`${API}/applications`, {
      headers: { Authorization: "Bearer " + token },
    }).then((r) => r.json()),

  decideApplication: (id, decision, token) =>
    post(`/applications/${id}/decision`, { decision }, token),

  uploadFile: (formData) =>
    fetch(`${API}/upload`, {
      method: "POST",
      body: formData,
    }).then((r) => r.json()),
};
