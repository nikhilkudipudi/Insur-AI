// src/pages/admin/ManagePolicies/AddNewPolicy.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, FileText, DollarSign, Calendar, Layers } from "lucide-react";
import { addPolicy } from "../../../api/authService";
import { usePolicyType } from "../../../hooks/usePolicyType";
import { useNavigate } from "react-router-dom";

export default function AddNewPolicy() {
  const { policyType, segment } = usePolicyType();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    policyName: "",
    description: "",
    premiumAmount: "",
    coverageAmount: "",
    duration: "1 Year",
    criteria: "",
    status: "ACTIVE",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Dynamic Colors based on Policy Type
  const getTheme = () => {
    switch (policyType) {
      case "HEALTH": return { text: "text-yellow-700", bg: "bg-yellow-600", ring: "focus:ring-yellow-500", border: "border-yellow-200", hover: "hover:bg-yellow-700", lightBg: "from-yellow-50 via-white to-yellow-100", icon: "text-yellow-600" };
      case "LIFE": return { text: "text-blue-700", bg: "bg-blue-600", ring: "focus:ring-blue-500", border: "border-blue-200", hover: "hover:bg-blue-700", lightBg: "from-blue-50 via-white to-blue-100", icon: "text-blue-600" };
      case "PROPERTY": return { text: "text-amber-700", bg: "bg-amber-600", ring: "focus:ring-amber-500", border: "border-amber-200", hover: "hover:bg-amber-700", lightBg: "from-amber-50 via-white to-amber-100", icon: "text-amber-600" };
      case "COMMERCIAL": return { text: "text-violet-700", bg: "bg-violet-600", ring: "focus:ring-violet-500", border: "border-violet-200", hover: "hover:bg-violet-700", lightBg: "from-violet-50 via-white to-violet-100", icon: "text-violet-600" };
      default: return { text: "text-green-700", bg: "bg-green-600", ring: "focus:ring-green-500", border: "border-green-200", hover: "hover:bg-green-700", lightBg: "from-green-50 via-white to-green-100", icon: "text-green-600" };
    }
  };
  const theme = getTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!policyType || !segment) {
      alert("Invalid policy category (URL).");
      return;
    }

    setLoading(true);
    const payload = {
      ...form,
      premiumAmount: Number(form.premiumAmount || 0),
      coverageAmount: Number(form.coverageAmount || 0),
      policyType,
    };

    const res = await addPolicy(payload);
    setLoading(false);

    if (res.ok) {
      alert("Policy added successfully.");
      navigate(`/admin/manage-policies/${segment}/view`);
    } else {
      alert("Failed to add policy: " + (res.data || "Unknown error"));
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.lightBg} p-10`}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className={`text-4xl font-bold ${theme.text} flex items-center justify-center gap-3`}>
          <PlusCircle className={`w-10 h-10 ${theme.icon}`} />
          Create Policy - {policyType} Insurance
        </h1>
      </motion.div>

      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className={`max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-5 border ${theme.border}`}>
        <div className="relative">
          <FileText className={`absolute left-3 top-3 ${theme.icon}`} />
          <input name="policyName" value={form.policyName} onChange={handleChange} placeholder="Policy Name" required className={`w-full pl-10 border p-3 rounded-lg focus:ring-2 ${theme.ring} outline-none`} />
        </div>

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className={`w-full border p-3 rounded-lg focus:ring-2 ${theme.ring} outline-none`} />

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <DollarSign className={`absolute left-3 top-3 ${theme.icon}`} />
            <input type="number" name="premiumAmount" value={form.premiumAmount} onChange={handleChange} placeholder="Premium Amount" className={`w-full pl-10 border p-3 rounded-lg focus:ring-2 ${theme.ring} outline-none`} />
          </div>

          <div className="relative">
            <Layers className={`absolute left-3 top-3 ${theme.icon}`} />
            <input type="number" name="coverageAmount" value={form.coverageAmount} onChange={handleChange} placeholder="Coverage Amount" className={`w-full pl-10 border p-3 rounded-lg focus:ring-2 ${theme.ring} outline-none`} />
          </div>
        </div>

        <div className="relative">
          <Calendar className={`absolute left-3 top-3 ${theme.icon}`} />
          <select name="duration" value={form.duration} onChange={handleChange} className={`w-full pl-10 border p-3 rounded-lg focus:ring-2 ${theme.ring} outline-none bg-white`}>
            <option>1 Year</option>
            <option>2 Years</option>
            <option>5 Years</option>
            <option>10 Years</option>
            <option>Lifetime</option>
          </select>
        </div>

        <textarea name="criteria" value={form.criteria} onChange={handleChange} placeholder="Eligibility criteria (e.g. Age 18-60, No pre-existing conditions)" rows={4} className={`w-full border p-3 rounded-lg focus:ring-2 ${theme.ring} outline-none`} />

        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} type="submit" disabled={loading} className={`w-full ${theme.bg} text-white py-3 rounded-lg font-semibold shadow ${theme.hover} transition`}>
          {loading ? "Creating..." : "Create Policy"}
        </motion.button>
      </motion.form>
    </div>
  );
}
