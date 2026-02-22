"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";
import { VertexMark } from "@/components/system/VertexLogo";
import Link from "next/link";
import { useState } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

const packages = [
    {
        name: "Single Part",
        description: "One custom part or enclosure — ideal for simple prototypes and housings.",
        includes: ["3D CAD model (STEP/IGES)", "2D technical drawing", "1 revision round", "Export for 3D printing"],
        accent: "border-amber-500/20 hover:border-amber-500/30",
        dot: "bg-amber-400",
    },
    {
        name: "Full Assembly",
        description: "Multi-part assembly with mechanical fits, fasteners, and exploded views.",
        includes: ["Multi-part assembly", "Exploded view", "Bill of materials", "2 revision rounds", "Manufacturing-ready files"],
        accent: "border-emerald-500/20 hover:border-emerald-500/30",
        dot: "bg-emerald-400",
        popular: true,
    },
    {
        name: "Product Design",
        description: "End-to-end product design from concept sketches to production files.",
        includes: ["Concept development", "Full 3D modeling", "Photorealistic renders", "Technical drawings", "DFM analysis", "Manufacturing liaison"],
        accent: "border-violet-500/20 hover:border-violet-500/30",
        dot: "bg-violet-400",
    },
];

const capabilities = [
    { title: "Enclosures & Housings", description: "Custom enclosures for electronics, IoT devices, and industrial equipment.", icon: "□" },
    { title: "Mechanical Parts", description: "Brackets, mounts, gears, and precision components with full tolerancing.", icon: "⚙" },
    { title: "Prototyping", description: "3D print-ready models for rapid prototyping and design validation.", icon: "△" },
    { title: "Product Visualization", description: "Photorealistic renders for marketing, pitch decks, and client presentations.", icon: "◇" },
];

const process = [
    { step: "01", title: "Brief & References", description: "Share sketches, measurements, reference photos, or existing CAD files. We'll discuss requirements and scope." },
    { step: "02", title: "3D Modeling", description: "We build the parametric 3D model in SolidWorks, Fusion 360, or AutoCAD. You get preview renders for feedback." },
    { step: "03", title: "Review & Revise", description: "Review the model, request changes. We iterate until you're satisfied with the design." },
    { step: "04", title: "Final Delivery", description: "Receive STEP, IGES, STL files, technical drawings, and renders. Ready for manufacturing or 3D printing." },
];

