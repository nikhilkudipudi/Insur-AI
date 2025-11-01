import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, FileText, Settings, LogOut, Shield } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    {
      id: "policies",
      title: "Manage Policies",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/manage-policies",
    },
    {
      id: "customers",
      title: "View Customers",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/customers",
    },
    {
      id: "reports",
      title: "System Reports",
      icon: <FileText className="w-5 h-5" />,
      path: "/admin/reports",
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/admin/analytics",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-800 text-white flex flex-col shadow-2xl">
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
                navigate(item.path);
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
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-green-800">
            {menuItems.find((item) => item.id === activeSection)?.title ||
              "Admin Dashboard"}
          </h2>
          <div className="bg-white px-5 py-2 rounded-lg shadow text-gray-700">
            Welcome, <span className="font-semibold text-green-700">Admin</span> 👑
          </div>
        </div>

        {/* Overview Cards */}
        {activeSection === "overview" && (
          <div>
            <p className="text-gray-700 mb-8 text-lg">
              Gain insights, manage users, and analyze your insurance system efficiently with AI-driven data.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-all">
                <h4 className="font-semibold mb-2">Active Policies</h4>
                <p className="text-3xl font-bold">1,204</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-all">
                <h4 className="font-semibold mb-2">Registered Users</h4>
                <p className="text-3xl font-bold">842</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-all">
                <h4 className="font-semibold mb-2">Pending Claims</h4>
                <p className="text-3xl font-bold">56</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-all">
                <h4 className="font-semibold mb-2">Revenue Growth</h4>
                <p className="text-3xl font-bold">+12.8%</p>
              </div>
            </div>
          </div>
        )}

        {/* Active Section Details */}
        <div className="mt-10 bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
          {activeSection === "policies" && (
            <p>🧾 Manage and update all policy types, including life, health, and vehicle insurance.</p>
          )}
          {activeSection === "customers" && (
            <p>👥 View, edit, or remove registered customers and verify their policy status.</p>
          )}
          {activeSection === "reports" && (
            <p>📊 Generate detailed system performance and compliance reports.</p>
          )}
          {activeSection === "analytics" && (
            <p>🤖 Get AI-driven insights, claim trends, and risk analysis across user segments.</p>
          )}
        </div>
      </main>
    </div>
  );
}
