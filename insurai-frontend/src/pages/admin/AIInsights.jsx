// src/pages/admin/AIInsights.jsx
import { useEffect, useMemo, useState } from "react";
import {
  Brain, ActivitySquare, AlertTriangle, TrendingUp, Download,
  Filter, RefreshCw, BarChart3, Users, ShieldAlert, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#16a34a", "#22c55e", "#84cc16", "#06b6d4", "#a78bfa", "#f59e0b"];

export default function AIInsights() {
  // ----- Filters / state -----
  const [range, setRange] = useState("90d");
  const [segment, setSegment] = useState("All");
  const [loading, setLoading] = useState(false);
  const [kpis, setKpis] = useState({
    gwp: 12.8, growth: 14.2, lossRatio: 62.3, claimTAT: 2.4,
  }); // mock defaults
  const [tsRevenue, setTsRevenue] = useState([]);
  const [policyMix, setPolicyMix] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [churnRisk, setChurnRisk] = useState([]);
  const [fraudRisk, setFraudRisk] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // ----- Fetch mock (swap with real API) -----
  const fetchAll = async () => {
    setLoading(true);
    try {
      // TODO: replace with your Spring endpoints (see below)
      // const res = await fetch(`/api/insights/kpis?range=${range}&segment=${segment}`, { headers: { Authorization: `Bearer ${token}` }});
      // setKpis(await res.json())

      // MOCK DATA (show well even offline)
      setKpis({ gwp: 14.1, growth: 16.9, lossRatio: 58.4, claimTAT: 2.1 });
      setTsRevenue([
        { date: "Jul", revenue: 2.1, claims: 0.7 },
        { date: "Aug", revenue: 2.6, claims: 0.8 },
        { date: "Sep", revenue: 3.0, claims: 0.9 },
        { date: "Oct", revenue: 3.4, claims: 1.0 },
        { date: "Nov", revenue: 3.0, claims: 0.95 },
      ]);
      setPolicyMix([
        { name: "Health", value: 38 },
        { name: "Life", value: 27 },
        { name: "Property & Casualty", value: 21 },
        { name: "Commercial", value: 14 },
      ]);
      setAnomalies([
        { id: 1, title: "Spike in Health Claims", delta: "+32%", when: "Nov 02", severity: "high" },
        { id: 2, title: "Drop in P&C Renewals", delta: "-11%", when: "Oct 28", severity: "med" },
      ]);
      setChurnRisk([
        { id: "C-10021", name: "Ravi Kumar", policy: "Life", prob: 0.78, ltv: "₹3.2L" },
        { id: "C-10044", name: "Sneha Patel", policy: "Health", prob: 0.69, ltv: "₹1.4L" },
      ]);
      setFraudRisk([
        { id: "CLM-8821", holder: "Arjun Verma", policy: "Motor (P&C)", score: 0.81, amount: "₹1.8L" },
        { id: "CLM-8829", holder: "Meera Joshi", policy: "Health", score: 0.74, amount: "₹92K" },
      ]);
      setRecommendations([
        { id: 1, text: "Target high-churn Life users with 5% renewal discount.", impact: "High" },
        { id: 2, text: "Increase Health deductible ₹1k → loss ratio -2.1%", impact: "Med" },
        { id: 3, text: "Cross-sell P&C to Commercial policy SMEs.", impact: "Med" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); /* eslint-disable-next-line */ }, [range, segment]);

  // ----- UI helpers -----
  const severityBadge = (sev) =>
    sev === "high" ? "bg-red-100 text-red-700"
    : sev === "med" ? "bg-yellow-100 text-yellow-700"
    : "bg-green-100 text-green-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white shadow p-2 rounded-xl text-green-700">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-green-800">AI Insights</h1>
            <p className="text-gray-600">Predictions, anomalies, and actions—powered by ML.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-green-200 rounded-xl px-3 py-2">
            <Filter className="w-4 h-4 text-green-700" />
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-transparent outline-none text-sm"
            >
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="365d">Last 12 months</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-green-200 rounded-xl px-3 py-2">
            <Users className="w-4 h-4 text-green-700" />
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="bg-transparent outline-none text-sm"
            >
              <option>All</option>
              <option>New Customers</option>
              <option>High LTV</option>
              <option>Renewals Due</option>
            </select>
          </div>
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700 text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white border border-green-200 text-green-800 px-3 py-2 rounded-lg shadow text-sm"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { icon: BarChart3, label: "Gross Written Premium", value: `₹${kpis.gwp.toFixed(1)}Cr` },
          { icon: TrendingUp, label: "Revenue Growth", value: `${kpis.growth.toFixed(1)}%` },
          { icon: ShieldAlert, label: "Loss Ratio", value: `${kpis.lossRatio.toFixed(1)}%` },
          { icon: Clock, label: "Avg. Claim TAT", value: `${kpis.claimTAT.toFixed(1)} days` },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-green-100 text-green-700">
                <card.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-xl font-bold text-green-800">{card.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Revenue & claims trend */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow hover:shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-green-800 font-semibold">
            <ActivitySquare className="w-5 h-5" /> Revenue vs Claims
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tsRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue (Cr)" stroke="#16a34a" strokeWidth={2} />
                <Line type="monotone" dataKey="claims" name="Claims (Cr)" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Policy mix */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow hover:shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-green-800 font-semibold">
            <BarChart3 className="w-5 h-5" /> Policy Mix
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={policyMix} dataKey="value" nameKey="name" outerRadius={95} label>
                  {policyMix.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Anomalies + Recommendations */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow hover:shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-green-800 font-semibold">
            <AlertTriangle className="w-5 h-5" /> Anomaly Alerts
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {anomalies.map(a => (
              <div key={a.id} className="rounded-xl border border-green-100 p-4 bg-white/60">
                <p className="font-semibold text-gray-800">{a.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${severityBadge(a.severity)}`}>
                    {a.severity.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">{a.when} • {a.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow hover:shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-green-800 font-semibold">
            <Brain className="w-5 h-5" /> AI Recommendations
          </div>
          <ul className="space-y-3">
            {recommendations.map(r => (
              <li key={r.id} className="rounded-xl border border-green-100 p-4 bg-white/60">
                <p className="text-gray-800">{r.text}</p>
                <span className={`text-xs mt-2 inline-block px-2 py-1 rounded-full ${
                  r.impact === "High" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  Impact: {r.impact}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Risk tables */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Churn risk */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow hover:shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-green-800 font-semibold">
            <Users className="w-5 h-5" /> High Churn Risk Customers
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-700">
              <thead>
                <tr className="bg-green-100 text-green-800 uppercase text-xs font-semibold">
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Policy</th>
                  <th className="py-2 px-4">Churn Prob.</th>
                  <th className="py-2 px-4">LTV</th>
                </tr>
              </thead>
              <tbody>
                {churnRisk.map(c => (
                  <tr key={c.id} className="border-b hover:bg-green-50">
                    <td className="py-2 px-4 font-medium">{c.name}</td>
                    <td className="py-2 px-4">{c.policy}</td>
                    <td className="py-2 px-4 text-red-600 font-semibold">{Math.round(c.prob*100)}%</td>
                    <td className="py-2 px-4">{c.ltv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fraud risk */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow hover:shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-green-800 font-semibold">
            <ShieldAlert className="w-5 h-5" /> Potential Fraudulent Claims
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-700">
              <thead>
                <tr className="bg-green-100 text-green-800 uppercase text-xs font-semibold">
                  <th className="py-2 px-4">Claim ID</th>
                  <th className="py-2 px-4">Holder</th>
                  <th className="py-2 px-4">Policy</th>
                  <th className="py-2 px-4">Fraud Score</th>
                  <th className="py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {fraudRisk.map(f => (
                  <tr key={f.id} className="border-b hover:bg-green-50">
                    <td className="py-2 px-4 font-medium">{f.id}</td>
                    <td className="py-2 px-4">{f.holder}</td>
                    <td className="py-2 px-4">{f.policy}</td>
                    <td className="py-2 px-4 text-red-600 font-semibold">{Math.round(f.score*100)}%</td>
                    <td className="py-2 px-4">{f.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl px-4 py-3 shadow flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-green-700" />
            <span className="text-sm text-gray-700">Refreshing insights…</span>
          </div>
        </div>
      )}
    </div>
  );
}
