// src/pages/admin/ManagePolicies/RemovePolicy.jsx
import { useEffect, useState } from "react";
import { Trash2, Lock, XCircle } from "lucide-react";
import { getPoliciesByType, deletePolicy } from "../../../api/authService";
import { usePolicyType } from "../../../hooks/usePolicyType";

export default function RemovePolicy() {
  const { policyType } = usePolicyType();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

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

  const openModal = (policy) => {
    setSelected(policy);
    setAdminPassword("");
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!adminPassword) {
      alert("Enter admin password.");
      return;
    }
    setActionLoading(true);
    const res = await deletePolicy({ policyId: selected.id, adminPassword });
    setActionLoading(false);
    if (res.ok) {
      setPolicies(prev => prev.filter(p => p.id !== selected.id));
      setShowModal(false);
      alert("Policy deleted.");
    } else {
      alert(res.data || "Delete failed.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow border border-green-100">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Remove {policyType} Policies</h2>

        {loading ? <p className="text-gray-600">Loading...</p> : (
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <XCircle className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <Lock className="w-10 h-10 text-green-700 mb-3" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">Confirm Admin Identity</h2>
              <p className="text-gray-600 mb-6">Enter admin password to delete <span className="font-semibold text-green-700">{selected?.policyName}</span></p>
              <input type="password" value={adminPassword} onChange={(e)=>setAdminPassword(e.target.value)} className="w-full border border-green-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500" />
              <div className="flex justify-end gap-3 mt-6 w-full">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button onClick={confirmDelete} disabled={actionLoading} className="px-4 py-2 bg-red-600 text-white rounded-lg">{actionLoading ? "Deleting..." : "Confirm Delete"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
