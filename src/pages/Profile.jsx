import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import api from "../api/axiosInstance";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        role: ""
    });

    const [passwordData, setPasswordData] = useState({
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [validationError, setValidationError] = useState("");

    // Fetch user profile
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await api.get("/profile");
            setProfile({
                name: res.data.name || "",
                email: res.data.email || "",
                role: res.data.role || "user"
            });
        } catch (error) {
            console.error("Failed to load profile:", error);
            setStatus({
                type: "error",
                message: error.response?.data?.message || "Failed to load profile details"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProfile();
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
        setStatus({ type: "", message: "" });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
        setValidationError("");
        setStatus({ type: "", message: "" });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setValidationError("");
        setStatus({ type: "", message: "" });

        if (!profile.name.trim() || !profile.email.trim()) {
            setValidationError("Name and Email are required");
            return;
        }

        if (passwordData.password) {
            if (passwordData.password.length < 6) {
                setValidationError("Password must be at least 6 characters long");
                return;
            }
            if (passwordData.password !== passwordData.confirmPassword) {
                setValidationError("Passwords do not match");
                return;
            }
        }

        try {
            setUpdating(true);
            const payload = {
                name: profile.name,
                email: profile.email
            };
            if (passwordData.password) {
                payload.password = passwordData.password;
            }

            const res = await api.put("/profile", payload);
            setProfile({
                name: res.data.name,
                email: res.data.email,
                role: res.data.role
            });
            // Update username in localStorage if necessary
            localStorage.setItem("username", res.data.name);

            setPasswordData({ password: "", confirmPassword: "" });
            setStatus({
                type: "success",
                message: "Profile updated successfully! 🎉"
            });
        } catch (error) {
            console.error("Failed to update profile:", error);
            setStatus({
                type: "error",
                message: error.response?.data?.message || "Failed to update profile details"
            });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black tracking-tight text-white mb-2">
                    User <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Profile</span>
                </h1>
                <p className="text-zinc-400">View and update your personal details and account settings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card Summary */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl h-fit">
                    <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-6">
                        {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1 line-clamp-1">{profile.name}</h2>
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-1">{profile.email}</p>
                    <span className="px-4 py-1.5 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest rounded-full">
                        {profile.role}
                    </span>
                </div>

                {/* Profile Form Details */}
                <div className="md:col-span-2 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Account Settings</h3>

                    {status.message && (
                        <div className={`p-4 rounded-2xl flex items-center gap-3 mb-6 border ${status.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                            {status.type === "success" ? <FaCheckCircle className="text-lg shrink-0" /> : <FaExclamationCircle className="text-lg shrink-0" />}
                            <span className="text-sm font-medium">{status.message}</span>
                        </div>
                    )}

                    {validationError && (
                        <div className="p-4 rounded-2xl flex items-center gap-3 mb-6 bg-red-500/10 border border-red-500/20 text-red-400">
                            <FaExclamationCircle className="text-lg shrink-0" />
                            <span className="text-sm font-medium">{validationError}</span>
                        </div>
                    )}

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2 font-medium">Full Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-zinc-500">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleProfileChange}
                                    className="w-full bg-zinc-800/40 border border-zinc-700/60 focus:border-violet-500 rounded-2xl pl-12 pr-5 py-4 outline-none text-white transition-all placeholder-zinc-500"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2 font-medium">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-zinc-500">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleProfileChange}
                                    className="w-full bg-zinc-800/40 border border-zinc-700/60 focus:border-violet-500 rounded-2xl pl-12 pr-5 py-4 outline-none text-white transition-all placeholder-zinc-500"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="border-t border-zinc-800/80 my-8 pt-6">
                            <h4 className="text-lg font-bold text-white mb-4">Change Password</h4>
                            <p className="text-zinc-500 text-xs mb-6">Leave blank if you don't want to change your password</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2 font-medium">New Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-zinc-500">
                                            <FaLock />
                                        </span>
                                        <input
                                            type="password"
                                            name="password"
                                            value={passwordData.password}
                                            onChange={handlePasswordChange}
                                            className="w-full bg-zinc-800/40 border border-zinc-700/60 focus:border-violet-500 rounded-2xl pl-12 pr-5 py-4 outline-none text-white transition-all placeholder-zinc-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2 font-medium">Confirm Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-zinc-500">
                                            <FaLock />
                                        </span>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full bg-zinc-800/40 border border-zinc-700/60 focus:border-violet-500 rounded-2xl pl-12 pr-5 py-4 outline-none text-white transition-all placeholder-zinc-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold py-4.5 rounded-2xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {updating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Updating...
                                </>
                            ) : (
                                "Update Profile"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
