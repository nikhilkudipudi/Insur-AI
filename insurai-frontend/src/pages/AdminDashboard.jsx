import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: "Manage Policies",
      description: "Add, update, or delete insurance policies easily.",
      icon: "/manage-policies-admin.png",
      path: "/admin/manage-policies",
    },
    {
      id: 2,
      title: "View Customers",
      description: "Access and manage customer accounts and profiles.",
      icon: "/view-customers.png",
      path: "/admin/customers",
    },
    {
      id: 3,
      title: "Monitor System Reports",
      description: "Track system performance and generate operational reports.",
      icon: "/system-reports.png",
      path: "/admin/reports",
    },
    {
      id: 4,
      title: "Advanced Analytics",
      description: "Gain insights from AI-driven data analysis and dashboards.",
      icon: "/analytics.png",
      path: "/admin/analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-16">
      {/* Hero Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 leading-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Full control over policies, customers, reports, and analytics.
        </p>
      </header>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {actions.map((action) => (
          <div
            key={action.id}
            onClick={() => navigate(action.path)}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={action.icon}
              alt={action.title}
              className="w-20 h-20 mb-6"
            />
            <h3 className="text-2xl font-semibold text-green-700 mb-2">
              {action.title}
            </h3>
            <p className="text-gray-600">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
