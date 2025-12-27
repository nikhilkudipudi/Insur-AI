import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { Brain, Users, FileText, AlertTriangle } from "lucide-react";
import { getAnalytics } from "../../api/authService";

export default function AIInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAnalytics();
      if (res.ok) {
        setData(res.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!data) return <div>Error loading data</div>;

  // Prepare data for charts
  const claimsData = Object.keys(data.claimsByStatus || {}).map(key => ({
    name: key,
    value: data.claimsByStatus[key]
  }));

  const policyData = Object.keys(data.applicationsByPolicyType || {}).map(key => ({
    name: key,
    value: data.applicationsByPolicyType[key]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Brain className="w-10 h-10 text-indigo-600" />
            QuickView Analytics
          </h1>
          <p className="text-gray-600 text-lg">Real-time overview of platform performance</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Customers</p>
                <h3 className="text-3xl font-bold text-gray-900">{data.totalCustomers}</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Applications</p>
                <h3 className="text-3xl font-bold text-gray-900">{data.totalApplications}</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-pink-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Claims</p>
                <h3 className="text-3xl font-bold text-gray-900">{data.totalClaims}</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Claims Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">Claims Status Distribution</h3>
            <div className="w-full h-80" style={{ minHeight: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={claimsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {claimsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Policy Popularity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">Popular Policy Types</h3>
            <div className="w-full h-80" style={{ minHeight: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={policyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {policyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
