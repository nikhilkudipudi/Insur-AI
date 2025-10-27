import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Features() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
        {t("featuresTitle")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            onClick={() =>
              setSelected(feature.id === selected ? null : feature.id)
            }
            className={`relative bg-white border border-green-200 rounded-2xl shadow-md p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              selected === feature.id ? "ring-2 ring-green-500" : ""
            }`}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-20 h-20 mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-green-700 text-center mb-2">
              {feature.title}
            </h3>

            {/* <p className="text-gray-600 text-center">{feature.description}</p> */}

            {/* Overlay when selected */}
            {selected === feature.id && (
              <div className="absolute inset-0 bg-green-600 bg-opacity-90 text-white flex flex-col items-center justify-center rounded-2xl transition-all duration-500">
                <h4 className="text-2xl font-bold mb-3">{feature.title}</h4>
                {/* <p className="max-w-xs text-center mb-4">
                  {feature.description}
                </p> */}
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
                >
                  {t("learnMore")}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
