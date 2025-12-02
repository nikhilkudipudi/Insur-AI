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
    { id: "analytics", title: "Quick View", icon: <Brain className="w-5 h-5" />, path: "/admin/analytics" },
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
      <aside className="w-72 bg-white text-green-800 flex flex-col shadow-2xl z-10 border-r border-green-100">
        <div className="p-6 border-b border-green-100 flex items-center gap-3">
          <div className="bg-green-50 text-green-700 p-2 rounded-full shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-green-800">InsurAI Admin</h1>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (item.path) navigate(item.path);
              }}
              className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === item.id
                ? "bg-green-600 text-white shadow-md scale-105"
                : "text-green-700 hover:bg-green-50 hover:scale-[1.02]"
                }`}
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-green-100 text-center text-sm">
          <button className="flex items-center justify-center gap-2 w-full text-green-700 hover:text-red-600 transition font-medium">
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
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="bg-green-100 p-6 rounded-full shadow-lg mb-4">
              <Shield className="w-20 h-20 text-green-700" />
            </div>

            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-emerald-600">
              InsurAI
            </h1>

            <div className="max-w-2xl space-y-4">
              <p className="text-2xl font-light text-gray-700">
                The Future of Intelligent Insurance Management
              </p>
              <p className="text-gray-500 leading-relaxed">
                InsurAI leverages advanced artificial intelligence to streamline policy administration,
                automate claim processing, and provide deep analytical insights.
                Empowering administrators with a secure, efficient, and data-driven platform
                to deliver superior insurance services.
              </p>
            </div>

            <div className="pt-8 flex gap-4">
              <div className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" /> AI-Powered
              </div>
              <div className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" /> Secure
              </div>
              <div className="px-6 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-500" /> Analytics
              </div>
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
