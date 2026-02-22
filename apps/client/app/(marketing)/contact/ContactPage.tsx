"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";
import { VertexMark } from "@/components/system/VertexLogo";
import Link from "next/link";
import { useState } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

const contactMethods = [
    {
        title: "Email",
        value: "contact@xynoos.com",
        href: "mailto:contact@xynoos.com",
        description: "Best for project inquiries and business discussions",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
    },
    {
        title: "GitHub",
        value: "@devwebxyn",
        href: "https://github.com/devwebxyn",
        description: "Check out our code and open-source projects",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        title: "Location",
        value: "Malang, East Java",
        href: "https://maps.google.com/?q=Malang,+East+Java,+Indonesia",
        description: "Indonesia — available worldwide remotely",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
    },
];

const services = [
    { title: "Web Development", description: "Full-stack websites and web apps", href: "/webdev", color: "border-amber-500/20 hover:border-amber-500/30", dot: "bg-amber-400" },
    { title: "PCB Design", description: "Schematic, layout, and 3D modeling", href: "/design", color: "border-emerald-500/20 hover:border-emerald-500/30", dot: "bg-emerald-400" },
    { title: "Social Platform", description: "Xynoos Social media platform", href: "/social", color: "border-blue-500/20 hover:border-blue-500/30", dot: "bg-blue-400" },
    { title: "Cloud Storage", description: "Secure, encrypted file hosting", href: "/storage", color: "border-violet-500/20 hover:border-violet-500/30", dot: "bg-violet-400" },
];

