// src/api/authService.js
// central api helpers for auth & policies

// ================================
//  API BASE URLS
// ================================
const AUTH_BASE = "http://localhost:8080/api/auth";
const POLICY_BASE = "http://localhost:8080/api/admin/policies";
const USER_POLICY_BASE = "http://localhost:8080/api/user/browse-policies";

// ================================
//  Helper to parse backend responses
// ================================
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

// ================================
//  TOKEN HELPERS (unchanged)
// ================================
export function getToken() {
  return localStorage.getItem("token");
}
export function saveToken(token) {
  localStorage.setItem("token", token);
}
export function logout() {
  localStorage.removeItem("token");
}
function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ================================
//  AUTH ENDPOINTS
// ================================
export async function signup(formData) {
  const payload = {
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
  };
  const res = await fetch(`${AUTH_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

export async function login(formData) {
  const payload = {
    email: formData.email,
    password: formData.password,
  };
  const res = await fetch(`${AUTH_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

// ================================
//  ADMIN POLICY ENDPOINTS
// ================================
export async function addPolicy(policyData) {
  const res = await fetch(`${POLICY_BASE}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(policyData),
  });
  return parseResponse(res);
}

export async function updatePolicy(updatePayload) {
  const res = await fetch(`${POLICY_BASE}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(updatePayload),
  });
  return parseResponse(res);
}

export async function deletePolicy(deletePayload) {
  // use POST /delete (safer than DELETE with body on some servers)
  const res = await fetch(`${POLICY_BASE}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(deletePayload),
  });
  return parseResponse(res);
}

export async function getAllPolicies() {
  const res = await fetch(`${POLICY_BASE}/all`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  return parseResponse(res);
}

/**
 * getPoliciesByType
 * Accepts either:
 *  - a segment string like "health-insurance" OR
 *  - a canonical type string like "HEALTH" / "LIFE"
 *
 * It normalizes to uppercase POLICY TYPE and calls:
 *   GET /api/admin/policies/type/{POLICYTYPE}
 */
export async function getPoliciesByType(typeOrSegment) {
  if (!typeOrSegment) {
    return { ok: false, status: 400, data: "Missing type" };
  }

  // map common URL segments to canonical types
  const map = {
    "health-insurance": "HEALTH",
    "life-insurance": "LIFE",
    "property-casualty": "PROPERTY",
    "commercial-insurance": "COMMERCIAL",
    // also support short forms
    "health": "HEALTH",
    "life": "LIFE",
    "property": "PROPERTY",
    "commercial": "COMMERCIAL",
  };

  let policyType = typeOrSegment;

  // if the input is a segment (contains '-') or lower-case, map it
  const key = String(typeOrSegment).toLowerCase();
  if (map[key]) policyType = map[key];
  else policyType = String(typeOrSegment).toUpperCase();

  const res = await fetch(`${POLICY_BASE}/type/${policyType}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });

  return parseResponse(res);
}

/**
 * getUserPoliciesByType - For USER side
 * Fetches active policies from the user browse endpoint
 */
export async function getUserPoliciesByType(typeOrSegment) {
  if (!typeOrSegment) {
    return { ok: false, status: 400, data: "Missing type" };
  }

  // map common URL segments to canonical types
  const map = {
    "health-insurance": "HEALTH",
    "life-insurance": "LIFE",
    "property-casualty": "PROPERTY",
    "commercial-insurance": "COMMERCIAL",
    "health": "HEALTH",
    "life": "LIFE",
    "property": "PROPERTY",
    "commercial": "COMMERCIAL",
  };

  let policyType = typeOrSegment;
  const key = String(typeOrSegment).toLowerCase();
  if (map[key]) policyType = map[key];
  else policyType = String(typeOrSegment).toUpperCase();

  const res = await fetch(`${USER_POLICY_BASE}/${policyType}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });

  return parseResponse(res);
}


// ================================
//  POLICY APPLICATION ENDPOINTS
// ================================
export async function applyForPolicy(policyId) {
  const res = await fetch(`http://localhost:8080/api/user/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ policyId }),
  });
  return parseResponse(res);
}

export async function getAllApplications() {
  const res = await fetch(`http://localhost:8080/api/admin/applications`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  return parseResponse(res);
}

export async function updateApplicationStatus(applicationId, status) {
  const res = await fetch(`http://localhost:8080/api/admin/applications/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ applicationId, status }),
  });
  return parseResponse(res);
}

export async function getMyApplications() {
  const res = await fetch(`http://localhost:8080/api/user/my-applications`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  return parseResponse(res);
}

// ================================
//  CLAIMS ENDPOINTS
// ================================
export async function fileClaim(claimData) {
  const res = await fetch(`http://localhost:8080/api/user/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(claimData),
  });
  return parseResponse(res);
}

export async function getMyClaims() {
  const res = await fetch(`http://localhost:8080/api/user/claims`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  return parseResponse(res);
}

// Admin: Get all claims
export async function getAllClaims() {
  const res = await fetch(`http://localhost:8080/api/user/claims/admin/all`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  return parseResponse(res);
}

// Admin: Update claim status
export async function updateClaimStatus(claimId, status) {
  const res = await fetch(`http://localhost:8080/api/user/claims/admin/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ claimId, status }),
  });
  return parseResponse(res);
}

// Admin: Get Settings
export async function getSettings() {
  const res = await fetch(`http://localhost:8080/api/admin/settings`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  return parseResponse(res);
}

// Admin: Update Settings
export async function updateSettings(settings) {
  const res = await fetch(`http://localhost:8080/api/admin/settings/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(settings),
  });
  return parseResponse(res);
}

// Admin: Update Password
export async function updatePassword(passwords) {
  const res = await fetch(`http://localhost:8080/api/admin/settings/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(passwords),
  });
  return parseResponse(res);
}

// Admin: Verify Password (for critical actions)
export async function verifyPassword(password) {
  const res = await fetch(`http://localhost:8080/api/admin/settings/verify-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ password }),
  });
  return parseResponse(res);
}

// Admin: Get Analytics
export async function getAnalytics() {
  const res = await fetch(`http://localhost:8080/api/admin/analytics`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  return parseResponse(res);
}
