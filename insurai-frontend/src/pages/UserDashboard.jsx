import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Search, Edit, Eye } from "lucide-react";

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
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-green-600">
          <h1 className="text-2xl font-bold">InsurAI User</h1>
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

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          {menuItems.find((item) => item.id === activeSection)?.title ||
            "Dashboard Overview"}
        </h2>

        <div className="bg-white shadow-md rounded-xl p-6 text-gray-700">
          {activeSection === "manage" && (
            <p>{menuItems[0].description}</p>
          )}
          {activeSection === "browse" && (
            <p>{menuItems[1].description}</p>
          )}
          {activeSection === "file" && (
            <p>{menuItems[2].description}</p>
          )}
          {activeSection === "track" && (
            <p>{menuItems[3].description}</p>
          )}
          {activeSection === "overview" && (
            <p>
              Welcome to your <span className="font-semibold">InsurAI User Dashboard!</span>  
              Manage your insurance easily — browse, file, and track everything in one place.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
