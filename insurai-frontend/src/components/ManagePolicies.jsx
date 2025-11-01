import { useState } from "react";
import { PlusCircle, Edit, Trash2, Eye, ShieldCheck } from "lucide-react";

export default function ManagePolicies() {
  const [selectedType, setSelectedType] = useState(null);

  const policyTypes = [
    {
      id: "health",
      title: "Health Insurance",
      description: "Covers medical expenses and hospital stays.",
      color: "from-green-400 to-green-600",
    },
    {
      id: "life",
      title: "Life Insurance",
      description: "Provides financial support to family after policyholder’s demise.",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "property",
      title: "Property & Casualty",
      description: "Covers damage or loss to property due to accidents or disasters.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "commercial",
      title: "Commercial Insurance",
      description: "Protects businesses from potential losses or liability.",
      color: "from-purple-400 to-purple-600",
    },
  ];

  const managementOptions = [
    { id: "add", title: "Add New Policy", icon: <PlusCircle className="w-6 h-6" /> },
    { id: "update", title: "Update Existing Policy", icon: <Edit className="w-6 h-6" /> },
    { id: "remove", title: "Remove Policy", icon: <Trash2 className="w-6 h-6" /> },
    { id: "view", title: "View All Policies", icon: <Eye className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-10">
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">
        Manage Insurance Policies
      </h1>

      {!selectedType ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {policyTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={`p-8 rounded-2xl shadow-lg bg-gradient-to-br ${type.color} text-white cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl`}
            >
              <div className="flex items-center justify-center mb-4">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-center">{type.title}</h3>
              <p className="text-sm text-center opacity-90">{type.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-green-700">
                {selectedType.title} Management
              </h2>
              <button
                onClick={() => setSelectedType(null)}
                className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition"
              >
                ← Back
              </button>
            </div>
            <p className="text-gray-600 mb-10">
              Manage all <span className="font-semibold text-green-700">{selectedType.title}</span> policies — add, update, remove, or view existing ones.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {managementOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => alert(`${option.title} feature coming soon!`)}
                  className="flex flex-col items-center justify-center p-8 border border-green-200 rounded-xl shadow-md hover:shadow-lg hover:border-green-400 transition-all bg-green-50 hover:bg-green-100"
                >
                  <div className="mb-4 text-green-600">{option.icon}</div>
                  <span className="font-semibold text-green-800">{option.title}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
