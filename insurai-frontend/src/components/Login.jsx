import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // ✅ Later integrate with Spring Boot backend
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
     

      {/* Login Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-green-200">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {t("loginTitle")}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder={t("passwordPlaceholder")}
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            {t("loginButton")}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {t("noAccount")}{" "}
          <a
            href="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            {t("signupLink")}
          </a>
        </p>
      </div>
    </div>
  );
}
