"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/lib/data";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, subtotal, clearCart, isLoaded } = useCart();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "India",
        postalCode: ""
    });

    // Calculate totals
    const shipping = 500;
    const taxes = Math.round(subtotal * 0.18); // Example 18% GST
    const total = subtotal + shipping + taxes;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const order = await placeOrder({
                customer: formData,
                items: cart,
                total: total
            });
            setOrderId(order.id);
            setSuccess(true);
            clearCart();
        } catch (err) {
            console.error(err);
            alert("There was an error processing your order.");
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded) return null;

    useEffect(() => {
        if (success) {
            window.scrollTo(0, 0);
        }
    }, [success]);

    if (success) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-32 text-center min-h-[70vh] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 text-green-500">
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                </div>
                <h1 className="font-outfit text-4xl font-semibold mb-4 text-[#111]">Order Confirmed</h1>
                <p className="text-zinc-500 mb-2">Thank you for your purchase!</p>
                <p className="text-sm font-mono text-zinc-400 mb-10">Order ID: {orderId}</p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto sm:max-w-none justify-center">
                    <button
                        onClick={() => router.push("/orders")}
                        className="h-12 px-6 rounded-full bg-black text-white font-medium hover:bg-zinc-800 transition-colors w-full sm:w-auto"
                    >
                        View Order History
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="h-12 px-6 rounded-full border border-zinc-200 font-medium hover:bg-zinc-50 transition-colors w-full sm:w-auto"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        router.push("/cart");
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-1 md:py-4 lg:py-24">
            <button
                onClick={() => router.push("/cart")}
                className="flex items-center gap-2 text-zinc-500 hover:text-black mb-8 transition-colors font-medium text-sm group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Cart
            </button>

            <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
                {/* Checkout Form */}
                <div className="flex-1 pb-12">
                    <h1 className="font-outfit text-3xl font-semibold mb-8 text-[#111]">Checkout</h1>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-lg font-medium text-black mb-4">Contact Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div>
                            <h2 className="text-lg font-medium text-black mb-4">Shipping Address</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        placeholder="First name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        placeholder="Last name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="Street address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                                />
                                <div className="grid grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="col-span-1 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                                    />
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="col-span-1 border border-zinc-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors appearance-none"
                                    >
                                        <option value="India">India</option>
                                    </select>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        placeholder="ZIP / Postal code"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="col-span-1 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="w-full lg:w-[340px] xl:w-[420px] shrink-0 border-t lg:border-t-0 border-zinc-200/60 pt-10 lg:pt-0 mb-10 md:mb-0">
                    <div className="bg-white rounded-3xl p-6 md:p-8 sticky top-32 shadow-xl shadow-black/5 ring-1 ring-black/5">
                        <h3 className="font-outfit font-semibold text-lg mb-6">In your cart</h3>

                        <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-200">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="relative w-16 aspect-square rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-zinc-500/80 backdrop-blur-sm text-white flex items-center justify-center rounded-full text-[10px] font-bold z-10">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm text-[#111] line-clamp-1">{item.name}</p>
                                        <p className="text-zinc-500 text-xs mt-0.5">{item.category}</p>
                                    </div>
                                    <p className="font-medium text-sm tabular-nums text-black shrink-0">
                                        ₹{((item.price * item.quantity)/100).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 text-sm mb-6 border-t border-black/5 pt-6">
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Subtotal</span>
                                <span className="tabular-nums">₹{(subtotal/100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Shipping</span>
                                <span className="tabular-nums">₹{(shipping/100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Taxes (GST)</span>
                                <span className="tabular-nums">₹{(taxes/100).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-black/5 pt-6">
                            <span className="font-medium text-black">Total</span>
                            <span className="font-outfit text-2xl font-semibold tabular-nums text-black">
                                ₹{(total/100).toFixed(2)}
                            </span>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                onClick={handleSubmit}
                                className="w-full h-14 flex items-center justify-center rounded-xl bg-black text-white font-medium hover:bg-zinc-800 disabled:opacity-50 transition-colors shadow-lg active:scale-[0.98]"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : `Pay ₹${total.toLocaleString("en-IN")}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
