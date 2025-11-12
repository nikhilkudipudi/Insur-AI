import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, FileText, Filter } from "lucide-react";

export default function Claims() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Pending", "Approved", "Rejected"];

  const claimsData = [
    {
      id: 1,
      customer: "Ravi Kumar",
      policyType: "Health Insurance",
      claimAmount: "₹1,20,000",
      date: "2025-10-29",
      status: "Pending",
      reason: "Hospitalization for surgery",
    },
    {
      id: 2,
      customer: "Priya Sharma",
      policyType: "Life Insurance",
      claimAmount: "₹5,00,000",
      date: "2025-10-25",
      status: "Approved",
      reason: "Death benefit claim",
    },
    {
      id: 3,
      customer: "Amit Verma",
      policyType: "Property & Casualty",
      claimAmount: "₹3,45,000",
      date: "2025-10-18",
      status: "Rejected",
      reason: "Fire damage not covered under plan",
    },
    {
      id: 4,
      customer: "Sneha Patel",
      policyType: "Commercial Insurance",
      claimAmount: "₹2,75,000",
      date: "2025-10-30",
      status: "Pending",
      reason: "Equipment loss in transit",
    },
  ];

  const filteredClaims =
    selectedFilter === "All"
      ? claimsData
      : claimsData.filter((claim) => claim.status === selectedFilter);

  const handleApprove = (name) => {
    alert(`✅ Claim from ${name} has been approved.`);
  };

  const handleReject = (name) => {
    alert(`❌ Claim from ${name} has been rejected.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-green-800 mb-6 md:mb-0 flex items-center gap-3">
          <FileText className="w-8 h-8 text-green-600" />
          Claims & Requests
        </h1>

        {/* Filter Dropdown */}
        <div className="relative flex items-center bg-white/70 backdrop-blur-md border border-green-300 px-4 py-2 rounded-lg shadow-md">
          <Filter className="w-5 h-5 text-green-600 mr-2" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-transparent outline-none text-green-700 font-medium cursor-pointer"
          >
            {filters.map((f, idx) => (
              <option key={idx} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl shadow-lg hover:scale-[1.03] transition-all">
          <h4 className="font-semibold mb-2">Pending Claims</h4>
          <p className="text-3xl font-bold">
            {claimsData.filter((c) => c.status === "Pending").length}
          </p>
        </div>
        <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:scale-[1.03] transition-all">
          <h4 className="font-semibold mb-2">Approved Claims</h4>
          <p className="text-3xl font-bold">
            {claimsData.filter((c) => c.status === "Approved").length}
          </p>
        </div>
        <div className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:scale-[1.03] transition-all">
          <h4 className="font-semibold mb-2">Rejected Claims</h4>
          <p className="text-3xl font-bold">
            {claimsData.filter((c) => c.status === "Rejected").length}
          </p>
        </div>
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:scale-[1.03] transition-all">
          <h4 className="font-semibold mb-2">Total Claims</h4>
          <p className="text-3xl font-bold">{claimsData.length}</p>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-green-600" />
          Claim Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead>
              <tr className="bg-green-100 text-green-800 uppercase text-sm font-semibold">
                <th className="py-3 px-6">Customer Name</th>
                <th className="py-3 px-6">Policy Type</th>
                <th className="py-3 px-6">Claim Amount</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Reason</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim) => (
                <tr
                  key={claim.id}
                  className="border-b hover:bg-green-50 transition-colors duration-200"
                >
                  <td className="py-3 px-6 font-medium">{claim.customer}</td>
                  <td className="py-3 px-6">{claim.policyType}</td>
                  <td className="py-3 px-6 font-semibold text-green-700">
                    {claim.claimAmount}
                  </td>
                  <td className="py-3 px-6">{claim.date}</td>
                  <td className="py-3 px-6">{claim.reason}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        claim.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : claim.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 flex justify-center gap-3">
                    <button
                      onClick={() => handleApprove(claim.customer)}
                      disabled={claim.status !== "Pending"}
                      className={`${
                        claim.status === "Pending"
                          ? "bg-green-100 hover:bg-green-200 text-green-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      } px-3 py-2 rounded-lg flex items-center gap-1 transition-all`}
                    >
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(claim.customer)}
                      disabled={claim.status !== "Pending"}
                      className={`${
                        claim.status === "Pending"
                          ? "bg-red-100 hover:bg-red-200 text-red-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      } px-3 py-2 rounded-lg flex items-center gap-1 transition-all`}
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
