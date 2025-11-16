import { useEffect, useState } from "react";
import { Edit, Lock, XCircle } from "lucide-react";
import { getPoliciesByType, updatePolicy } from "../../../api/authService";
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

  const verify = () => {
    if (!adminPassword) { alert("Enter admin password"); return; }
    setShowModal(false);
    setEditModel({ ...selected });
    setEditing(true);
  };

  const handleChangeLocal = (field, value) => setEditModel(prev => ({ ...prev, [field]: value }));

  const save = async () => {
    if (!editModel) return;
    setSaving(true);
    
    // ==================
    // 💡 THE FIX IS HERE
    // ==================
    // The backend DTO (UpdateOrDeletePolicyRequest) expects a flat object,
    // not a nested 'updatedPolicy' object. We must send the fields at the
    // top level along with the policyId and adminPassword.

    const payload = {
      policyId: editModel.id,
      adminPassword,

      // 👇 These fields are now flat (not nested)
      policyName: editModel.policyName,
      description: editModel.description,
      premiumAmount: Number(editModel.premiumAmount || 0),
      coverageAmount: Number(editModel.coverageAmount || 0),
      duration: editModel.duration,
      criteria: editModel.criteria,
      status: editModel.status || "ACTIVE",
    };
    // ==================
    // END OF FIX
    // ==================

    const res = await updatePolicy(payload);
    setSaving(false);
    if (res.ok) {
      // re-fetch updated list from server to ensure sync
      const fresh = await getPoliciesByType(policyType);
      if (fresh.ok) setPolicies(Array.isArray(fresh.data) ? fresh.data : []);
      setEditing(false);
      setEditModel(null);
      setSelected(null);
      alert("Policy updated.");
    } else {
      alert(res.data || "Update failed.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow border border-green-100">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Update {policyType} Policies</h2>

        {loading ? <p className="text-gray-600">Loading...</p> : (
          policies.length === 0 ? <p className="text-gray-600">No policies found.</p> : (
            <table className="w-full">
              <thead className="bg-green-100 text-green-700"><tr><th className="p-3">Name</th><th className="p-3">Premium</th><th className="p-3">Action</th></tr></thead>
              <tbody>
                {policies.map(p => (
                  <tr key={p.id} className="border-b hover:bg-green-50">
                    <td className="p-3">{p.policyName}</td>
                    <td className="p-3">₹{p.premiumAmount}</td>
                    <td className="p-3">
                      <button onClick={() => openVerify(p)} className="inline-flex items-center gap-2 text-green-600 hover:text-green-800"><Edit className="w-4 h-4" /> Edit</button>
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
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"><XCircle className="w-6 h-6"/></button>
            <div className="flex flex-col items-center text-center">
              <Lock className="w-10 h-10 text-green-700 mb-3" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">Confirm Admin Identity</h2>
              <p className="text-gray-600 mb-6">Enter admin password to edit <span className="font-semibold text-green-700">{selected?.policyName}</span></p>
              <input type="password" value={adminPassword} onChange={(e)=>setAdminPassword(e.target.value)} className="w-full border border-green-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500" />
              <div className="flex justify-end gap-3 mt-6 w-full">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button onClick={verify} className="px-4 py-2 bg-green-600 text-white rounded-lg">Verify</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* editing modal */}
      {editing && editModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 overflow-y-auto p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl relative">
            <button onClick={() => { setEditing(false); setEditModel(null); }} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"><XCircle className="w-6 h-6"/></button>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Edit Policy</h3>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              <input value={editModel.policyName} onChange={(e)=>handleChangeLocal("policyName", e.target.value)} className="w-full border p-3 rounded-lg" placeholder="Policy name" />
              <textarea value={editModel.description||""} onChange={(e)=>handleChangeLocal("description", e.target.value)} className="w-full border p-3 rounded-lg" placeholder="Description" rows={4}/>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={editModel.premiumAmount||0} onChange={(e)=>handleChangeLocal("premiumAmount", e.target.value)} className="border p-3 rounded-lg" placeholder="Premium" />
                <input type="number" value={editModel.coverageAmount||0} onChange={(e)=>handleChangeLocal("coverageAmount", e.target.value)} className="border p-3 rounded-lg" placeholder="Coverage" />
              </div>
              <input value={editModel.duration||""} onChange={(e)=>handleChangeLocal("duration", e.target.value)} className="w-full border p-3 rounded-lg" placeholder="Duration (e.g., 10 Years)" />
              <textarea value={editModel.criteria||""} onChange={(e)=>handleChangeLocal("criteria", e.target.value)} className="w-full border p-3 rounded-lg" placeholder="Criteria" rows={3}/>
              <select value={editModel.status||"ACTIVE"} onChange={(e)=>handleChangeLocal("status", e.target.value)} className="w-full border p-3 rounded-lg">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setEditing(false); setEditModel(null); }} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              <button onClick={save} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg">{saving ? "Saving..." : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}