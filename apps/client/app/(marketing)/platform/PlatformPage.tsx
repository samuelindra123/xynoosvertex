"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";

const layers = [
    {
        id: "01",
        name: "Infrastructure Layer",
        label: "INFRA",
        color: "from-blue-500/20 to-blue-600/5",
        borderColor: "border-blue-500/20",
        dotColor: "bg-blue-400",
        description:
            "Foundation runtime, deployment orchestration, and resource management. The bedrock that everything else depends on.",
        capabilities: ["Runtime Engine", "Deployment Pipeline", "Resource Governance", "Health Monitoring"],
        detail:
            "The Infrastructure Layer handles the concerns that engineers shouldn't have to think about twice: provisioning, scaling, failover, and resource allocation. Every component is independently deployable with zero-downtime guarantees. Built on a custom scheduler that respects your topology constraints.",
    },
    {
        id: "02",
        name: "Intelligence Layer",
        label: "INTEL",
        color: "from-violet-500/20 to-violet-600/5",
        borderColor: "border-violet-500/20",
        dotColor: "bg-violet-400",
        description:
            "Data processing pipelines, ML model orchestration, and real-time analytics. Intelligence that serves your architecture.",
        capabilities: ["Data Pipelines", "ML Orchestration", "Real-time Analytics", "Feature Store"],
        detail:
            "The Intelligence Layer provides first-class primitives for data transformation, model serving, and analytical workloads. Pipelines are defined as code, versioned, and auditable. Every ML model tracks lineage from training data through deployment.",
    },
    {
        id: "03",
        name: "Control Layer",
        label: "CTRL",
        color: "from-emerald-500/20 to-emerald-600/5",
        borderColor: "border-emerald-500/20",
        dotColor: "bg-emerald-400",
        description:
            "System-wide observability, orchestration controls, and governance rules. Complete visibility into every operation.",
        capabilities: ["Observability", "Orchestration", "Access Governance", "Audit Trail"],
        detail:
            "The Control Layer is your single pane of truth. Distributed tracing across every service boundary. Policy-as-code governance that enforces compliance without slowing teams down. Role-based access control with attribute-level granularity.",
    },
    {
        id: "04",
        name: "Integration Layer",
        label: "INTG",
        color: "from-amber-500/20 to-amber-600/5",
        borderColor: "border-amber-500/20",
        dotColor: "bg-amber-400",
        description:
            "APIs, SDKs, webhooks, and third-party connectors. Extend and compose with anything — on your terms.",
        capabilities: ["REST & GraphQL APIs", "Native SDKs", "Webhook System", "Protocol Adapters"],
        detail:
            "The Integration Layer ensures Vertex never becomes a walled garden. Every platform capability is API-accessible with full type safety. SDKs in TypeScript, Python, Go, and Rust. Webhook systems with guaranteed delivery.",
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

export function PlatformPage() {
    return (
        <PageLayout>
            {/* ── Hero with architecture diagram ── */}
            <section className="relative min-h-[70vh] flex items-end overflow-hidden">
                {/* Dot grid background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`,
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-accent-500/[0.03] blur-[120px]" />
                </div>

                {/* Architecture SVG visual */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[3%] hidden xl:block"
                >
                    <svg width="320" height="400" viewBox="0 0 320 400" fill="none" className="opacity-[0.08]">
                        {/* Layer boxes stacked */}
                        <rect x="40" y="20" width="240" height="70" rx="4" stroke="white" strokeWidth="0.8" strokeDasharray="4 4" />
                        <rect x="40" y="110" width="240" height="70" rx="4" stroke="white" strokeWidth="0.8" strokeDasharray="4 4" />
                        <rect x="40" y="200" width="240" height="70" rx="4" stroke="white" strokeWidth="0.8" strokeDasharray="4 4" />
                        <rect x="40" y="290" width="240" height="70" rx="4" stroke="white" strokeWidth="0.8" strokeDasharray="4 4" />
                        {/* Layer labels */}
                        <text x="160" y="60" fill="white" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.6">INFRA</text>
                        <text x="160" y="150" fill="white" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.6">INTEL</text>
                        <text x="160" y="240" fill="white" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.6">CTRL</text>
                        <text x="160" y="330" fill="white" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.6">INTG</text>
                        {/* Connection lines between layers */}
                        <line x1="160" y1="90" x2="160" y2="110" stroke="white" strokeWidth="1" opacity="0.3" />
                        <line x1="160" y1="180" x2="160" y2="200" stroke="white" strokeWidth="1" opacity="0.3" />
                        <line x1="160" y1="270" x2="160" y2="290" stroke="white" strokeWidth="1" opacity="0.3" />
                        {/* Arrow heads */}
                        <path d="M155 108 L160 115 L165 108" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
                        <path d="M155 198 L160 205 L165 198" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
                        <path d="M155 288 L160 295 L165 288" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
                        {/* Side connectors */}
                        <line x1="280" y1="55" x2="300" y2="55" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        <line x1="280" y1="145" x2="300" y2="145" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        <line x1="280" y1="235" x2="300" y2="235" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        <line x1="280" y1="325" x2="300" y2="325" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        <circle cx="304" cy="55" r="2" fill="white" opacity="0.3" />
                        <circle cx="304" cy="145" r="2" fill="white" opacity="0.3" />
                        <circle cx="304" cy="235" r="2" fill="white" opacity="0.3" />
                        <circle cx="304" cy="325" r="2" fill="white" opacity="0.3" />
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
                            Core Platform
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[700px]"
                    >
                        Four layers.{" "}
                        <span className="text-neutral-500">One coherent system.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        Each layer is independently deployable, collectively composable.
                        No layer makes assumptions about the others — they communicate
                        through defined contracts.
                    </motion.p>
                </Container>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </section>

            {/* ── Layer flow indicator ── */}
            <Container className="py-12 border-b border-white/[0.04]">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-4 flex-wrap"
                >
                    {layers.map((layer, i) => (
                        <div key={layer.id} className="flex items-center gap-4">
                            <span className="flex items-center gap-2.5">
                                <span className={`w-2 h-2 rounded-full ${layer.dotColor}`} />
                                <span className="text-[12px] font-mono text-neutral-300 tracking-[0.1em]">
                                    {layer.label}
                                </span>
                            </span>
                            {i < layers.length - 1 && (
                                <svg width="20" height="8" viewBox="0 0 20 8" className="text-neutral-700">
                                    <line x1="0" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1" />
                                    <path d="M12 1 L17 4 L12 7" stroke="currentColor" strokeWidth="1" fill="none" />
                                </svg>
                            )}
                        </div>
                    ))}
                </motion.div>
            </Container>

            {/* ── Detailed layer cards ── */}
            <Container className="py-24 md:py-32">
                <div className="space-y-8">
                    {layers.map((layer, i) => (
                        <motion.div
                            key={layer.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className={`group relative rounded-2xl border ${layer.borderColor} bg-gradient-to-br ${layer.color} p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-white/[0.12]`}
                        >
                            {/* Background pattern */}
                            <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] pointer-events-none">
                                <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                                    <circle cx="80" cy="80" r="60" stroke="white" strokeWidth="0.5" />
                                    <circle cx="80" cy="80" r="40" stroke="white" strokeWidth="0.5" />
                                    <circle cx="80" cy="80" r="20" stroke="white" strokeWidth="0.5" />
                                </svg>
                            </div>

                            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                                {/* Left column */}
                                <div className="lg:col-span-5">
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className={`w-2.5 h-2.5 rounded-full ${layer.dotColor}`} />
                                        <span className="text-[10px] font-mono text-neutral-400 tracking-[0.2em] uppercase">
                                            Layer {layer.id}
                                        </span>
                                    </div>
                                    <h3 className="text-white text-[24px] font-semibold tracking-[-0.02em] mb-3">
                                        {layer.name}
                                    </h3>
                                    <p className="text-neutral-400 text-[14px] leading-[1.7] mb-6">
                                        {layer.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {layer.capabilities.map((cap) => (
                                            <span
                                                key={cap}
                                                className="text-[11px] text-neutral-400 px-3 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.03]"
                                            >
                                                {cap}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right column */}
                                <div className="lg:col-span-7 flex items-center">
                                    <p className="text-neutral-400 text-[15px] leading-[1.9]">
                                        {layer.detail}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </PageLayout>
    );
}
