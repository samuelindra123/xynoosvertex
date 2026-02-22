"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/system/SectionWrapper";

const principles = [
    {
        number: "01",
        title: "Precision Over Complexity",
        description:
            "Every API surface, every abstraction boundary, every default is a deliberate choice. We don't add features — we solve constraints. Complexity is never accidental; it's either justified or eliminated.",
    },
    {
        number: "02",
        title: "Human-Centered Systems",
        description:
            "Technology serves people, not the reverse. Our interfaces are designed for the humans who operate, debug, and evolve systems at 3 AM. Clarity is a non-negotiable requirement.",
    },
    {
        number: "03",
        title: "Composable Architecture",
        description:
            "No layer is mandatory. No feature is entangled. Every component can be adopted independently, replaced cleanly, and extended without permission. Your architecture, your decisions.",
    },
    {
        number: "04",
        title: "Engineering-First Design",
        description:
            "We design for engineers who read source code before documentation. Who care about failure modes before happy paths. Who measure systems by what happens under pressure.",
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

export function PhilosophySection() {
    return (
        <SectionWrapper id="philosophy" className="py-32 md:py-40">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    <div className="lg:col-span-3">
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                            Engineering Philosophy
                        </span>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </div>
                    <div className="lg:col-span-9">
                        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white mb-4">
                            Principles that{" "}
                            <span className="text-neutral-500">
                                define every decision we make.
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Principles */}
                <div className="space-y-0">
                    {principles.map((principle, i) => (
                        <motion.div
                            key={principle.number}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-10 border-t border-white/[0.06] last:border-b"
                        >
                            {/* Number */}
                            <div className="lg:col-span-1">
                                <span className="text-[13px] font-mono text-neutral-600">
                                    {principle.number}
                                </span>
                            </div>

                            {/* Title */}
                            <div className="lg:col-span-3">
                                <h3 className="text-white text-[17px] font-semibold tracking-[-0.01em] group-hover:text-accent-400 transition-colors duration-300">
                                    {principle.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <div className="lg:col-span-8">
                                <p className="text-neutral-500 text-[15px] leading-[1.8] max-w-[600px]">
                                    {principle.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
