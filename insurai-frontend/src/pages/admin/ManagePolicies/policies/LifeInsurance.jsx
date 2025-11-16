import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, PlusCircle, Pencil, Trash2, Eye } from "lucide-react";

export default function LifeInsurance() {
  const navigate = useNavigate();

  const card = (icon, label, path) => (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(path)}
      className="flex items-center justify-center gap-3 bg-blue-100 hover:bg-blue-200 
                 text-blue-700 font-semibold py-4 rounded-xl shadow-md transition"
    >
      {icon}
      {label}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-10 text-center">
      
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Heart className="w-12 h-12 text-blue-700 mx-auto mb-2" />
        <h2 className="text-4xl font-bold text-blue-700 mb-3">
          Life Insurance Management
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage policies offering financial protection and long-term benefits for families and loved ones.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {card(<PlusCircle className="w-6 h-6" />, "Add New Policy", "/admin/manage-policies/life-insurance/add")}
        {card(<Pencil className="w-6 h-6" />, "Update Existing Policy", "/admin/manage-policies/life-insurance/update")}
        {card(<Trash2 className="w-6 h-6" />, "Remove Policy", "/admin/manage-policies/life-insurance/remove")}
        {card(<Eye className="w-6 h-6" />, "View All Policies", "/admin/manage-policies/life-insurance/view")}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/admin/manage-policies")}
        className="mt-12 bg-blue-700 text-white py-2 px-8 rounded-lg hover:bg-blue-800 transition"
      >
        ← Back
      </motion.button>
    </div>
  );
}
