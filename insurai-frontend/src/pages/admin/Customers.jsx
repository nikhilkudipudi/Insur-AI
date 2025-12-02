import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CheckCircle,
  XCircle,
  Shield,
  Mail,
  Calendar,
  FileText,
  User,
  Phone,
  MapPin,
  DollarSign
} from "lucide-react";
import { getAllApplications, updateApplicationStatus } from "../../api/authService";

export default function Customers() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const res = await getAllApplications();
    if (res.ok && Array.isArray(res.data)) {
      setRequests(res.data);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (appId, newStatus) => {
    if (!confirm(`Are you sure you want to ${newStatus.toLowerCase()} this application?`)) return;

    const res = await updateApplicationStatus(appId, newStatus);
    if (res.ok) {
      alert(`Application ${newStatus.toLowerCase()} successfully!`);
      fetchApplications();
    } else {
      alert("Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      PENDING: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-300",
        icon: <Calendar className="w-4 h-4" />
      },
      APPROVED: {
        bg: "bg-emerald-100",
        text: "text-emerald-800",
        border: "border-emerald-300",
        icon: <CheckCircle className="w-4 h-4" />
      },
      REJECTED: {
        bg: "bg-rose-100",
        text: "text-rose-800",
        border: "border-rose-300",
        icon: <XCircle className="w-4 h-4" />
      }
    };

    const statusConfig = config[status] || config.PENDING;

    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} font-semibold text-sm`}>
        {statusConfig.icon}
        {status}
      </div>
    );
  };

  const getPolicyTypeColor = (type) => {
    const colors = {
      HEALTH: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
      LIFE: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      PROPERTY: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
      COMMERCIAL: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" }
    };
    return colors[type] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
  };

  const filteredRequests = filter === "ALL"
    ? requests
    : requests.filter(req => req.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading customer applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-10 h-10 text-cyan-600" />
            <h1 className="text-4xl font-bold text-gray-900">Customer Management</h1>
          </div>
          <p className="text-gray-600 text-lg">Review and manage policy applications from customers</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold opacity-90">Total Applications</span>
              <FileText className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{requests.length}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold opacity-90">Approved</span>
              <CheckCircle className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{requests.filter(r => r.status === "APPROVED").length}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold opacity-90">Pending Review</span>
              <Calendar className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{requests.filter(r => r.status === "PENDING").length}</p>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-red-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold opacity-90">Rejected</span>
              <XCircle className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{requests.filter(r => r.status === "REJECTED").length}</p>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex gap-4 bg-white p-2 rounded-2xl shadow-lg border border-gray-100"
        >
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${filter === status
                  ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {status}
              <span className="ml-2 text-sm">
                ({status === "ALL" ? requests.length : requests.filter(r => r.status === status).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Applications List */}
        {filteredRequests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100"
          >
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Applications Found</h2>
            <p className="text-gray-600">No customer applications match the selected filter.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredRequests.map((req, index) => {
              const policyColor = getPolicyTypeColor(req.policy?.policyType);

              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-cyan-600" />
                          <h3 className="text-2xl font-bold text-gray-900">{req.policy?.policyName || "Unknown Policy"}</h3>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${policyColor.bg} ${policyColor.text} ${policyColor.border} text-sm font-semibold`}>
                          {req.policy?.policyType || "Unknown"} Insurance
                        </div>
                      </div>
                      {getStatusBadge(req.status)}
                    </div>

                    {/* Customer Info */}
                    <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-4 rounded-xl mb-6 border border-cyan-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-cyan-600" />
                          <span className="text-sm text-gray-600">Customer:</span>
                          <span className="font-semibold text-gray-900">{req.user?.fullName || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-cyan-600" />
                          <span className="text-sm text-gray-600">Email:</span>
                          <span className="font-semibold text-gray-900">{req.user?.email || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-2 text-blue-700 mb-1 text-sm font-semibold">
                          <Calendar className="w-4 h-4" />
                          Application Date
                        </div>
                        <div className="text-lg font-bold text-blue-900">
                          {req.applicationDate || "N/A"}
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <div className="flex items-center gap-2 text-purple-700 mb-1 text-sm font-semibold">
                          <DollarSign className="w-4 h-4" />
                          Premium Amount
                        </div>
                        <div className="text-lg font-bold text-purple-900">
                          ₹{req.policy?.premiumAmount?.toLocaleString() || "0"}
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center gap-2 text-green-700 mb-1 text-sm font-semibold">
                          <Shield className="w-4 h-4" />
                          Coverage
                        </div>
                        <div className="text-lg font-bold text-green-900">
                          ₹{req.policy?.coverageAmount?.toLocaleString() || "0"}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {req.status === "PENDING" && (
                      <div className="flex gap-4 pt-4 border-t-2 border-gray-100">
                        <button
                          onClick={() => handleStatusUpdate(req.id, "APPROVED")}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Approve Application
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(req.id, "REJECTED")}
                          className="flex-1 bg-gradient-to-r from-rose-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-5 h-5" />
                          Reject Application
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
