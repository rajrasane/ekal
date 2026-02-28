"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts, createProduct, updateProduct, deleteProduct, subscribeProducts } from "../../../lib/data";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name:'', price:0, stock:0, category:'home' });
    const [editingId, setEditingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState(null);

    const load = async () => {
        setLoading(true);
        const p = await getAllProducts();
        setProducts(p);
        setLoading(false);
    };

    useEffect(() => {
        load();
        // subscribe for real-time updates
        const unsubscribe = subscribeProducts(setProducts);
        return () => unsubscribe();
    }, []);

    const [submitting, setSubmitting] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const newP = await createProduct({ ...form, price: Number(form.price), stock: Number(form.stock), images: [] });
            setProducts(prev => [newP, ...prev]);
            setForm({ name:'', price:0, stock:0, category:'home' });
        } catch (err) {
            setError(`Failed to create product: ${err.message || 'Unknown error'}`);
            console.error('Create product error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const startEdit = (p) => {
        setEditingId(p.id);
        setForm({ name:p.name, price:p.price, stock:p.stock, category:p.category });
    };

    const saveEdit = async (e) => {
        e.preventDefault();
        const updated = await updateProduct(editingId, { ...form, price: Number(form.price), stock: Number(form.stock) });
        setProducts(products.map(p => p.id === updated.id ? updated : p));
        setEditingId(null);
        setForm({ name:'', price:0, stock:0, category:'home' });
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this product?')) return;
        setDeletingId(id);
        setError(null);
        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            setError(`Failed to delete product: ${err.message || 'Product not found'}`);
            console.error('Delete error:', err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Product Management</h1>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white border border-gray-200 p-6 rounded-lg shadow">
                    <form onSubmit={editingId ? saveEdit : handleCreate} className="space-y-3">
                        <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
                        <input className="w-full border rounded px-3 py-2" placeholder="Price (cents)" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
                        <input className="w-full border rounded px-3 py-2" placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} />
                        <select className="w-full border rounded px-3 py-2" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
                            <option value="home">Home</option>
                            <option value="furniture">Furniture</option>
                            <option value="lighting">Lighting</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                        </select>
                        <div className="flex gap-2">
                            <button
                                className={`px-4 py-2 text-white rounded ${editingId ? 'bg-blue-600' : 'bg-green-600'} ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={submitting}
                            >
                                {editingId ? 'Save' : submitting ? 'Creating...' : 'Create'}
                            </button>
                            {editingId && <button type="button" onClick={()=>{setEditingId(null); setForm({name:'',price:0,stock:0,category:'home'})}} className="px-4 py-2 border rounded">Cancel</button>}
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-2 bg-white p-4 rounded shadow overflow-auto">
                    <h3 className="text-lg font-medium mb-3">Products</h3>
                    {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
                    {loading ? <p>Loading…</p> : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="text-left text-sm text-gray-600">
                                    <th className="px-3 py-2">Name</th>
                                    <th className="px-3 py-2">Price</th>
                                    <th className="px-3 py-2">Stock</th>
                                    <th className="px-3 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {products.map(p => (
                                    <tr key={p.id} className="border-t">
                                        <td className="px-3 py-3">{p.name}</td>
                                        <td className="px-3 py-3">₹{(p.price/100).toFixed(2)}</td>
                                        <td className={`px-3 py-3 ${p.stock === 0 ? 'text-red-600' : p.stock < 5 ? 'text-yellow-600' : ''}`}>{p.stock}</td>
                                        <td className="px-3 py-3">
                                            <button className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded" onClick={()=>startEdit(p)}>Edit</button>
                                            <button className={`text-sm px-2 py-1 rounded ml-2 ${deletingId === p.id ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-600'}`} onClick={()=>handleDelete(p.id)} disabled={deletingId === p.id}>{deletingId === p.id ? 'Deleting...' : 'Delete'}</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </section>
    );
}
