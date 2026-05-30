import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import Recommendations from "../components/Recommendations";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/thunks/productThunks";
import api from "../api/axiosInstance";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);

    const [filter, setFilter] = useState({
        search: "",
        category: "All",
        minPrice: "",
        maxPrice: "",
        sortBy: ""
    });

    const [categories, setCategories] = useState(["All"]);

    // Fetch categories once from backend API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/products/categories");
                if (res.data) {
                    setCategories(["All", ...res.data]);
                }
            } catch (err) {
                console.error("Failed to load categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products dynamically based on filters with a slight debounce on typing
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const queryParams = {};
            if (filter.search.trim()) queryParams.keyword = filter.search.trim();
            if (filter.category && filter.category !== "All") queryParams.category = filter.category;
            if (filter.minPrice) queryParams.minPrice = filter.minPrice;
            if (filter.maxPrice) queryParams.maxPrice = filter.maxPrice;
            if (filter.sortBy) queryParams.sortBy = filter.sortBy;

            dispatch(getProducts(queryParams));
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [dispatch, filter]);

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

    return (
        <>
            <ProductFilter filter={filter} setFilter={setFilter} categories={categories} />

            <div className="max-w-9xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-600"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="col-span-full text-center text-zinc-400 text-lg py-20">
                            No products found
                        </div>
                    ) : (
                        products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Recommendations System */}
            <Recommendations />
        </>
    );
};

export default Products;