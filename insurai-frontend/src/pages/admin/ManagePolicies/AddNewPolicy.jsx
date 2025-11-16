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
    duration: "",
    criteria: "",
    status: "ACTIVE",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      policyType, // canonical uppercase like "HEALTH"
    };

    const res = await addPolicy(payload);
    setLoading(false);

    if (res.ok) {
      alert("Policy added successfully.");
      // navigate back to view for that category
      navigate(`/admin/manage-policies/${segment}/view`);
    } else {
      alert("Failed to add policy: " + (res.data || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-10">
      <motion.h1 initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="text-4xl font-bold text-green-700 mb-8 flex items-center gap-3">
        <PlusCircle className="w-10 h-10 text-green-600" />
        Add New {policyType ?? "Policy"}
      </motion.h1>

      <motion.form onSubmit={handleSubmit} initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-5 border border-green-200">
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-green-600" />
          <input name="policyName" value={form.policyName} onChange={handleChange} placeholder="Policy Name" required className="w-full pl-10 border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
        </div>

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 text-green-600" />
            <input type="number" name="premiumAmount" value={form.premiumAmount} onChange={handleChange} placeholder="Premium Amount" className="w-full pl-10 border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div className="relative">
            <Layers className="absolute left-3 top-3 text-green-600" />
            <input type="number" name="coverageAmount" value={form.coverageAmount} onChange={handleChange} placeholder="Coverage Amount" className="w-full pl-10 border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-green-600" />
          <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. 10 Years)" className="w-full pl-10 border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
        </div>

        <input name="criteria" value={form.criteria} onChange={handleChange} placeholder="Eligibility criteria" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />

        <motion.button whileTap={{scale:0.98}} whileHover={{scale:1.02}} type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition">
          {loading ? "Creating..." : "Create Policy"}
        </motion.button>
      </motion.form>
    </div>
  );
}
