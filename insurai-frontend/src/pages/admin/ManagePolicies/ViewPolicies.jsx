// src/pages/admin/ManagePolicies/ViewPolicies.jsx
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getPoliciesByType } from "../../../api/authService";
import { usePolicyType } from "../../../hooks/usePolicyType";

export default function ViewPolicies() {
  const { policyType, segment } = usePolicyType();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!policyType) return;
    setLoading(true);
    (async () => {
      const res = await getPoliciesByType(policyType);
      setLoading(false);
      if (res.ok) {
        setPolicies(Array.isArray(res.data) ? res.data : []);
      } else {
        console.error("Failed to load policies:", res.data);
        setPolicies([]);
      }
    })();
  }, [policyType]);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-white to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-10 h-10 text-green-600" />
          <h1 className="text-3xl font-bold text-green-700">Available {segment ? segment.replace(/-/g,' ') : policyType} Policies</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-green-100">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : policies.length === 0 ? (
            <p className="text-center text-gray-600">No policies found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-green-100 text-green-800">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Premium</th>
                    <th className="p-3">Coverage</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map(p => (
                    <tr key={p.id} className="border-b hover:bg-green-50">
                      <td className="p-3">{p.policyName}</td>
                      <td className="p-3">₹{p.premiumAmount}</td>
                      <td className="p-3">₹{p.coverageAmount}</td>
                      <td className="p-3">{p.duration}</td>
                      <td className="p-3">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
