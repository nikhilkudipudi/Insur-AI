import { useState, useEffect } from "react";
import { User, Phone, Mail, Lock, LogOut, Save } from "lucide-react";
import { getUserProfile, updateUserProfile, updatePassword, logout } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
    });
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const res = await getUserProfile();
        if (res.ok) {
            setProfile({
                fullName: res.data.fullName || "",
                email: res.data.email || "",
                phoneNumber: res.data.phoneNumber || "",
            });
        }
        setLoading(false);
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const res = await updateUserProfile({
            fullName: profile.fullName,
            phoneNumber: profile.phoneNumber
        });

        if (res.ok) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error(res.data || "Failed to update profile");
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        const res = await updatePassword({
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword
        });

        if (res.ok) {
            toast.success("Password updated successfully!");
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else {
            toast.error(res.data || "Failed to update password");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading user profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <User className="w-8 h-8 text-green-600" />
                        My Profile
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-semibold"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Personal Info Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-green-600" />
                            Personal Details
                        </h2>
                        <form onSubmit={handleProfileUpdate} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={profile.fullName}
                                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={profile.email}
                                        disabled
                                        className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 pl-10 cursor-not-allowed"
                                    />
                                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                                </div>
                                <p className="text-xs text-gray-400 mt-1 pl-1">Email cannot be changed</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        value={profile.phoneNumber}
                                        onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none pl-10"
                                    />
                                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-md flex justify-center items-center gap-2">
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Security Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-green-600" />
                            Security
                        </h2>
                        <form onSubmit={handlePasswordUpdate} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwords.currentPassword}
                                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition shadow-md flex justify-center items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
