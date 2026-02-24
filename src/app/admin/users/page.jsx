"use client";
import React, { useEffect, useState } from "react";
import { getUsers, updateUserRole } from "../../../lib/data";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => { getUsers().then(setUsers); }, []);

    const changeRole = async (id, role) => {
        const updated = await updateUserRole(id, role);
        setUsers(u => u.map(x => x.id === updated.id ? updated : x));
    };

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
                                    <select className="border rounded px-2 py-1 text-sm" value={u.role} onChange={(e)=>changeRole(u.id, e.target.value)}>
                                        <option value="admin">admin</option>
                                        <option value="customer">customer</option>
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
