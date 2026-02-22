"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/system/SectionWrapper";

export function VisionSection() {
    return (
        <SectionWrapper id="vision" className="py-32 md:py-40">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    {/* Left — Label */}
                    <div className="lg:col-span-3">
                        <div className="lg:sticky lg:top-32">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                                Our Vision
                            </span>
                            <div className="w-8 h-px bg-accent-500/40" />
                        </div>
                    </div>

                    {/* Right — Manifesto */}
                    <div className="lg:col-span-9">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                            className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium leading-[1.3] tracking-[-0.02em] text-white mb-12"
                        >
                            We didn&apos;t build Xynoos Vertex because the world needed
                            another platform.{" "}
                            <span className="text-neutral-500">
                                We built it because engineering teams deserve infrastructure that
                                respects their intelligence.
                            </span>
                        </motion.p>

                        <div className="space-y-8">
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="text-neutral-400 text-[16px] leading-[1.8] max-w-[680px]"
                            >
                                Every abstraction in modern software carries a cost.
                                Convenience layers that obscure. Frameworks that dictate.
                                Platforms that lock you into someone else&apos;s assumptions
                                about how your systems should work.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.25 }}
                                className="text-neutral-400 text-[16px] leading-[1.8] max-w-[680px]"
                            >
                                Vertex is the counterargument. An infrastructure layer that
                                gives you more control, not less. That scales with your
                                architecture, not against it. That treats engineering decisions
                                as sovereign — because they are.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.35 }}
                                className="text-neutral-300 text-[16px] leading-[1.8] max-w-[680px] font-medium"
                            >
                                This is software infrastructure with intent. Built by engineers,
                                for the systems that matter.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
