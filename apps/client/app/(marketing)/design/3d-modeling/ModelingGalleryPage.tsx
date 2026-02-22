"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

const items = [
    {
        src: "/gallery/3d-enclosure-cad.png",
        title: "Electronic Enclosure — CAD Design",
        description: "Custom enclosure with ventilation grilles, display cutout, and internal mounting posts. Modeled in SolidWorks with full parametric feature tree.",
        category: "CAD Design",
        categoryColor: "text-blue-400 border-blue-400/20 bg-blue-400/[0.08]",
        tools: "SolidWorks",
    },
    {
        src: "/gallery/3d-product-render.png",
        title: "IoT Sensor Housing — Fusion 360",
        description: "Compact sensor device enclosure with internal PCB standoffs, clip-on lid, and circular sensor window cutout. Cross-section view showing wall thickness and internal feature structure.",
        category: "Prototype Housing",
        categoryColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/[0.08]",
        tools: "Autodesk Fusion 360",
    },
    {
        src: "/gallery/3d-mechanical-drawing.png",
        title: "Heavy-Duty Bracket — Technical Drawing",
        description: "Full engineering documentation with orthographic views, section cuts, GD&T tolerances, and precise dimension annotations. Ready for manufacturing.",
        category: "Technical Drawing",
        categoryColor: "text-amber-400 border-amber-400/20 bg-amber-400/[0.08]",
        tools: "Autodesk Fusion 360",
    },
    {
        src: "/gallery/3d-exploded-assembly.png",
        title: "Sensor Housing — Exploded Assembly",
        description: "Exploded view showing all individual components: top cover, base, gaskets, internal frame, display bezel, and hardware. Designed for IP65 rating.",
        category: "Assembly",
        categoryColor: "text-violet-400 border-violet-400/20 bg-violet-400/[0.08]",
        tools: "SolidWorks",
    },
    {
        src: "/gallery/3d-industrial-panel.png",
        title: "2U Rackmount Chassis — Cutaway View",
        description: "19-inch server rack chassis with front panel connector cutouts, fan grille patterns, internal card guide rails, motherboard mounting tray, and power supply bay. Section view showing internal structure.",
        category: "Industrial CAD",
        categoryColor: "text-cyan-400 border-cyan-400/20 bg-cyan-400/[0.08]",
        tools: "SolidWorks",
    },
];

export function ModelingGalleryPage() {
    const [lightbox, setLightbox] = useState<number | null>(null);

    return (
        <PageLayout>
            {/* Lightbox */}
            {lightbox !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setLightbox(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-w-[1100px] max-h-[85vh] w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={items[lightbox].src}
                            alt={items[lightbox].title}
                            width={1100}
                            height={800}
                            className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
                        />
                        <div className="mt-4 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-white text-[18px] font-semibold">{items[lightbox].title}</h3>
                                <p className="text-neutral-400 text-[14px] mt-1">{items[lightbox].description}</p>
                            </div>
                            <button
                                onClick={() => setLightbox(null)}
                                className="text-neutral-400 hover:text-white transition-colors shrink-0 p-2"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Hero */}
            <section className="relative flex items-end overflow-hidden">
                <Container className="relative pt-40 pb-16">
                    {/* Breadcrumb */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mb-8">
                        <div className="flex items-center gap-2 text-[12px] text-neutral-600">
                            <Link href="/design" className="hover:text-neutral-400 transition-colors">Design Services</Link>
                            <span>/</span>
                            <Link href="/design/gallery" className="hover:text-neutral-400 transition-colors">Gallery</Link>
                            <span>/</span>
                            <span className="text-neutral-400">3D Modeling</span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-accent-500" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">
                                3D Modeling Portfolio
                            </span>
                        </div>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white mb-6 max-w-[700px]"
                    >
                        From concept to <span className="text-neutral-500">production-ready CAD.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        Custom 3D modeling for enclosures, prototypes, mechanical parts, and
                        industrial assemblies. From initial sketch to manufacturing-ready technical drawings.
                    </motion.p>
                </Container>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </section>

            {/* Gallery */}
            <Container className="py-20 md:py-24">
                <div className="space-y-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.1] transition-all duration-500"
                        >
                            {/* Image */}
                            <div
                                className="lg:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer"
                                onClick={() => setLightbox(i)}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M11 8v6" /><path d="M8 11h6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="lg:col-span-5 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`text-[9px] font-mono tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border ${item.categoryColor}`}>
                                        {item.category}
                                    </span>
                                </div>

                                <h3 className="text-white text-[20px] font-semibold tracking-[-0.01em] mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-neutral-400 text-[14px] leading-[1.7] mb-5">
                                    {item.description}
                                </p>

                                <div className="flex items-center gap-2 text-[12px]">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600">
                                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                    </svg>
                                    <span className="text-neutral-500">Tools: <span className="text-neutral-300">{item.tools}</span></span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* CTA */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20 text-center">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-white text-[clamp(1.3rem,3vw,1.75rem)] font-semibold tracking-[-0.02em] mb-4">
                            Need a custom 3D model?
                        </h2>
                        <p className="text-neutral-500 text-[15px] mb-8 max-w-[500px] mx-auto">
                            From product enclosures to mechanical assemblies — we design it, you manufacture it.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <Link href="/contact" className="inline-flex items-center justify-center h-[42px] px-7 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all">
                                Get a Quote
                            </Link>
                            <Link href="/design/gallery" className="inline-flex items-center justify-center h-[42px] px-7 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] transition-all">
                                PCB Design Gallery
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </PageLayout>
    );
}
