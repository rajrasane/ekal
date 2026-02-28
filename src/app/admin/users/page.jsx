"use client";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../../lib/data";
import StatusBadge from "../../../components/StatusBadge";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => { getUsers().then(setUsers); }, []);

    // roles come from login/user data; this panel is read‑only.

    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">User Management</h1>
            </div>

            <div className="mt-6 bg-white rounded shadow overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="text-left text-sm text-gray-600">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {users.map(u => (
                            <tr key={u.id} className="border-t">
                                <td className="px-4 py-3">{u.name}</td>
                                <td className="px-4 py-3">{u.email}</td>
                                <td className="px-4 py-3">
                                    <StatusBadge type={u.role} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
