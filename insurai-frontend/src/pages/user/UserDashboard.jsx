import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Search,
  Edit,
  Eye,
  LogOut,
  User,
  LifeBuoy,
} from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    {
      id: "manage",
      title: "Manage Policies",
      icon: <Edit className="w-5 h-5" />,
      path: "/user/manage-policies",
      description: "View, update, and renew all your active insurance policies.",
      cardBg: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverStyle: "hover:shadow-blue-200",
    },
    {
      id: "browse",
      title: "Browse Policies",
      icon: <Search className="w-5 h-5" />,
      path: "/user/browse-policies",
      description: "Explore new plans, compare options, and get quotes.",
      cardBg: "bg-green-50",
      iconColor: "text-green-600",
      hoverStyle: "hover:shadow-green-200",
    },
    {
      id: "file",
      title: "File New Claims",
      icon: <FileText className="w-5 h-5" />,
      path: "/user/file-claims",
      description: "Start the process for a new claim with guided steps.",
      cardBg: "bg-red-50",
      iconColor: "text-red-600",
      hoverStyle: "hover:shadow-red-200",
    },
    {
      id: "track",
      title: "Track Claims",
      icon: <Eye className="w-5 h-5" />,
      path: "/user/track-claims",
      description: "Monitor the status and progress of your open claims in real-time.",
      cardBg: "bg-purple-50",
      iconColor: "text-purple-600",
      hoverStyle: "hover:shadow-purple-200",
    },
    {
      id: "support",
      title: "Support & Help",
      icon: <LifeBuoy className="w-5 h-5" />,
      path: "/user/support",
      description: "Access FAQs, message support, or find contact information.",
      cardBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      hoverStyle: "hover:shadow-indigo-200",
    },
  ];

  const handleNavigation = (item) => {
    setActiveSection(item.id);
    navigate(item.path);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white text-green-800 flex flex-col shadow-2xl border-r border-green-100">
        <div className="p-6 border-b border-green-100">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 text-green-700 p-2 rounded-lg">
              <User className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-wide text-green-800">InsurAI User</h1>
          </div>
        </div>

        <nav className="flex-1 p-5 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${activeSection === item.id
                  ? "bg-green-600 text-white shadow-md font-semibold scale-105"
                  : "text-green-700 hover:bg-green-50 hover:scale-[1.02]"
                }`}
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-green-100 text-sm text-center">
          <button className="flex items-center justify-center gap-2 w-full text-green-700 hover:text-red-600 transition font-medium">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <p className="text-gray-400 mt-3">© 2025 InsurAI</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-8">
          <h2 className="text-4xl font-extrabold text-slate-800">
            {menuItems.find((item) => item.id === activeSection)?.title ||
              "Dashboard Overview"}
          </h2>
          <div className="bg-white shadow-lg border border-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
            Welcome back, <span className="font-bold">User</span>!
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {activeSection === "overview" && (
            <div className="text-gray-700">
              <h3 className="text-2xl font-bold text-slate-800 mb-5">
                Quick Access
              </h3>

              <p className="text-gray-600 max-w-3xl mb-8">
                Your central hub to manage all insurance needs. Choose an action below.
              </p>

              {/* Action Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-6 ${item.cardBg} border border-gray-200 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer ${item.hoverStyle}`}
                    onClick={() => handleNavigation(item)}
                  >
                    <div className={`mb-3 ${item.iconColor}`}>{item.icon}</div>
                    <h4 className="font-bold text-lg text-slate-800">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback content for other sections */}
          {menuItems.map(
            (item) =>
              activeSection === item.id && (
                <div key={item.id} className="text-center py-10">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <button onClick={() => navigate(item.path)} className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-700 transition font-semibold">
                    Go to {item.title} Page
                  </button>
                </div>
              )
          )}
        </div>
      </main>
    </div>
  );
}