// src/pages/admin/ManagePolicies/ViewPolicies.jsx
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getPoliciesByType } from "../../../api/authService";
import { usePolicyType } from "../../../hooks/usePolicyType";

export default function ViewPolicies() {
  const { policyType, segment } = usePolicyType();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className={`min-h-screen p-10 bg-gradient-to-br ${theme.lightBg}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8 text-center">
          <Eye className={`w-10 h-10 ${theme.icon}`} />
          <h1 className={`text-4xl font-bold ${theme.text}`}>Available {policyType} Policies</h1>
        </div>

        <div className={`bg-white p-6 rounded-2xl shadow border ${theme.border}`}>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : policies.length === 0 ? (
            <p className="text-center text-gray-600">No policies found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className={`${theme.headerBg} ${theme.headerText}`}>
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Premium</th>
                    <th className="p-3">Coverage</th>
                    <th className="p-3">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map(p => (
                    <tr key={p.id} className={`border-b ${theme.hover}`}>
                      <td className="p-3">{p.policyName}</td>
                      <td className="p-3">₹{p.premiumAmount}</td>
                      <td className="p-3">₹{p.coverageAmount}</td>
                      <td className="p-3">{p.duration}</td>
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
