import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/thunks/productThunks";

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert("Image size should be less than 5MB");
                return;
            }

            setFormData({ ...formData, image: file });

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.image) {
            alert("Please upload a product image");
            return;
        }

        setIsLoading(true);

        dispatch(createProduct(formData)).unwrap()
            .then(() => {
                alert("Product added successfully!");
                navigate('/')
            })
            .catch(() => {
                alert("Failed to add product");
            }).finally(() => {
                setIsLoading(false);
            })
        setFormData({
            name: "",
            price: "",
            category: "",
            stock: "",
            description: "",
            image: null,
        });
        setImagePreview(null);
        setIsLoading(false);
    };

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl p-10">
                    <h2 className="text-4xl font-bold text-center mb-8 text-white">Add New Product</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-4 outline-none text-lg resize-y"
                            />
                        </div>

                        {/* Image Upload Section */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Product Image</label>

                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 hover:border-violet-500 rounded-3xl p-8 transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-48 h-48 object-cover rounded-2xl mb-4"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
                                            📷
                                        </div>
                                    )}
                                    <span className="text-violet-400 font-medium">
                                        {imagePreview ? "Change Image" : "Click to Upload Image"}
                                    </span>
                                    <span className="text-xs text-zinc-500 mt-1">PNG, JPG, JPEG (Max 5MB)</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 rounded-2xl font-semibold text-xl hover:brightness-110 transition-all active:scale-95 disabled:opacity-70"
                        >
                            {isLoading ? "Adding Product..." : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;