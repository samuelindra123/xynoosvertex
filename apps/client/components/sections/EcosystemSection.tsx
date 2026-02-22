"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/system/SectionWrapper";

const ecosystemItems = [
    {
        title: "Modular Extensions",
        description:
            "Every capability ships as an independent module. Adopt what you need, ignore what you don't. No monolith, no bloat.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
    },
    {
        title: "API Ecosystem",
        description:
            "First-class REST and GraphQL APIs with full type safety. Every platform capability is API-accessible — build anything on top.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 17l6-6-6-6" />
                <path d="M12 19h8" />
            </svg>
        ),
    },
    {
        title: "Horizontal Scaling",
        description:
            "Architecture designed for scale from day one. Not as an afterthought — as a fundamental property of every layer.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M16 3h5v5" />
                <path d="M8 3H3v5" />
                <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
                <path d="m15 9 6-6" />
            </svg>
        ),
    },
    {
        title: "Multi-Environment",
        description:
            "Seamless deployment across cloud, edge, and hybrid environments. One platform, any topology, zero lock-in.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        title: "Event Mesh",
        description:
            "Real-time event propagation across services with guaranteed ordering. Build reactive systems that respond to change instantly.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
    },
    {
        title: "Security Fabric",
        description:
            "Zero-trust security model baked into every layer. mTLS, RBAC, audit logging, and encryption at rest — not optional, default.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
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

export function EcosystemSection() {
    return (
        <SectionWrapper id="ecosystem" className="py-32 md:py-40">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    <div className="lg:col-span-3">
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                            Ecosystem
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </div>
                    <div className="lg:col-span-9">
                        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white mb-4">
                            Beyond a platform.{" "}
                            <span className="text-neutral-500">An ecosystem that grows with you.</span>
                        </h2>
                        <p className="text-neutral-400 text-[16px] leading-relaxed max-w-[560px]">
                            Vertex is designed to expand. Every module, API, and integration
                            point is built for a future we haven&apos;t imagined yet — because
                            you will.
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ecosystemItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group relative p-7 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-500"
                        >
                            {/* Icon */}
                            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-neutral-400 group-hover:text-accent-400 group-hover:border-accent-500/20 transition-all duration-300 mb-5">
                                {item.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-white text-[15px] font-semibold tracking-[-0.01em] mb-2">
                                {item.title}
                            </h3>
                            <p className="text-neutral-500 text-[13px] leading-[1.7]">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
