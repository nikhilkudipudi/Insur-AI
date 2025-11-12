import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Lock,
  Save,
  RefreshCw,
  UserCog,
} from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div
      className={`min-h-screen px-8 py-12 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-800"
      }`}
    >
      {/* Title */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-green-700 flex items-center gap-3">
          <UserCog className="w-8 h-8 text-green-600" />
          Admin Settings
        </h1>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <RefreshCw className="w-5 h-5" /> Reset All
        </button>
      </div>

      {/* Grid layout for settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* ⚙️ General Settings */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-green-100"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-green-600" /> General Preferences
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Dark Mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${
                  darkMode
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* 🔒 Security Settings */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-green-100"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" /> Security Settings
          </h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span>Enable 2-Factor Authentication</span>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
                className="w-5 h-5 accent-green-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Require password for deletions</span>
              <input type="checkbox" checked readOnly className="w-5 h-5 accent-green-600" />
            </div>

            <button className="mt-4 bg-green-600 text-white w-full py-2.5 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <Lock size={18} /> Update Security Settings
            </button>
          </div>
        </motion.div>

        {/* 🔔 Notifications */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-green-100"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-2">
            <Bell className="w-6 h-6 text-green-600" /> Notifications
          </h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span>Email Alerts for Policy Updates</span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="w-5 h-5 accent-green-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Auto-Backup Reports</span>
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={() => setAutoBackup(!autoBackup)}
                className="w-5 h-5 accent-green-600"
              />
            </div>

            <button className="mt-4 bg-green-600 text-white w-full py-2.5 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <Save size={18} /> Save Preferences
            </button>
          </div>
        </motion.div>

        {/* 👨‍💼 Admin Info */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-green-100"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-2">
            <UserCog className="w-6 h-6 text-green-600" /> Admin Profile
          </h2>

          <div className="text-gray-700 space-y-3">
            <p><span className="font-semibold">Name:</span> Vijay Kumar</p>
            <p><span className="font-semibold">Role:</span> Super Admin</p>
            <p><span className="font-semibold">Email:</span> admin@insurai.com</p>
            <p><span className="font-semibold">Last Login:</span> 6 Nov 2025, 10:45 PM</p>
          </div>

          <button className="mt-6 bg-green-600 text-white w-full py-2.5 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
            <Save size={18} /> Update Profile Info
          </button>
        </motion.div>
      </div>
    </div>
  );
}
