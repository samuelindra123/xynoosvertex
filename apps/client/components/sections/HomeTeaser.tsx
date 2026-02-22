"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/system/Container";

const teasers = [
    {
        label: "01",
        title: "Products",
        description: "Social media platform, cloud storage, and professional engineering services — all under one roof.",
        href: "/product",
    },
    {
        label: "02",
        title: "Vision",
        description: "Why Xynoos Vertex exists. Our mission to connect people and empower businesses through technology.",
        href: "/vision",
    },
    {
        label: "03",
        title: "Company",
        description: "The team and culture behind the platform. Built by engineers who believe in precision and quality.",
        href: "/contact",
    },
    {
        label: "04",
        title: "Ecosystem",
        description: "Our growing ecosystem of products, services, and integrations — designed to expand with you.",
        href: "/ecosystem",
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

export function HomeTeaser() {
    return (
        <Container as="section" className="py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                <div className="lg:col-span-3">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                        Explore
                    </span>
                    <div className="w-8 h-px bg-accent-500/40" />
                </div>
                <div className="lg:col-span-9">
                    <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                        Discover what we build.
                    </h2>
                </div>
            </div>

            <div className="space-y-0">
                {teasers.map((teaser, i) => (
                    <motion.div
                        key={teaser.href}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        <Link
                            href={teaser.href}
                            className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-8 border-t border-white/[0.06] last:border-b transition-colors hover:bg-white/[0.01]"
                        >
                            <div className="lg:col-span-1">
                                <span className="text-[13px] font-mono text-neutral-600">
                                    {teaser.label}
                                </span>
                            </div>
                            <div className="lg:col-span-3">
                                <h3 className="text-white text-[18px] font-semibold tracking-[-0.01em] group-hover:text-accent-400 transition-colors duration-300">
                                    {teaser.title}
                                </h3>
                            </div>
                            <div className="lg:col-span-7">
                                <p className="text-neutral-500 text-[15px] leading-relaxed">
                                    {teaser.description}
                                </p>
                            </div>
                            <div className="lg:col-span-1 flex items-center justify-end">
                                <svg
                                    className="w-4 h-4 text-neutral-600 group-hover:text-accent-400 group-hover:translate-x-1 transition-all duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Container>
    );
}
