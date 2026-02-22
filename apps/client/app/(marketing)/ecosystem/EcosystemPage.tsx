"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";

const modules = [
    {
        title: "Social Platform",
        description:
            "Privacy-first social media with feeds, messaging, and communities. Built for authentic human connection.",
        status: "Available",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: "Cloud Storage",
        description:
            "Encrypted file hosting and media CDN integrated into the social platform. Your data stays yours.",
        status: "Available",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
        ),
    },
    {
        title: "PCB Design",
        description:
            "Professional schematic capture, multi-layer layout, and production-ready Gerber file generation.",
        status: "Available",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M7 7h2v2H7zm6 0h2v2h-2zm-6 6h2v2H7zm6 6h2v2h-2z" />
                <path d="M9 8h4M8 13h7" />
            </svg>
        ),
    },
    {
        title: "3D Modeling",
        description:
            "Precision 3D modeling, rendering, and visualization for product design and prototyping.",
        status: "Available",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="M3.27 6.96L12 12.01l8.73-5.05" />
                <path d="M12 22.08V12" />
            </svg>
        ),
    },
    {
        title: "Web Development",
        description:
            "Full-stack website and web app development for commercial and non-profit organizations.",
        status: "Available",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 18l6-6-6-6" />
                <path d="M8 6l-6 6 6 6" />
            </svg>
        ),
    },
    {
        title: "Mobile Apps",
        description:
            "Native iOS and Android apps for the Xynoos Social platform. Coming soon with full feature parity.",
        status: "Beta",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
    },
];

const roadmap = [
    {
        quarter: "Q1 2026",
        items: ["Mobile App Beta", "Enhanced Cloud Storage", "Portfolio Showcase"],
        status: "In Progress",
    },
    {
        quarter: "Q2 2026",
        items: ["Video Calling", "E-commerce Templates", "Design Marketplace"],
        status: "Planned",
    },
    {
        quarter: "Q3 2026",
        items: ["Mobile App GA", "Community Plugins", "IoT Design Services"],
        status: "Planned",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.08,
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    }),
};

