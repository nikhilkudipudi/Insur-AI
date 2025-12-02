import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Heart, Shield, Briefcase, ChevronRight } from "lucide-react";

export default function BrowsePolicies() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Health Insurance",
      slug: "health-insurance",
      icon: HeartPulse,
      description: "Comprehensive medical and wellness protection plans.",
      customColor: "#FFDE21",
      customBg: "#FFF9E6",
      customHoverBg: "#FFDE21",
    },
    {
      title: "Life Insurance",
      slug: "life-insurance",
      icon: Heart,
      description: "Financial security and long-term planning for your loved ones.",
      color: "blue",
      bgClass: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Property & Casualty",
      slug: "property-casualty",
      icon: Shield,
      description: "Protect your home, vehicles, and assets from damage or loss.",
      color: "amber",
      bgClass: "bg-amber-50",
      textColor: "text-amber-700",
    },
    {
      title: "Commercial Insurance",
      slug: "commercial-insurance",
      icon: Briefcase,
      description: "Business protection against risks, liabilities, and operational losses.",
      color: "purple",
      bgClass: "bg-purple-50",
      textColor: "text-purple-700",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Explore Insurance Plans
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect policy tailored to your needs by selecting a category below.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cards.map((c) => {
            const isCustomColor = c.customColor;

            return (
              <motion.div
                key={c.slug}
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/user/browse-policies/${c.slug}`)}
                className={`cursor-pointer p-8 rounded-2xl border-2 border-transparent hover:border-white transition-all duration-300 shadow-lg ${!isCustomColor ? c.bgClass : ''}`}
                style={isCustomColor ? { backgroundColor: c.customBg } : {}}
                onMouseEnter={(e) => {
                  if (isCustomColor) {
                    e.currentTarget.style.backgroundColor = c.customHoverBg + '40'; // 40 is hex for 25% opacity
                  }
                }}
                onMouseLeave={(e) => {
                  if (isCustomColor) {
                    e.currentTarget.style.backgroundColor = c.customBg;
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <c.icon
                      className={`w-10 h-10 ${!isCustomColor ? c.textColor : ''}`}
                      style={isCustomColor ? { color: '#B8860B' } : {}}
                    />
                    <div>
                      <h2
                        className={`text-2xl font-bold mb-1 ${!isCustomColor ? c.textColor : ''}`}
                        style={isCustomColor ? { color: '#B8860B' } : {}}
                      >
                        {c.title}
                      </h2>
                      <p className="text-gray-600">{c.description}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 ${!isCustomColor ? c.textColor : ''}`}
                    style={isCustomColor ? { color: '#B8860B' } : {}}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}