"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";
import Image from "next/image";
import Link from "next/link";

const galleryItems = [
    {
        src: "/gallery/pcb-traces.png",
        title: "PCB Trace Routing",
        description: "Multi-layer copper routing with vias, ground planes, and differential pairs for high-speed signal integrity.",
        category: "PCB Design",
    },
    {
        src: "/gallery/pcb-silkscreen.png",
        title: "Silkscreen Layer",
        description: "Component outlines, reference designators, polarity marks, and assembly guidelines for manufacturing.",
        category: "PCB Design",
    },
    {
        src: "/gallery/pcb-3d-render.png",
        title: "Assembled Board",
        description: "Photorealistic 3D render of a fully assembled PCB with surface mount components and gold connectors.",
        category: "3D Render",
    },
    {
        src: "/gallery/pcb-easyeda.png",
        title: "EasyEDA Layout",
        description: "Complex double-sided PCB routing in EasyEDA with front (red) and back (blue) copper layers, component placement optimization.",
        category: "PCB Design",
    },
    {
        src: "/gallery/pcb-kicad.png",
        title: "KiCad Multi-Layer Design",
        description: "Microcontroller-based circuit board layout in KiCad with advanced routing, BGA fanout, and multi-layer stackup.",
        category: "PCB Design",
    },
    {
        src: "/gallery/iot-esp32-relay.png",
        title: "ESP32 Relay Controller",
        description: "Custom IoT board with ESP32 module, 4-channel relay array, USB-C power, screw terminals, and status LEDs for home automation.",
        category: "IoT Project",
    },
    {
        src: "/gallery/iot-sensor-board.png",
        title: "IoT Multi-Sensor Board",
        description: "Compact sensor hub featuring ESP32, BME280, PIR motion sensor, LDR, buzzer, RGB LED array, OLED connector, and battery charging circuit.",
        category: "IoT Project",
    },
    {
        src: "/gallery/iot-complete-project.png",
        title: "Complete IoT System",
        description: "Fully assembled IoT project with ESP32, OLED display showing live sensor data, relay module, LED strip control, all in a 3D-printed enclosure.",
        category: "IoT Project",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

export function GalleryPage() {
    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[50vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`,
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
                </div>

                <Container className="relative pt-40 pb-16">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <Link href="/design" className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] hover:text-emerald-400 transition-colors">
                                ← Design Services
                            </Link>
                            <span className="text-neutral-700">/</span>
                            <span className="text-[11px] font-semibold text-emerald-400/70 uppercase tracking-[0.2em]">
                                Gallery
                            </span>
                        </div>
                        <div className="w-8 h-px bg-emerald-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[700px]"
                    >
                        Our work, <span className="text-neutral-500">up close.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        From schematic design and PCB routing to fully assembled IoT systems.
                        Every project represents precision engineering and attention to detail.
                    </motion.p>
                </Container>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            </section>

            {/* ── Gallery Grid ── */}
            <Container className="py-24 md:py-32">
                {/* Category stats */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-6 mb-16"
                >
                    {["PCB Design", "3D Render", "IoT Project"].map((cat) => {
                        const count = galleryItems.filter((g) => g.category === cat).length;
                        return (
                            <div key={cat} className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${cat === "PCB Design" ? "bg-emerald-400" :
                                    cat === "3D Render" ? "bg-violet-400" :
                                        "bg-amber-400"
                                    }`} />
                                <span className="text-[12px] text-neutral-400 font-medium">{cat}</span>
                                <span className="text-[11px] text-neutral-600 font-mono">{count}</span>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Masonry-like grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className={`group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.01] hover:border-emerald-500/20 transition-all duration-500 ${i === 0 || i === 5 ? "md:col-span-2 lg:col-span-2" : ""
                                }`}
                        >
                            {/* Image */}
                            <div className={`relative overflow-hidden ${i === 0 || i === 5 ? "aspect-[2/1]" : "aspect-square"
                                }`}>
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                                    sizes={i === 0 || i === 5 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* Hover corner glow */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-500/[0.08] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>

                            {/* Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`text-[9px] font-mono tracking-[0.15em] uppercase px-2 py-0.5 rounded-full border ${item.category === "PCB Design"
                                        ? "text-emerald-400/80 border-emerald-400/20 bg-emerald-400/[0.08]"
                                        : item.category === "3D Render"
                                            ? "text-violet-400/80 border-violet-400/20 bg-violet-400/[0.08]"
                                            : "text-amber-400/80 border-amber-400/20 bg-amber-400/[0.08]"
                                        }`}>
                                        {item.category}
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-600">
                                        {String(i + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
                                    </span>
                                </div>
                                <h3 className="text-white text-[17px] font-semibold tracking-[-0.01em] mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-neutral-400 text-[13px] leading-relaxed max-w-[500px]">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* ── CTA ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-white text-[22px] font-semibold tracking-[-0.01em] mb-3">
                            Need a custom design?
                        </h2>
                        <p className="text-neutral-500 text-[15px] mb-8">
                            Let&apos;s discuss your PCB or IoT project requirements.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <Link
                                href="/design"
                                className="inline-flex items-center justify-center h-11 px-7 bg-emerald-500 text-white text-[14px] font-medium rounded-lg hover:bg-emerald-400 transition-all"
                            >
                                Our Services
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-11 px-7 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] transition-all"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </PageLayout>
    );
}
