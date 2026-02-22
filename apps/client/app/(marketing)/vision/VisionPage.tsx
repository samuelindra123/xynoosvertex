"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

export function VisionPage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[70vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage: `linear-gradient(var(--color-neutral-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-400) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                    <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-accent-500/[0.04] blur-[120px]" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-600/[0.03] blur-[100px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[5%] hidden lg:block"
                >
                    <svg width="360" height="360" viewBox="0 0 360 360" fill="none" className="opacity-[0.07]">
                        <rect x="140" y="140" width="80" height="80" rx="2" stroke="white" strokeWidth="1" transform="rotate(45 180 180)" />
                        <rect x="110" y="110" width="140" height="140" rx="2" stroke="white" strokeWidth="0.7" transform="rotate(45 180 180)" />
                        <rect x="70" y="70" width="220" height="220" rx="2" stroke="white" strokeWidth="0.5" transform="rotate(45 180 180)" />
                        <rect x="20" y="20" width="320" height="320" rx="2" stroke="white" strokeWidth="0.3" transform="rotate(45 180 180)" />
                        <line x1="180" y1="0" x2="180" y2="360" stroke="white" strokeWidth="0.3" />
                        <line x1="0" y1="180" x2="360" y2="180" stroke="white" strokeWidth="0.3" />
                        <circle cx="180" cy="180" r="4" fill="white" opacity="0.4" />
                    </svg>
                </motion.div>

                <Container className="relative pt-40 pb-20">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Our Vision</span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[900px]"
                    >
                        Technology that connects people{" "}
                        <span className="text-neutral-500">and empowers businesses to grow.</span>
                    </motion.h1>
                </Container>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </section>

            {/* Stats bar */}
            <Container className="py-16 border-b border-white/[0.04]">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: "2", label: "Digital Products" },
                        { value: "3+", label: "Service Lines" },
                        { value: "Global", label: "Reach" },
                        { value: "∞", label: "Ambition" },
                    ].map((s) => (
                        <div key={s.label} className="text-center md:text-left">
                            <div className="text-white text-[28px] font-semibold tracking-tight mb-1">{s.value}</div>
                            <div className="text-neutral-500 text-[12px] uppercase tracking-[0.15em]">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </Container>

            {/* Manifesto body */}
            <Container className="py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-3">
                        <div className="lg:sticky lg:top-32 hidden lg:block">
                            <div className="relative h-48 w-px bg-white/[0.06] ml-1">
                                <motion.div className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent-500/60 to-transparent" initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} />
                                <div className="absolute top-0 -left-[3px] w-[7px] h-[7px] rounded-full bg-accent-400/60 border border-neutral-900" />
                                <div className="absolute top-1/2 -left-[3px] w-[7px] h-[7px] rounded-full bg-white/20 border border-neutral-900" />
                                <div className="absolute bottom-0 -left-[3px] w-[7px] h-[7px] rounded-full bg-white/10 border border-neutral-900" />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-9 space-y-20">
                        {/* Section 1 */}
                        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-accent-400/80">01</span>
                                <h2 className="text-[13px] font-semibold text-neutral-400 uppercase tracking-[0.15em]">The Opportunity</h2>
                            </div>
                            <div className="space-y-6 max-w-[680px] pl-12">
                                <p className="text-neutral-200 text-[18px] leading-[1.8] font-medium">We see a world where technology serves people — not the other way around.</p>
                                <p className="text-neutral-400 text-[16px] leading-[1.8]">Social media should connect, not manipulate. Cloud storage should be secure by default, not by upgrade. Professional services should be accessible, not gatekept by agencies charging premium rates for standard work.</p>
                                <p className="text-neutral-500 text-[15px] leading-[1.8]">Xynoos Vertex exists because we believe a single team — driven by engineering quality — can deliver better digital products and services than the fragmented alternatives available today.</p>
                            </div>
                        </motion.div>

                        <div className="relative pl-12"><div className="h-px bg-gradient-to-r from-accent-500/20 via-white/[0.06] to-transparent" /></div>

                        {/* Section 2 */}
                        <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-accent-400/80">02</span>
                                <h2 className="text-[13px] font-semibold text-neutral-400 uppercase tracking-[0.15em]">Our Approach</h2>
                            </div>
                            <div className="space-y-6 max-w-[680px] pl-12">
                                <p className="text-neutral-200 text-[18px] leading-[1.8] font-medium">Build fewer things, but build them right.</p>
                                <p className="text-neutral-400 text-[16px] leading-[1.8]">Our social media platform prioritizes privacy and authentic connection. Our cloud storage is encrypted end-to-end with zero-knowledge architecture. Our design and development services are delivered by engineers who care about quality, not just deadlines.</p>
                                <p className="text-neutral-500 text-[15px] leading-[1.8]">Every product and service we offer is a deliberate choice. We say no to more than we say yes to — because focus is what separates good from excellent.</p>
                            </div>
                        </motion.div>

                        <div className="relative pl-12"><div className="h-px bg-gradient-to-r from-accent-500/20 via-white/[0.06] to-transparent" /></div>

                        {/* Section 3 */}
                        <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-accent-400/80">03</span>
                                <h2 className="text-[13px] font-semibold text-neutral-400 uppercase tracking-[0.15em]">The Future</h2>
                            </div>
                            <div className="space-y-6 max-w-[680px] pl-12">
                                <p className="text-neutral-200 text-[18px] leading-[1.8] font-medium">We&apos;re building for the long term.</p>
                                <p className="text-neutral-400 text-[16px] leading-[1.8]">Xynoos Vertex is growing into a comprehensive digital ecosystem — where social connection, cloud infrastructure, and professional services work together seamlessly. Not as separate products, but as parts of one coherent vision.</p>
                                <p className="text-neutral-500 text-[15px] leading-[1.8]">We believe the companies that will matter in the next decade are those that combine authentic products with genuine service. That&apos;s what we&apos;re building.</p>
                            </div>
                        </motion.div>

                        {/* Closing blockquote */}
                        <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative mt-8">
                            <div className="relative p-8 md:p-10 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent">
                                <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden rounded-tl-xl">
                                    <div className="absolute top-0 left-0 w-full h-px bg-accent-500/40" />
                                    <div className="absolute top-0 left-0 h-full w-px bg-accent-500/40" />
                                </div>
                                <blockquote>
                                    <p className="text-white text-[22px] md:text-[26px] font-medium leading-[1.4] tracking-[-0.02em]">
                                        &ldquo;Technology should connect people and empower businesses. That&apos;s why Xynoos Vertex exists.&rdquo;
                                    </p>
                                    <footer className="mt-6 text-neutral-500 text-[13px] uppercase tracking-[0.1em]">— Xynoos Vertex Team</footer>
                                </blockquote>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </PageLayout>
    );
}
