import { useState } from "react";
import { HeartPulse, Shield, Building2, Briefcase, Info } from "lucide-react";

export default function UserBrowsePolicies() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "health",
      name: "Health Insurance",
      icon: <HeartPulse className="w-10 h-10 text-green-600" />,
      description: "Comprehensive protection for medical and hospitalization needs.",
      gradient: "from-green-100 to-white",
    },
    {
      id: "life",
      name: "Life Insurance",
      icon: <Shield className="w-10 h-10 text-green-600" />,
      description: "Ensure your family’s financial stability and peace of mind.",
      gradient: "from-green-100 to-white",
    },
    {
      id: "property",
      name: "Property & Casualty",
      icon: <Building2 className="w-10 h-10 text-green-600" />,
      description: "Protect your home, vehicles, and valuable assets from risks.",
      gradient: "from-green-100 to-white",
    },
    {
      id: "commercial",
      name: "Commercial Insurance",
      icon: <Briefcase className="w-10 h-10 text-green-600" />,
      description: "Comprehensive coverage for your business and employees.",
      gradient: "from-green-100 to-white",
    },
  ];

  const policies = {
    health: [
      { id: 1, name: "Family Health Plan", premium: "₹6,000/year", coverage: "Up to ₹5L" },
      { id: 2, name: "Senior Care Health", premium: "₹9,000/year", coverage: "Up to ₹10L" },
      { id: 3, name: "Individual Shield", premium: "₹4,500/year", coverage: "Up to ₹3L" },
    ],
    life: [
      { id: 4, name: "Term Life Protect", premium: "₹8,500/year", coverage: "Up to ₹50L" },
      { id: 5, name: "Whole Life Secure", premium: "₹12,000/year", coverage: "Lifetime" },
    ],
    property: [
      { id: 6, name: "Home Shield", premium: "₹5,000/year", coverage: "Fire, Theft, Natural Disaster" },
      { id: 7, name: "Vehicle Damage Cover", premium: "₹7,500/year", coverage: "Collision + Theft" },
    ],
    commercial: [
      { id: 8, name: "Business Liability Cover", premium: "₹15,000/year", coverage: "Liability up to ₹1Cr" },
      { id: 9, name: "Employee Group Insurance", premium: "₹10,000/year", coverage: "Group Medical Benefits" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-green-700">
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name
              : "Browse Insurance Policies"}
          </h1>

          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 shadow-md transition"
            >
              ← Back
            </button>
          )}
        </div>

        {/* CATEGORY CARDS */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative bg-gradient-to-b ${cat.gradient} border border-green-200 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 text-center cursor-pointer group`}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-green-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition"></div>
                <div className="flex justify-center mb-4">{cat.icon}</div>
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  {cat.name}
                </h2>
                <p className="text-gray-600 text-sm">{cat.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* POLICY CARDS */}
        {selectedCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
            {policies[selectedCategory]?.map((policy) => (
              <div
                key={policy.id}
                className="relative bg-white border border-green-200 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500 rounded-t-2xl"></div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-green-700">
                    {policy.name}
                  </h3>
                  <Info className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Premium:</span> {policy.premium}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <span className="font-medium">Coverage:</span> {policy.coverage}
                </p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
