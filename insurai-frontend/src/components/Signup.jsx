import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import SignUp from "../assets/SignUp.gif"

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-3">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl w-full">
        
        {/* Right Section - Privacy Animation */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-green-600 to-green-400 text-white flex-col items-center justify-center p-6 order-2 md:order-2">
          <img
            src={SignUp}
            alt="Privacy Animation"
            className="w-48 mb-3 drop-shadow-lg"
          />
          <h2 className="text-xl font-bold">
            {"Join InsurAI Today"}
          </h2>
        </div>

        {/* Left Section - Signup Form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8 order-1 md:order-1">
          <h2 className="text-2xl font-bold text-green-700 mb-3 text-center flex items-center justify-center gap-2">
            <UserPlus className="w-5 h-5 text-green-600" />{" "}
            {t("signupTitle") || "Create Your Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                {t("fullName") || "Full Name"}
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full border border-green-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                {t("emailPlaceholder") || "Email"}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                className="w-full border border-green-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                {t("passwordPlaceholder") || "Password"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full border border-green-300 rounded-md px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-green-600 hover:text-green-800"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md shadow hover:bg-green-700 hover:shadow-md text-sm transition"
            >
              {t("signupButton") || "Sign Up"}
            </button>
          </form>

          <p className="text-xs text-center mt-4 text-gray-600">
            {t("haveAccount") || "Already have an account?"}{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-600 font-semibold hover:underline"
            >
              {t("loginLink") || "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
