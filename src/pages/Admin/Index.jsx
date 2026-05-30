import { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/thunks/productThunks";

const ProductList = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product)

    const fetchProducts = useCallback(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [stockFilter, setStockFilter] = useState("All");

    const categories = ["All", ...new Set(products.map(p => p.category))];
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesStock =
                stockFilter === "All" ||
                (stockFilter === "In Stock" && product.stock > 20) ||
                (stockFilter === "Low Stock" && product.stock <= 20);

            return matchesSearch && matchesCategory && matchesStock;
        });
    }, [searchTerm, selectedCategory, stockFilter, products]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
            fetchProducts();
        }
    };

    return (
        <div className="max-w-9xl mx-auto px-6 pt-5">
            <div className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">All Products</h2>
                    <Link to="/add-product" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 rounded-2xl font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap">+ Add New Product</Link>
                </div>
                <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-48">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full sm:w-48">
                                <select
                                    value={stockFilter}
                                    onChange={(e) => setStockFilter(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                >
                                    <option value="All">All Stock</option>
                                    <option value="In Stock">In Stock (20+)</option>
                                    <option value="Low Stock">Low Stock (≤20)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden hover:border-violet-500 transition-all duration-300 group"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={import.meta.env.VITE_BASE_URL + product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-4 py-1 text-xs font-medium rounded-2xl 
                                    ${product.stock > 20
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                        {product.stock} left
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="text-sm text-violet-400 mb-1">{product.category}</div>
                                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="text-2xl font-bold text-white mb-6">
                                    ₹{product.price}
                                </div>

                                <div className="flex gap-3">
                                    <Link to={`/edit-product/${product._id}`} className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 py-3 rounded-2xl text-sm font-medium transition-all text-center">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-3 rounded-2xl text-sm font-medium transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-zinc-500 text-xl">
                        No Products Found!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;