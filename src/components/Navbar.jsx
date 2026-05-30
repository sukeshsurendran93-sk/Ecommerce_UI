import {
    FaCartShopping,
    FaUser,
    FaFirstOrderAlt,
    FaShop,
    FaEnvelope
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { useState, useCallback } from "react";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Better to use Redux state instead of localStorage
    const { role, token } = useSelector((state) => state.auth);
    const isLoggedIn = !!token;

    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigate("/");
        setIsMenuOpen(false);
    }, [dispatch, navigate]);

    const closeMobileMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    // Centralized menu items (eliminates duplication)
    const menuItems = [
        {
            to: "/",
            icon: <FaShop className="text-xl" />,
            label: "Products"
        },
    ];

    if (isLoggedIn) {
        menuItems.push({
            to: "/orders",
            icon: <FaFirstOrderAlt className="text-xl" />,
            label: "Orders"
        });

        if (role === "user") {
            menuItems.push({
                to: "/cart",
                icon: <FaCartShopping className="text-xl" />,
                label: "Cart"
            });
        }

        menuItems.push({
            to: "/profile",
            icon: <FaUser className="text-xl" />,
            label: "Profile"
        });
    }

    menuItems.push({
        to: "/contact",
        icon: <FaEnvelope className="text-xl" />,
        label: "Contact"
    });

    return (
        <nav className="bg-black/80 backdrop-blur-xl border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-9xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-3xl tracking-tighter">E</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            E-Shop
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-lg">
                        {isLoggedIn ? (
                            <>
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className="flex items-center gap-2 hover:text-violet-400 transition-colors"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                ))}

                                <button
                                    onClick={handleLogout}
                                    className="px-8 py-3 bg-red-600 text-white font-semibold rounded-3xl hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
                                >
                                    <FaUser /> Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-8 py-3 bg-white text-black font-semibold rounded-3xl hover:bg-violet-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                            >
                                <FaUser /> Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-3xl text-white focus:outline-none transition-transform active:scale-90"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-6 py-6 border-t border-zinc-800">
                        <div className="flex flex-col gap-6 text-lg">
                            {isLoggedIn ? (
                                <>
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-3 hover:text-violet-400 transition-colors"
                                        >
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    ))}

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors py-2"
                                    >
                                        <FaUser /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="w-full py-4 bg-white text-black font-semibold rounded-3xl text-center hover:bg-violet-500 hover:text-white transition-all"
                                >
                                    <FaUser className="inline mr-2" /> Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;