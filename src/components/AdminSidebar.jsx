"use client";
import Link from "next/link";
import React from "react";

export default function AdminSidebar() {
    return (
        <aside className="w-60 p-6 h-screen bg-gray-800 text-white">
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Admin Panel</h3>
                
            </div>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/admin" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/admin/products" className="block py-2 px-3 rounded hover:bg-gray-700">Products</Link>
                    </li>
                    <li>
                        <Link href="/admin/orders" className="block py-2 px-3 rounded hover:bg-gray-700">Orders</Link>
                    </li>
                    <li>
                        <Link href="/admin/users" className="block py-2 px-3 rounded hover:bg-gray-700">Users</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
