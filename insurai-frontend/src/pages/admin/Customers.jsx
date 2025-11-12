import { useState } from "react";
import { Users, CheckCircle, XCircle, ChevronDown, ShieldCheck } from "lucide-react";

export default function Customers() {
  const [selectedPolicy, setSelectedPolicy] = useState("All Policies");

  const policies = ["All Policies", "Health Insurance", "Life Insurance", "Property & Casualty", "Commercial Insurance"];

  const stats = [
    { title: "Total Customers", value: 842, color: "from-green-500 to-green-600" },
    { title: "Active Policies", value: 731, color: "from-blue-500 to-blue-600" },
    { title: "Pending Requests", value: 67, color: "from-yellow-400 to-yellow-500" },
    { title: "Cancelled Policies", value: 12, color: "from-red-500 to-red-600" },
  ];

  const customerRequests = [
    { id: 1, name: "Ravi Kumar", policy: "Health Insurance", date: "2025-11-01", status: "Pending" },
    { id: 2, name: "Priya Sharma", policy: "Life Insurance", date: "2025-10-28", status: "Pending" },
    { id: 3, name: "Arjun Patel", policy: "Property & Casualty", date: "2025-10-25", status: "Approved" },
    { id: 4, name: "Meera Joshi", policy: "Commercial Insurance", date: "2025-10-21", status: "Rejected" },
  ];

  const handleApprove = (name) => {
    alert(`✅ Request from ${name} approved successfully!`);
  };

  const handleReject = (name) => {
    alert(`❌ Request from ${name} has been rejected.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-green-800 mb-6 md:mb-0">Customer Management</h1>

        {/* Policy Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedPolicy}
            onChange={(e) => setSelectedPolicy(e.target.value)}
            className="appearance-none bg-white/80 backdrop-blur-md border border-green-300 text-green-800 px-4 py-2 pr-8 rounded-lg shadow-md focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          >
            {policies.map((p, index) => (
              <option key={index} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3.5 text-green-600 pointer-events-none" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-6 bg-gradient-to-r ${stat.color} text-white rounded-xl shadow-lg hover:scale-[1.03] transition-all duration-300`}
          >
            <h4 className="font-semibold mb-2">{stat.title}</h4>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Customer Requests Section */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-600" /> Customer Requests
          </h2>
          <p className="text-gray-500 text-sm">Manage policy approval requests from customers</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead>
              <tr className="bg-green-100 text-green-800 uppercase text-sm font-semibold">
                <th className="py-3 px-6">Customer Name</th>
                <th className="py-3 px-6">Policy Type</th>
                <th className="py-3 px-6">Request Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerRequests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b hover:bg-green-50 transition-colors duration-200"
                >
                  <td className="py-3 px-6 font-medium">{req.name}</td>
                  <td className="py-3 px-6">{req.policy}</td>
                  <td className="py-3 px-6">{req.date}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 flex justify-center gap-3">
                    <button
                      onClick={() => handleApprove(req.name)}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg flex items-center gap-1 transition-all"
                    >
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.name)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg flex items-center gap-1 transition-all"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
