"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Loader2, Minus, Plus, ShoppingBag } from "lucide-react";
import { getProductById, getRelatedProducts } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const [prodData, relData] = await Promise.all([
                    getProductById(id),
                    getRelatedProducts(id)
                ]);
                setProduct(prodData);
                setRelated(relData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();

        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
            window.scrollTo(0, 0);
            const timer = setTimeout(() => window.scrollTo(0, 0), 50);
            return () => clearTimeout(timer);
        }
    }, [id]);

    const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
    const increaseQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-zinc-300 w-8 h-8" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-outfit font-semibold mb-4">Product Not Found</h2>
                <button onClick={() => router.push("/")} className="text-zinc-500 hover:text-black underline underline-offset-4">
                    Return to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-1 md:py-8">
            <button
                onClick={() => {
                    window.scrollTo(0, 0);
                    router.back();
                }}
                className="flex items-center gap-2 text-zinc-500 hover:text-black mb-12 transition-colors font-medium text-sm group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
                {/* Image Gallery */}
                <div className="flex flex-col gap-4">
                    <div className="relative aspect-[4/5] w-full bg-zinc-100 rounded-2xl overflow-hidden">
                        <Image
                            src={product.images[activeImage]}
                            alt={product.name}
                            fill
                            priority
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative w-24 aspect-square rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${activeImage === idx ? "border-black" : "border-transparent opacity-70 hover:opacity-100"
                                        }`}
                                >
                                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="mb-8">
                        <p className="text-sm font-medium text-zinc-500 tracking-wider uppercase mb-3">
                            {product.category}
                        </p>
                        <h1 className="font-outfit text-4xl md:text-5xl font-semibold tracking-tighter text-[#111] leading-tight mb-4">
                            {product.name}
                        </h1>
                        <p className="text-2xl font-semibold text-black tabular-nums">
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>
                    </div>

                    <p className="text-zinc-600 leading-relaxed mb-10 text-lg">
                        {product.description}
                    </p>

                    {/* Add to Cart Actions */}
                    <div className="space-y-6 border-y border-zinc-100 py-8 mb-10">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-black">Quantity</span>
                            <div className="flex items-center bg-zinc-50 rounded-full border border-zinc-200">
                                <button
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black disabled:opacity-30 transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center font-medium tabular-nums">{quantity}</span>
                                <button
                                    onClick={increaseQuantity}
                                    disabled={quantity >= product.stock}
                                    className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black disabled:opacity-30 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {product.stock > 0 ? (
                            <button
                                onClick={handleAddToCart}
                                className="w-full h-14 flex items-center justify-center gap-2 rounded-full bg-black text-white font-medium hover:bg-zinc-800 transition-colors active:scale-[0.98]"
                            >
                                <ShoppingBag size={20} />
                                Add to Cart
                            </button>
                        ) : (
                            <button disabled className="w-full h-14 rounded-full bg-zinc-100 text-zinc-400 font-medium cursor-not-allowed">
                                Out of Stock
                            </button>
                        )}

                        <p className="text-sm text-zinc-500 text-center">
                            {product.stock > 0 && product.stock <= 5
                                ? `Only ${product.stock} left in stock - order soon.`
                                : product.stock > 0
                                    ? "In stock and ready to ship."
                                    : "We don't know when or if this item will be back in stock."}
                        </p>
                    </div>

                    {/* Details List */}
                    <div>
                        <h3 className="font-outfit font-semibold text-lg text-black mb-4">Details</h3>
                        <ul className="space-y-3">
                            {product.details.map((detail, idx) => (
                                <li key={idx} className="flex gap-3 text-zinc-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0 mt-2" />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {related.length > 0 && (
                <div className="border-t border-zinc-100 pt-20">
                    <h2 className="font-outfit text-2xl font-semibold text-black mb-10">You might also like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {related.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
