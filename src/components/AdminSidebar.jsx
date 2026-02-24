"use client";
import Link from "next/link";
import React from "react";

export default function AdminSidebar() {
    return (
        <aside className="w-60 p-6 border-r h-screen bg-gray-50">
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Admin Panel</h3>
                <p className="text-sm text-gray-500">Manage the store</p>
            </div>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/admin" className="block py-2 px-3 rounded hover:bg-gray-100">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/admin/products" className="block py-2 px-3 rounded hover:bg-gray-100">Inventory</Link>
                    </li>
                    <li>
                        <Link href="/admin/orders" className="block py-2 px-3 rounded hover:bg-gray-100">Orders</Link>
                    </li>
                    <li>
                        <Link href="/admin/users" className="block py-2 px-3 rounded hover:bg-gray-100">Users</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
