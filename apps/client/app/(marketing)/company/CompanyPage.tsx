"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";
import { VertexMark } from "@/components/system/VertexLogo";
import Link from "next/link";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

const values = [
    {
        title: "Engineering Sovereignty",
        description: "We believe in building products that respect users. No tracking, no data selling, no hidden agendas. Your data belongs to you.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        title: "Precision by Default",
        description: "Every feature, every design decision, every line of code is deliberate. We don't ship until it's right — not fast, right.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
    },
    {
        title: "Long-term Thinking",
        description: "We optimize for the decade, not the quarter. Every product decision considers what happens when our user base is 100x its current size.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        title: "Radical Transparency",
        description: "Our product decisions are documented openly. Our roadmap is public. Our pricing is clear. Trust is built through visibility, not promises.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
];

const milestones = [
    { year: "2023", event: "Xynoos Vertex founded", detail: "Team assembles with a mission: build digital products and services that respect people." },
    { year: "2024", event: "Product lines established", detail: "Social media platform, cloud storage, and professional services portfolio defined." },
    { year: "2025", event: "Xynoos Social beta launch", detail: "Privacy-first social platform launches. PCB design and 3D modeling services go live." },
    { year: "2026", event: "Full ecosystem available", detail: "Cloud storage integration, web development services, and expanded service offerings." },
];

const stats = [
    { value: "2", label: "Digital Products" },
    { value: "3+", label: "Service Lines" },
    { value: "E2E", label: "Encryption" },
    { value: "Global", label: "Reach" },
    { value: "100%", label: "Custom Work" },
    { value: "∞", label: "Commitment" },
];

export function CompanyPage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[75vh] flex items-end overflow-hidden">
                {/* Subtle pattern */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`,
                            backgroundSize: "28px 28px",
                        }}
                    />
                    <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-accent-500/[0.04] blur-[140px]" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-600/[0.03] blur-[100px]" />
                </div>

                {/* Large logo watermark */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[8%] hidden lg:block"
                >
                    <VertexMark size={280} color="white" className="opacity-[0.02]" />
                </motion.div>

                <Container className="relative pt-40 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <VertexMark size={20} color="white" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">
                                Company
                            </span>
                        </div>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[900px]"
                    >
                        We build digital products &amp; services{" "}
                        <span className="text-neutral-500">
                            for teams who refuse to compromise.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[600px]"
                    >
                        Xynoos Vertex is a digital platform and engineering services company.
                        We build social media with integrated cloud storage, and deliver
                        professional services in PCB design, 3D modeling, and web development.
                    </motion.p>
                </Container>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </section>

            {/* ── Who we are ── */}
            <Container className="py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <motion.div
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-4"
                    >
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                            Who We Are
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>
                    <div className="lg:col-span-8 space-y-8">
                        <motion.p
                            custom={1}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-neutral-200 text-[20px] leading-[1.7] font-medium"
                        >
                            Xynoos Vertex was founded by a team of engineers and designers
                            who believe digital products and professional services can be
                            delivered with higher quality — and more honesty — than the norm.
                        </motion.p>
                        <motion.p
                            custom={2}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-neutral-400 text-[16px] leading-[1.8]"
                        >
                            We saw social media that manipulates instead of connects. Cloud
                            storage that's insecure by default. Design agencies charging
                            premium rates for standard work. Web developers delivering
                            templates and calling them custom. We knew we could do better.
                        </motion.p>
                        <motion.p
                            custom={3}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-neutral-400 text-[16px] leading-[1.8]"
                        >
                            So we built Xynoos Vertex: a social platform that respects
                            privacy, cloud storage encrypted by default, and engineering
                            services delivered by people who genuinely care about quality.
                            Not a company you hire — a partner you trust.
                        </motion.p>
                    </div>
                </div>
            </Container>

            {/* ── Stats ── */}
            <section className="border-y border-white/[0.06]">
                <Container className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
                    >
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-white text-[28px] font-bold tracking-tight mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-neutral-500 text-[11px] uppercase tracking-[0.15em]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* ── Core values ── */}
            <Container className="py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                    <div className="lg:col-span-4">
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                            Core Values
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </div>
                    <div className="lg:col-span-8">
                        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                            What drives{" "}
                            <span className="text-neutral-500">every decision.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((value, i) => (
                        <motion.div
                            key={value.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-500"
                        >
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-400 group-hover:text-accent-400 group-hover:border-accent-500/20 transition-all duration-300 mb-5">
                                {value.icon}
                            </div>
                            <h3 className="text-white text-[17px] font-semibold tracking-[-0.01em] mb-3">
                                {value.title}
                            </h3>
                            <p className="text-neutral-500 text-[14px] leading-[1.8]">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* ── Timeline ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-4">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                                Our Journey
                            </span>
                            <div className="w-8 h-px bg-accent-500/40" />
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                Building with{" "}
                                <span className="text-neutral-500">intent, from day one.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-4" />
                        <div className="lg:col-span-8">
                            <div className="relative">
                                {/* Vertical timeline line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />

                                <div className="space-y-10">
                                    {milestones.map((milestone, i) => (
                                        <motion.div
                                            key={milestone.year}
                                            custom={i}
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            className="relative pl-10"
                                        >
                                            <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${i === milestones.length - 1
                                                ? "border-accent-400 bg-accent-500/20"
                                                : "border-neutral-700 bg-neutral-900"
                                                }`} />
                                            <div className="text-[12px] font-mono text-accent-400/60 tracking-[0.1em] mb-2">
                                                {milestone.year}
                                            </div>
                                            <h3 className="text-white text-[17px] font-semibold tracking-[-0.01em] mb-2">
                                                {milestone.event}
                                            </h3>
                                            <p className="text-neutral-500 text-[14px] leading-[1.7]">
                                                {milestone.detail}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── CTA ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-white text-[22px] font-semibold tracking-[-0.01em] mb-3">
                            Ready to work with Vertex?
                        </h2>
                        <p className="text-neutral-500 text-[15px] mb-8">
                            Explore our products or get in touch about services.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <Link
                                href="/product"
                                className="inline-flex items-center justify-center h-11 px-7 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all"
                            >
                                Explore Products
                            </Link>
                            <Link
                                href="/philosophy"
                                className="inline-flex items-center justify-center h-11 px-7 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] transition-all"
                            >
                                Read Our Philosophy
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </PageLayout>
    );
}
