const API = "/api";

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
    const res = await fetch("/api/auth/me", {
      headers: { Authorization: "Bearer " + token },
    });
    if (!res.ok) throw new Error("not auth");
    return res.json();
  },

  getPolicies: () => fetch("/api/policies").then((r) => r.json()),

  createPolicy: (data, token) => post("/policies", data, token),

  applyPolicy: (data, token) => post("/applications", data, token),

  getApplications: (token) =>
    fetch("/api/applications", {
      headers: { Authorization: "Bearer " + token },
    }).then((r) => r.json()),

  decideApplication: (id, decision, token) =>
    post(`/applications/${id}/decision`, { decision }, token),

  uploadFile: (formData) =>
    fetch("/api/upload", { method: "POST", body: formData }).then((r) =>
      r.json()
    ),
};
