import { useState } from "react";
import { CheckCircle, Trash2, User, FileText, Shield, X } from "lucide-react";

export default function ViewCustomers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "9876543210",
      status: "Pending",
      policies: [
        { id: 1, name: "Health Insurance", type: "Health", start: "2024-05-12" },
        { id: 2, name: "Life Protect Plan", type: "Life", start: "2023-09-20" },
      ],
      claims: [
        { id: 1, claimType: "Hospitalization", amount: "₹50,000", status: "Approved" },
      ],
    },
    {
      id: 2,
      name: "Anjali Verma",
      email: "anjali.verma@email.com",
      phone: "9898989898",
      status: "Pending",
      policies: [
        { id: 1, name: "Property Shield", type: "Property", start: "2023-07-01" },
      ],
      claims: [
        { id: 1, claimType: "Fire Damage", amount: "₹1,20,000", status: "Under Review" },
      ],
    },
  ]);

  // Handle Accept
  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Accepted" } : req
      )
    );
  };

  // Handle Delete
  const handleDelete = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-10">
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">
        Customer Requests & Management
      </h1>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Table Header */}
        <div className="grid grid-cols-5 font-semibold text-gray-600 border-b pb-3 mb-4 text-center">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* Requests */}
        {requests.map((req) => (
          <div
            key={req.id}
            className="grid grid-cols-5 items-center text-center py-3 border-b hover:bg-green-50 transition-all"
          >
            <span className="font-medium">{req.name}</span>
            <span>{req.email}</span>
            <span>{req.phone}</span>
            <span
              className={`font-semibold ${
                req.status === "Accepted"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {req.status}
            </span>
            <div className="flex justify-center gap-3">
              {req.status === "Pending" && (
                <button
                  onClick={() => handleAccept(req.id)}
                  className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  title="Accept"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setSelectedCustomer(req)}
                className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                title="View Details"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(req.id)}
                className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No customer requests found.</p>
        )}
      </div>

      {/* Customer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-700">
                {selectedCustomer.name}'s Profile
              </h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p><span className="font-semibold">Email:</span> {selectedCustomer.email}</p>
              <p><span className="font-semibold">Phone:</span> {selectedCustomer.phone}</p>
              <p><span className="font-semibold">Status:</span> {selectedCustomer.status}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-green-700 mb-2">
                <Shield className="w-5 h-5" /> Policies
              </h3>
              <ul className="space-y-2">
                {selectedCustomer.policies.map((p) => (
                  <li key={p.id} className="border rounded-lg p-3 bg-green-50">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-gray-600">
                      Type: {p.type} • Started: {p.start}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-green-700 mb-2">
                <FileText className="w-5 h-5" /> Claims
              </h3>
              <ul className="space-y-2">
                {selectedCustomer.claims.map((c) => (
                  <li key={c.id} className="border rounded-lg p-3 bg-green-50">
                    <p className="font-semibold">{c.claimType}</p>
                    <p className="text-sm text-gray-600">
                      Amount: {c.amount} • Status: {c.status}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
