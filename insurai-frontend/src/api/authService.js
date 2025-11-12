// src/api/authService.js
const API_BASE = "http://localhost:8080/api/auth";

async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  let data;
  try {
    data = ct.includes("application/json") ? await res.json() : await res.text();
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

// Signup
export async function signup(formData) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      // backend will default role=USER; phoneNumber optional
     fullName:formData.fullName,
      role: formData.role || ""
    }),
  });
  return parseResponse(res);
}

// Login
export async function login(formData) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });
  return parseResponse(res);
}

export function getToken() {
  return localStorage.getItem("token");
}
export function logout() {
  localStorage.removeItem("token");
}
