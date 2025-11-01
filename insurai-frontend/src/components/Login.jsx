import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, LogIn } from "lucide-react";
import PrivacySVG from '../assets/privacy.svg';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
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
            {t("loginTitle") || "Login to InsurAI"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("emailPlaceholder") || "Email"}
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
              {t("loginButton") || "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-5 text-gray-600">
            {t("noAccount") || "Don't have an account?"}{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-green-600 font-semibold hover:underline"
            >
              {t("signupLink") || "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}