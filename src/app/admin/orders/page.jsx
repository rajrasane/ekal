"use client";
import React, { useEffect, useState } from "react";
import { getOrderHistory, updateOrderStatus } from "../../../lib/data";
import StatusBadge from "../../../components/StatusBadge";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => { getOrderHistory().then(setOrders); }, []);

    const setStatus = async (id, status) => {
        const updated = await updateOrderStatus(id, status);
        setOrders(o => o.map(x => x.id === updated.id ? updated : x));
    };

    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Order Management</h1>
            </div>

            <div className="mt-6 bg-white rounded shadow overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="text-left text-sm text-gray-600">
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {orders.map(o => (
                            <tr key={o.id} className={`border-t hover:bg-gray-50 transition-colors ${o.status === 'cancelled' ? 'bg-red-50' : ''}`}>
                                <td className="px-4 py-3">{o.id}</td>
                                <td className="px-4 py-3"><StatusBadge type={o.status} /></td>
                                <td className="px-4 py-3">¥{((o.total||0)/100).toFixed(2)}</td>
                                <td className="px-4 py-3">
                                    <select className="border rounded px-2 py-1 text-sm" value={o.status} onChange={(e)=>setStatus(o.id, e.target.value)}>
                                        <option value="processing">processing</option>
                                        <option value="shipped">shipped</option>
                                        <option value="delivered">delivered</option>
                                        <option value="cancelled">cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
