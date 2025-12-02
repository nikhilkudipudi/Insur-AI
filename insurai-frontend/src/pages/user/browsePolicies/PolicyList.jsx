import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle } from "lucide-react";

export default function PolicyList() {
  const { policyType } = useParams(); // Gets 'health-insurance', 'life-insurance', etc.
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to map policy type slug to display name
  const getPolicyName = (slug) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Maps URL slugs to canonical policy types for the backend API
  const mapSlugToType = (slug) => {
    const typeMap = {
      'health-insurance': 'HEALTH',
      'life-insurance': 'LIFE',
      'property-casualty': 'PROPERTY',
      'commercial-insurance': 'COMMERCIAL',
    };
    return typeMap[slug] || slug.toUpperCase();
  };

  useEffect(() => {
    if (!policyType) return;

    const fetchPolicies = async () => {
      setLoading(true);
      setError(null);
      try {
        // Map slug to canonical API type (e.g., 'health-insurance' -> 'HEALTH')
        const apiType = mapSlugToType(policyType);

        // This URL maps directly to your backend controller path: /api/user/browse-policies/{policyType}
        const response = await fetch(`http://localhost:8080/api/user/browse-policies/${apiType}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch policies: ${response.statusText}`);
        }

        const data = await response.json();
        setPolicies(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [policyType]);

  const PolicyCard = ({ policy }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
    >
      <h3 className="text-xl font-bold text-slate-800 mb-2">{policy.policyName}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{policy.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>Coverage: ₹{policy.coverageAmount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <Clock className="w-4 h-4" />
          <span>Duration: {policy.duration} Years</span>
        </div>
        <div className="flex items-center gap-2 text-purple-600">
          <DollarSign className="w-4 h-4" />
          <span>Premium: ₹{policy.premiumAmount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-amber-600">
          <span>Status: {policy.status}</span>
        </div>
      </div>

      <button
        onClick={() => { /* In a real app, this would open a detailed modal or navigation */ }}
        className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        View Details & Apply
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/user/browse-policies')}
          className="mb-6 text-green-600 hover:text-green-800 transition font-medium"
        >
          ← Back to Categories
        </button>

        <h1 className="text-4xl font-bold text-slate-800 mb-6">
          {getPolicyName(policyType)} Plans
        </h1>

        {loading && <p className="text-gray-600">Loading active policies...</p>}
        {error && <p className="text-red-500">Error loading data: {error}</p>}

        {!loading && policies.length === 0 && (
          <div className="p-8 bg-yellow-50 rounded-xl border border-yellow-200 text-center text-yellow-800">
            No active policies found for this category at the moment.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map(policy => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      </div>
    </div>
  );
}