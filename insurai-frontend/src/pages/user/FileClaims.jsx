import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Calendar, DollarSign, Send, AlertCircle } from "lucide-react";
import { getMyApplications, fileClaim } from "../../api/authService";

export default function FileClaims() {
    const navigate = useNavigate();
    const [myPolicies, setMyPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        policyId: "",
        incidentDate: "",
        incidentDescription: "",
        claimAmount: ""
    });

    useEffect(() => {
        const fetchPolicies = async () => {
            const res = await getMyApplications();
            if (res.ok && Array.isArray(res.data)) {
                // Only show approved policies
                const approvedPolicies = res.data.filter(app => app.status === "APPROVED");
                setMyPolicies(approvedPolicies);
            }
            setLoading(false);
        };
        fetchPolicies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.policyId || !formData.incidentDate || !formData.claimAmount) {
            alert("Please fill in all required fields");
            return;
        }

        setSubmitting(true);
        const res = await fileClaim(formData);
        setSubmitting(false);

        if (res.ok) {
            alert("Claim filed successfully!");
            navigate("/user/track-claims");
        } else {
            alert("Failed to file claim: " + (res.data || "Unknown error"));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
            </div>
        );
    }

    if (myPolicies.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md"
                >
                    <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Approved Policies</h2>
                    <p className="text-gray-600 mb-6">You need an approved policy to file a claim.</p>
                    <button
                        onClick={() => navigate("/user/browse-policies")}
                        className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                        Browse Policies
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">File a Claim</h1>
                    <p className="text-gray-600 text-lg">Submit your insurance claim details</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
                >
                    {/* Policy Selection */}
                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <FileText className="w-5 h-5 text-green-600" />
                            Select Policy *
                        </label>
                        <select
                            value={formData.policyId}
                            onChange={(e) => setFormData({ ...formData, policyId: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                            required
                        >
                            <option value="">Choose a policy...</option>
                            {myPolicies.map(app => (
                                <option key={app.id} value={app.policy.id}>
                                    {app.policy.policyName} - {app.policy.policyType}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Incident Date */}
                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            Incident Date *
                        </label>
                        <input
                            type="date"
                            value={formData.incidentDate}
                            onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Claim Amount */}
                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <DollarSign className="w-5 h-5 text-purple-600" />
                            Claim Amount (₹) *
                        </label>
                        <input
                            type="number"
                            value={formData.claimAmount}
                            onChange={(e) => setFormData({ ...formData, claimAmount: e.target.value })}
                            min="1"
                            step="0.01"
                            placeholder="Enter amount"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Incident Description */}
                    <div className="mb-8">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <FileText className="w-5 h-5 text-gray-600" />
                            Incident Description
                        </label>
                        <textarea
                            value={formData.incidentDescription}
                            onChange={(e) => setFormData({ ...formData, incidentDescription: e.target.value })}
                            rows="4"
                            placeholder="Describe what happened..."
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    File Claim
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
