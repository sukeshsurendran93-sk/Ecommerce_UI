import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { allorders, myOrders } from "../redux/thunks/orderThunks";

const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.order);
    const { role } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchOrders = async () => {
            if (role === 'user') {
                dispatch(myOrders());
            } else {
                dispatch(allorders());
            }
        };
        fetchOrders();
    }, [dispatch, role]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-500/20 text-green-400";
            case "Shipped": return "bg-blue-500/20 text-blue-400";
            case "Confirmed": return "bg-yellow-500/20 text-yellow-400";
            default: return "bg-zinc-500/20 text-zinc-400";
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-xl">Loading your orders...</div>;
    }

    return (
        <div className="max-w-9xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold text-white mb-10">Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900 border border-zinc-700 rounded-3xl">
                    <p className="text-2xl text-zinc-500 mb-4">No orders yet</p>
                    <Link
                        to="/"
                        className="inline-block bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-2xl font-semibold"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden hover:border-violet-500 transition-all duration-300 shadow-xl"
                        >
                            {/* Order Header */}
                            <div className="flex justify-between items-center px-8 py-5 border-b border-zinc-800 bg-zinc-950">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                                        <span className="text-white text-2xl">📦</span>
                                    </div>
                                    <div>
                                        <p className="text-zinc-400 text-sm">Order ID</p>
                                        <p className="font-mono text-white tracking-wider">
                                            #{order._id.slice(-8).toUpperCase()}
                                        </p>
                                    </div>
                                </div>

                                <span className={`px-5 py-2 rounded-2xl text-sm font-semibold ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="p-8">
                                {/* Product Info */}
                                <div className="flex gap-6">
                                    <img
                                        src={import.meta.env.VITE_BASE_URL + order.product.image}
                                        alt={order.product.name}
                                        className="w-28 h-28 object-cover rounded-2xl shadow-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white mb-1">
                                            {order.product.name}
                                        </h3>
                                        <p className="text-violet-400">{order.product.category}</p>

                                        <div className="mt-4 flex flex-wrap gap-x-6 text-sm">
                                            <div>Total: <span className="font-semibold text-emerald-400">₹{order.totalAmount}</span></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="mt-8 pt-6 border-t border-zinc-800">
                                    <p className="text-zinc-400 text-sm mb-3 font-medium">SHIPPING ADDRESS</p>
                                    <div className="text-white leading-relaxed text-[15px]">
                                        <p className="font-medium">{order.shippingAddress.fullName}</p>
                                        <p>{order.shippingAddress.address}</p>
                                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                                        <p className="mt-1 text-emerald-400">📱 {order.shippingAddress.phone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-5 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center">
                                <button onClick={() => navigate(`/products/${order.product._id}`)} className="text-violet-400 hover:text-violet-500 font-medium transition-colors">
                                    View Product
                                </button>

                                {order.status === "Pending" && role === 'user' && (
                                    <button className="text-red-400 hover:text-red-500 font-medium transition-colors">
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;