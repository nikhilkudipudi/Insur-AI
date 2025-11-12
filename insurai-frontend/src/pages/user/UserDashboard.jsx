import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Search, Edit, Eye, LogOut, User } from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    {
      id: "manage",
      title: "Manage Policies",
      icon: <Edit className="w-5 h-5" />,
      path: "/user/manage-policies",
      description: "View and update all your active insurance policies.",
    },
    {
      id: "browse",
      title: "Browse Policies",
      icon: <Search className="w-5 h-5" />,
      path: "/user/browse-policies",
      description: "Explore and compare available insurance plans.",
    },
    {
      id: "file",
      title: "File New Claims",
      icon: <FileText className="w-5 h-5" />,
      path: "/user/file-claims",
      description: "Easily submit claims for any covered event.",
    },
    {
      id: "track",
      title: "Track Claims",
      icon: <Eye className="w-5 h-5" />,
      path: "/user/track-claims",
      description: "Check the status of your ongoing claims in real time.",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 to-green-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-green-600">
          <div className="flex items-center gap-3">
            <div className="bg-white text-green-700 p-2 rounded-full">
              <User className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-wide">InsurAI User</h1>
          </div>
        </div>

        <nav className="flex-1 p-5 space-y-2">
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
                  : "hover:bg-green-600 hover:scale-[1.02]"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-green-600 text-sm text-center">
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-green-800">
            {menuItems.find((item) => item.id === activeSection)?.title ||
              "Dashboard Overview"}
          </h2>
          <div className="bg-white shadow-md px-4 py-2 rounded-lg text-sm text-gray-700">
            Welcome back 👋 <span className="font-semibold">User</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          {activeSection === "overview" && (
            <div className="text-gray-700">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Dashboard Overview
              </h3>
              <p>
                Welcome to your{" "}
                <span className="font-semibold text-green-700">InsurAI User Dashboard!</span>  
                Manage your insurance easily — browse, file, and track everything in one place.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    onClick={() => {
                      setActiveSection(item.id);
                      navigate(item.path);
                    }}
                  >
                    <div className="text-green-600 mb-3">{item.icon}</div>
                    <h4 className="font-semibold text-green-800">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {menuItems.map(
            (item) =>
              activeSection === item.id && (
                <div key={item.id}>
                  <p className="text-gray-700">{item.description}</p>
                  <div className="mt-6 text-center">
                    <button className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
                      Explore {item.title}
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </main>
    </div>
  );
}
