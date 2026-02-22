"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

const mainLinks = [
    { label: "Product", href: "/product" },
];

const servicesLinks = [
    {
        label: "PCB Design",
        href: "/services/pcb-design",
        description: "Schematic, layout, and Gerber files",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M7 7h2v2H7zm6 0h2v2h-2zm-6 6h2v2H7z" />
                <path d="M9 8h4M8 13h7M14 9v4" />
            </svg>
        ),
    },
    {
        label: "3D Modeling",
        href: "/services/3d-modeling",
        description: "Enclosures, prototypes, and mechanical parts",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
];

const moreLinks = [
    { label: "Vision", href: "/vision", description: "Our vision for the future" },
    { label: "Philosophy", href: "/philosophy", description: "How we think and build" },
    { label: "Ecosystem", href: "/ecosystem", description: "The Vertex product ecosystem" },
    { label: "Visi & Misi", href: "/visi-misi", description: "Visi dan misi perusahaan" },
    { label: "Developers", href: "/developers", description: "Meet the developer" },
];

export function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setMoreOpen(false);
            }
            if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
                setServicesOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Close on route change
    useEffect(() => {
        setMoreOpen(false);
        setServicesOpen(false);
    }, [pathname]);

    const isMoreActive = moreLinks.some((l) => pathname === l.href);
    const isServicesActive = servicesLinks.some((l) => pathname === l.href);
    const [servicesOpen, setServicesOpen] = useState(false);
    const servicesRef = useRef<HTMLDivElement>(null);

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
                    <VertexMark
                        size={24}
                        color="white"
                        className="group-hover:opacity-80 transition-opacity duration-300"
                    />
                    <span className="text-white font-semibold text-[15px] tracking-tight">
                        Xynoos<span className="text-neutral-400 ml-0.5">Vertex</span>
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {mainLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`relative text-[13px] tracking-wide uppercase transition-colors duration-300 ${isActive
                                    ? "text-white"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent-400"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    {/* Services dropdown */}
                    <div ref={servicesRef} className="relative">
                        <button
                            onClick={() => { setServicesOpen((v) => !v); setMoreOpen(false); }}
                            className={`relative flex items-center gap-1.5 text-[13px] tracking-wide uppercase transition-colors duration-300 ${isServicesActive || servicesOpen
                                ? "text-white"
                                : "text-neutral-400 hover:text-white"
                                }`}
                        >
                            Services
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            {isServicesActive && !servicesOpen && (
                                <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-px bg-accent-400" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                            )}
                        </button>

                        <AnimatePresence>
                            {servicesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                    transition={{ duration: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[280px] py-2 rounded-xl border border-white/[0.08] bg-neutral-950/95 backdrop-blur-xl shadow-2xl shadow-black/40"
                                >
                                    {servicesLinks.map((link) => {
                                        const active = pathname === link.href;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`flex items-start gap-3 px-4 py-3 transition-colors duration-200 ${active ? "bg-white/[0.04]" : "hover:bg-white/[0.04]"}`}
                                            >
                                                <span className={`mt-0.5 ${active ? "text-accent-400" : "text-neutral-500"}`}>{link.icon}</span>
                                                <div>
                                                    <span className={`block text-[13px] font-medium ${active ? "text-white" : "text-neutral-300"}`}>{link.label}</span>
                                                    <span className="block text-[11px] text-neutral-600 mt-0.5">{link.description}</span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* More dropdown */}
                    <div ref={dropdownRef} className="relative">
                        <button
                            onClick={() => { setMoreOpen((v) => !v); setServicesOpen(false); }}
                            className={`relative flex items-center gap-1.5 text-[13px] tracking-wide uppercase transition-colors duration-300 ${isMoreActive || moreOpen
                                ? "text-white"
                                : "text-neutral-400 hover:text-white"
                                }`}
                        >
                            More
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            {isMoreActive && !moreOpen && (
                                <motion.span
                                    layoutId="nav-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent-400"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </button>

                        <AnimatePresence>
                            {moreOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                    transition={{ duration: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                    className="absolute top-full right-0 mt-3 w-[240px] py-2 rounded-xl border border-white/[0.08] bg-neutral-950/95 backdrop-blur-xl shadow-2xl shadow-black/40"
                                >
                                    {moreLinks.map((link) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`block px-4 py-2.5 transition-colors duration-200 ${isActive
                                                    ? "bg-white/[0.04]"
                                                    : "hover:bg-white/[0.04]"
                                                    }`}
                                            >
                                                <span className={`block text-[13px] font-medium ${isActive ? "text-white" : "text-neutral-300"}`}>
                                                    {link.label}
                                                </span>
                                                <span className="block text-[11px] text-neutral-600 mt-0.5">
                                                    {link.description}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Auth CTAs */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/login"
                        className="text-[13px] text-neutral-400 hover:text-white px-3.5 py-1.5 rounded-md transition-colors duration-300"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/register"
                        className="text-[13px] bg-white text-neutral-950 px-4 py-1.5 rounded-md font-medium hover:bg-neutral-100 transition-colors duration-300"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>
        </motion.header>
    );
}
