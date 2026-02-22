"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const wordVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    },
};

interface AnimatedTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function AnimatedText({
    text,
    className = "",
    as: Tag = "p",
}: AnimatedTextProps) {
    const words = text.split(" ");

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="inline"
        >
            <Tag className={className}>
                {words.map((word, i) => (
                    <motion.span
                        key={`${word}-${i}`}
                        variants={wordVariants}
                        className="inline-block mr-[0.3em]"
                    >
                        {word}
                    </motion.span>
                ))}
            </Tag>
        </motion.div>
    );
}
