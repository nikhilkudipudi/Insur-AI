import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Heart, Shield, Briefcase } from "lucide-react";

export default function ManagePolicies() {
  const navigate = useNavigate();

  // We can add icons, descriptions, and color classes to your array
  const cards = [
    {
      title: "Health Insurance",
      slug: "health-insurance",
      icon: HeartPulse,
      description: "Manage medical, dental, and wellness policies.",
      textColor: "text-yellow-600",
      ringColor: "hover:ring-yellow-500",
      shadowColor: "hover:shadow-yellow-100",
    },
    {
      title: "Life Insurance",
      slug: "life-insurance",
      icon: Heart,
      description: "Manage term, whole, and endowment policies.",
      textColor: "text-blue-700",
      ringColor: "hover:ring-blue-500",
      shadowColor: "hover:shadow-blue-100",
    },
    {
      title: "Property & Casualty",
      slug: "property-casualty",
      icon: Shield,
      description: "Manage home, auto, and liability policies.",
      textColor: "text-amber-700",
      ringColor: "hover:ring-amber-500",
      shadowColor: "hover:shadow-amber-100",
    },
    {
      title: "Commercial Insurance",
      slug: "commercial-insurance",
      icon: Briefcase,
      description: "Manage business risk and corporate policies.",
      textColor: "text-purple-700",
      ringColor: "hover:ring-purple-500",
      shadowColor: "hover:shadow-purple-100",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger effect
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    // Switched to a more neutral background to let the card colors pop
    <div className="min-h-screen p-10 bg-slate-50">

      {/* Centered title container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          Policy Management
        </h1>
        <p className="text-lg text-gray-600">
          Select a category to add, view, update, or remove policies.
        </p>
      </motion.div>

      {/* A wider grid that is 2-col on medium and 4-col on large screens */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {cards.map((c, index) => (
          <motion.div
            key={c.slug}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}

            onClick={() => navigate(`/admin/manage-policies/${c.slug}`)}

            // Card Styling
            className={`
              cursor-pointer bg-white rounded-2xl shadow-lg 
              hover:shadow-2xl ${c.shadowColor} 
              hover:scale-105 
              ring-4 ring-transparent ${c.ringColor}
              transition-all duration-300 ease-in-out 
              flex flex-col justify-start p-8 group
            `}
          >
            {/* Icon */}
            <c.icon
              className={`w-16 h-16 mb-5 ${c.textColor} transition-transform duration-300 group-hover:scale-110`}
            />

            {/* Title */}
            <h2 className={`text-2xl font-bold ${c.textColor} mb-3`}>
              {c.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base">
              {c.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}