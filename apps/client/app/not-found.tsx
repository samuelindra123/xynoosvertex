"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
            {/* Fragmented grid background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(var(--color-neutral-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-400) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
                {/* Glitch-displaced grid fragment */}
                <div
                    className="absolute top-[20%] left-[30%] w-[300px] h-[200px] opacity-[0.04] rotate-3"
                    style={{
                        backgroundImage: `linear-gradient(var(--color-accent-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent-400) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                        backgroundPosition: "15px 15px",
                    }}
                />
                {/* Radial glows */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-500/[0.04] blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-red-500/[0.03] blur-[100px]" />
            </div>

            {/* Broken geometry SVG */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <svg width="500" height="500" viewBox="0 0 500 500" fill="none" className="opacity-[0.04]">
                    {/* Broken circle fragments */}
                    <path d="M250 50 A200 200 0 0 1 420 180" stroke="white" strokeWidth="1" />
                    <path d="M430 200 A200 200 0 0 1 380 400" stroke="white" strokeWidth="0.8" />
                    <path d="M80 350 A200 200 0 0 1 70 200" stroke="white" strokeWidth="0.6" />
                    {/* Displaced triangles */}
                    <path d="M200 160 L260 160 L230 110 Z" stroke="white" strokeWidth="0.5" fill="none" transform="translate(5, -3) rotate(2 230 140)" />
                    <path d="M300 300 L360 340 L310 360 Z" stroke="white" strokeWidth="0.5" fill="none" transform="translate(-8, 5) rotate(-3 330 330)" />
                    {/* Cross marks */}
                    <line x1="240" y1="240" x2="260" y2="260" stroke="white" strokeWidth="0.8" opacity="0.3" />
                    <line x1="260" y1="240" x2="240" y2="260" stroke="white" strokeWidth="0.8" opacity="0.3" />
                    {/* Scattered dots */}
                    <circle cx="150" cy="150" r="2" fill="white" opacity="0.15" />
                    <circle cx="350" cy="130" r="1.5" fill="white" opacity="0.1" />
                    <circle cx="130" cy="350" r="2" fill="white" opacity="0.12" />
                    <circle cx="380" cy="280" r="1.5" fill="white" opacity="0.08" />
                </svg>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Error code — large, fragmented */}
                    <div className="relative mb-8">
                        <span className="text-[clamp(8rem,20vw,14rem)] font-bold text-white/[0.03] leading-none tracking-tighter select-none block">
                            404
                        </span>
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(3rem,8vw,5rem)] font-bold text-white/[0.08] leading-none tracking-tighter select-none"
                            style={{ transform: "translate(-46%, -48%) rotate(-1deg)" }}
                        >
                            404
                        </motion.span>
                    </div>

                    {/* Accent line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="w-12 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent mx-auto mb-8"
                    />

                    <h1 className="text-white text-[22px] md:text-[28px] font-semibold tracking-[-0.02em] mb-3">
                        Page not found
                    </h1>
                    <p className="text-neutral-500 text-[15px] leading-relaxed max-w-[400px] mx-auto mb-10">
                        The route you&apos;re looking for doesn&apos;t exist in this system.
                        It may have been moved, removed, or never existed.
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center h-11 px-7 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all duration-300"
                        >
                            Return Home
                        </Link>
                        <Link
                            href="/platform"
                            className="inline-flex items-center justify-center h-11 px-7 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300"
                        >
                            View Platform
                        </Link>
                    </div>

                    {/* Logo mark */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex items-center justify-center gap-2.5 text-neutral-700"
                    >
                        <VertexMark size={16} color="currentColor" />
                        <span className="text-[11px] font-mono tracking-[0.15em] uppercase">
                            Xynoos Vertex
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
