"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

export function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token") ?? "";

    const [form, setForm] = useState({ password: "", confirm: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }
        if (!token) {
            setError("Invalid or missing reset token.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password: form.password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message ?? "Reset failed.");
            setSuccess(true);
            setTimeout(() => router.push("/login"), 2500);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
                <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative w-full max-w-[420px] mx-4"
            >
                <div className="p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                                <VertexMark size={24} color="white" />
                            </div>
                        </div>
                        {!success ? (
                            <>
                                <h1 className="text-white text-[22px] font-semibold tracking-[-0.02em] mb-1.5">Set new password</h1>
                                <p className="text-neutral-500 text-[14px]">Choose a strong password for your account.</p>
                            </>
                        ) : (
                            <>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="flex justify-center mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400"><path d="M22 4 12 14.01l-3-3" /></svg>
                                    </div>
                                </motion.div>
                                <h1 className="text-white text-[22px] font-semibold mb-2">Password Reset!</h1>
                                <p className="text-neutral-400 text-[14px]">Your password has been updated. Redirecting to login…</p>
                            </>
                        )}
                    </div>

                    {!success && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">New Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full h-11 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-violet-500/30 focus:bg-white/[0.05] focus:outline-none transition-all"
                                    placeholder="Min. 8 characters"
                                />
                            </div>
                            <div>
                                <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    required
                                    value={form.confirm}
                                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                    className="w-full h-11 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-violet-500/30 focus:bg-white/[0.05] focus:outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/[0.06]">
                                    <p className="text-amber-400 text-[12px] text-center">{error}</p>
                                </motion.div>
                            )}

                            <button type="submit" disabled={loading} className="w-full h-11 bg-white text-neutral-950 text-[14px] font-medium rounded-xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                                {loading ? <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-950 rounded-full animate-spin" /> : "Reset Password"}
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center mt-6 text-[13px] text-neutral-500">
                    Remember your password?{" "}
                    <Link href="/login" className="text-white hover:text-violet-400 transition-colors font-medium">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
}
