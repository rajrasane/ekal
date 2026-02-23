"use client";

import { CATEGORIES } from "../lib/data";

export default function FilterSidebar({
    currentCategory,
    onCategoryChange,
    currentSort,
    onSortChange
}) {
    return (
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-10">

            {/* Categories */}
            <div className="w-full">
                <h3 className="font-outfit font-semibold text-lg mb-4 text-[#111] hidden md:block">
                    Categories
                </h3>
                <ul className="flex md:flex-col gap-2.5 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                    {CATEGORIES.map((cat) => (
                        <li key={cat.id}>
                            <button
                                onClick={() => onCategoryChange(cat.id)}
                                className={`text-sm tracking-wide transition-colors whitespace-nowrap md:whitespace-normal px-4 py-2 md:p-0 rounded-full md:rounded-none border md:border-transparent ${currentCategory === cat.id
                                    ? "text-black font-medium border-black bg-black/5 md:bg-transparent"
                                    : "text-zinc-500 hover:text-black border-zinc-200 bg-white md:border-transparent md:bg-transparent"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sort By */}
            <div className="hidden md:block">
                <h3 className="font-outfit font-semibold text-lg mb-4 text-[#111]">
                    Sort By
                </h3>
                <select
                    value={currentSort}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full appearance-none bg-zinc-50 border border-zinc-200 text-zinc-800 text-sm rounded-lg focus:ring-black focus:border-black block px-4 py-3 outline-none transition-colors cursor-pointer"
                >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>

        </aside>
    );
}
