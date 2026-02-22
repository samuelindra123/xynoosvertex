"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

export function ClosingSection() {
    return (
        <section id="closing" className="relative py-32 md:py-44 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-500/[0.03] blur-[100px]" />
            </div>

            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                >
                    {/* Divider */}
                    <div className="flex justify-center mb-12">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
                    </div>

                    <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white mb-6 max-w-[700px] mx-auto">
                        Ready to build something extraordinary?
                    </h2>

                    <p className="text-neutral-500 text-[16px] leading-relaxed max-w-[480px] mx-auto mb-12">
                        Whether you need a social platform, cloud storage, professional
                        design services, or a custom website — we&apos;re here.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/product"
                            className="inline-flex items-center justify-center h-12 px-8 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all duration-300"
                        >
                            Explore Products
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center h-12 px-8 border border-white/[0.1] text-neutral-400 text-[14px] rounded-lg hover:bg-white/[0.04] hover:text-neutral-200 hover:border-white/[0.15] transition-all duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Bottom mark */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-20 flex justify-center"
                    >
                        <div className="flex items-center gap-2.5 text-neutral-700">
                            <VertexMark size={16} color="currentColor" />
                            <span className="text-[11px] font-mono tracking-[0.15em] uppercase">
                                Xynoos Vertex
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
