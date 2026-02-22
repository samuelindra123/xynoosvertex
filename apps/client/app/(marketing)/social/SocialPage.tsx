"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";
import Link from "next/link";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

const features = [
    {
        title: "Social Feeds",
        description: "Personalized, algorithm-free timelines. See content from people you care about, in the order they share it. No manipulation, no hidden agendas.",
        metric: "Real-time",
        metricLabel: "Feed Updates",
    },
    {
        title: "Messaging",
        description: "End-to-end encrypted messaging with rich media support. Private conversations, group chats, and community channels — all secure by default.",
        metric: "E2E",
        metricLabel: "Encrypted",
    },
    {
        title: "Communities",
        description: "Build and moderate communities around shared interests. Topic-based groups with threaded discussions, events, and collaborative spaces.",
        metric: "∞",
        metricLabel: "Community Size",
    },
    {
        title: "Integrated Storage",
        description: "Every account comes with built-in cloud storage. Upload, organize, and share media seamlessly without leaving the platform. Your files, always accessible.",
        metric: "Built-in",
        metricLabel: "Cloud Storage",
    },
];

const highlights = [
    { label: "Privacy-first", value: "Zero Tracking" },
    { label: "Media Support", value: "Photo, Video, Audio" },
    { label: "Accessibility", value: "WCAG 2.1 AA" },
    { label: "Platforms", value: "Web, iOS, Android" },
    { label: "Content Moderation", value: "AI + Human" },
    { label: "Data Ownership", value: "100% Yours" },
];

export function SocialPage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[75vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(var(--color-blue-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-blue-400) 1px, transparent 1px)`,
                            backgroundSize: "48px 48px",
                        }}
                    />
                    <div className="absolute top-0 left-1/3 w-[800px] h-[800px] rounded-full bg-blue-500/[0.04] blur-[140px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/[0.03] blur-[100px]" />
                </div>

                {/* Social network SVG */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[6%] hidden xl:block"
                >
                    <svg width="260" height="260" viewBox="0 0 260 260" fill="none" className="opacity-[0.07]">
                        {/* People nodes */}
                        <circle cx="130" cy="130" r="20" stroke="white" strokeWidth="1" fill="white" fillOpacity="0.05" />
                        <circle cx="50" cy="70" r="12" stroke="white" strokeWidth="0.7" />
                        <circle cx="210" cy="70" r="12" stroke="white" strokeWidth="0.7" />
                        <circle cx="50" cy="190" r="12" stroke="white" strokeWidth="0.7" />
                        <circle cx="210" cy="190" r="12" stroke="white" strokeWidth="0.7" />
                        <circle cx="130" cy="30" r="10" stroke="white" strokeWidth="0.5" />
                        <circle cx="130" cy="230" r="10" stroke="white" strokeWidth="0.5" />
                        {/* Connections */}
                        <line x1="130" y1="130" x2="50" y2="70" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <line x1="130" y1="130" x2="210" y2="70" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <line x1="130" y1="130" x2="50" y2="190" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <line x1="130" y1="130" x2="210" y2="190" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <line x1="130" y1="130" x2="130" y2="30" stroke="white" strokeWidth="0.4" opacity="0.2" />
                        <line x1="130" y1="130" x2="130" y2="230" stroke="white" strokeWidth="0.4" opacity="0.2" />
                        <line x1="50" y1="70" x2="210" y2="70" stroke="white" strokeWidth="0.3" opacity="0.15" />
                        <line x1="50" y1="190" x2="210" y2="190" stroke="white" strokeWidth="0.3" opacity="0.15" />
                        {/* Center icon - person */}
                        <circle cx="130" cy="124" r="5" fill="white" opacity="0.4" />
                        <path d="M121 140 a9 6 0 0 1 18 0" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
                    </svg>
                </motion.div>

                <Container className="relative pt-40 pb-20">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">
                                Social Media Platform
                            </span>
                        </div>
                        <div className="w-8 h-px bg-blue-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[800px]"
                    >
                        Xynoos Social.{" "}
                        <span className="text-neutral-500">Connect on your terms.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        A privacy-first social media platform with integrated cloud storage.
                        Share moments, build communities, and own your data — with no
                        tracking, no ads, no compromise.
                    </motion.p>
                </Container>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            </section>

            {/* ── Feature cards ── */}
            <Container className="py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group relative p-8 rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-500/[0.04] to-transparent hover:border-blue-500/20 transition-all duration-500"
                        >
                            <div className="absolute top-6 right-6 text-right">
                                <div className="text-blue-400/80 text-[24px] font-bold tracking-tight leading-none">{feat.metric}</div>
                                <div className="text-neutral-600 text-[10px] uppercase tracking-[0.15em] mt-1">{feat.metricLabel}</div>
                            </div>
                            <h3 className="text-white text-[18px] font-semibold tracking-[-0.01em] mb-3 pr-24">{feat.title}</h3>
                            <p className="text-neutral-400 text-[14px] leading-[1.8]">{feat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* ── Highlights ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Platform Highlights</span>
                            <div className="w-8 h-px bg-blue-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                {highlights.map((h) => (
                                    <div key={h.label}>
                                        <div className="text-white text-[18px] font-semibold mb-1">{h.value}</div>
                                        <div className="text-neutral-500 text-[12px] uppercase tracking-[0.12em]">{h.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── CTA ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20 text-center">
                    <p className="text-neutral-500 text-[15px] mb-6">Explore more products</p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link href="/storage" className="text-[13px] text-blue-400/80 hover:text-blue-300 border border-blue-500/20 px-5 py-2 rounded-lg hover:bg-blue-500/[0.05] transition-all">Cloud Storage →</Link>
                        <Link href="/design" className="text-[13px] text-neutral-400 hover:text-white border border-white/[0.08] px-5 py-2 rounded-lg hover:bg-white/[0.03] transition-all">Design Services →</Link>
                        <Link href="/webdev" className="text-[13px] text-neutral-400 hover:text-white border border-white/[0.08] px-5 py-2 rounded-lg hover:bg-white/[0.03] transition-all">Web Development →</Link>
                    </div>
                </Container>
            </section>
        </PageLayout>
    );
}
