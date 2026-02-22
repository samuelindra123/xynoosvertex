"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

const navLinks = [
    { label: "Vision", href: "#vision" },
    { label: "Platform", href: "#platform" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Ecosystem", href: "#ecosystem" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.06]"
                    : "bg-transparent"
                }`}
        >
            <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <VertexMark size={24} color="white" className="group-hover:opacity-80 transition-opacity duration-300" />
                    <span className="text-white font-semibold text-[15px] tracking-tight">
                        Xynoos<span className="text-neutral-400 ml-0.5">Vertex</span>
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-[13px] text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide uppercase"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <Link
                        href="#closing"
                        className="text-[13px] text-neutral-300 hover:text-white transition-colors duration-300 hidden sm:block"
                    >
                        Contact
                    </Link>
                    <Link
                        href="#closing"
                        className="text-[13px] bg-white text-neutral-950 px-4 py-1.5 rounded-md font-medium hover:bg-neutral-100 transition-colors duration-300"
                    >
                        Get Access
                    </Link>
                </div>
            </nav>
        </motion.header>
    );
}
