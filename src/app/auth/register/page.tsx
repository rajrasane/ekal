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
            // 🔧 Replace with your Spring Boot backend URL
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

            // Spring Boot typically returns { token: "...", user: {...} }
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4 backdrop-blur-sm">
                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create account</h1>
                    <p className="text-slate-400 mt-1 text-sm">Sign up to get started today</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full name</label>
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/60 transition-all text-sm"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
                            <input
                                id="register-email"
                                type="email"
                                autoComplete="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/60 transition-all text-sm"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <input
                                id="register-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="Min. 6 characters"
                                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/60 transition-all text-sm"
                            />
                            {/* Strength bar */}
                            {form.password.length > 0 && (
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 rounded-full ${strengthColor}`}
                                            style={{ width: `${(strength / 3) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-400">{strengthLabel}</span>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm password</label>
                            <input
                                id="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-xl bg-white/8 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all text-sm ${form.confirm && form.password !== form.confirm
                                        ? "border-red-500/50 focus:ring-red-500/40"
                                        : "border-white/10 focus:ring-purple-500/60 focus:border-purple-500/60"
                                    }`}
                            />
                            {form.confirm && form.password !== form.confirm && (
                                <p className="text-xs text-red-400 mt-1.5">Passwords don&apos;t match</p>
                            )}
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            id="register-btn"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 mt-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
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

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
