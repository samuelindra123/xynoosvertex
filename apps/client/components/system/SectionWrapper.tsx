"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const sectionVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    },
};

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className={`px-6 md:px-12 lg:px-20 ${className}`}
        >
            {children}
        </motion.section>
    );
}
