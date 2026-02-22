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
        title: "PCB Schematic Design",
        description: "Complete schematic capture from concept to production-ready designs. Multi-layer PCB layouts with full DRC validation, component optimization, and manufacturing-ready Gerber output.",
        deliverables: ["Schematic Files", "BOM List", "Gerber Files", "Assembly Guide"],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M7 7h2v2H7zm6 0h2v2h-2zm-6 6h2v2H7zm6 6h2v2h-2z" />
                <path d="M9 8h4M8 13h7M14 9v4M8 14v5" />
            </svg>
        ),
    },
    {
        title: "PCB Layout & Routing",
        description: "High-density PCB routing with impedance matching, thermal management, and EMI considerations. From simple 2-layer boards to complex 8+ layer designs for high-speed digital and RF applications.",
        deliverables: ["PCB Layout", "3D Board View", "Test Points", "Fabrication Notes"],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 3v18" />
                <circle cx="15" cy="15" r="2" />
            </svg>
        ),
    },
    {
        title: "3D Modeling",
        description: "Precision 3D modeling for industrial, product, and mechanical design. Parametric modeling, surface modeling, and photorealistic rendering for visualization, prototyping, and manufacturing.",
        deliverables: ["3D CAD Files", "Technical Drawings", "Rendered Images", "STL/STEP Export"],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="M3.27 6.96L12 12.01l8.73-5.05" />
                <path d="M12 22.08V12" />
            </svg>
        ),
    },
    {
        title: "3D Rendering & Visualization",
        description: "Photorealistic rendering and animation for product visualization, marketing, and presentations. High-quality output for catalogs, websites, and investor materials.",
        deliverables: ["4K Renders", "360° Views", "Animation", "Material Library"],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
        ),
    },
];

const process = [
    { step: "01", title: "Consultation", description: "We discuss requirements, specifications, and project scope." },
    { step: "02", title: "Design Phase", description: "Our engineers create initial designs with regular review checkpoints." },
    { step: "03", title: "Review & Iterate", description: "You review the design, provide feedback, and we iterate until perfect." },
    { step: "04", title: "Delivery", description: "Final files delivered in industry-standard formats, production-ready." },
];

