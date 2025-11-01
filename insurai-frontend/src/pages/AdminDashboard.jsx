import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, FileText, Settings } from "lucide-react";

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
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-green-600">
          <h1 className="text-2xl font-bold">InsurAI Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                navigate(item.path);
              }}
              className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg transition ${
                activeSection === item.id
                  ? "bg-green-500"
                  : "hover:bg-green-600"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-green-600 text-sm text-center">
          © 2025 InsurAI
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          {menuItems.find((item) => item.id === activeSection)?.title ||
            "Dashboard Overview"}
        </h2>

        {/* Placeholder sections */}
        <div className="bg-white shadow-md rounded-xl p-6 text-gray-700">
          {activeSection === "policies" && (
            <p>Here you can add, update, and delete insurance policies.</p>
          )}
          {activeSection === "customers" && (
            <p>Here you can view and manage all customer profiles.</p>
          )}
          {activeSection === "reports" && (
            <p>Here you can monitor system performance and reports.</p>
          )}
          {activeSection === "analytics" && (
            <p>AI-driven analytics and insights appear here.</p>
          )}
          {activeSection === "overview" && (
            <p>
              Welcome to the InsurAI Admin Dashboard! Use the sidebar to manage
              your system efficiently.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
