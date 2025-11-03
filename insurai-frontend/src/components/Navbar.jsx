import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [activeButton, setActiveButton] = useState("Home"); // track active nav

  const publicPaths = ["/", "/features", "/login", "/signup"];
  const isDashboard =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user");

  const handleFeaturesClick = () => {
    setActiveButton("Features");
    if (location.pathname === "/") {
      const featuresSection = document.getElementById("features-section");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollToFeatures: true } });
    }
  };

  const handleHomeClick = () => {
    setActiveButton("Home");
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const buttons = [
    { name: "Home", onClick: handleHomeClick },
    { name: "Features", onClick: handleFeaturesClick },
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/signup" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
        {/* LOGO */}
        <h1
          className="text-2xl font-bold pl-12 bg-no-repeat bg-left bg-contain cursor-pointer"
          style={{ backgroundImage: "url('/leaf-logo.png')" }}
          onClick={handleHomeClick}
        >
          InsurAI
        </h1>

        {/* NAVIGATION BUTTONS */}
        {!isDashboard && (
          <div className="flex gap-6">
            {buttons.map((btn) => (
              <button
                key={btn.name}
                onClick={
                  btn.onClick ? btn.onClick : () => {
                    setActiveButton(btn.name);
                    navigate(btn.path);
                  }
                }
                className="relative px-4 py-2 font-semibold text-white hover:text-green-100 transition-colors duration-300"
              >
                {btn.name}
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transition-all duration-300 ${
                    activeButton === btn.name ? "scale-x-100" : "scale-x-0"
                  } origin-center`}
                ></span>
              </button>
            ))}
          </div>
        )}

        {/* DASHBOARD USER MENU */}
        {isDashboard && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 bg-green-700 px-3 py-2 rounded-full hover:bg-green-800 transition"
            >
              <User className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white text-green-700 rounded-lg shadow-lg w-32">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-green-100 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="pt-20"></div>
    </>
  );
}
