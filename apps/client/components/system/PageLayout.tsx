"use client";

import { motion } from "framer-motion";

interface PageLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const }}
            className={`min-h-screen ${className}`}
        >
            {children}
        </motion.div>
    );
}
