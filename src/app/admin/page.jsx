"use client";
import React, { useEffect, useState } from "react";
import { getOrderHistory, getUsers, getAllProducts } from "../../lib/data";

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getOrderHistory().then(setOrders).catch(() => setOrders([]));
        getUsers().then(setUsers).catch(() => setUsers([]));
        getAllProducts().then(setProducts).catch(() => setProducts([]));
    }, []);

    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const lowStockCount = products.filter(p => p.stock <= 5).length;

    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-6">
                <div className="p-5 bg-white rounded-lg shadow border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="mt-2 text-2xl font-semibold">¥{(totalSales/100).toFixed(2)}</p>
                </div>
                <div className="p-5 bg-white rounded-lg shadow border-l-4 border-purple-500">
                    <p className="text-sm text-gray-500">Orders</p>
                    <p className="mt-2 text-2xl font-semibold">{orders.length}</p>
                </div>
                <div className="p-5 bg-white rounded-lg shadow border-l-4 border-green-500">
                    <p className="text-sm text-gray-500">Users</p>
                    <p className="mt-2 text-2xl font-semibold">{users.length}</p>
                </div>
                <div className="p-5 bg-white rounded-lg shadow border-l-4 border-red-500">
                    <p className="text-sm text-gray-500">Low Stock ({lowStockCount})</p>
                    <p className="mt-2 text-2xl font-semibold">{lowStockCount}</p>
                </div>
            </div>

            <section className="mt-8">
                <h2 className="text-lg font-medium">Inventory Overview</h2>
                <p className="text-sm text-gray-600 mt-2">{products.length} products in catalog</p>
            </section>
        </section>
    );
}
