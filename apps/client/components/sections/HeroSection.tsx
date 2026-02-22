"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.15 + i * 0.12,
            duration: 0.7,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    }),
};

export function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Subtle grid background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(var(--color-neutral-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-400) 1px, transparent 1px)`,
                        backgroundSize: "80px 80px",
                    }}
                />
                {/* Radial glow */}
                <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-accent-500/[0.04] blur-[120px]" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent-500/[0.02] blur-[100px]" />
            </div>

            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full pt-24 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    {/* Left — Main content */}
                    <div className="lg:col-span-7">
                        <motion.div
                            custom={0}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                            <span className="text-[12px] text-neutral-400 tracking-wide uppercase">
                                Digital Platform & Services
                            </span>
                        </motion.div>

                        <motion.h1
                            custom={1}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-6"
                        >
                            Social platform &amp; engineering services,{" "}
                            <span className="text-neutral-500">built with precision.</span>
                        </motion.h1>

                        <motion.p
                            custom={2}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-neutral-400 text-[17px] leading-relaxed max-w-[540px] mb-10"
                        >
                            Xynoos Vertex delivers a social media platform with integrated
                            cloud storage, alongside professional services in PCB design,
                            3D modeling, and{" "}
                            <span className="text-neutral-200">
                                web development for businesses of all sizes.
                            </span>
                        </motion.p>

                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link
                                href="/product"
                                className="inline-flex items-center justify-center h-11 px-7 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all duration-300"
                            >
                                Explore Products
                            </Link>
                            <Link
                                href="/vision"
                                className="inline-flex items-center justify-center h-11 px-7 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300"
                            >
                                Our Vision
                                <svg
                                    className="ml-2 w-3.5 h-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right — Geometric visual element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
                        className="lg:col-span-5 flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-[400px] aspect-square">
                            {/* Outer ring */}
                            <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
                            {/* Mid ring */}
                            <div className="absolute inset-[15%] rounded-full border border-white/[0.06]" />
                            {/* Inner ring */}
                            <div className="absolute inset-[30%] rounded-full border border-white/[0.08]" />
                            {/* Core */}
                            <div className="absolute inset-[42%] rounded-full bg-gradient-to-br from-accent-500/20 to-accent-600/10 border border-accent-500/20" />
                            {/* Center dot */}
                            <div className="absolute inset-[47%] rounded-full bg-accent-400/60" />

                            {/* Orbital dots */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-400/40" />
                            </motion.div>
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[15%]"
                            >
                                <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 rounded-full bg-white/20" />
                            </motion.div>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[30%]"
                            >
                                <div className="absolute top-1/4 right-0 w-1 h-1 rounded-full bg-neutral-400/30" />
                            </motion.div>

                            {/* Labels */}
                            <div className="absolute top-[12%] right-[5%] text-[10px] text-neutral-600 font-mono tracking-wider">
                                SOCIAL
                            </div>
                            <div className="absolute bottom-[25%] left-[2%] text-[10px] text-neutral-600 font-mono tracking-wider">
                                CLOUD
                            </div>
                            <div className="absolute bottom-[8%] right-[15%] text-[10px] text-neutral-600 font-mono tracking-wider">
                                SERVICES
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom border line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1], delay: 0.8 }}
                    className="mt-20 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent origin-left"
                />
            </div>
        </section>
    );
}
