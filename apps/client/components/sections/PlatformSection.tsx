"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/system/SectionWrapper";

const layers = [
    {
        id: "01",
        name: "Infrastructure Layer",
        label: "INFRA",
        description:
            "Foundation runtime, deployment orchestration, and resource management. The bedrock that everything else depends on — designed for zero-compromise reliability.",
        capabilities: ["Runtime Engine", "Deployment Pipeline", "Resource Governance"],
    },
    {
        id: "02",
        name: "Intelligence Layer",
        label: "INTEL",
        description:
            "Data processing pipelines, ML model orchestration, and real-time analytics. Intelligence that serves your architecture, not the other way around.",
        capabilities: ["Data Pipelines", "ML Orchestration", "Real-time Analytics"],
    },
    {
        id: "03",
        name: "Control Layer",
        label: "CTRL",
        description:
            "System-wide observability, orchestration controls, and governance rules. Complete visibility into every operation, every decision, every state change.",
        capabilities: ["Observability", "Orchestration", "Access Governance"],
    },
    {
        id: "04",
        name: "Integration Layer",
        label: "INTG",
        description:
            "APIs, SDKs, webhooks, and third-party connectors. Extend and compose with anything — your systems, your protocols, your terms.",
        capabilities: ["REST & GraphQL APIs", "Native SDKs", "Webhook System"],
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    }),
};

export function PlatformSection() {
    return (
        <SectionWrapper id="platform" className="py-32 md:py-40">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    <div className="lg:col-span-3">
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                            Core Platform
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </div>
                    <div className="lg:col-span-9">
                        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white mb-4">
                            Four layers.{" "}
                            <span className="text-neutral-500">One coherent system.</span>
                        </h2>
                        <p className="text-neutral-400 text-[16px] leading-relaxed max-w-[560px]">
                            Each layer is independently deployable, collectively composable.
                            No layer makes assumptions about the others — they communicate
                            through defined contracts.
                        </p>
                    </div>
                </div>

                {/* System layers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] rounded-xl overflow-hidden">
                    {layers.map((layer, i) => (
                        <motion.div
                            key={layer.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group bg-neutral-950 p-8 md:p-10 hover:bg-neutral-900/50 transition-colors duration-500"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <span className="text-[11px] font-mono text-neutral-600 tracking-wider">
                                    {layer.id}
                                </span>
                                <span className="text-[10px] font-mono text-accent-400/60 tracking-[0.2em] uppercase">
                                    {layer.label}
                                </span>
                            </div>

                            {/* Name */}
                            <h3 className="text-white text-[18px] font-semibold tracking-[-0.01em] mb-3">
                                {layer.name}
                            </h3>

                            {/* Description */}
                            <p className="text-neutral-500 text-[14px] leading-[1.7] mb-6">
                                {layer.description}
                            </p>

                            {/* Capabilities */}
                            <div className="flex flex-wrap gap-2">
                                {layer.capabilities.map((cap) => (
                                    <span
                                        key={cap}
                                        className="text-[11px] text-neutral-500 px-2.5 py-1 rounded border border-white/[0.06] bg-white/[0.02]"
                                    >
                                        {cap}
                                    </span>
                                ))}
                            </div>

                            {/* Hover accent line */}
                            <div className="mt-8 h-px bg-gradient-to-r from-accent-500/0 via-accent-500/20 to-accent-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
