import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const buttons = [
    { key: "home", path: "/" },
    { key: "features", path: "/features" },
    { key: "login", path: "/login" },
    { key: "signup", path: "/signup" },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* LOGO */}
      <h1
        className="text-2xl font-bold pl-12 bg-no-repeat bg-left bg-contain cursor-pointer"
        style={{ backgroundImage: "url('/leaf-logo.png')" }}
        onClick={() => navigate("/")}
      >
        InsurAI
      </h1>

      {/* NAVIGATION BUTTONS */}
      <div className="flex items-center gap-6">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => navigate(btn.path)}
            className={`relative px-4 py-2 font-semibold hover:text-green-100 transition-colors duration-300 ${
              location.pathname === btn.path ? "text-green-100" : "text-white"
            }`}
          >
            {t(btn.key)}
            <span
              className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transition-all duration-300 ${
                location.pathname === btn.path ? "scale-x-100" : "scale-x-0"
              } origin-center`}
            ></span>
          </button>
        ))}

        {/* LANGUAGE SELECTOR */}
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
          className="ml-4 bg-white text-green-700 font-semibold px-3 py-1 rounded-lg shadow-sm hover:bg-green-50 focus:outline-none"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
    </nav>
  );
}
