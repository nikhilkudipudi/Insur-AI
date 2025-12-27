import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { Edit, Lock, XCircle } from "lucide-react";
import { getPoliciesByType, updatePolicy, verifyPassword } from "../../../api/authService";
import { usePolicyType } from "../../../hooks/usePolicyType";

export default function UpdatePolicy() {
  const { policyType } = usePolicyType();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [editModel, setEditModel] = useState(null);
  const [saving, setSaving] = useState(false);

  // Dynamic Colors based on Policy Type
  const getTheme = () => {
    switch (policyType) {
      case "HEALTH": return { text: "text-yellow-700", bg: "bg-yellow-600", ring: "focus:ring-yellow-500", border: "border-yellow-200", hover: "hover:bg-yellow-50", lightBg: "from-yellow-50 via-white to-yellow-100", icon: "text-yellow-600", headerBg: "bg-yellow-100", headerText: "text-yellow-800" };
      case "LIFE": return { text: "text-blue-700", bg: "bg-blue-600", ring: "focus:ring-blue-500", border: "border-blue-200", hover: "hover:bg-blue-50", lightBg: "from-blue-50 via-white to-blue-100", icon: "text-blue-600", headerBg: "bg-blue-100", headerText: "text-blue-800" };
      case "PROPERTY": return { text: "text-amber-700", bg: "bg-amber-600", ring: "focus:ring-amber-500", border: "border-amber-200", hover: "hover:bg-amber-50", lightBg: "from-amber-50 via-white to-amber-100", icon: "text-amber-600", headerBg: "bg-amber-100", headerText: "text-amber-800" };
      case "COMMERCIAL": return { text: "text-violet-700", bg: "bg-violet-600", ring: "focus:ring-violet-500", border: "border-violet-200", hover: "hover:bg-violet-50", lightBg: "from-violet-50 via-white to-violet-100", icon: "text-violet-600", headerBg: "bg-violet-100", headerText: "text-violet-800" };
      default: return { text: "text-green-700", bg: "bg-green-600", ring: "focus:ring-green-500", border: "border-green-200", hover: "hover:bg-green-50", lightBg: "from-green-50 via-white to-green-100", icon: "text-green-600", headerBg: "bg-green-100", headerText: "text-green-800" };
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

  const openVerify = (policy) => {
    setSelected(policy);
    setAdminPassword("");
    setShowModal(true);
  };

  const verify = async () => {
    if (!adminPassword) { toast.error("Enter admin password"); return; }

    const verifyRes = await verifyPassword(adminPassword);
    if (!verifyRes.ok) {
      toast.error("Incorrect password!");
      return;
    }

    setShowModal(false);
    setEditModel({ ...selected });
    setEditing(true);
  };

  const handleChangeLocal = (field, value) => setEditModel(prev => ({ ...prev, [field]: value }));

  const save = async () => {
    if (!editModel) return;
    setSaving(true);

    const payload = {
      policyId: editModel.id,
      adminPassword,
      policyName: editModel.policyName,
      description: editModel.description,
      premiumAmount: Number(editModel.premiumAmount || 0),
      coverageAmount: Number(editModel.coverageAmount || 0),
      duration: editModel.duration,
      criteria: editModel.criteria,
      status: "ACTIVE",
    };

    const res = await updatePolicy(payload);
    setSaving(false);
    if (res.ok) {
      const fresh = await getPoliciesByType(policyType);
      if (fresh.ok) setPolicies(Array.isArray(fresh.data) ? fresh.data : []);
      setEditing(false);
      setEditModel(null);
      setSelected(null);
      toast.success("Policy updated.");
    } else {
      toast.error(res.data || "Update failed.");
    }
  };

  return (
    <div className={`min-h-screen p-10 bg-gradient-to-br ${theme.lightBg}`}>
      <div className={`max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow border ${theme.border}`}>
        <h2 className={`text-3xl font-bold ${theme.text} mb-6 text-center`}>Update {policyType} Policies</h2>

        {loading ? <p className="text-gray-600 text-center">Loading...</p> : (
          policies.length === 0 ? <p className="text-gray-600 text-center">No policies found.</p> : (
            <table className="w-full">
              <thead className={`${theme.headerBg} ${theme.headerText}`}><tr><th className="p-3">Name</th><th className="p-3">Premium</th><th className="p-3">Action</th></tr></thead>
              <tbody>
                {policies.map(p => (
                  <tr key={p.id} className={`border-b ${theme.hover}`}>
                    <td className="p-3">{p.policyName}</td>
                    <td className="p-3">₹{p.premiumAmount}</td>
                    <td className="p-3">
                      <button onClick={() => openVerify(p)} className={`inline-flex items-center gap-2 ${theme.text} hover:opacity-80`}><Edit className="w-4 h-4" /> Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>

      {/* password modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"><XCircle className="w-6 h-6" /></button>
            <div className="flex flex-col items-center text-center">
              <Lock className={`w-10 h-10 ${theme.text} mb-3`} />
              <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Confirm Admin Identity</h2>
              <p className="text-gray-600 mb-6">Enter admin password to edit <span className={`font-semibold ${theme.text}`}>{selected?.policyName}</span></p>
              <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className={`w-full border ${theme.border} rounded-lg p-3 outline-none focus:ring-2 ${theme.ring}`} />
              <div className="flex justify-end gap-3 mt-6 w-full">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button onClick={verify} className={`px-4 py-2 ${theme.bg} text-white rounded-lg`}>Verify</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* editing modal */}
      {editing && editModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 overflow-y-auto p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl relative">
            <button onClick={() => { setEditing(false); setEditModel(null); }} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"><XCircle className="w-6 h-6" /></button>
            <h3 className={`text-2xl font-bold ${theme.text} mb-4 text-center`}>Edit Policy</h3>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              <input value={editModel.policyName} onChange={(e) => handleChangeLocal("policyName", e.target.value)} className="w-full border p-3 rounded-lg" placeholder="Policy name" />
              <textarea value={editModel.description || ""} onChange={(e) => handleChangeLocal("description", e.target.value)} className="w-full border p-3 rounded-lg" placeholder="Description" rows={4} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={editModel.premiumAmount || 0} onChange={(e) => handleChangeLocal("premiumAmount", e.target.value)} className="border p-3 rounded-lg" placeholder="Premium" />
                <input type="number" value={editModel.coverageAmount || 0} onChange={(e) => handleChangeLocal("coverageAmount", e.target.value)} className="border p-3 rounded-lg" placeholder="Coverage" />
              </div>
              <select value={editModel.duration || "1 Year"} onChange={(e) => handleChangeLocal("duration", e.target.value)} className="w-full border p-3 rounded-lg bg-white">
                <option>1 Year</option>
                <option>2 Years</option>
                <option>5 Years</option>
                <option>10 Years</option>
                <option>Lifetime</option>
              </select>
              <textarea value={editModel.criteria || ""} onChange={(e) => handleChangeLocal("criteria", e.target.value)} className="w-full border p-3 rounded-lg" placeholder="Criteria" rows={3} />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setEditing(false); setEditModel(null); }} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              <button onClick={save} disabled={saving} className={`px-4 py-2 ${theme.bg} text-white rounded-lg`}>{saving ? "Saving..." : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}