export function DesignPage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[75vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
                        <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
                            <circle cx="300" cy="300" r="280" stroke="white" strokeWidth="0.5" />
                            <circle cx="300" cy="300" r="200" stroke="white" strokeWidth="0.5" />
                            <circle cx="300" cy="300" r="120" stroke="white" strokeWidth="0.5" />
                            <line x1="300" y1="0" x2="300" y2="600" stroke="white" strokeWidth="0.3" />
                            <line x1="0" y1="300" x2="600" y2="300" stroke="white" strokeWidth="0.3" />
                        </svg>
                    </div>
                    <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-emerald-500/[0.04] blur-[140px]" />
                </div>

                {/* PCB-style SVG */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="absolute top-1/2 -translate-y-1/2 right-[5%] hidden xl:block"
                >
                    <svg width="200" height="240" viewBox="0 0 200 240" fill="none" className="opacity-[0.07]">
                        {/* PCB board outline */}
                        <rect x="20" y="20" width="160" height="200" rx="8" stroke="white" strokeWidth="1" />
                        {/* Traces */}
                        <path d="M40 60 h30 v40 h50 v-20 h30" stroke="white" strokeWidth="0.7" fill="none" />
                        <path d="M40 120 h20 v30 h60 v-30 h40" stroke="white" strokeWidth="0.7" fill="none" />
                        <path d="M40 180 h80 v-20 h40" stroke="white" strokeWidth="0.7" fill="none" />
                        {/* Components */}
                        <rect x="70" y="55" width="20" height="10" rx="1" stroke="white" strokeWidth="0.5" />
                        <rect x="110" y="95" width="20" height="10" rx="1" stroke="white" strokeWidth="0.5" />
                        <circle cx="60" cy="150" r="6" stroke="white" strokeWidth="0.5" />
                        <circle cx="140" cy="150" r="6" stroke="white" strokeWidth="0.5" />
                        {/* IC chip */}
                        <rect x="85" y="130" width="30" height="40" rx="2" stroke="white" strokeWidth="0.7" />
                        <line x1="85" y1="140" x2="78" y2="140" stroke="white" strokeWidth="0.4" />
                        <line x1="85" y1="150" x2="78" y2="150" stroke="white" strokeWidth="0.4" />
                        <line x1="85" y1="160" x2="78" y2="160" stroke="white" strokeWidth="0.4" />
                        <line x1="115" y1="140" x2="122" y2="140" stroke="white" strokeWidth="0.4" />
                        <line x1="115" y1="150" x2="122" y2="150" stroke="white" strokeWidth="0.4" />
                        <line x1="115" y1="160" x2="122" y2="160" stroke="white" strokeWidth="0.4" />
                        {/* Vias */}
                        <circle cx="40" cy="60" r="3" fill="white" opacity="0.3" />
                        <circle cx="40" cy="120" r="3" fill="white" opacity="0.3" />
                        <circle cx="40" cy="180" r="3" fill="white" opacity="0.3" />
                        <circle cx="160" cy="80" r="3" fill="white" opacity="0.3" />
                        <circle cx="160" cy="120" r="3" fill="white" opacity="0.3" />
                        <circle cx="160" cy="160" r="3" fill="white" opacity="0.3" />
                    </svg>
                </motion.div>

                <Container className="relative pt-40 pb-20">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">Design Services</span>
                        </div>
                        <div className="w-8 h-px bg-emerald-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[800px]"
                    >
                        PCB design &amp; 3D modeling.{" "}
                        <span className="text-neutral-500">Engineering precision.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        Professional engineering design services by experienced designers.
                        From schematic capture and PCB layout to precision 3D modeling and
                        photorealistic rendering.
                    </motion.p>
                </Container>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            </section>

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
                            className="group relative p-8 rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-emerald-500/[0.04] to-transparent hover:border-emerald-500/20 transition-all duration-500"
                        >
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-emerald-500/20 text-emerald-400/70 mb-5 group-hover:text-emerald-300 transition-colors">
                                {svc.icon}
                            </div>
                            <h3 className="text-white text-[18px] font-semibold tracking-[-0.01em] mb-3">{svc.title}</h3>
                            <p className="text-neutral-400 text-[14px] leading-[1.8] mb-5">{svc.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {svc.deliverables.map((d) => (
                                    <span key={d} className="text-[10px] text-emerald-400/60 px-2.5 py-1 rounded border border-emerald-500/15 bg-emerald-500/[0.04] font-mono tracking-wide">
                                        {d}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* ── Portfolio CTA ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl border border-emerald-500/10 bg-gradient-to-r from-emerald-500/[0.04] to-transparent"
                    >
                        <div>
                            <h3 className="text-white text-[20px] font-semibold tracking-[-0.01em] mb-2">
                                See our work in action
                            </h3>
                            <p className="text-neutral-400 text-[14px] leading-relaxed">
                                Browse our portfolio of PCB designs, 3D models, IoT projects, and engineering work.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <Link
                                href="/design/gallery"
                                className="inline-flex items-center gap-2 h-11 px-6 bg-emerald-500 text-white text-[14px] font-medium rounded-lg hover:bg-emerald-400 transition-all"
                            >
                                PCB Gallery
                            </Link>
                            <Link
                                href="/design/3d-modeling"
                                className="inline-flex items-center gap-2 h-11 px-6 border border-white/[0.1] text-neutral-300 text-[14px] font-medium rounded-lg hover:bg-white/[0.04] transition-all"
                            >
                                3D Modeling
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* ── Process ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Our Process</span>
                            <div className="w-8 h-px bg-emerald-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white">From concept <span className="text-neutral-500">to delivery.</span></h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-3" />
                        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {process.map((p) => (
                                <div key={p.step} className="flex gap-4">
                                    <span className="text-[24px] font-bold text-emerald-400/20 leading-none">{p.step}</span>
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
                        <Link href="/storage" className="text-[13px] text-neutral-400 hover:text-white border border-white/[0.08] px-5 py-2 rounded-lg hover:bg-white/[0.03] transition-all">← Cloud Storage</Link>
                        <Link href="/webdev" className="text-[13px] text-emerald-400/80 hover:text-emerald-300 border border-emerald-500/20 px-5 py-2 rounded-lg hover:bg-emerald-500/[0.05] transition-all">Web Development →</Link>
                    </div>
                </Container>
            </section>
        </PageLayout>
    );
}
