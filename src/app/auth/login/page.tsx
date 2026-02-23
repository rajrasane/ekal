"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken, saveUser, isAuthenticated } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) router.replace("/dashboard");
    }, [router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 🔧 Replace with your Spring Boot backend URL
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Invalid email or password.");
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 px-4">
            {/* Card */}
            <div className="w-full max-w-md">
                {/* Logo / Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4 backdrop-blur-sm">
                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
                    <p className="text-slate-400 mt-1 text-sm">Sign in to your account to continue</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Email address
                            </label>
                            <input
                                id="email"
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
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-medium text-slate-300">Password</label>
                                <Link href="/auth/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/60 transition-all text-sm"
                            />
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
                            id="login-btn"
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
                                    Signing in…
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-slate-500 text-xs">New here?</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <p className="text-center text-sm text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
