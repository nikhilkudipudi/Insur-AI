// src/pages/admin/ManagePolicies/RemovePolicy.jsx
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { Trash2, Lock, XCircle, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPoliciesByType, deletePolicy, getSettings, verifyPassword } from "../../../api/authService";
import { usePolicyType } from "../../../hooks/usePolicyType";

export default function RemovePolicy() {
  const { policyType } = usePolicyType();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Status Popup State
  const [statusPopup, setStatusPopup] = useState({ show: false, type: 'success', message: '' });

  // Dynamic Colors based on Policy Type
  const getTheme = () => {
    switch (policyType) {
      case "HEALTH": return { text: "text-yellow-700", bg: "bg-yellow-600", ring: "focus:ring-yellow-500", border: "border-yellow-200", hover: "hover:bg-yellow-50", lightBg: "from-yellow-50 via-white to-yellow-100", icon: "text-yellow-600", headerBg: "bg-yellow-100", headerText: "text-yellow-800", btn: "bg-yellow-600" };
      case "LIFE": return { text: "text-blue-700", bg: "bg-blue-600", ring: "focus:ring-blue-500", border: "border-blue-200", hover: "hover:bg-blue-50", lightBg: "from-blue-50 via-white to-blue-100", icon: "text-blue-600", headerBg: "bg-blue-100", headerText: "text-blue-800", btn: "bg-blue-600" };
      case "PROPERTY": return { text: "text-amber-700", bg: "bg-amber-600", ring: "focus:ring-amber-500", border: "border-amber-200", hover: "hover:bg-amber-50", lightBg: "from-amber-50 via-white to-amber-100", icon: "text-amber-600", headerBg: "bg-amber-100", headerText: "text-amber-800", btn: "bg-amber-600" };
      case "COMMERCIAL": return { text: "text-violet-700", bg: "bg-violet-600", ring: "focus:ring-violet-500", border: "border-violet-200", hover: "hover:bg-violet-50", lightBg: "from-violet-50 via-white to-violet-100", icon: "text-violet-600", headerBg: "bg-violet-100", headerText: "text-violet-800", btn: "bg-violet-600" };
      default: return { text: "text-green-700", bg: "bg-green-600", ring: "focus:ring-green-500", border: "border-green-200", hover: "hover:bg-green-50", lightBg: "from-green-50 via-white to-green-100", icon: "text-green-600", headerBg: "bg-green-100", headerText: "text-green-800", btn: "bg-green-600" };
    }
  };
  const theme = getTheme();

  useEffect(() => {
    if (!policyType) return;
    (async () => {
      setLoading(true);
      const res = await getPoliciesByType(policyType);
      setLoading(false);
      if (res.ok) setPolicies(Array.isArray(res.data) ? res.data : []);
      else setPolicies([]);
    })();
  }, [policyType]);

  const [requirePassword, setRequirePassword] = useState(true);

  useEffect(() => {
    getSettings().then(res => {
      if (res.ok) setRequirePassword(res.data.requirePasswordForActions);
    });
  }, []);

  const showStatus = (type, message) => {
    if (type === 'success') toast.success(message);
    else toast.error(message);
  };

  const openModal = (policy) => {
    setSelected(policy);
    setAdminPassword("");
    setShowModal(true);
  };

  const performDelete = async (id, password) => {
    setActionLoading(true);
    const res = await deletePolicy({ policyId: id, adminPassword: password });
    setActionLoading(false);
    if (res.ok) {
      setPolicies(prev => prev.filter(p => p.id !== id));
      setShowModal(false);
      toast.success("Policy deleted successfully.");
    } else {
      toast.error(res.data || "Delete failed.");
    }
  };

  const confirmDelete = async () => {
    if (requirePassword) {
      if (!adminPassword) {
        toast.error("Enter admin password.");
        return;
      }

      const verifyRes = await verifyPassword(adminPassword);
      if (!verifyRes.ok) {
        toast.error("Incorrect password!");
        return;
      }
    }

    performDelete(selected.id, adminPassword);
  };

  return (
    <div className={`min-h-screen p-10 bg-gradient-to-br ${theme.lightBg}`}>
      <div className={`max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow border ${theme.border}`}>
        <h2 className={`text-3xl font-bold ${theme.text} mb-6 text-center`}>Remove {policyType} Policies</h2>

        {loading ? <p className="text-gray-600 text-center">Loading...</p> : (
          policies.length === 0 ? <p className="text-center text-gray-600">No policies found.</p> : (
            <table className="w-full">
              <thead className="bg-red-100 text-red-700">
                <tr><th className="p-3">Name</th><th className="p-3">Premium</th><th className="p-3">Action</th></tr>
              </thead>
              <tbody>
                {policies.map(p => (
                  <tr key={p.id} className="border-b hover:bg-red-50">
                    <td className="p-3">{p.policyName}</td>
                    <td className="p-3">₹{p.premiumAmount}</td>
                    <td className="p-3">
                      <button onClick={() => openModal(p)} className="text-red-600 hover:text-red-800 inline-flex items-center gap-2">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center text-center">
                <Lock className={`w-10 h-10 ${theme.text} mb-3`} />
                <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>{requirePassword ? "Confirm Admin Identity" : "Confirm Deletion"}</h2>
                <p className="text-gray-600 mb-6">{requirePassword ? "Enter admin password to delete" : "Are you sure you want to delete"} <span className={`font-semibold ${theme.text}`}>{selected?.policyName}</span>?</p>

                {requirePassword && (
                  <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className={`w-full border ${theme.border} rounded-lg p-3 outline-none focus:ring-2 ${theme.ring}`} placeholder="Admin Password" />
                )}

                <div className="flex justify-end gap-3 mt-6 w-full">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                  <button onClick={confirmDelete} disabled={actionLoading} className="px-4 py-2 bg-red-600 text-white rounded-lg">{actionLoading ? "Deleting..." : "Confirm Delete"}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
