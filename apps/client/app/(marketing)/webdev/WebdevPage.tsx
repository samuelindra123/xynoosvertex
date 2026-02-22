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

const services = [
    {
        title: "Corporate Websites",
        description: "Professional company websites that communicate your brand identity. Clean design, fast performance, SEO-optimized, and fully responsive across all devices.",
        badge: "Commercial",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
    },
    {
        title: "E-Commerce Platforms",
        description: "Full-featured online stores with payment integration, inventory management, and analytics. Built for conversion and scale — from small shops to enterprise catalogs.",
        badge: "Commercial",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
        ),
    },
    {
        title: "Web Applications",
        description: "Custom web applications with modern frameworks. Dashboards, SaaS products, internal tools, and client portals — built with scalable architecture and clean code.",
        badge: "Commercial",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
            </svg>
        ),
    },
    {
        title: "Non-Profit & Community",
        description: "Websites for non-profit organizations, communities, and social projects. We believe technology should serve everyone — including those working to make the world better.",
        badge: "Non-Commercial",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
];

const techStack = [
    { name: "Next.js", category: "Framework" },
    { name: "React", category: "UI" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
];

const process = [
    { step: "01", title: "Discovery", description: "Understand your business goals, target audience, and technical requirements." },
    { step: "02", title: "Design", description: "Create wireframes and visual designs. Iterate until the look and feel is perfect." },
    { step: "03", title: "Development", description: "Build with modern, scalable technology. Regular demos and progress updates." },
    { step: "04", title: "Launch & Support", description: "Deploy, optimize, and provide ongoing support and maintenance." },
];

export function WebdevPage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[75vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="crosshatch" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M0 0l20 20M20 0L0 20" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#crosshatch)" />
                    </svg>
                    <div className="absolute top-1/3 right-1/3 w-[700px] h-[700px] rounded-full bg-amber-500/[0.04] blur-[140px]" />
                </div>

                {/* Browser window SVG */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[5%] hidden xl:block"
                >
                    <svg width="220" height="180" viewBox="0 0 220 180" fill="none" className="opacity-[0.08]">
                        {/* Browser frame */}
                        <rect x="10" y="10" width="200" height="160" rx="8" stroke="white" strokeWidth="1" />
                        {/* Title bar */}
                        <line x1="10" y1="35" x2="210" y2="35" stroke="white" strokeWidth="0.5" />
                        <circle cx="28" cy="22" r="4" stroke="white" strokeWidth="0.5" opacity="0.5" />
                        <circle cx="42" cy="22" r="4" stroke="white" strokeWidth="0.5" opacity="0.5" />
                        <circle cx="56" cy="22" r="4" stroke="white" strokeWidth="0.5" opacity="0.5" />
                        {/* URL bar */}
                        <rect x="75" y="17" width="120" height="10" rx="3" stroke="white" strokeWidth="0.4" opacity="0.3" />
                        {/* Content placeholders */}
                        <rect x="25" y="48" width="80" height="8" rx="2" fill="white" opacity="0.15" />
                        <rect x="25" y="64" width="170" height="4" rx="1" fill="white" opacity="0.08" />
                        <rect x="25" y="74" width="150" height="4" rx="1" fill="white" opacity="0.08" />
                        <rect x="25" y="84" width="100" height="4" rx="1" fill="white" opacity="0.08" />
                        {/* Grid cards */}
                        <rect x="25" y="100" width="55" height="50" rx="3" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        <rect x="88" y="100" width="55" height="50" rx="3" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        <rect x="151" y="100" width="44" height="50" rx="3" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    </svg>
                </motion.div>

                <Container className="relative pt-40 pb-20">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">Web Development</span>
                        </div>
                        <div className="w-8 h-px bg-amber-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[800px]"
                    >
                        Websites that work.{" "}
                        <span className="text-neutral-500">For everyone.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        Full-stack web development for commercial businesses and non-profit
                        organizations. Modern technology, beautiful design, and scalable
                        architecture — tailored to your goals.
                    </motion.p>
                </Container>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            </section>

            {/* ── Tech stack bar ── */}
            <Container className="py-12 border-b border-white/[0.04]">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-8 flex-wrap">
                    {techStack.map((t) => (
                        <div key={t.name} className="flex items-center gap-2">
                            <span className="text-[13px] font-mono text-amber-400/70">{t.name}</span>
                            <span className="text-neutral-600 text-[11px]">{t.category}</span>
                        </div>
                    ))}
                </motion.div>
            </Container>

            {/* ── Service cards ── */}
            <Container className="py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((svc, i) => (
                        <motion.div
                            key={svc.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group relative p-8 rounded-2xl border border-amber-500/10 bg-gradient-to-br from-amber-500/[0.04] to-transparent hover:border-amber-500/20 transition-all duration-500"
                        >
                            <div className="flex items-start justify-between mb-5">
                                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-amber-500/20 text-amber-400/70 group-hover:text-amber-300 transition-colors">
                                    {svc.icon}
                                </div>
                                <span className={`text-[10px] font-mono tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border ${svc.badge === "Non-Commercial"
                                    ? "text-emerald-400/60 border-emerald-500/15 bg-emerald-500/[0.04]"
                                    : "text-amber-400/60 border-amber-500/15 bg-amber-500/[0.04]"
                                    }`}>
                                    {svc.badge}
                                </span>
                            </div>
                            <h3 className="text-white text-[18px] font-semibold tracking-[-0.01em] mb-3">{svc.title}</h3>
                            <p className="text-neutral-400 text-[14px] leading-[1.8]">{svc.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* ── Process ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Our Process</span>
                            <div className="w-8 h-px bg-amber-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white">From idea <span className="text-neutral-500">to launch.</span></h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-3" />
                        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {process.map((p) => (
                                <div key={p.step} className="flex gap-4">
                                    <span className="text-[24px] font-bold text-amber-400/20 leading-none">{p.step}</span>
                                    <div>
                                        <h3 className="text-white text-[15px] font-semibold mb-1">{p.title}</h3>
                                        <p className="text-neutral-500 text-[13px] leading-relaxed">{p.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── CTA ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20 text-center">
                    <p className="text-neutral-500 text-[15px] mb-6">Explore more products</p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link href="/design" className="text-[13px] text-neutral-400 hover:text-white border border-white/[0.08] px-5 py-2 rounded-lg hover:bg-white/[0.03] transition-all">← Design Services</Link>
                        <Link href="/social" className="text-[13px] text-neutral-400 hover:text-white border border-white/[0.08] px-5 py-2 rounded-lg hover:bg-white/[0.03] transition-all">Social Media</Link>
                        <Link href="/product" className="text-[13px] text-amber-400/80 hover:text-amber-300 border border-amber-500/20 px-5 py-2 rounded-lg hover:bg-amber-500/[0.05] transition-all">All Products →</Link>
                    </div>
                </Container>
            </section>
        </PageLayout>
    );
}
