"use client";
import React from "react";

// Simple badge component for various statuses (order or role)
export default function StatusBadge({ type }) {
    let bg = "bg-gray-200";
    let text = "text-gray-800";

    switch (type) {
        case "admin":
            bg = "bg-green-100";
            text = "text-green-800";
            break;
        case "customer":
            bg = "bg-blue-100";
            text = "text-blue-800";
            break;
        case "processing":
            bg = "bg-yellow-100";
            text = "text-yellow-800";
            break;
        case "shipped":
            bg = "bg-blue-100";
            text = "text-blue-800";
            break;
        case "cancelled":
            bg = "bg-red-100";
            text = "text-red-800";
            break;
        case "delivered":
            bg = "bg-green-100";
            text = "text-green-800";
            break;
        default:
            break;
    }

    return (
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${bg} ${text}`}> 
            {type}
        </span>
    );
}
