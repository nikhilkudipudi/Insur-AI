import { jwtDecode } from "jwt-decode";

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
}

export function getUserRole() {
  const token = localStorage.getItem("token");
   
  if (!token) return null;

 try{ const decoded = jwtDecode(token);
  console.log("Decoded token:", decoded);
   return decoded.role || "USER";
}
  catch(error){
 console.error("Error decoding JWT:", error);
    return "USER";
  }
  
}

export function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // ✅ redirect after logout
}
