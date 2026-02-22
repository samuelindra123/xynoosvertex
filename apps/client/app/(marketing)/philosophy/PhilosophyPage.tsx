"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";

const principles = [
    {
        number: "01",
        title: "Precision Over Complexity",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        essay: [
            "Every feature, every design choice, every default is deliberate. We don't add features — we solve real problems. Complexity is never accidental; it's either justified or eliminated.",
            "This means saying no more often than yes. A feature that solves a problem for 10% of users while adding confusion for the other 90% isn't a feature — it's a liability. We measure our work not by what we ship, but by what we choose not to.",
            "The result is products and services where every interaction is predictable, every behavior is documented, and every edge case has been considered. Not because we're cautious, but because precision is a competitive advantage.",
        ],
    },
    {
        number: "02",
        title: "Human-Centered Systems",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        essay: [
            "Technology serves people, not the reverse. Our products are designed for the humans who use them daily — from social interactions to professional workflows. Clarity is a non-negotiable requirement.",
            "This principle extends beyond user interfaces into every service we deliver. PCB designs that are manufacturable, not just theoretically correct. Websites that load fast, not just look good. Storage that's secure, not just available.",
            "We build for the real person on the other end. Every decision optimizes for their experience, not our convenience.",
        ],
    },
    {
        number: "03",
        title: "Composable Architecture",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="8" height="8" rx="1" />
                <rect x="14" y="2" width="8" height="8" rx="1" />
                <rect x="2" y="14" width="8" height="8" rx="1" />
                <rect x="14" y="14" width="8" height="8" rx="1" />
            </svg>
        ),
        essay: [
            "No product exists in isolation. Our social platform integrates with cloud storage. Our services complement our products. Every offering is designed to work independently but connect seamlessly.",
            "Composability is not just a technical property — it's how we think about everything. Modular designs, clean boundaries, and clear interfaces across every product and service we deliver.",
            "Whether you need our social platform, our storage, our design services, or our web development — each stands alone and combines freely. Your needs, your choices.",
        ],
    },
    {
        number: "04",
        title: "Engineering-First Design",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17l6-6-6-6" />
                <path d="M12 19h8" />
            </svg>
        ),
        essay: [
            "We design for people who care about details. Who notice when a website loads 200ms slower. Who appreciate when a PCB layout is optimized for manufacturing, not just electrical correctness.",
            "This means our products prioritize substance over marketing. Our services deliver real quality, not impressive presentations. We'd rather under-promise and over-deliver every time.",
            "We believe that the best user experience comes from products and services that are genuinely well-built — not from polish that hides mediocrity.",
        ],
    },
];

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    }),
};

export function PhilosophyPage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[60vh] flex items-end overflow-hidden">
                {/* Diagonal line pattern */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#diag)" />
                    </svg>
                    <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full bg-accent-500/[0.04] blur-[120px]" />
                </div>

                {/* Large background number */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[8%] hidden lg:block"
                >
                    <span className="text-[240px] font-bold text-white/[0.02] leading-none tracking-tighter select-none">
                        04
                    </span>
                </motion.div>

                <Container className="relative pt-40 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                            Product Philosophy
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[800px]"
                    >
                        Principles that define{" "}
                        <span className="text-neutral-500">
                            every decision we make.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        These aren&apos;t aspirational values on a poster. They&apos;re
                        constraints that shape every product we build and every
                        service we deliver.
                    </motion.p>
                </Container>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </section>

            {/* ── Principle cards ── */}
            <Container className="py-24 md:py-32">
                <div className="space-y-8">
                    {principles.map((principle, i) => (
                        <motion.article
                            key={principle.number}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden hover:border-white/[0.1] transition-all duration-500"
                        >
                            {/* Background number watermark */}
                            <div className="absolute top-6 right-8 text-[100px] font-bold text-white/[0.02] leading-none tracking-tighter select-none">
                                {principle.number}
                            </div>

                            <div className="relative p-8 md:p-10">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                                    {/* Left — number, icon, title */}
                                    <div className="lg:col-span-4">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-400 group-hover:text-accent-400 group-hover:border-accent-500/20 transition-all duration-300">
                                                {principle.icon}
                                            </div>
                                            <span className="text-[12px] font-mono text-neutral-600">
                                                {principle.number}
                                            </span>
                                        </div>
                                        <h2 className="text-white text-[24px] font-semibold tracking-[-0.02em] leading-[1.2] group-hover:text-accent-400 transition-colors duration-300">
                                            {principle.title}
                                        </h2>
                                    </div>

                                    {/* Right — essay */}
                                    <div className="lg:col-span-8 space-y-5">
                                        {principle.essay.map((paragraph, j) => (
                                            <p
                                                key={j}
                                                className={`text-[15px] leading-[1.9] ${j === 0
                                                    ? "text-neutral-300 font-medium"
                                                    : "text-neutral-500"
                                                    }`}
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom accent line on hover */}
                                <div className="mt-8 h-px bg-gradient-to-r from-accent-500/0 via-accent-500/20 to-accent-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </Container>
        </PageLayout>
    );
}
