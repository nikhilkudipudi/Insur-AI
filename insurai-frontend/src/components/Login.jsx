import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Eye, EyeOff, LogIn } from "lucide-react";
import PrivacySVG from '../assets/privacy.svg';
import { login } from "../api/authService";
import {jwtDecode} from "jwt-decode";


export default function Login() {
 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await login(formData);

    if (!res.ok) {
      alert(res.data || "Invalid credentials! Please try again.");
        setLoading(false);
      return;
    }

    const token = res.data.token;
     localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    console.log("Decoded token:", decoded);

    // Example: redirect by role (assuming JWT includes role)
    const role = decoded.role || "USER";
       alert("Login successful!");

    if (role === "ADMIN") {
  navigate("/admin", { replace: true }); // ✅ replace history
} else {
  navigate("/user", { replace: true }); // ✅ replace history
}

}
    
   catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login.");
  }
  finally {
      setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full">
        {/* Left Section - Privacy Animation */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-green-600 to-green-400 text-white flex-col items-center justify-center p-8">
          <img
            src={PrivacySVG}
            alt="Privacy Policy Animation"
            className="w-full max-w-xs mb-4 drop-shadow-lg"
          />
          <h2 className="text-2xl font-bold mb-1">
            {"Welcome Back"}
          </h2>
          
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10">
          <h2 className="text-3xl font-bold text-green-700 mb-4 text-center flex items-center justify-center gap-2">
            <LogIn className="w-5 h-5 text-green-600" />{" "}
            { "Login to InsurAI"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                { "Email"}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                { "Password"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full border border-green-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-green-600 hover:text-green-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              { "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-5 text-gray-600">
            { "Don't have an account?"}{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-green-600 font-semibold hover:underline"
            >
              { "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}