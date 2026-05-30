import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProduct } from "../redux/thunks/productThunks";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/thunks/cartThunks";
import Recommendations from "../components/Recommendations";

const ProductDetails = () => {
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.product)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleAddToCart = () => {
        dispatch(addToCart({ productId: id }))
        alert("Item added to cart")
    }

    useEffect(() => {
        dispatch(getProduct(id));
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500">Error</h1>
                    <p className="text-xl text-zinc-400 mt-2">{error}</p>
                </div>
            </div>
        );
    }
    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500">Product not found</h1>
                    <button onClick={() => navigate(-1)} className="mt-4 text-violet-500 hover:text-violet-400 transition-colors">Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden">
                {/* Back Button */}
                <div className="p-6 border-b border-zinc-800">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-lg"
                    >
                        ← Back
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/2 bg-black p-8 flex items-center justify-center">
                        <div className="relative">
                            <img
                                src={import.meta.env.VITE_BASE_URL + product.image}
                                alt={product.name}
                                className="w-full max-h-[520px] object-contain rounded-3xl shadow-2xl"
                            />
                            {product.stock > 0 && (
                                <div className="absolute top-6 right-6 bg-green-500 text-black text-sm font-bold px-5 py-2 rounded-2xl">
                                    IN STOCK
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-1/2 p-10 lg:p-12 flex flex-col">
                        <div className="text-sm uppercase tracking-widest text-violet-400 mb-2">
                            {product.category}
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl font-bold text-white">
                                ₹{product.price}
                            </span>
                            {product.stock < 10 && product.stock > 0 && (
                                <span className="text-orange-400 text-sm font-medium">
                                    Only {product.stock} left!
                                </span>
                            )}
                        </div>

                        <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                            {product.description}
                        </p>

                        {/* Action Area */}
                        <div className="mt-auto">
                            {localStorage.getItem("token") ? (
                                <button onClick={handleAddToCart} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 rounded-3xl font-semibold text-xl hover:brightness-110 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-500/30">
                                    Add to Cart
                                </button>
                            ) : (
                                <button onClick={() => navigate('/login')} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 rounded-3xl font-semibold text-xl hover:brightness-110 active:scale-95 transition-all duration-200">
                                    Login
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* AI Recommendations System */}
            <Recommendations />
        </div>
    )
}

export default ProductDetails;