export function ModelingServicePage() {
    const [form, setForm] = useState({ name: "", email: "", pkg: "", material: "", description: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <PageLayout>
            {/* Demo Banner */}
            <div className="bg-amber-500/[0.08] border-b border-amber-500/20 pt-16">
                <Container className="py-2.5">
                    <p className="text-center text-[12px] text-amber-400/80">
                        <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />This page is a <strong className="text-amber-300">demo preview</strong> — service ordering is <strong className="text-amber-300">coming soon</strong>.</span>
                    </p>
                </Container>
            </div>
            {/* Hero */}
            <section className="relative min-h-[60vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
                </div>

                <Container className="relative pt-40 pb-16">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <VertexMark size={18} color="white" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">3D Modeling Service</span>
                            <span className="ml-2 text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">Demo</span>
                        </div>
                        <div className="w-8 h-px bg-amber-500/40" />
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[750px]">
                        Custom 3D models,{" "}
                        <span className="text-neutral-500">built for manufacturing.</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px] mb-8">
                        From enclosures and prototypes to complex mechanical assemblies.
                        Tools: SolidWorks, Fusion 360, AutoCAD, Blender.
                        <span className="block text-neutral-600 text-[13px] mt-2">⚠ This is a demo page. Ordering will be available soon.</span>
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex gap-3">
                        <Link href="/services/3d-modeling/order" className="inline-flex items-center justify-center h-[42px] px-7 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all">
                            Order Now
                        </Link>
                        <Link href="/design/3d-modeling" className="inline-flex items-center justify-center h-[42px] px-7 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] transition-all">
                            View Portfolio
                        </Link>
                    </motion.div>
                </Container>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            </section>

            {/* Capabilities */}
            <Container className="py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {capabilities.map((cap, i) => (
                        <motion.div key={cap.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.1] transition-all duration-500">
                            <span className="text-[24px] mb-3 block opacity-40">{cap.icon}</span>
                            <h3 className="text-white text-[16px] font-semibold mb-2">{cap.title}</h3>
                            <p className="text-neutral-500 text-[13px] leading-[1.6]">{cap.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* Packages */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Packages</span>
                            <div className="w-8 h-px bg-amber-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                Choose your <span className="text-neutral-500">project scope.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {packages.map((pkg, i) => (
                            <motion.div key={pkg.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`relative p-7 rounded-2xl border bg-white/[0.01] transition-all duration-500 ${pkg.accent}`}>
                                {pkg.popular && (
                                    <span className="absolute -top-3 left-7 text-[10px] font-mono tracking-[0.1em] uppercase px-3 py-1 rounded-full bg-emerald-500 text-white">Most Popular</span>
                                )}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`w-2.5 h-2.5 rounded-full ${pkg.dot}`} />
                                    <h3 className="text-white text-[18px] font-semibold">{pkg.name}</h3>
                                </div>
                                <p className="text-neutral-400 text-[14px] leading-[1.6] mb-6">{pkg.description}</p>
                                <ul className="space-y-2.5">
                                    {pkg.includes.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5 text-[13px]">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 mt-0.5 shrink-0"><path d="M22 4 12 14.01l-3-3" /></svg>
                                            <span className="text-neutral-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Process */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Process</span>
                            <div className="w-8 h-px bg-amber-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                How it <span className="text-neutral-500">works.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {process.map((p, i) => (
                            <motion.div key={p.step} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                                <span className="text-[28px] font-semibold text-white/[0.06] block mb-3">{p.step}</span>
                                <h3 className="text-white text-[16px] font-semibold mb-2">{p.title}</h3>
                                <p className="text-neutral-500 text-[13px] leading-[1.6]">{p.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Order Form */}
            <section id="order" className="border-t border-white/[0.06] scroll-mt-20">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Order / Inquire</span>
                            <div className="w-8 h-px bg-amber-500/40 mb-8" />
                            <h2 className="text-white text-[24px] font-semibold tracking-[-0.02em] mb-4">Start your 3D project</h2>
                            <p className="text-neutral-400 text-[15px] leading-[1.8] mb-8">
                                Share your sketches, references, or ideas. We&apos;ll respond within 24 hours with a scope and quote.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-[13px]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400/60"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                    <span className="text-neutral-400">Turnaround: <span className="text-neutral-200">3–14 days</span></span>
                                </div>
                                <div className="flex items-center gap-3 text-[13px]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400/60"><path d="M22 4 12 14.01l-3-3" /><path d="M22 4 12 14.01l-3-3" /></svg>
                                    <span className="text-neutral-400">Output: <span className="text-neutral-200">STEP, IGES, STL, DWG</span></span>
                                </div>
                                <div className="flex items-center gap-3 text-[13px]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400/60"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                                    <span className="text-neutral-400">Tools: <span className="text-neutral-200">SolidWorks, Fusion 360</span></span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8">
                            {sent ? (
                                <div className="flex flex-col items-center justify-center min-h-[400px] p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400"><path d="M22 4 12 14.01l-3-3" /></svg>
                                    </div>
                                    <h3 className="text-white text-[22px] font-semibold mb-2">Request received!</h3>
                                    <p className="text-neutral-400 text-[15px] text-center max-w-[400px]">We&apos;ll review your project and respond within 24 hours with a detailed quote.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Name</label>
                                            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-amber-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="Your name" />
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Email</label>
                                            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-amber-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="you@company.com" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Package</label>
                                            <select value={form.pkg} onChange={(e) => setForm({ ...form, pkg: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white focus:border-amber-500/30 focus:outline-none transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-neutral-900">Select a package...</option>
                                                <option value="single" className="bg-neutral-900">Single Part</option>
                                                <option value="assembly" className="bg-neutral-900">Full Assembly</option>
                                                <option value="product" className="bg-neutral-900">Product Design</option>
                                                <option value="unsure" className="bg-neutral-900">Not sure yet</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Material / Process</label>
                                            <select value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white focus:border-amber-500/30 focus:outline-none transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-neutral-900">Select process...</option>
                                                <option value="3dprint" className="bg-neutral-900">3D Printing (FDM/SLA)</option>
                                                <option value="injection" className="bg-neutral-900">Injection Molding</option>
                                                <option value="cnc" className="bg-neutral-900">CNC Machining</option>
                                                <option value="sheetmetal" className="bg-neutral-900">Sheet Metal</option>
                                                <option value="unsure" className="bg-neutral-900">Not sure yet</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Project Description</label>
                                        <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-amber-500/30 focus:bg-white/[0.05] focus:outline-none transition-all resize-none" placeholder="Describe what you need: product type, dimensions, features, materials, quantity, deadline..." />
                                    </div>
                                    <button type="submit" className="inline-flex items-center justify-center h-12 px-8 bg-white text-neutral-950 text-[14px] font-medium rounded-xl hover:bg-neutral-100 transition-all w-full md:w-auto">
                                        Submit Request
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </Container>
            </section>
        </PageLayout>
    );
}
