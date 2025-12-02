import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FileText,
    Calendar,
    DollarSign,
    CheckCircle,
    Clock,
    XCircle,
    Shield,
    Plus
} from "lucide-react";
import { getMyClaims } from "../../api/authService";

export default function TrackClaims() {
    const navigate = useNavigate();
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClaims = async () => {
            const res = await getMyClaims();
            if (res.ok && Array.isArray(res.data)) {
                setClaims(res.data);
            }
            setLoading(false);
        };
        fetchClaims();
    }, []);

    const getStatusBadge = (status) => {
        const config = {
            PENDING: {
                bg: "bg-yellow-100",
                text: "text-yellow-800",
                border: "border-yellow-300",
                icon: <Clock className="w-4 h-4" />
            },
            APPROVED: {
                bg: "bg-green-100",
                text: "text-green-800",
                border: "border-green-300",
                icon: <CheckCircle className="w-4 h-4" />
            },
            REJECTED: {
                bg: "bg-red-100",
                text: "text-red-800",
                border: "border-red-300",
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading your claims...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex items-center justify-between"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Claims</h1>
                        <p className="text-gray-600 text-lg">Monitor the status of your insurance claims</p>
                    </div>
                    <button
                        onClick={() => navigate("/user/file-claims")}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        File New Claim
                    </button>
                </motion.div>

                {claims.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100"
                    >
                        <div className="text-gray-400 text-6xl mb-4">📋</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Claims Filed</h2>
                        <p className="text-gray-600 mb-6">You haven't filed any claims yet.</p>
                        <button
                            onClick={() => navigate("/user/file-claims")}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            File Your First Claim
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {claims.map((claim, index) => (
                            <motion.div
                                key={claim.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Shield className="w-5 h-5 text-green-600" />
                                                <h3 className="text-2xl font-bold text-gray-900">{claim.policy.policyName}</h3>
                                            </div>
                                            <p className="text-gray-600">{claim.policy.policyType} Insurance</p>
                                        </div>
                                        {getStatusBadge(claim.status)}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                                            <div className="flex items-center gap-2 text-purple-700 mb-1 text-sm font-semibold">
                                                <DollarSign className="w-4 h-4" />
                                                Claim Amount
                                            </div>
                                            <div className="text-xl font-bold text-purple-900">
                                                ₹{claim.claimAmount?.toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                            <div className="flex items-center gap-2 text-blue-700 mb-1 text-sm font-semibold">
                                                <Calendar className="w-4 h-4" />
                                                Incident Date
                                            </div>
                                            <div className="text-lg font-bold text-blue-900">
                                                {new Date(claim.incidentDate).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                            <div className="flex items-center gap-2 text-gray-700 mb-1 text-sm font-semibold">
                                                <Calendar className="w-4 h-4" />
                                                Submitted On
                                            </div>
                                            <div className="text-lg font-bold text-gray-900">
                                                {new Date(claim.submittedDate).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {new Date(claim.submittedDate).toLocaleTimeString()}
                                            </div>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                                            <div className="flex items-center gap-2 text-green-700 mb-1 text-sm font-semibold">
                                                <Shield className="w-4 h-4" />
                                                Coverage
                                            </div>
                                            <div className="text-lg font-bold text-green-900">
                                                ₹{claim.policy.coverageAmount?.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-green-600">max coverage</div>
                                        </div>
                                    </div>

                                    {claim.incidentDescription && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileText className="w-4 h-4 text-gray-600" />
                                                <span className="font-semibold text-gray-700">Incident Description</span>
                                            </div>
                                            <p className="text-gray-700 text-sm">{claim.incidentDescription}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
