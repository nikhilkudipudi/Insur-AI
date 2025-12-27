
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageCircle, Headphones, UserCheck, Brain } from "lucide-react";
import { isAuthenticated } from "../utils/auth";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// ✅ Import GIFs from assets
import LifeGif from "../assets/Life.gif";
import HealthGif from "../assets/Health.gif";
import PropertyGif from "../assets/Property.gif";
import CommercialGif from "../assets/Commercial.gif";

export default function Home() {

  const [selected, setSelected] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 🌿 Feature data with backgrounds
  const features = [
    {
      id: 1,
      title: "Life Insurance",
      description:

        "Protect your loved ones with smart life coverage.",
      bg: LifeGif,
      route: "/user/browse-policies/life-insurance",
    },
    {
      id: 2,
      title: "Health Insurance",
      description:

        "Comprehensive health coverage with instant claim support.",
      bg: HealthGif,
      route: "/user/browse-policies/health-insurance",
    },
    {
      id: 3,
      title: "Property & Casualty",
      description:
        "Safeguard your assets against unforeseen losses.",
      bg: PropertyGif,
      route: "/user/browse-policies/property-casualty",
    },
    {
      id: 4,
      title: "Commercial Insurance",
      description:

        "Empower your business with reliable commercial protection.",
      bg: CommercialGif,
      route: "/user/browse-policies/commercial-insurance",
    },
  ];

  // 🪄 Scroll to features section when clicked from navbar
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

  // 💬 Show chatbot when features section is visible, hide near footer
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
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-green-100 via-white to-green-50 px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold text-green-700 leading-tight">
          Smarter Insurance. <br /> Powered by AI.
        </h2>
        <p className="mt-4 text-gray-700 max-w-2xl text-lg md:text-xl">
          Simplify insurance management with automation, intelligence, and
          seamless experience.
        </p>
        <button
          onClick={() => {
            const featuresSection = document.getElementById("features-section");
            if (featuresSection) {
              featuresSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="mt-8 bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all font-semibold text-lg"
        >
          Explore Our Features
        </button>

        {/* Decorative animation */}
        <div className="mt-12 opacity-80">
          <DotLottieReact
            src="https://lottie.host/09dd6087-06d3-424b-a0a0-d88b033da06f/p4srAxknYt.lottie"
            loop
            autoplay
            style={{ width: "220px", height: "220px" }}
          />
        </div>
      </div>

      {/* 🌿 Features Section */}
      <div
        id="features-section"
        className="bg-gradient-to-b from-green-50 via-white to-green-100 py-20 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-16 tracking-tight">
          Our Core Insurance Plans
        </h2>

        <div className="max-w-6xl mx-auto space-y-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              onClick={() =>
                setSelected(feature.id === selected ? null : feature.id)
              }
              className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 p-8 bg-white rounded-3xl shadow-lg border border-green-200 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] overflow-hidden ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                } ${selected === feature.id ? "ring-4 ring-green-400" : ""}`}
            >
              {/* ✅ Background GIF */}
              <div
                className="absolute inset-0 opacity-30 bg-center bg-cover rounded-3xl scale-105 hover:scale-110 transition-transform duration-500"
                style={{ backgroundImage: `url(${feature.bg})` }}
              ></div>

              {/* Content Overlay */}
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-3xl font-semibold text-green-700 mb-3 drop-shadow-sm">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed max-w-md mx-auto md:mx-0">
                  {feature.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isAuthenticated()) {
                      navigate(feature.route);
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="mt-6 inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-green-700 hover:shadow-lg transition-all"
                >
                  Learn More
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
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 Additional Highlights Section */}
      <section className="bg-green-50 py-20 px-6 border-t border-green-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-12">
            Why Choose <span className="text-green-600">InsurAI?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Item 1 */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-green-100">
              <div className="w-20 h-20 mb-6 flex items-center justify-center bg-green-100 rounded-full">
                <Headphones className="w-12 h-12 text-green-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                24/7 Customer Support
              </h3>
              <p className="text-gray-600">
                We're always here for you. Get round-the-clock assistance for
                your policies, claims, and queries.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-green-100">
              <div className="w-20 h-20 mb-6 flex items-center justify-center bg-green-100 rounded-full">
                <UserCheck className="w-12 h-12 text-green-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                Dedicated Agent Assistance
              </h3>
              <p className="text-gray-600">
                Our expert agents are ready to guide you through every insurance
                decision with personalized advice.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-green-100">
              <div className="w-20 h-20 mb-6 flex items-center justify-center bg-green-100 rounded-full">
                <Brain className="w-12 h-12 text-green-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                Smart AI Insights
              </h3>
              <p className="text-gray-600">
                Make data-driven decisions with AI-powered recommendations and
                predictive analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💬 Floating Chatbot Button */}

    </div>
  );
}
