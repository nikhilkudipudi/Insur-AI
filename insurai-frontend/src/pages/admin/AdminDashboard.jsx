import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Shield,
  Brain,
  Briefcase,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import dashboardBg from "../../assets/DashboardBg.gif";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    { id: "overview", title: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "policies", title: "Manage Policies", icon: <Briefcase className="w-5 h-5" />, path: "/admin/manage-policies" },
    { id: "customers", title: "Customers", icon: <Users className="w-5 h-5" />, path: "/admin/customers" },
    { id: "claims", title: "Claims & Requests", icon: <ClipboardList className="w-5 h-5" />, path: "/admin/claims" },
    { id: "analytics", title: "AI Insights", icon: <Brain className="w-5 h-5" />, path: "/admin/analytics" },
    { id: "settings", title: "Settings", icon: <Settings className="w-5 h-5" />, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      {/* Background Animation */}
      <img
        src={dashboardBg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />

      {/* Sidebar */}
      <aside className="w-72 bg-green-800 text-white flex flex-col shadow-2xl z-10">
        <div className="p-6 border-b border-green-700 flex items-center gap-3">
          <div className="bg-white text-green-700 p-2 rounded-full shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">InsurAI Admin</h1>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (item.path) navigate(item.path);
              }}
              className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-green-500 shadow-md scale-105"
                  : "hover:bg-green-700 hover:scale-[1.02]"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-green-700 text-center text-sm">
          <button className="flex items-center justify-center gap-2 w-full text-white hover:text-red-300 transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <p className="text-gray-300 mt-3">© 2025 InsurAI</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
            {menuItems.find((item) => item.id === activeSection)?.icon}
            {menuItems.find((item) => item.id === activeSection)?.title || "Dashboard"}
          </h2>
          <div className="bg-white px-5 py-2 rounded-lg shadow text-gray-700">
            Welcome, <span className="font-semibold text-green-700">Admin</span> 👑
          </div>
        </div>

        {/* Overview Section */}
        {activeSection === "overview" && (
          <div>
            <p className="text-gray-700 mb-8 text-lg">
              Gain AI-driven insights, manage policies, and monitor your insurance ecosystem efficiently.
            </p>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { title: "Active Policies", value: "1,204", color: "from-green-500 to-green-600" },
                { title: "Registered Users", value: "842", color: "from-blue-500 to-blue-600" },
                { title: "Pending Claims", value: "56", color: "from-yellow-400 to-yellow-500" },
                { title: "Revenue Growth", value: "+12.8%", color: "from-purple-500 to-purple-600" },
                { title: "AI Predictions", value: "93% Accuracy", color: "from-pink-500 to-pink-600" },
                { title: "Customer Retention", value: "89%", color: "from-teal-500 to-teal-600" },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`p-6 bg-gradient-to-r ${card.color} text-white rounded-xl shadow-lg hover:scale-[1.03] transition-all`}
                >
                  <h4 className="font-semibold mb-2">{card.title}</h4>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Section Info Box */}
        <div className="mt-10 bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
          {activeSection === "policies" && (
            <p>🧾 Manage and update all policy types: life, health, property, and commercial insurance.</p>
          )}
          {activeSection === "customers" && (
            <p>👥 View, verify, and manage customer profiles, including previous policies and claims.</p>
          )}
          {activeSection === "claims" && (
            <p>📋 Review, accept, or reject claims with AI-based fraud detection insights.</p>
          )}
          {activeSection === "analytics" && (
            <p>🤖 View predictive analytics, claim risk trends, and business performance metrics.</p>
          )}
          {activeSection === "settings" && (
            <p>⚙️ Configure your system preferences, notifications, and automation workflows.</p>
          )}
        </div>
      </main>
    </div>
  );
}
