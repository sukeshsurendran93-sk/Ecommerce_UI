import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, removeFromCart } from "../redux/thunks/cartThunks";
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.cart);

    // Fetch Cart Items
    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(items.reduce((acc, item) => acc + item.price , 0));
    }, [items]);

    // Remove Item from Cart
    const handleRemoveFromCart = (productId) => {
        if (!window.confirm("Remove this item from cart?")) return;
        try {
            dispatch(removeFromCart(productId));
            dispatch(getCartItems());
        } catch (error) {
            console.error("Failed to remove item:", error);
            alert("Failed to remove item");
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-xl text-zinc-400">Loading your cart...</div>;
    }

    return (
        <div className="max-w-9xl mx-auto px-6 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Your Cart</h2>
                {items.length > 0 && (<p className="text-xl text-zinc-400">Total: <span className="text-white font-semibold">₹{total}</span></p>)}
            </div>

            {items.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-zinc-500 mb-4">Your cart is empty</p>
                    <Link to="/" className="inline-block bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all">Browse Products</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.productID} className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden hover:border-violet-500 transition-all duration-300 group">
                            <div className="relative h-56 overflow-hidden">
                                <img src={import.meta.env.VITE_BASE_URL + item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>

                            <div className="p-6">
                                <div className="text-sm text-violet-400 mb-1">{item.category}</div>
                                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{item.name}</h3>
                                <div className="text-2xl font-bold text-white mb-4">₹{item.price}</div>

                                <div className="flex gap-3">
                                    <Link to={`/buy-now/${item.productID}`} className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 py-3 rounded-2xl text-sm font-medium transition-all text-center">
                                        Buy Now
                                    </Link>
                                    <button onClick={() => handleRemoveFromCart(item.productID)} className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-3 rounded-2xl text-sm font-medium transition-all">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;