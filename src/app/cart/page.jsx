"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, subtotal, isLoaded } = useCart();

    if (!isLoaded) return null; // prevent hydration mismatch

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="font-outfit text-3xl font-semibold mb-6">Your cart is empty.</h1>
                <p className="text-zinc-500 mb-10 max-w-sm">
                    Before you proceed to checkout you must add some products to your shopping cart.
                </p>
                <Link
                    href="/"
                    className="h-14 px-8 flex items-center justify-center rounded-full bg-black text-white font-medium hover:bg-zinc-800 transition-colors"
                >
                    Return to Shop
                </Link>
            </div>
        );
    }

    const shipping = 15;
    const taxes = subtotal * 0.08;
    const total = subtotal + shipping + taxes;

    return (
        <div className="max-w-7xl mx-0 lg:mx-auto px-6 md:px-12 py-1 md:py-4 lg:py-24">
            <Link
                href="/"
                className="inline-flex lg:hidden items-center gap-2 text-zinc-500 hover:text-black mb-6 md:mb-8 transition-colors font-medium text-sm group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
            </Link>
            <div className="flex items-center gap-4 mb-8 md:mb-12">
                <h1 className="font-outfit text-4xl font-semibold tracking-tighter text-[#111]">
                    Shopping Cart
                </h1>
                <span className="bg-zinc-100 text-zinc-600 font-medium px-3 py-1 rounded-full text-sm">
                    {cart.length} items
                </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
                {/* Cart Items */}
                <div className="flex-1">
                    <div className="flex flex-col gap-8 ">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 md:gap-6 pb-8 border-b border-black/5 group">
                                <Link href={`/products/${item.id}`} className="relative w-24 sm:w-28 md:w-32 aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                </Link>

                                <div className="flex-1 flex flex-col py-1">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-4 sm:mb-0">
                                        <div className="pr-4 sm:pr-0">
                                            <Link href={`/products/${item.id}`} className="font-outfit font-medium text-base sm:text-lg text-[#111] leading-tight hover:underline underline-offset-4 decoration-black/20 block mb-1">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-zinc-500 capitalize">{item.category}</p>
                                        </div>
                                        <p className="font-semibold text-base sm:text-lg tabular-nums whitespace-nowrap">₹{item.price.toLocaleString("en-IN")}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        {/* Quantity Control */}
                                        <div className="flex items-center bg-zinc-50 rounded-full border border-zinc-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium tabular-nums">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href="/" className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black mt-8 transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Continue Shopping
                    </Link>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 mb-10 md:mb-0">
                    <div className="bg-white rounded-3xl p-8 sticky top-32 shadow-xl shadow-black/5 ring-1 ring-black/5">
                        <h2 className="font-outfit text-xl font-semibold mb-6">Order Summary</h2>

                        <div className="space-y-4 text-sm mb-6 border-b border-black/5 pb-6">
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Subtotal</span>
                                <span className="font-medium tabular-nums">₹{subtotal.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Shipping estimate</span>
                                <span className="font-medium tabular-nums">₹{shipping.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Tax estimate</span>
                                <span className="font-medium tabular-nums">₹{taxes.toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-8">
                            <span className="font-medium text-black">Total</span>
                            <span className="font-outfit text-2xl font-semibold tabular-nums text-black">
                                ₹{total.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full h-14 flex items-center justify-center gap-2 rounded-full bg-black text-white font-medium hover:bg-zinc-800 transition-colors shadow-lg shadow-black/10 active:scale-[0.98]"
                        >
                            Checkout
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
