import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeftCircle } from "lucide-react";

export default function AddNewPolicy() {
  const navigate = useNavigate();
  const [policyData, setPolicyData] = useState({
    type: "",
    name: "",
    term: "",
    premium: "",
    coverage: "",
    description: "",
    eligibility: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicyData({ ...policyData, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !policyData.type ||
      !policyData.name ||
      !policyData.term ||
      !policyData.premium ||
      !policyData.coverage
    ) {
      alert("⚠️ Please fill all required fields before saving.");
      return;
    }

    console.log("✅ New Policy Data:", policyData);
    alert("🎉 Policy saved successfully!");
    navigate("/admin/manage-policies");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center py-12">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-10 border border-green-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">
            📝 Create a New Insurance Policy
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            <ArrowLeftCircle className="w-5 h-5" /> Back
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          {/* Policy Name */}
          <div>
            <label className="block text-sm font-semibold text-green-800 mb-2">
              Policy Name *
            </label>
            <input
              type="text"
              name="name"
              value={policyData.name}
              onChange={handleChange}
              placeholder="e.g., InsurAI Secure Life Plan"
              className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Term Duration */}
          <div>
            <label className="block text-sm font-semibold text-green-800 mb-2">
              Term Plan Duration *
            </label>
            <select
              name="term"
              value={policyData.term}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select Term</option>
              <option value="5 years">5 Years</option>
              <option value="10 years">10 Years</option>
              <option value="15 years">15 Years</option>
              <option value="20 years">20 Years</option>
              <option value="30 years">30 Years</option>
            </select>
          </div>

          {/* Premium Amount */}
          <div>
            <label className="block text-sm font-semibold text-green-800 mb-2">
              Premium Amount (₹) *
            </label>
            <input
              type="number"
              name="premium"
              value={policyData.premium}
              onChange={handleChange}
              placeholder="e.g., 1500"
              className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Coverage Amount */}
          <div>
            <label className="block text-sm font-semibold text-green-800 mb-2">
              Coverage Amount (₹) *
            </label>
            <input
              type="number"
              name="coverage"
              value={policyData.coverage}
              onChange={handleChange}
              placeholder="e.g., 5,00,000"
              className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <label className="block text-sm font-semibold text-green-800 mb-2">
            Policy Description
          </label>
          <textarea
            name="description"
            value={policyData.description}
            onChange={handleChange}
            placeholder="Describe the key features and benefits of this policy..."
            className="w-full h-32 border border-green-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
          ></textarea>
        </div>

        {/* Eligibility */}
        <div className="mt-8">
          <label className="block text-sm font-semibold text-green-800 mb-2">
            Eligibility Criteria
          </label>
          <textarea
            name="eligibility"
            value={policyData.eligibility}
            onChange={handleChange}
            placeholder="Mention eligibility age, medical conditions, etc..."
            className="w-full h-32 border border-green-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
          >
            <CheckCircle className="w-5 h-5" /> Save Policy
          </button>
        </div>
      </div>
    </div>
  );
}
