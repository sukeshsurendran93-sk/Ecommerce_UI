import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMagic } from "react-icons/fa";
import api from "../api/axiosInstance";

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await api.get("/analytics");
                setRecommendations(res.data || []);
            } catch (error) {
                console.error("Failed to load recommendations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="py-12 border-t border-zinc-800">
                <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-600"></div>
                </div>
            </div>
        );
    }

    if (recommendations.length === 0) return null;

    return (
        <div className="py-16 border-t border-zinc-800/80 max-w-9xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-9 h-9 bg-violet-600/10 border border-violet-500/20 text-violet-400 rounded-xl flex items-center justify-center">
                    <FaMagic className="text-md animate-pulse" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Recommended for You</h2>
                    <p className="text-zinc-500 text-sm mt-0.5">Intelligent recommendations powered by RapidMiner Analytics</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map((item) => {
                    const scorePercentage = Math.round(Number(item.recommendationScore) * 100);
                    return (
                        <Link
                            key={item._id}
                            to={`/products/${item._id}`}
                            className="bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Product Image */}
                            <div className="relative h-48 overflow-hidden bg-black flex items-center justify-center shrink-0">
                                <img
                                    src={import.meta.env.VITE_BASE_URL + item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* RapidMiner Score Badge */}
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5 border border-violet-400/25">
                                    <FaMagic className="text-[10px]" />
                                    <span>AI Match {scorePercentage}%</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-md font-semibold text-white group-hover:text-violet-400 transition-colors line-clamp-2 mb-3">
                                    {item.name}
                                </h3>
                                <div className="mt-auto flex justify-between items-center">
                                    <span className="text-lg font-bold text-white">
                                        ₹{item.price}
                                    </span>
                                    <span className="text-violet-400 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                                        View Details →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Recommendations;