export function EcosystemPage() {
    return (
        <PageLayout>
            {/* ── Hero with network visual ── */}
            <section className="relative min-h-[60vh] flex items-end overflow-hidden">
                {/* Hex grid background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`,
                            backgroundSize: "32px 32px",
                        }}
                    />
                    <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-accent-500/[0.04] blur-[140px]" />
                </div>

                {/* Network/node diagram SVG */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[5%] hidden lg:block"
                >
                    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" className="opacity-[0.08]">
                        {/* Central node */}
                        <circle cx="150" cy="150" r="8" fill="white" opacity="0.6" />
                        <circle cx="150" cy="150" r="20" stroke="white" strokeWidth="0.5" />

                        {/* Satellite nodes */}
                        <circle cx="60" cy="80" r="5" fill="white" opacity="0.3" />
                        <circle cx="240" cy="80" r="5" fill="white" opacity="0.3" />
                        <circle cx="60" cy="220" r="5" fill="white" opacity="0.3" />
                        <circle cx="240" cy="220" r="5" fill="white" opacity="0.3" />
                        <circle cx="150" cy="40" r="4" fill="white" opacity="0.2" />
                        <circle cx="150" cy="260" r="4" fill="white" opacity="0.2" />
                        <circle cx="40" cy="150" r="4" fill="white" opacity="0.2" />
                        <circle cx="260" cy="150" r="4" fill="white" opacity="0.2" />

                        {/* Connections */}
                        <line x1="150" y1="150" x2="60" y2="80" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <line x1="150" y1="150" x2="240" y2="80" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <line x1="150" y1="150" x2="60" y2="220" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <line x1="150" y1="150" x2="240" y2="220" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <line x1="150" y1="150" x2="150" y2="40" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        <line x1="150" y1="150" x2="150" y2="260" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        <line x1="150" y1="150" x2="40" y2="150" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        <line x1="150" y1="150" x2="260" y2="150" stroke="white" strokeWidth="0.5" opacity="0.2" />

                        {/* Outer ring connections */}
                        <line x1="60" y1="80" x2="150" y2="40" stroke="white" strokeWidth="0.3" opacity="0.15" />
                        <line x1="240" y1="80" x2="150" y2="40" stroke="white" strokeWidth="0.3" opacity="0.15" />
                        <line x1="60" y1="220" x2="150" y2="260" stroke="white" strokeWidth="0.3" opacity="0.15" />
                        <line x1="240" y1="220" x2="150" y2="260" stroke="white" strokeWidth="0.3" opacity="0.15" />
                        <line x1="60" y1="80" x2="40" y2="150" stroke="white" strokeWidth="0.3" opacity="0.15" />
                        <line x1="240" y1="80" x2="260" y2="150" stroke="white" strokeWidth="0.3" opacity="0.15" />

                        {/* Orbital ring */}
                        <circle cx="150" cy="150" r="120" stroke="white" strokeWidth="0.3" opacity="0.1" strokeDasharray="4 6" />
                    </svg>
                </motion.div>

                <Container className="relative pt-40 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                            Ecosystem
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[700px]"
                    >
                        Beyond products.{" "}
                        <span className="text-neutral-500">
                            A growing ecosystem.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        Our products and services are designed to work together and expand.
                        Social media, cloud storage, design, development &mdash; one connected ecosystem.
                    </motion.p>
                </Container>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </section>

            {/* ── Module grid ── */}
            <Container className="py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {modules.map((item, i) => (
                        <motion.div
                            key={item.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group relative p-7 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
                        >
                            {/* Subtle corner glow on hover */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent-500/[0.06] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-400 group-hover:text-accent-400 group-hover:border-accent-500/20 transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <span className={`text-[10px] font-mono tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border ${item.status === "Beta"
                                        ? "text-amber-400/80 border-amber-400/20 bg-amber-400/[0.06]"
                                        : "text-emerald-400/80 border-emerald-400/20 bg-emerald-400/[0.06]"
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <h3 className="text-white text-[16px] font-semibold tracking-[-0.01em] mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-neutral-500 text-[13px] leading-[1.7]">
                                    {item.description}
                                </p>
                            </div>

                            {/* Bottom accent */}
                            <div className="mt-6 h-px bg-gradient-to-r from-accent-500/0 via-accent-500/15 to-accent-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* ── Roadmap ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                                Roadmap
                            </span>
                            <div className="w-8 h-px bg-accent-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white mb-4">
                                What&apos;s coming{" "}
                                <span className="text-neutral-500">next.</span>
                            </h2>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-3" />
                        <div className="lg:col-span-9">
                            <div className="relative">
                                {/* Vertical line */}
                                <div className="absolute left-[7px] top-0 bottom-0 w-px bg-white/[0.06]" />

                                <div className="space-y-12">
                                    {roadmap.map((phase, i) => (
                                        <motion.div
                                            key={phase.quarter}
                                            custom={i}
                                            variants={cardVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            className="relative pl-10"
                                        >
                                            {/* Timeline dot */}
                                            <div className={`absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 ${phase.status === "In Progress"
                                                ? "border-accent-400 bg-accent-500/20"
                                                : "border-neutral-700 bg-neutral-900"
                                                }`} />

                                            <div className="flex items-center gap-3 mb-4">
                                                <h3 className="text-white text-[16px] font-semibold">
                                                    {phase.quarter}
                                                </h3>
                                                <span className={`text-[10px] font-mono tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border ${phase.status === "In Progress"
                                                    ? "text-accent-400/80 border-accent-400/20 bg-accent-400/[0.06]"
                                                    : "text-neutral-500 border-white/[0.06] bg-white/[0.02]"
                                                    }`}>
                                                    {phase.status}
                                                </span>
                                            </div>
                                            <ul className="space-y-3">
                                                {phase.items.map((item) => (
                                                    <li
                                                        key={item}
                                                        className="text-neutral-400 text-[14px] flex items-center gap-3"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </PageLayout>
    );
}
