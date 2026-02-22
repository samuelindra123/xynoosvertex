"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/system/Container";

interface PageIntroProps {
    label: string;
    title: React.ReactNode;
    description?: string;
    align?: "left" | "split";
}

export function PageIntro({
    label,
    title,
    description,
    align = "split",
}: PageIntroProps) {
    if (align === "left") {
        return (
            <Container className="pt-32 pb-20 md:pt-40 md:pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
                >
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-4">
                        {label}
                    </span>
                    <div className="w-8 h-px bg-accent-500/40 mb-8" />
                    <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white mb-6 max-w-[800px]">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-neutral-400 text-[17px] leading-relaxed max-w-[600px]">
                            {description}
                        </p>
                    )}
                </motion.div>
            </Container>
        );
    }

    return (
        <Container className="pt-32 pb-20 md:pt-40 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                <motion.div
                    className="lg:col-span-3"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
                >
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                        {label}
                    </span>
                    <div className="w-8 h-px bg-accent-500/40" />
                </motion.div>
                <motion.div
                    className="lg:col-span-9"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] as const }}
                >
                    <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white mb-6 max-w-[800px]">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-neutral-400 text-[17px] leading-relaxed max-w-[600px]">
                            {description}
                        </p>
                    )}
                </motion.div>
            </div>
        </Container>
    );
}
