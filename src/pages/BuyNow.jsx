import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const BuyNow = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Fetch Product Details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${productId}`);
                setProduct(res.data);
            } catch (error) {
                console.error(error);
                alert("Failed to load product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
            alert("Please fill all required fields");
            return;
        }

        setIsPlacingOrder(true);

        try {
            const orderData = {
                productId,
                totalAmount: product.price,
                shippingAddress: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                },
            };

            await api.post("/orders", orderData);
            alert("Order placed successfully! 🎉");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to place order");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading product...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold text-white mb-10">Buy Now</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Product Details */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
                    <h2 className="text-2xl font-semibold mb-6">Product Details</h2>
                    <div className="flex gap-6">
                        <img
                            src={import.meta.env.VITE_BASE_URL + product.image}
                            alt={product.name}
                            className="w-40 h-40 object-cover rounded-2xl"
                        />
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                            <p className="text-zinc-400 mb-4">{product.category}</p>
                            <p className="text-3xl font-bold text-emerald-400">₹{product.price}</p>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-zinc-700 pt-6">
                        <p className="text-zinc-400 leading-relaxed">{product.description}</p>
                    </div>
                </div>

                {/* Right: Shipping Information */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
                    <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Address *</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-4 outline-none resize-y"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Pincode *</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                        className="w-full mt-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 rounded-3xl font-semibold text-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-70"
                    >
                        {isPlacingOrder ? "Please Wait..." : "Book Order"}
                    </button>

                    <p className="text-center text-zinc-500 text-sm mt-4">
                        Payable After Delivery ₹{product.price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BuyNow;