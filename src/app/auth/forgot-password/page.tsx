"use client";

import { useState } from "react";
import Link from "next/link";

type Step = "request" | "sent";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<Step>("request");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 🔧 Replace with your Spring Boot backend URL
            const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.message || "Something went wrong. Please try again.");
                return;
            }

            setStep("sent");
        } catch {
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 px-4">
            <div className="w-full max-w-md">

                {/* ── Step 1 : Enter email ── */}
                {step === "request" && (
                    <>
                        {/* Icon + heading */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4 backdrop-blur-sm">
                                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Forgot password?</h1>
                            <p className="text-slate-400 mt-1 text-sm">
                                Enter your email and we&apos;ll send you a reset link
                            </p>
                        </div>

                        {/* Form card */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
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
                                    id="forgot-password-btn"
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
                                            Sending link…
                                        </>
                                    ) : (
                                        "Send reset link"
                                    )}
                                </button>
                            </form>

                            {/* Back to login */}
                            <p className="text-center text-sm text-slate-400 mt-6">
                                Remember your password?{" "}
                                <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </>
                )}

                {/* ── Step 2 : Email sent confirmation ── */}
                {step === "sent" && (
                    <>
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600/20 border border-green-500/30 mb-4 backdrop-blur-sm">
                                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Check your inbox</h1>
                            <p className="text-slate-400 mt-1 text-sm">
                                We sent a reset link to{" "}
                                <span className="text-purple-400 font-medium">{email}</span>
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-5">
                            <p className="text-slate-400 text-sm text-center leading-relaxed">
                                Click the link in the email to reset your password. If you don&apos;t see it, check your spam folder.
                            </p>

                            {/* Resend */}
                            <button
                                onClick={() => { setStep("request"); setError(""); }}
                                className="w-full py-3 rounded-xl border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200"
                            >
                                Try a different email
                            </button>

                            <p className="text-center text-sm text-slate-400">
                                <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                    ← Back to Sign in
                                </Link>
                            </p>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
