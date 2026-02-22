"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

export function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setTimeout(() => {
            setLoading(false);
            setError("This is a demo. Authentication is coming soon.");
        }, 1500);
    };

    return (
        <div className="min-h-[calc(100vh-56px)] flex relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/[0.03] blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.02] blur-[120px]" />
            </div>

            {/* Left — Social / branding panel */}
            <div className="hidden lg:flex lg:w-[45%] relative items-center justify-center">
                <div className="relative z-10 max-w-[380px] px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <div className="flex items-center gap-2.5 mb-8">
                            <VertexMark size={28} color="white" />
                            <span className="text-white font-semibold text-[18px] tracking-tight">Xynoos<span className="text-neutral-500 ml-0.5">Vertex</span></span>
                        </div>

                        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-white leading-[1.2] mb-4">
                            Welcome back to the future of engineering.
                        </h2>
                        <p className="text-neutral-400 text-[15px] leading-[1.7] mb-10">
                            Sign in to access your projects, track orders, and collaborate with our engineering team. Your ideas deserve a space.
                        </p>

                        {/* Social media */}
                        <div className="space-y-3">
                            <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.15em]">Join our community</p>
                            <div className="flex items-center gap-3">
                                <a href="https://instagram.com/xynoos.vertex" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.05] transition-all group" aria-label="Instagram">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                                </a>
                                <a href="https://linkedin.com/company/xynoos" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.05] transition-all group" aria-label="LinkedIn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                                <a href="https://youtube.com/@xynoos" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.05] transition-all group" aria-label="YouTube">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                </a>
                                <a href="https://github.com/xynoos" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.05] transition-all group" aria-label="GitHub">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                </a>
                            </div>
                            <p className="text-neutral-600 text-[12px] mt-2">Follow us for updates, tutorials, and engineering insights.</p>
                        </div>

                        {/* Testimonial-style quote */}
                        <div className="mt-10 p-5 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                            <p className="text-neutral-300 text-[13px] leading-[1.7] italic">&ldquo;Xynoos Vertex transforms how we approach IoT prototyping. From PCB to firmware — everything in one ecosystem.&rdquo;</p>
                            <div className="flex items-center gap-2 mt-3">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/30 to-emerald-500/30" />
                                <span className="text-neutral-500 text-[11px]">Engineering Community</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
                {/* Vertical divider */}
                <div className="absolute right-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
            </div>

            {/* Right — Form */}
            <div className="flex-1 flex items-center justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                    className="relative w-full max-w-[400px] mx-6"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                                <VertexMark size={24} color="white" />
                            </div>
                        </div>
                        <h1 className="text-white text-[22px] font-semibold tracking-[-0.02em] mb-1.5">Welcome back</h1>
                        <p className="text-neutral-500 text-[14px]">Sign in to your Vertex account</p>
                    </div>

                    {/* Desktop heading */}
                    <div className="hidden lg:block mb-8">
                        <h1 className="text-white text-[22px] font-semibold tracking-[-0.02em] mb-1.5">Sign in</h1>
                        <p className="text-neutral-500 text-[14px]">Enter your credentials to continue</p>
                    </div>

                    {/* Follow us on social */}
                    <div className="mb-6">
                        <p className="text-neutral-600 text-[11px] uppercase tracking-[0.1em] text-center mb-3">Follow us on social media</p>
                        <div className="grid grid-cols-4 gap-2">
                            <a href="https://instagram.com/xynoos.vertex" target="_blank" rel="noopener noreferrer" className="h-11 flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-[12px] text-neutral-400 hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-white transition-all" aria-label="Instagram">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /></svg>
                            </a>
                            <a href="https://linkedin.com/company/xynoos" target="_blank" rel="noopener noreferrer" className="h-11 flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-[12px] text-neutral-400 hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-white transition-all" aria-label="LinkedIn">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="https://youtube.com/@xynoos" target="_blank" rel="noopener noreferrer" className="h-11 flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-[12px] text-neutral-400 hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-white transition-all" aria-label="YouTube">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                            <a href="https://github.com/xynoos" target="_blank" rel="noopener noreferrer" className="h-11 flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-[12px] text-neutral-400 hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-white transition-all" aria-label="GitHub">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-white/[0.06]" />
                        <span className="text-neutral-600 text-[11px] uppercase tracking-[0.1em]">sign in with email</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Email</label>
                            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-11 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-blue-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="you@company.com" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em]">Password</label>
                                <Link href="/forgot-password" className="text-[11px] text-blue-400/70 hover:text-blue-400 transition-colors">Forgot password?</Link>
                            </div>
                            <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full h-11 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-blue-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="••••••••" />
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/[0.06]">
                                <p className="text-amber-400 text-[12px] text-center">{error}</p>
                            </motion.div>
                        )}

                        <button type="submit" disabled={loading} className="w-full h-11 bg-white text-neutral-950 text-[14px] font-medium rounded-xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                            {loading ? <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-950 rounded-full animate-spin" /> : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-[13px] text-neutral-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-white hover:text-blue-400 transition-colors font-medium">Create one</Link>
                    </p>

                    {/* Mobile social links */}
                    <div className="lg:hidden mt-8 pt-6 border-t border-white/[0.06]">
                        <p className="text-[11px] font-semibold text-neutral-600 uppercase tracking-[0.15em] text-center mb-3">Follow us</p>
                        <div className="flex items-center justify-center gap-3">
                            <a href="https://instagram.com/xynoos.vertex" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/[0.15] transition-all" aria-label="Instagram">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /></svg>
                            </a>
                            <a href="https://linkedin.com/company/xynoos" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/[0.15] transition-all" aria-label="LinkedIn">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="https://youtube.com/@xynoos" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/[0.15] transition-all" aria-label="YouTube">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                            <a href="https://github.com/xynoos" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/[0.15] transition-all" aria-label="GitHub">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
