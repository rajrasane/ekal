"use client";
import React from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-white">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
