"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VertexMark } from "@/components/system/VertexLogo";

const SUGGESTED = [
    { label: "Feed", href: "/feed", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" /><path d="M9 21V12h6v9" /></svg> },
    { label: "Profile", href: "/feed/profile", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
    { label: "Explore", href: "/feed/explore", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg> },
];

export default function FeedNotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(8);

    useEffect(() => {
        const t = setInterval(() => setCountdown(c => c - 1), 1000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (countdown <= 0) router.replace("/feed");
    }, [countdown, router]);

    return (
        <div className="flex-1 min-h-screen flex items-center justify-center px-6 bg-[#080808]">
            {/* Subtle ambient */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md text-center"
            >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-neutral-500">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                {/* Code */}
                <p className="text-[11px] font-mono text-emerald-500/70 tracking-[0.18em] uppercase mb-3">Error 404</p>

                {/* Title */}
                <h1 className="text-white text-[24px] font-semibold tracking-[-0.02em] mb-2">
                    Page not found
                </h1>
                <p className="text-neutral-500 text-[14px] leading-relaxed mb-8">
                    This page doesn&apos;t exist or was removed.<br />
                    Redirecting to feed in <span className="text-white font-medium tabular-nums">{countdown}s</span>
                </p>

                {/* Progress bar */}
                <div className="w-full h-px bg-white/[0.05] rounded-full mb-8 overflow-hidden">
                    <motion.div
                        className="h-full bg-emerald-500/40 rounded-full"
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 8, ease: "linear" }}
                    />
                </div>

                {/* Primary CTA */}
                <Link
                    href="/feed"
                    className="inline-flex items-center gap-2 h-10 px-6 bg-white text-neutral-950 text-[13px] font-semibold rounded-xl hover:bg-neutral-100 transition-all mb-6"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" /></svg>
                    Back to Feed
                </Link>

                {/* Suggested pages */}
                <div className="mt-6">
                    <p className="text-[11px] text-neutral-600 uppercase tracking-widest mb-3">Or go to</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                        {SUGGESTED.map(s => (
                            <Link key={s.href} href={s.href}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:text-white hover:border-white/[0.1] hover:bg-white/[0.04] text-[12px] transition-all">
                                {s.icon}
                                {s.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Branding */}
                <div className="flex items-center justify-center gap-2 text-neutral-700 mt-10">
                    <VertexMark size={13} color="currentColor" />
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase">Xynoos Social</span>
                </div>
            </motion.div>
        </div>
    );
}
