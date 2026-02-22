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
        title: "File Hosting",
        description: "Upload any file type with unlimited bandwidth. Automatic format detection, thumbnail generation, and smart organization powered by metadata indexing.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
            </svg>
        ),
    },
    {
        title: "Media CDN",
        description: "Global content delivery network optimized for images, video, and audio. Low-latency streaming from edge nodes closest to your audience.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        title: "E2E Encryption",
        description: "End-to-end encryption for all stored files. Your data is encrypted at rest and in transit — we never have access to your content. Zero-knowledge architecture.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
    {
        title: "Smart Sharing",
        description: "Share files and folders with granular permissions. Generate time-limited links, set access levels, and track downloads — all from within the social platform.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
        ),
    },
];

const storageSpecs = [
    { value: "AES-256", label: "Encryption" },
    { value: "99.99%", label: "Availability" },
    { value: "Global", label: "CDN Reach" },
    { value: "Unlimited", label: "File Types" },
    { value: "Auto", label: "Backup" },
    { value: "Instant", label: "Access" },
];

export function StoragePage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[75vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage: `radial-gradient(circle, var(--color-violet-400) 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                        }}
                    />
                    <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-violet-500/[0.05] blur-[140px]" />
                </div>

                {/* Cloud storage SVG */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[5%] hidden xl:block"
                >
                    <svg width="240" height="200" viewBox="0 0 240 200" fill="none" className="opacity-[0.07]">
                        {/* Cloud shape */}
                        <path d="M60 140 A40 40 0 0 1 60 80 A50 50 0 0 1 140 60 A40 40 0 0 1 200 100 A30 30 0 0 1 200 140 Z" stroke="white" strokeWidth="1" fill="white" fillOpacity="0.02" />
                        {/* Upload arrow */}
                        <line x1="120" y1="170" x2="120" y2="110" stroke="white" strokeWidth="1.5" opacity="0.4" />
                        <path d="M108 122 L120 108 L132 122" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
                        {/* Files inside cloud */}
                        <rect x="80" y="85" width="16" height="20" rx="2" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <rect x="145" y="85" width="16" height="20" rx="2" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        <rect x="112" y="78" width="16" height="20" rx="2" stroke="white" strokeWidth="0.5" opacity="0.3" />
                    </svg>
                </motion.div>

                <Container className="relative pt-40 pb-20">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">Cloud Storage</span>
                        </div>
                        <div className="w-8 h-px bg-violet-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[800px]"
                    >
                        Your files, everywhere.{" "}
                        <span className="text-neutral-500">Encrypted by default.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        Enterprise-grade cloud storage integrated directly into Xynoos Social.
                        Upload, organize, and share — with end-to-end encryption and global
                        CDN delivery.
                    </motion.p>
                </Container>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
            </section>

            {/* ── Specs bar ── */}
            <Container className="py-16 border-b border-white/[0.04]">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {storageSpecs.map((s) => (
                        <div key={s.label} className="text-center">
                            <div className="text-white text-[22px] font-bold tracking-tight mb-1">{s.value}</div>
                            <div className="text-neutral-500 text-[11px] uppercase tracking-[0.15em]">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </Container>

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
                            className="group relative p-8 rounded-2xl border border-violet-500/10 bg-gradient-to-br from-violet-500/[0.04] to-transparent hover:border-violet-500/20 transition-all duration-500"
                        >
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-violet-500/20 text-violet-400/70 mb-5 group-hover:text-violet-300 transition-colors">
                                {feat.icon}
                            </div>
                            <h3 className="text-white text-[18px] font-semibold tracking-[-0.01em] mb-3">{feat.title}</h3>
                            <p className="text-neutral-400 text-[14px] leading-[1.8]">{feat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* ── CTA ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20 text-center">
                    <p className="text-neutral-500 text-[15px] mb-6">Explore more products</p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link href="/social" className="text-[13px] text-neutral-400 hover:text-white border border-white/[0.08] px-5 py-2 rounded-lg hover:bg-white/[0.03] transition-all">← Social Media</Link>
                        <Link href="/design" className="text-[13px] text-violet-400/80 hover:text-violet-300 border border-violet-500/20 px-5 py-2 rounded-lg hover:bg-violet-500/[0.05] transition-all">Design Services →</Link>
                        <Link href="/webdev" className="text-[13px] text-neutral-400 hover:text-white border border-white/[0.08] px-5 py-2 rounded-lg hover:bg-white/[0.03] transition-all">Web Development →</Link>
                    </div>
                </Container>
            </section>
        </PageLayout>
    );
}
