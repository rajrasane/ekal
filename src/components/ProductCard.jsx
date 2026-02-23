"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <Link href={`/products/${product.id}`} className="group flex flex-col relative pb-6 border-b border-black/5 md:border-b-0 h-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 rounded-lg mb-4">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Out of stock overlay */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <span className="bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">
                            Sold Out
                        </span>
                    </div>
                )}

                {/* Quick add button (desktop hover) - always render, visually handle disabled state */}
                <div className="absolute bottom-4 right-4 z-20 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hidden md:block">
                    <button
                        onClick={handleAdd}
                        disabled={product.stock === 0}
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors shadow-lg ${product.stock > 0 ? "bg-black text-white hover:bg-zinc-800" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"}`}
                        aria-label="Add to cart"
                    >
                        <Plus size={20} strokeWidth={2} />
                    </button>
                </div>
            </div>

            <div className="flex items-start justify-between gap-4 flex-1">
                <div className="min-w-0 flex-1">
                    <h3 className="font-outfit font-medium text-lg text-[#111] leading-tight mb-1 group-hover:underline underline-offset-4 decoration-black/20 truncate">
                        {product.name}
                    </h3>
                    <p className="text-sm text-zinc-500 line-clamp-1 mb-2">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </p>
                </div>
                <p className="font-semibold text-lg text-[#111] tabular-nums whitespace-nowrap shrink-0">
                    ₹{product.price.toLocaleString("en-IN")}
                </p>
            </div>

            {/* Mobile-only quick add */}
            <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={`mt-3 w-full py-2.5 rounded-lg border text-sm font-medium transition-colors md:hidden active:scale-[0.98] ${product.stock > 0 ? "border-black/10 hover:bg-zinc-50 text-black" : "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed"}`}
            >
                {product.stock > 0 ? "Add to Cart" : "Sold Out"}
            </button>
        </Link>
    );
}
