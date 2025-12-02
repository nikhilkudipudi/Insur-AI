// src/components/user/PolicyListContent.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle, ArrowLeft } from "lucide-react";

// Helper function to format the policy type slug into a readable title
const getPolicyName = (slug) => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Get theme colors based on policy type
const getThemeColors = (policySlug) => {
  const themes = {
    'health-insurance': {
      primary: '#FFDE21',
      hover: '#E6C71F',
      text: '#B8860B',
      light: '#FFF9E6'
    },
    'life-insurance': {
      primary: '#3B82F6',
      hover: '#2563EB',
      text: '#1E40AF',
      light: '#DBEAFE'
    },
    'property-casualty': {
      primary: '#F59E0B',
      hover: '#D97706',
      text: '#92400E',
      light: '#FEF3C7'
    },
    'commercial-insurance': {
      primary: '#8B5CF6',
      hover: '#7C3AED',
      text: '#5B21B6',
      light: '#EDE9FE'
    }
  };

  return themes[policySlug] || {
    primary: '#10B981',
    hover: '#059669',
    text: '#047857',
    light: '#D1FAE5'
  };
};

const PolicyCard = ({ policy, policySlug }) => {
  const navigate = useNavigate();
  const theme = getThemeColors(policySlug);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl cursor-pointer"
      onClick={() => navigate(`/user/browse-policies/${policySlug}/view-apply/${policy.id}`)}
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
          <span className="truncate">Duration: {policy.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-purple-600">
          <DollarSign className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Premium: ₹{policy.premiumAmount.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/user/browse-policies/${policySlug}/view-apply/${policy.id}`);
        }}
        className="mt-3 w-full text-white py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
        style={{ backgroundColor: theme.primary }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.primary;
        }}
      >
        View Details & Apply
      </button>
    </motion.div>
  );
};


export default function PolicyListContent({ policySlug }) {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = getThemeColors(policySlug);

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
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPolicies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching policies:", err);
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
        <motion.button
          onClick={() => navigate('/user/browse-policies')}
          className="mb-6 inline-flex items-center gap-2 transition-all font-medium hover:gap-3"
          style={{ color: theme.text }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </motion.button>

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          {getPolicyName(policySlug)} Plans
        </h1>

        {loading && <p className="text-gray-600 text-lg">Loading active policies...</p>}
        {error && <p className="text-red-500 text-lg">Error loading data: {error}</p>}

        {!loading && policies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-xl border-2 text-center shadow-md"
            style={{
              backgroundColor: theme.light,
              borderColor: theme.primary,
              color: theme.text
            }}
          >
            <p className="text-xl font-semibold">No active policies found.</p>
            <p className="mt-2">Please check back later or explore another category.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map(policy => (
            <PolicyCard key={policy.id} policy={policy} policySlug={policySlug} />
          ))}
        </div>
      </div>
    </div>
  );
}