import { useState } from "react";
import { HeartPulse, Shield, Building2, Briefcase, Info } from "lucide-react";

export default function UserBrowsePolicies() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "health",
      name: "Health Insurance",
      icon: <HeartPulse className="w-10 h-10 text-red-500" />,
      description: "Comprehensive protection for your medical and hospitalization needs.",
    },
    {
      id: "life",
      name: "Life Insurance",
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      description: "Secure your family’s financial future with personalized life cover plans.",
    },
    {
      id: "property",
      name: "Property & Casualty",
      icon: <Building2 className="w-10 h-10 text-yellow-500" />,
      description: "Protect your home, vehicles, and other valuable assets from risks.",
    },
    {
      id: "commercial",
      name: "Commercial Insurance",
      icon: <Briefcase className="w-10 h-10 text-purple-500" />,
      description: "Shield your business operations from potential losses and liabilities.",
    },
  ];

  const policies = {
    health: [
      { id: 1, name: "Family Health Plan", premium: "₹6,000/year", coverage: "Up to ₹5L" },
      { id: 2, name: "Senior Care Health", premium: "₹9,000/year", coverage: "Up to ₹10L" },
    ],
    life: [
      { id: 3, name: "Term Life Protect", premium: "₹8,500/year", coverage: "Up to ₹50L" },
      { id: 4, name: "Whole Life Secure", premium: "₹12,000/year", coverage: "Lifetime" },
    ],
    property: [
      { id: 5, name: "Home Shield", premium: "₹5,000/year", coverage: "Fire, Theft, Natural Disaster" },
      { id: 6, name: "Vehicle Damage Cover", premium: "₹7,500/year", coverage: "Collision + Theft" },
    ],
    commercial: [
      { id: 7, name: "Business Liability Cover", premium: "₹15,000/year", coverage: "Liability up to ₹1Cr" },
      { id: 8, name: "Employee Group Insurance", premium: "₹10,000/year", coverage: "Group Medical Benefits" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Browse Insurance Policies
        </h1>

        {/* Categories */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 cursor-pointer text-center"
              >
                <div className="flex justify-center mb-4">{cat.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {cat.name}
                </h2>
                <p className="text-gray-500 text-sm">{cat.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Policies under selected category */}
        {selectedCategory && (
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-700">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-3 py-1 rounded-lg transition"
              >
                ← Back
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {policies[selectedCategory]?.map((policy) => (
                <div
                  key={policy.id}
                  className="border border-blue-200 rounded-xl p-6 hover:shadow-lg transition bg-gradient-to-tr from-blue-50 to-white"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {policy.name}
                    </h3>
                    <Info className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">Premium:</span> {policy.premium}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-medium">Coverage:</span> {policy.coverage}
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
