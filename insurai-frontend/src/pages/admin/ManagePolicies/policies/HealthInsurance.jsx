import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, PlusCircle, Pencil, Trash2, Eye } from "lucide-react";

export default function HealthInsurance() {
  const navigate = useNavigate();

  const card = (icon, label, path) => (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(path)}
      className="flex items-center justify-center gap-3 font-semibold py-4 rounded-xl shadow-md transition"
      style={{
        backgroundColor: '#FFF9E6',
        color: '#B8860B',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFDE21'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFF9E6'}
    >
      {icon}
      {label}
    </motion.button>
  );

  return (
    <div className="min-h-screen p-10 text-center" style={{ background: 'linear-gradient(to bottom right, #FFFEF0, #FFFFFF, #FFFEF0)' }}>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <HeartPulse className="w-12 h-12 mx-auto mb-2" style={{ color: '#FFDE21' }} />
        <h2 className="text-4xl font-bold mb-3" style={{ color: '#B8860B' }}>
          Health Insurance Management
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Add, update, remove, and view Health Insurance policies related to medical coverage and wellness protection.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {card(<PlusCircle className="w-6 h-6" />, "Add New Policy", "/admin/manage-policies/health-insurance/add")}
        {card(<Pencil className="w-6 h-6" />, "Update Existing Policy", "/admin/manage-policies/health-insurance/update")}
        {card(<Trash2 className="w-6 h-6" />, "Remove Policy", "/admin/manage-policies/health-insurance/remove")}
        {card(<Eye className="w-6 h-6" />, "View All Policies", "/admin/manage-policies/health-insurance/view")}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/admin/manage-policies")}
        className="mt-12 text-white py-2 px-8 rounded-lg shadow-md transition"
        style={{ backgroundColor: '#FFDE21' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E6C71F'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFDE21'}
      >
        ← Back
      </motion.button>

    </div>
  );
}
