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

const products = [
    {
        id: "01",
        title: "Xynoos Social",
        subtitle: "Social Media Platform",
        description:
            "A next-generation social media platform designed for authentic connection. Share, interact, and build communities — with integrated cloud storage for seamless media management.",
        color: "from-blue-500/20 to-blue-600/5",
        borderColor: "border-blue-500/20",
        dotColor: "bg-blue-400",
        features: ["Social Feeds", "Messaging", "Communities", "Cloud Storage"],
        href: "/social",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        id: "02",
        title: "Cloud Storage",
        subtitle: "Integrated Storage Platform",
        description:
            "Enterprise-grade cloud storage built into the social platform. Secure file hosting, media management, and seamless sharing — all with end-to-end encryption.",
        color: "from-violet-500/20 to-violet-600/5",
        borderColor: "border-violet-500/20",
        dotColor: "bg-violet-400",
        features: ["File Hosting", "Media CDN", "E2E Encryption", "Sharing"],
        href: "/storage",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
        ),
    },
    {
        id: "03",
        title: "Design Services",
        subtitle: "PCB Design & 3D Modeling",
        description:
            "Professional engineering design services. From PCB layout and schematic design to precision 3D modeling and rendering — delivered by experienced engineers.",
        color: "from-emerald-500/20 to-emerald-600/5",
        borderColor: "border-emerald-500/20",
        dotColor: "bg-emerald-400",
        features: ["PCB Design", "3D Modeling", "Technical Drawing", "Prototyping"],
        href: "/design",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
            </svg>
        ),
    },
    {
        id: "04",
        title: "Web Development",
        subtitle: "Commercial & Non-Commercial",
        description:
            "Full-stack website development for businesses and organizations. From corporate sites and e-commerce platforms to non-profit portals — built with modern, scalable technology.",
        color: "from-amber-500/20 to-amber-600/5",
        borderColor: "border-amber-500/20",
        dotColor: "bg-amber-400",
        features: ["Corporate Sites", "E-Commerce", "Web Apps", "Landing Pages"],
        href: "/webdev",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 18l6-6-6-6" />
                <path d="M8 6l-6 6 6 6" />
                <path d="M14.5 4l-5 16" />
            </svg>
        ),
    },
];

export function ProductPage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[60vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`,
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent-500/[0.04] blur-[120px]" />
                </div>

                <Container className="relative pt-40 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                            Products & Services
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[800px]"
                    >
                        Everything you need.{" "}
                        <span className="text-neutral-500">Under one roof.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        From our social media platform and cloud storage to professional
                        design and web development services — Xynoos Vertex delivers
                        technology that matters.
                    </motion.p>
                </Container>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </section>

            {/* ── Product cards ── */}
            <Container className="py-24 md:py-32">
                <div className="space-y-8">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                        >
                            <Link
                                href={product.href}
                                className={`group block relative rounded-2xl border ${product.borderColor} bg-gradient-to-br ${product.color} p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-white/[0.15]`}
                            >
                                {/* Background circles */}
                                <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] pointer-events-none">
                                    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                                        <circle cx="80" cy="80" r="60" stroke="white" strokeWidth="0.5" />
                                        <circle cx="80" cy="80" r="40" stroke="white" strokeWidth="0.5" />
                                        <circle cx="80" cy="80" r="20" stroke="white" strokeWidth="0.5" />
                                    </svg>
                                </div>

                                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                                    {/* Left */}
                                    <div className="lg:col-span-5">
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.04] border ${product.borderColor} text-neutral-300 group-hover:text-white transition-colors`}>
                                                {product.icon}
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-mono text-neutral-500 tracking-[0.2em] uppercase block">
                                                    {product.id}
                                                </span>
                                                <span className="text-[12px] text-neutral-400">{product.subtitle}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-white text-[26px] font-semibold tracking-[-0.02em] mb-3 group-hover:text-accent-400 transition-colors">
                                            {product.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-5">
                                            {product.features.map((f) => (
                                                <span
                                                    key={f}
                                                    className="text-[11px] text-neutral-400 px-3 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.03]"
                                                >
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right */}
                                    <div className="lg:col-span-7 flex items-center">
                                        <div>
                                            <p className="text-neutral-400 text-[15px] leading-[1.9] mb-6">
                                                {product.description}
                                            </p>
                                            <span className="text-[13px] text-accent-400/70 group-hover:text-accent-400 transition-colors inline-flex items-center gap-2">
                                                Learn more
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                                    <path d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </PageLayout>
    );
}
