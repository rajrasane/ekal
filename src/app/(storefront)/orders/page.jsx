"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Package } from "lucide-react";
import { getOrderHistory } from "@/lib/data";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadOrders() {
            try {
                const history = await getOrderHistory();
                setOrders(history);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadOrders();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case "processing":
                return <Clock size={16} className="text-amber-500" />;
            case "shipped":
                return <Package size={16} className="text-blue-500" />;
            case "delivered":
                return <CheckCircle2 size={16} className="text-emerald-500" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "processing":
                return "bg-amber-50 text-amber-700 border-amber-200/50";
            case "shipped":
                return "bg-blue-50 text-blue-700 border-blue-200/50";
            case "delivered":
                return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
            default:
                return "bg-zinc-100 text-zinc-500 border-zinc-200";
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24 animate-pulse">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-48 h-10 bg-zinc-200 rounded-lg"></div>
                    <div className="w-20 h-6 bg-zinc-100 rounded-full"></div>
                </div>
                <div className="space-y-8">
                    {[1, 2].map(i => (
                        <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-6 lg:p-8 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-zinc-100">
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                    <div>
                                        <div className="w-24 h-3 bg-zinc-100 rounded mb-2"></div>
                                        <div className="w-32 h-5 bg-zinc-200 rounded"></div>
                                    </div>
                                    <div>
                                        <div className="w-16 h-3 bg-zinc-100 rounded mb-2"></div>
                                        <div className="w-20 h-5 bg-zinc-200 rounded"></div>
                                    </div>
                                    <div>
                                        <div className="w-20 h-3 bg-zinc-100 rounded mb-2"></div>
                                        <div className="w-24 h-5 bg-zinc-200 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:items-end gap-2">
                                    <div className="w-32 h-4 bg-zinc-100 rounded"></div>
                                    <div className="w-24 h-7 bg-zinc-200 rounded-full"></div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {[1].map(j => (
                                    <div key={j} className="flex gap-6 items-center">
                                        <div className="w-20 md:w-24 aspect-[4/5] bg-zinc-100 rounded-lg shrink-0"></div>
                                        <div className="flex-1">
                                            <div className="w-1/3 h-5 bg-zinc-200 rounded mb-2"></div>
                                            <div className="w-1/4 h-3 bg-zinc-100 rounded mb-4"></div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-4 bg-zinc-200 rounded"></div>
                                                <div className="w-12 h-4 bg-zinc-100 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24">
            <div className="flex items-center gap-4 mb-12">
                <h1 className="font-outfit text-4xl font-semibold tracking-tighter text-[#111]">
                    Order History
                </h1>
                <span className="bg-zinc-100 text-zinc-600 font-medium px-3 py-1 rounded-full text-sm">
                    {orders.length} orders
                </span>
            </div>

            {orders.length === 0 ? (
                <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 lg:p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <Package className="w-12 h-12 text-zinc-300 mx-auto mb-4" strokeWidth={1.5} />
                    <h2 className="font-outfit text-xl font-medium text-[#111] mb-2">No orders yet</h2>
                    <p className="text-zinc-500 mb-8 max-w-xs mx-auto">
                        When you place orders, they will appear here so you can track their status.
                    </p>
                    <Link
                        href="/"
                        className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-black text-white font-medium hover:bg-zinc-800 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white border text-left border-zinc-200 rounded-2xl p-6 lg:p-8 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-zinc-100">
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                                    <div>
                                        <p className="text-zinc-500 font-medium tracking-wide">ORDER PLACED</p>
                                        <p className="text-[#111] font-medium mt-1">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 font-medium tracking-wide">TOTAL</p>
                                        <p className="text-[#111] font-medium mt-1 tabular-nums">₹{Number(order.total).toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 font-medium tracking-wide">SHIP TO</p>
                                        <p className="text-[#111] font-medium mt-1 block max-w-[150px] truncate" title={`${order.customer.firstName} ${order.customer.lastName}`}>
                                            {order.customer.firstName} {order.customer.lastName}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:items-end gap-2">
                                    <p className="text-sm text-zinc-500 font-mono">ORDER # {order.id.replace('ord_', '')}</p>
                                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-6 items-center">
                                        <Link href={`/products/${item.id}`} className="relative w-20 md:w-24 aspect-[4/5] bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                                            {/* Using img to avoid Next.js domain config issues for this mock up */}
                                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                        </Link>
                                        <div className="flex-1">
                                            <Link href={`/products/${item.id}`} className="font-outfit font-medium text-lg text-[#111] hover:underline underline-offset-4 decoration-black/20">
                                                {item.name}
                                            </Link>
                                            <p className="text-zinc-500 text-sm mt-1 mb-2 capitalize">{item.category}</p>
                                            <div className="flex items-center gap-4 text-sm font-medium">
                                                <span className="tabular-nums">₹{((item.price)/100).toFixed(2)}</span>
                                                <span className="text-zinc-400">Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