export function ContactPage() {
    const [formState, setFormState] = useState({ name: "", email: "", project: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[65vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`,
                            backgroundSize: "32px 32px",
                        }}
                    />
                    <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-accent-500/[0.05] blur-[140px]" />
                    <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[100px]" />
                </div>

                <Container className="relative pt-40 pb-16">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <VertexMark size={18} color="white" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">
                                Contact
                            </span>
                        </div>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-6 max-w-[800px]"
                    >
                        Let&apos;s build something{" "}
                        <span className="text-neutral-500">great together.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px]"
                    >
                        Whether you need a website, a PCB design, or want to discuss
                        a collaboration — we&apos;re ready to talk. Reach out and let&apos;s
                        make it happen.
                    </motion.p>
                </Container>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </section>

            {/* ── Contact Methods ── */}
            <Container className="py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {contactMethods.map((method, i) => (
                        <motion.a
                            key={method.title}
                            href={method.href}
                            target={method.href.startsWith("http") ? "_blank" : undefined}
                            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group p-7 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-500"
                        >
                            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-400 group-hover:text-accent-400 group-hover:border-accent-500/20 transition-all duration-300 mb-5">
                                {method.icon}
                            </div>
                            <div className="text-[11px] font-mono text-neutral-600 uppercase tracking-[0.12em] mb-2">
                                {method.title}
                            </div>
                            <div className="text-white text-[17px] font-semibold tracking-[-0.01em] mb-2 group-hover:text-accent-400 transition-colors">
                                {method.value}
                            </div>
                            <p className="text-neutral-500 text-[13px] leading-[1.6]">
                                {method.description}
                            </p>
                        </motion.a>
                    ))}
                </div>
            </Container>

            {/* ── Form + Info ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left — info */}
                        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                                Send a Message
                            </span>
                            <div className="w-8 h-px bg-accent-500/40 mb-8" />

                            <p className="text-neutral-400 text-[15px] leading-[1.8] mb-8">
                                Fill out the form and we&apos;ll get back to you as soon as possible.
                                We typically respond within 24 hours.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-[13px]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-400/60"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                    <span className="text-neutral-400">Response time: <span className="text-neutral-200">24 hours</span></span>
                                </div>
                                <div className="flex items-center gap-3 text-[13px]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-400/60"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" /></svg>
                                    <span className="text-neutral-400">Available for: <span className="text-neutral-200">Freelance & Collaboration</span></span>
                                </div>
                                <div className="flex items-center gap-3 text-[13px]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-400/60"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                    <span className="text-neutral-400">Timezone: <span className="text-neutral-200">WIB (UTC+7)</span></span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right — form */}
                        <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center min-h-[400px] p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M22 4 12 14.01l-3-3" /><path d="M22 4 12 14.01l-3-3" /></svg>
                                    </div>
                                    <h3 className="text-white text-[22px] font-semibold tracking-[-0.01em] mb-2">Message sent!</h3>
                                    <p className="text-neutral-400 text-[15px] text-center max-w-[400px]">
                                        Thank you for reaching out. We&apos;ll review your message and get back to you soon.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-accent-500/30 focus:bg-white/[0.05] focus:outline-none transition-all"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-accent-500/30 focus:bg-white/[0.05] focus:outline-none transition-all"
                                                placeholder="you@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Project Type</label>
                                        <select
                                            value={formState.project}
                                            onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                                            className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white focus:border-accent-500/30 focus:bg-white/[0.05] focus:outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-neutral-900">Select a service...</option>
                                            <option value="webdev" className="bg-neutral-900">Web Development</option>
                                            <option value="design" className="bg-neutral-900">PCB Design & 3D Modeling</option>
                                            <option value="social" className="bg-neutral-900">Social Media Platform</option>
                                            <option value="storage" className="bg-neutral-900">Cloud Storage</option>
                                            <option value="freelance" className="bg-neutral-900">Freelance Project</option>
                                            <option value="collab" className="bg-neutral-900">Collaboration</option>
                                            <option value="other" className="bg-neutral-900">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-accent-500/30 focus:bg-white/[0.05] focus:outline-none transition-all resize-none"
                                            placeholder="Tell us about your project, timeline, and budget..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center h-12 px-8 bg-white text-neutral-950 text-[14px] font-medium rounded-xl hover:bg-neutral-100 transition-all w-full md:w-auto"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ── Our Services ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-4">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">
                                Our Services
                            </span>
                            <div className="w-8 h-px bg-accent-500/40" />
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                How we can <span className="text-neutral-500">help you.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {services.map((service, i) => (
                            <motion.div key={service.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
                                <Link
                                    href={service.href}
                                    className={`group flex items-center gap-5 p-6 rounded-2xl border bg-white/[0.01] transition-all duration-500 ${service.color}`}
                                >
                                    <span className={`w-2.5 h-2.5 rounded-full ${service.dot} shrink-0`} />
                                    <div>
                                        <h3 className="text-white text-[16px] font-semibold tracking-[-0.01em] group-hover:text-accent-400 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-neutral-500 text-[13px]">{service.description}</p>
                                    </div>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700 group-hover:text-accent-400 transition-colors ml-auto shrink-0"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── FAQ ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-4">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">FAQ</span>
                            <div className="w-8 h-px bg-accent-500/40" />
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                Common <span className="text-neutral-500">questions.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-4" />
                        <div className="lg:col-span-8 space-y-6">
                            {[
                                { q: "What services do you offer?", a: "We offer web development, PCB design & 3D modeling, social media platform development, and cloud storage solutions. Visit our product page for full details." },
                                { q: "How long does a typical project take?", a: "It depends on the scope. A simple website takes 2-4 weeks, while a full platform or complex PCB design may take 1-3 months. We'll provide a detailed timeline after our initial discussion." },
                                { q: "Do you work with international clients?", a: "Yes. While we're based in Malang, Indonesia, we work with clients worldwide. All communication is done in English and we're flexible with timezones." },
                                { q: "What is your pricing model?", a: "We offer project-based pricing with clear milestones. No hidden fees. We'll provide a detailed quote after understanding your requirements." },
                            ].map((faq, i) => (
                                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                                    <h3 className="text-white text-[16px] font-semibold tracking-[-0.01em] mb-3">{faq.q}</h3>
                                    <p className="text-neutral-400 text-[14px] leading-[1.7]">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── Bottom CTA ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20 text-center">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p className="text-neutral-500 text-[15px] mb-8">
                            Prefer to explore first? Check out our products and the developer behind Vertex.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <Link href="/product" className="inline-flex items-center justify-center h-[42px] px-7 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all">
                                Our Products
                            </Link>
                            <Link href="/developers" className="inline-flex items-center justify-center h-[42px] px-7 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] transition-all">
                                Meet the Developer
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </PageLayout>
    );
}
