import { Eye } from "lucide-react";

export default function ViewPolicies() {
  const policies = [
    {
      id: 1,
      name: "InsurAI Life Secure Plan",
      type: "Life Insurance",
      term: "15 Years",
      premium: "₹1,500/month",
      coverage: "₹10,00,000",
    },
    {
      id: 2,
      name: "Health Protect Elite",
      type: "Health Insurance",
      term: "10 Years",
      premium: "₹1,200/month",
      coverage: "₹5,00,000",
    },
    {
      id: 3,
      name: "Property Shield Max",
      type: "Property & Casualty",
      term: "20 Years",
      premium: "₹1,800/month",
      coverage: "₹20,00,000",
    },
    {
      id: 4,
      name: "Commercial SafeGuard Pro",
      type: "Commercial Insurance",
      term: "10 Years",
      premium: "₹2,500/month",
      coverage: "₹25,00,000",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-10">
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">
        View All Insurance Policies
      </h1>

      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6 text-green-700">
          <Eye className="w-6 h-6" />
          <h2 className="text-2xl font-semibold">All Active Policies</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="p-4 font-semibold">Policy Name</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Term</th>
                <th className="p-4 font-semibold">Premium</th>
                <th className="p-4 font-semibold">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr
                  key={policy.id}
                  className="border-b hover:bg-green-50 transition-all"
                >
                  <td className="p-4">{policy.name}</td>
                  <td className="p-4">{policy.type}</td>
                  <td className="p-4">{policy.term}</td>
                  <td className="p-4">{policy.premium}</td>
                  <td className="p-4">{policy.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
