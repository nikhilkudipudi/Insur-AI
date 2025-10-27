import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: "Manage Policies",
      description: "View and update all your active insurance policies.",
      icon: "/manage-policies.png",
      path: "/manage-policies", // placeholder route
    },
    {
      id: 2,
      title: "Browse Policies",
      description: "Explore and compare available insurance plans.",
      icon: "/browse-policies.png",
      path: "/browse-policies",
    },
    {
      id: 3,
      title: "File New Claims",
      description: "Easily submit claims for any covered event.",
      icon: "/file-claims.png",
      path: "/file-claims",
    },
    {
      id: 4,
      title: "Track Existing Claims",
      description: "Check the status of your ongoing claims in real time.",
      icon: "/track-claims.png",
      path: "/track-claims",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-6 py-16">
      {/* Hero Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 leading-tight">
          AI-Powered Insurance <span className="text-green-500">Made Simple</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Manage your policies, file claims, and track everything in one place.
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
            <h3 className="text-2xl font-semibold text-green-700 mb-2">{action.title}</h3>
            <p className="text-gray-600">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
