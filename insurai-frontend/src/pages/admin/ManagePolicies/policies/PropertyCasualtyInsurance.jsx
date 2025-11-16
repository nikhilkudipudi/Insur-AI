import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, PlusCircle, Pencil, Trash2, Eye } from "lucide-react";

export default function PropertyCasualtyInsurance() {
  const navigate = useNavigate();

  const card = (icon, label, path) => (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(path)}
      className="flex items-center justify-center gap-3 bg-amber-100 hover:bg-amber-200 
                 text-amber-700 font-semibold py-4 rounded-xl shadow-md transition"
    >
      {icon}
      {label}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 p-10 text-center">
      
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Shield className="w-12 h-12 text-amber-700 mx-auto mb-2" />
        <h2 className="text-4xl font-bold text-amber-700 mb-3">
          Property & Casualty Insurance Management
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage insurance policies protecting against accidents, property loss, and disaster damage.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {card(<PlusCircle className="w-6 h-6" />, "Add New Policy", "/admin/manage-policies/property-casualty/add")}
        {card(<Pencil className="w-6 h-6" />, "Update Existing Policy", "/admin/manage-policies/property-casualty/update")}
        {card(<Trash2 className="w-6 h-6" />, "Remove Policy", "/admin/manage-policies/property-casualty/remove")}
        {card(<Eye className="w-6 h-6" />, "View All Policies", "/admin/manage-policies/property-casualty/view")}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/admin/manage-policies")}
        className="mt-12 bg-amber-700 text-white py-2 px-8 rounded-lg hover:bg-amber-800 transition"
      >
        ← Back
      </motion.button>
    </div>
  );
}
