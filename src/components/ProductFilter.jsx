const ProductFilter = ({ filter, setFilter, categories }) => {
    return (
        <div className="max-w-9xl mx-auto px-6 pt-10">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-end">
                    <div className="md:col-span-2">
                        <label className="text-sm text-zinc-400 block mb-2">Search</label>
                        <input type="text" placeholder="Search products..." value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-5 text-lg outline-none" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400 block mb-2">Category</label>
                        <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-5 outline-none">
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400 block mb-2">Min Price</label>
                        <input type="number" placeholder="₹1000" min={0} value={filter.minPrice} onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-5 outline-none" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400 block mb-2">Max Price</label>
                        <input type="number" placeholder="₹50000" min={0} value={filter.maxPrice} onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-5 outline-none" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400 block mb-2">Sort By</label>
                        <select value={filter.sortBy} onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-5 outline-none">
                            <option value="">Default</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductFilter;