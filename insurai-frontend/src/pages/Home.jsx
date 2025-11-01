import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function Home() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: t("lifeInsurance"),
      description: t("lifeInsuranceDesc"),
      image: "/life-insurance.png",
    },
    {
      id: 2,
      title: t("healthInsurance"),
      description: t("healthInsuranceDesc"),
      image: "/health-insurance.png",
    },
    {
      id: 3,
      title: t("propertyInsurance"),
      description: t("propertyInsuranceDesc"),
      image: "/property-insurance.png",
    },
    {
      id: 4,
      title: t("commercialInsurance"),
      description: t("commercialInsuranceDesc"),
      image: "/commercial-insurance.png",
    },
  ];

  // 🌿 Scroll to features section when clicked from navbar
  useEffect(() => {
    if (location.state?.scrollToFeatures) {
      const featuresSection = document.getElementById("features-section");
      if (featuresSection) {
        setTimeout(() => {
          featuresSection.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // 🧠 Show chatbot when features section is visible, hide near footer
  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById("features-section");
      const footer = document.querySelector("footer");
      if (!featuresSection || !footer) return;

      const featuresRect = featuresSection.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      const featuresVisible =
        featuresRect.top < window.innerHeight && featuresRect.bottom > 100;
      const nearFooter = footerRect.top < window.innerHeight - 100;

      setShowChatbot(featuresVisible && !nearFooter);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🌟 Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-green-50 to-white px-4">
        <h2 className="text-4xl font-bold text-green-600">{t("heroTitle")}</h2>
        <p className="mt-4 text-gray-700 max-w-2xl">{t("heroSubtitle")}</p>
      </div>

     {/* 🌿 Features Section */}
<div
  id="features-section"
  className="bg-gradient-to-b from-green-50 via-white to-green-100 py-20 px-6"
>
  <h2 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-16 tracking-tight">
    {t("featuresTitle")}
  </h2>

  <div className="max-w-6xl mx-auto space-y-16">
    {features.map((feature, index) => (
      <div
        key={feature.id}
        onClick={() =>
          setSelected(feature.id === selected ? null : feature.id)
        }
        className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 p-8 bg-white rounded-3xl shadow-lg border border-green-200 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
          index % 2 === 1 ? "md:flex-row-reverse" : ""
        } ${selected === feature.id ? "ring-4 ring-green-400" : ""}`}
      >
        {/* Feature Image */}
        <div className="flex-shrink-0">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-md hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Feature Content */}
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-semibold text-green-700 mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
            {feature.description ||
              "Experience the next generation of intelligent insurance solutions powered by AI and automation."}
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-green-700 hover:shadow-lg transition-all"
          >
            {t("learnMore") || "Learn More"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

        {/* Overlay Animation (when selected) */}
        {selected === feature.id && (
          <div className="absolute inset-0 bg-green-600 bg-opacity-90 text-white flex flex-col items-center justify-center rounded-3xl transition-all duration-500 backdrop-blur-sm">
            <h4 className="text-3xl font-bold mb-3">{feature.title}</h4>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
            >
              {t("learnMore")}
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
</div>


      {/* 💬 Floating Chatbot Button */}
      {showChatbot && (
        <button
          onClick={() => alert("AI Chatbot Coming Soon 🤖")}
          className="fixed bottom-24 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-700 transition-all z-50"
        >
          <MessageCircle size={22} />
          <span className="font-semibold">Help!?</span>
        </button>
      )}
    </div>
  );
}
