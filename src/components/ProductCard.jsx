import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="card-hover bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden group">
            <div className="relative">
                <img src={import.meta.env.VITE_BASE_URL + product.image} alt="Product" className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold text-xl">{product.name}</h4>
                        <p className="text-zinc-400 text-sm">{product.category}</p>
                    </div>
                    <div className="text-right">
                        <h4 className="text-2xl font-bold text-emerald-400">₹{product.price}</h4>
                    </div>
                </div>
                <Link
                    to={`/products/${product._id}`}
                    className="mt-6 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-4 rounded-3xl font-semibold hover:brightness-110 transition-all active:scale-95 inline-block text-center"
                >
                    View Product
                </Link>
            </div>
        </div>
    )
}

export default ProductCard;