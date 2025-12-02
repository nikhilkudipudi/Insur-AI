import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Shield,
  Lock,
  Moon,
  Sun,
  Save,
  LogOut,
  ChevronRight
} from "lucide-react";
import { getSettings, updateSettings, updatePassword, logout } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [settings, setSettings] = useState({
    requirePasswordForActions: true,
    theme: "light"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await getSettings();
    if (res.ok) {
      setUser(res.data);
      setSettings({
        requirePasswordForActions: res.data.requirePasswordForActions,
        theme: res.data.theme || "light"
      });
      setTheme(res.data.theme || "light");
    }
    setLoading(false);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    if (key === 'theme') {
      setTheme(value);
    }
  };

  const saveSettings = async () => {
    const res = await updateSettings(settings);
    if (res.ok) {
      alert("Settings saved successfully!");
    } else {
      alert("Failed to save settings");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    const res = await updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });

    if (res.ok) {
      alert("Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordForm(false);
    } else {
      alert(res.data || "Failed to update password");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {/* Admin Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl shadow-sm border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user?.fullName}</h2>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {user?.role}
                </span>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className={`flex items-center justify-between pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <label className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Theme</label>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Choose interface theme</p>
              </div>
              <div className={`flex gap-2 p-1 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => handleSettingChange("theme", "light")}
                  className={`p-2 rounded-md transition ${settings.theme === "light" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  <Sun className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleSettingChange("theme", "dark")}
                  className={`p-2 rounded-md transition ${settings.theme === "dark" ? "bg-gray-600 shadow-sm text-blue-300" : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <Moon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl shadow-sm border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Shield className="w-5 h-5 text-gray-500" />
              Security
            </h3>

            <div className="space-y-6">
              <div className={`flex items-center justify-between p-4 rounded-xl border ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-900/50' : 'bg-yellow-50 border-yellow-100'}`}>
                <div>
                  <label className={`font-medium ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-900'}`}>Require Password for Critical Actions</label>
                  <p className={`text-sm ${theme === 'dark' ? 'text-yellow-500/80' : 'text-yellow-700'}`}>Ask for password when deleting/updating policies</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.requirePasswordForActions}
                    onChange={(e) => handleSettingChange("requirePasswordForActions", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                </label>
              </div>

              <div className="pt-4">
                <button
                  onClick={saveSettings}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Preferences
                </button>
              </div>
            </div>
          </motion.div>

          {/* Password Update */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl shadow-sm border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              <h3 className={`text-lg font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Lock className="w-5 h-5 text-gray-500" />
                Update Password
              </h3>
              <ChevronRight className={`w-5 h-5 transition-transform ${showPasswordForm ? 'rotate-90' : ''} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            <AnimatePresence>
              {showPasswordForm && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onSubmit={handlePasswordUpdate}
                  className="space-y-4 mt-6 overflow-hidden"
                >
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-lg font-semibold transition ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
                  >
                    Update Password
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
