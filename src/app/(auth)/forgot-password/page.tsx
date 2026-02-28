"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

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
        <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 px-4 py-12">
            <div className="w-full max-w-md">

                {step === "request" && (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="font-outfit text-3xl font-semibold text-[#111] tracking-tight">Forgot password?</h1>
                            <p className="text-zinc-500 mt-2 text-sm">
                                Enter your email and we&apos;ll send you a reset link
                            </p>
                        </div>

                        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
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
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                                    />
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
                                    id="forgot-password-btn"
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
                                            Sending link…
                                        </>
                                    ) : (
                                        "Send reset link"
                                    )}
                                </button>
                            </form>

                            <p className="text-center text-sm text-zinc-500 mt-8">
                                Remember your password?{" "}
                                <Link href="/login" className="text-black hover:underline underline-offset-4 font-medium transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </>
                )}

                {step === "sent" && (
                    <>
                        <div className="text-center mb-8 flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500">
                                <CheckCircle2 size={32} strokeWidth={1.5} />
                            </div>
                            <h1 className="font-outfit text-3xl font-semibold text-[#111] tracking-tight">Check your inbox</h1>
                            <p className="text-zinc-500 mt-2 text-sm">
                                We sent a reset link to{" "}
                                <span className="text-black font-medium">{email}</span>
                            </p>
                        </div>

                        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm space-y-6">
                            <p className="text-zinc-600 text-sm text-center leading-relaxed">
                                Click the link in the email to reset your password. If you don&apos;t see it, check your spam folder.
                            </p>

                            <button
                                onClick={() => { setStep("request"); setError(""); }}
                                className="w-full h-12 flex items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-black font-medium transition-colors"
                            >
                                Try a different email
                            </button>

                            <p className="text-center text-sm text-zinc-500">
                                <Link href="/login" className="text-black hover:underline underline-offset-4 font-medium transition-colors">
                                    &larr; Back to Sign in
                                </Link>
                            </p>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
