// src/components/user/PolicyListContent.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle, ArrowLeft } from "lucide-react";

// Helper function to format the policy type slug into a readable title
const getPolicyName = (slug) => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const PolicyCard = ({ policy }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] cursor-pointer"
  >
    <h3 className="text-xl font-bold text-slate-800 mb-2">{policy.policyName}</h3>
    <p className="text-gray-600 mb-4 line-clamp-2">{policy.description}</p>

    <div className="space-y-2 mb-4 text-sm">
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">Coverage: ₹{policy.coverageAmount.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2 text-blue-600">
        <Clock className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">Duration: {policy.duration} {policy.duration > 1 ? 'Years' : 'Year'}</span>
      </div>
      <div className="flex items-center gap-2 text-purple-600">
        <DollarSign className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">Premium: ₹{policy.premiumAmount.toLocaleString()}</span>
      </div>
    </div>

    <button
      onClick={(e) => { e.stopPropagation(); /* Logic to open details modal or page */ }}
      className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
    >
      View Details & Apply
    </button>
  </motion.div>
);


export default function PolicyListContent({ policySlug }) {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchPolicies = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiType = mapSlugToType(policySlug);
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/user/browse-policies/${apiType}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

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
  }, [policySlug]);


  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/user/browse-policies')}
          className="mb-6 inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </button>

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          {getPolicyName(policySlug)} Plans
        </h1>

        {loading && <p className="text-gray-600 text-lg">Loading active policies...</p>}
        {error && <p className="text-red-500 text-lg">Error loading data: {error}</p>}

        {!loading && policies.length === 0 && (
          <div className="p-10 bg-yellow-50 rounded-xl border-2 border-yellow-200 text-center text-yellow-800 shadow-md">
            <p className="text-xl font-semibold">No active policies found.</p>
            <p className="mt-2">Please check back later or explore another category.</p>
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