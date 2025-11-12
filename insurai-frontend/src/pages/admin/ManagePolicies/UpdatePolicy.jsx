import { useState } from "react";
import { Edit, Lock, XCircle } from "lucide-react";

export default function UpdatePolicy() {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      name: "InsurAI Life Secure Plan",
      type: "Life Insurance",
      term: "15 Years",
      premium: "₹1,500/month",
      coverage: "₹10,00,000",
    },
    {
      id: 2,
      name: "Health Protect Elite",
      type: "Health Insurance",
      term: "10 Years",
      premium: "₹1,200/month",
      coverage: "₹5,00,000",
    },
    {
      id: 3,
      name: "Property Shield Max",
      type: "Property & Casualty",
      term: "20 Years",
      premium: "₹1,800/month",
      coverage: "₹20,00,000",
    },
  ]);

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEditClick = (policy) => {
    setSelectedPolicy(policy);
    setShowPasswordModal(true);
    setError("");
    setPassword("");
  };

  const confirmAccess = () => {
    if (password !== "admin123") {
      setError("❌ Incorrect password. Please try again.");
      return;
    }
    setShowPasswordModal(false);
  };

  const handleUpdateChange = (field, value) => {
    setSelectedPolicy({ ...selectedPolicy, [field]: value });
  };

  const handleSave = () => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === selectedPolicy.id ? selectedPolicy : p))
    );
    alert("✅ Policy updated successfully!");
    setSelectedPolicy(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-10">
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">
        Update Existing Policies
      </h1>

      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="p-4 font-semibold">Policy Name</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Term</th>
                <th className="p-4 font-semibold">Premium</th>
                <th className="p-4 font-semibold">Coverage</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr
                  key={policy.id}
                  className="border-b hover:bg-green-50 transition-all"
                >
                  <td className="p-4">{policy.name}</td>
                  <td className="p-4">{policy.type}</td>
                  <td className="p-4">{policy.term}</td>
                  <td className="p-4">{policy.premium}</td>
                  <td className="p-4">{policy.coverage}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleEditClick(policy)}
                      className="flex items-center gap-2 mx-auto text-green-600 hover:text-green-700 transition-all"
                    >
                      <Edit className="w-5 h-5" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <Lock className="w-10 h-10 text-green-700 mb-3" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Admin Verification
              </h2>
              <p className="text-gray-600 mb-6">
                Enter admin password to edit{" "}
                <span className="font-semibold text-green-700">
                  {selectedPolicy?.name}
                </span>
              </p>

              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-green-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
              />

              {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}

              <div className="flex justify-end gap-4 mt-6 w-full">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAccess}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editable Form (after verification) */}
      {selectedPolicy && !showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Edit Policy Details
            </h2>

            <div className="space-y-4">
              <input
                value={selectedPolicy.name}
                onChange={(e) => handleUpdateChange("name", e.target.value)}
                className="w-full border border-green-300 p-3 rounded-lg"
                placeholder="Policy Name"
              />
              <input
                value={selectedPolicy.term}
                onChange={(e) => handleUpdateChange("term", e.target.value)}
                className="w-full border border-green-300 p-3 rounded-lg"
                placeholder="Term"
              />
              <input
                value={selectedPolicy.premium}
                onChange={(e) => handleUpdateChange("premium", e.target.value)}
                className="w-full border border-green-300 p-3 rounded-lg"
                placeholder="Premium"
              />
              <input
                value={selectedPolicy.coverage}
                onChange={(e) => handleUpdateChange("coverage", e.target.value)}
                className="w-full border border-green-300 p-3 rounded-lg"
                placeholder="Coverage"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedPolicy(null)}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
