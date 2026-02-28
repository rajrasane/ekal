"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken, saveUser, isAuthenticated } from "@/lib/auth";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) router.replace("/dashboard");
    }, [router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed. Please try again.");
                return;
            }

            saveToken(data.token);
            if (data.user) saveUser(data.user);

            router.push("/dashboard");
        } catch {
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const strength =
        form.password.length === 0
            ? 0
            : form.password.length < 6
                ? 1
                : form.password.length < 10
                    ? 2
                    : 3;

    const strengthLabel = ["", "Weak", "Good", "Strong"][strength];
    const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-green-500"][strength];

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="font-outfit text-3xl font-semibold text-[#111] tracking-tight">Create account</h1>
                    <p className="text-zinc-500 mt-2 text-sm">Sign up to get started today</p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">Full name</label>
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Rahul Sharma"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">Email address</label>
                            <input
                                id="register-email"
                                type="email"
                                autoComplete="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">Password</label>
                            <input
                                id="register-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="Min. 6 characters"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                            />
                            {form.password.length > 0 && (
                                <div className="mt-3 flex items-center gap-3">
                                    <div className="flex-1 h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 rounded-full ${strengthColor}`}
                                            style={{ width: `${(strength / 3) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-zinc-500 w-12 text-right">{strengthLabel}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">Confirm password</label>
                            <input
                                id="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-xl border bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-colors ${form.confirm && form.password !== form.confirm
                                    ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                                    : "border-zinc-200 focus:ring-black/10 focus:border-black"
                                    }`}
                            />
                            {form.confirm && form.password !== form.confirm && (
                                <p className="text-xs font-medium text-red-500 mt-2">Passwords don&apos;t match</p>
                            )}
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm">
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <button
                            id="register-btn"
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 flex items-center justify-center rounded-xl bg-black text-white font-medium hover:bg-zinc-800 disabled:opacity-50 transition-colors shadow-md active:scale-[0.98] mt-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating account…
                                </>
                            ) : (
                                "Create account"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-zinc-500 mt-8">
                        Already have an account?{" "}
                        <Link href="/login" className="text-black hover:underline underline-offset-4 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
