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

const missionItems = [
    {
        number: "01",
        title: "Build a Privacy-First Social Platform",
        description:
            "Develop a social media platform that puts user privacy and data security first. No hidden tracking, no data selling, and end-to-end encryption as standard — not an afterthought.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Deliver Secure & Reliable Cloud Storage",
        description:
            "Provide cloud storage that is fast, encrypted, and always available. Every file is protected with end-to-end encryption so that user data remains fully owned by the user.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Provide World-Class Engineering Design Services",
        description:
            "Deliver PCB design and 3D modeling services to the highest industry standards. From schematic capture to production files, every design is crafted by experienced engineers with uncompromising attention to detail.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Build Websites That Matter",
        description:
            "Develop commercial and non-commercial websites with modern standards. Every web project — whether for businesses or non-profit organizations — is built with cutting-edge technology and purposeful design.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 18l6-6-6-6" />
                <path d="M8 6l-6 6 6 6" />
            </svg>
        ),
    },
    {
        number: "05",
        title: "Operate with Radical Transparency",
        description:
            "Build long-term relationships with users and clients through full transparency. Clear pricing, an open roadmap, and honest communication at every stage of collaboration.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
];

const coreValues = [
    { value: "Quality", description: "Never compromise on the quality of our products and services" },
    { value: "Privacy", description: "User data belongs to users — it is not a commodity to be traded" },
    { value: "Transparency", description: "Open and honest in every decision and process we undertake" },
    { value: "Innovation", description: "Continuously evolving and adapting to the latest technologies" },
    { value: "Integrity", description: "Consistent and truthful in every action and commitment" },
    { value: "Partnership", description: "Working alongside clients as partners, not just another vendor" },
];

export function VisiMisiPage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[70vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`,
                            backgroundSize: "28px 28px",
                        }}
                    />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent-500/[0.05] blur-[160px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-600/[0.03] blur-[100px]" />
                </div>

                {/* Decorative logo watermark */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[8%] hidden lg:block"
                >
                    <VertexMark size={260} color="white" className="opacity-[0.02]" />
                </motion.div>

                <Container className="relative pt-40 pb-20">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <VertexMark size={20} color="white" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">
                                Vision & Mission
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
                        Building a digital future{" "}
                        <span className="text-neutral-500">
                            that respects people.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[600px]"
                    >
                        Xynoos Vertex was founded on the belief that technology should serve
                        people — not the other way around. Every product and service we build
                        is grounded in this principle.
                    </motion.p>
                </Container>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </section>

            {/* ── Vision ── */}
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
                            Vision
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>
                    <div className="lg:col-span-8">
                        <motion.div
                            custom={1}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="relative p-10 rounded-2xl border border-accent-500/10 bg-gradient-to-br from-accent-500/[0.04] to-transparent"
                        >
                            {/* Large quote mark */}
                            <div className="absolute top-6 left-8 text-[80px] font-serif text-accent-400/10 leading-none select-none">
                                &ldquo;
                            </div>
                            <p className="relative text-white text-[24px] md:text-[28px] leading-[1.5] font-medium tracking-[-0.02em] mb-6">
                                To be a leading technology company that builds digital platforms
                                and engineering services defined by quality, privacy, and
                                unwavering trust.
                            </p>
                            <p className="text-neutral-400 text-[16px] leading-[1.8]">
                                We envision a world where people can connect digitally without
                                sacrificing privacy. Where businesses receive world-class
                                engineering services at fair prices. Where technology
                                genuinely works for the people who use it.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </Container>

            {/* ── Mission ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-4">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                                Mission
                            </span>
                            <div className="w-8 h-px bg-accent-500/40" />
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                Five commitments{" "}
                                <span className="text-neutral-500">we stand by.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {missionItems.map((mission, i) => (
                            <motion.div
                                key={mission.number}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-500"
                            >
                                {/* Background number */}
                                <div className="absolute top-6 right-8 text-[80px] font-bold text-white/[0.02] leading-none tracking-tighter select-none">
                                    {mission.number}
                                </div>

                                <div className="relative p-8 md:p-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                                        {/* Left */}
                                        <div className="lg:col-span-4 flex items-start gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-400 group-hover:text-accent-400 group-hover:border-accent-500/20 transition-all duration-300 shrink-0">
                                                {mission.icon}
                                            </div>
                                            <div>
                                                <span className="text-[12px] font-mono text-neutral-600 block mb-1">
                                                    Mission {mission.number}
                                                </span>
                                                <h3 className="text-white text-[17px] font-semibold tracking-[-0.01em] leading-[1.3] group-hover:text-accent-400 transition-colors duration-300">
                                                    {mission.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Right */}
                                        <div className="lg:col-span-8">
                                            <p className="text-neutral-400 text-[15px] leading-[1.8]">
                                                {mission.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom accent */}
                                    <div className="mt-6 h-px bg-gradient-to-r from-accent-500/0 via-accent-500/15 to-accent-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── Core Values ── */}
            <section className="border-t border-white/[0.06]">
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
                                The foundation of{" "}
                                <span className="text-neutral-500">everything we do.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {coreValues.map((item, i) => (
                            <motion.div
                                key={item.value}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                className="group p-7 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-500"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-accent-400/60 group-hover:bg-accent-400 transition-colors" />
                                    <h3 className="text-white text-[17px] font-semibold tracking-[-0.01em]">
                                        {item.value}
                                    </h3>
                                </div>
                                <p className="text-neutral-500 text-[14px] leading-[1.7]">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
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
                            Ready to work with us?
                        </h2>
                        <p className="text-neutral-500 text-[15px] mb-8">
                            Explore our products or get in touch with our team.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <Link
                                href="/product"
                                className="inline-flex items-center justify-center h-11 px-7 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all"
                            >
                                Explore Products
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-11 px-7 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] transition-all"
                            >
                                About Us
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </PageLayout>
    );
}
