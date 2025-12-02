import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle,
    Shield,
    Calendar,
    DollarSign,
    FileText,
    Award,
    TrendingUp,
    Info
} from "lucide-react";
import { getUserPoliciesByType, applyForPolicy } from "../../../api/authService";

export default function ViewApplyPolicy() {
    const { category, policyId } = useParams();
    const navigate = useNavigate();
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const fetchPolicy = async () => {
            setLoading(true);

            console.log('=== FETCH POLICY DEBUG ===');
            console.log('Category from URL:', category);
            console.log('Policy ID from URL:', policyId);

            const res = await getUserPoliciesByType(category);
            console.log('API Response:', res);

            if (res.ok && Array.isArray(res.data)) {
                console.log('Number of policies returned:', res.data.length);
                console.log('All policies:', res.data);

                const policyIdNum = Number(policyId);
                const found = res.data.find(p => p.id === policyIdNum);

                console.log('Looking for policy ID:', policyIdNum);
                console.log('Policy found:', found);
                setPolicy(found);
            } else {
                console.log('API call failed or data is not an array');
            }
            setLoading(false);
        };
        fetchPolicy();
    }, [category, policyId]);

    const handleApply = async () => {
        if (!policy) return;
        if (!confirm(`Are you sure you want to apply for ${policy.policyName}?`)) return;

        setApplying(true);
        const res = await applyForPolicy(policy.id);
        setApplying(false);

        if (res.ok) {
            alert("Application submitted successfully! You can track it in your dashboard.");
            navigate("/user/browse-policies");
        } else {
            alert("Failed to apply: " + (res.data || "Unknown error"));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading policy details...</p>
                </div>
            </div>
        );
    }

    if (!policy) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-6xl mb-4">⚠️</div>
                    <p className="text-red-600 text-xl font-bold">Policy not found</p>
                    <p className="text-gray-600 mt-2">Check the browser console for details</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 text-green-600 hover:text-green-800 font-medium"
                    >
                        ← Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-green-700 hover:text-green-900 transition font-semibold group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Policies
                </motion.button>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                >
                    {/* Header Section with Gradient */}
                    <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Award className="w-6 h-6" />
                                <span className="text-green-100 font-medium uppercase tracking-wider text-sm">
                                    {policy.policyType} Insurance
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
                                {policy.policyName}
                            </h1>
                            <p className="text-green-50 text-lg max-w-2xl">
                                Comprehensive coverage designed to protect what matters most to you
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 space-y-10">
                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Premium Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200 hover:border-green-300 transition-all hover:shadow-lg group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="bg-green-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                        <DollarSign className="w-6 h-6 text-white" />
                                    </div>
                                    <TrendingUp className="w-5 h-5 text-green-600 opacity-50" />
                                </div>
                                <div className="text-sm font-semibold text-green-700 mb-1">Annual Premium</div>
                                <div className="text-3xl font-bold text-green-900">
                                    ₹{policy.premiumAmount?.toLocaleString()}
                                </div>
                                <div className="text-xs text-green-600 mt-1">per year</div>
                            </motion.div>

                            {/* Coverage Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-all hover:shadow-lg group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="bg-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <Info className="w-5 h-5 text-blue-600 opacity-50" />
                                </div>
                                <div className="text-sm font-semibold text-blue-700 mb-1">Coverage Amount</div>
                                <div className="text-3xl font-bold text-blue-900">
                                    ₹{policy.coverageAmount?.toLocaleString()}
                                </div>
                                <div className="text-xs text-blue-600 mt-1">total protection</div>
                            </motion.div>

                            {/* Duration Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-300 transition-all hover:shadow-lg group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="bg-purple-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    <Award className="w-5 h-5 text-purple-600 opacity-50" />
                                </div>
                                <div className="text-sm font-semibold text-purple-700 mb-1">Policy Duration</div>
                                <div className="text-3xl font-bold text-purple-900">
                                    {policy.duration}
                                </div>
                                <div className="text-xs text-purple-600 mt-1">years coverage</div>
                            </motion.div>
                        </div>

                        {/* Description Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-green-600 p-2 rounded-lg">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Policy Description</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {policy.description || "No description available for this policy."}
                            </p>
                        </motion.div>

                        {/* Eligibility Criteria Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-green-600 p-2 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Eligibility Criteria</h2>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {policy.criteria || "Standard eligibility rules apply. Please contact our support team for detailed information."}
                                </p>
                            </div>
                        </motion.div>

                        {/* Policy Type Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-between p-6 bg-blue-50 rounded-2xl border border-blue-200"
                        >
                            <div className="flex items-center gap-3">
                                <Award className="w-6 h-6 text-blue-600" />
                                <div>
                                    <div className="text-sm text-blue-600 font-medium">Policy Category</div>
                                    <div className="text-lg font-bold text-blue-900">{policy.policyType} Insurance</div>
                                </div>
                            </div>
                            <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                Active
                            </div>
                        </motion.div>

                        {/* Apply Button Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="pt-8 border-t-2 border-gray-200"
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-center sm:text-left">
                                    <p className="text-gray-600 text-sm mb-1">Ready to get protected?</p>
                                    <p className="text-gray-800 font-semibold text-lg">Apply for this policy today</p>
                                </div>
                                <button
                                    onClick={handleApply}
                                    disabled={applying}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 group"
                                >
                                    {applying ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Submitting Application...
                                        </>
                                    ) : (
                                        <>
                                            Apply for Policy
                                            <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Additional Info Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center text-gray-500 text-sm"
                >
                    <p>Have questions? Contact our support team for assistance.</p>
                </motion.div>
            </div>
        </div>
    );
}
