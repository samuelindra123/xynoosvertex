"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";
import Link from "next/link";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

const sections = [
    {
        title: "1. Acceptance of Terms",
        content: [
            "By accessing or using any Xynoos Vertex product or service — including Xynoos Social, Cloud Storage, Web Development, and PCB Design services — you agree to be bound by these Terms of Service.",
            "If you do not agree to these terms, please do not use our services. Continued use of our services constitutes acceptance of any updated terms.",
        ],
    },
    {
        title: "2. Services Provided",
        content: [
            "Xynoos Vertex offers the following products and services:",
            "• **Xynoos Social** — a social media platform for communities.",
            "• **Cloud Storage** — encrypted file hosting and storage solutions.",
            "• **Web Development** — full-stack web application development services.",
            "• **PCB Design** — schematic design, PCB layout, 3D modeling, and IoT engineering.",
            "We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.",
        ],
    },
    {
        title: "3. User Accounts",
        content: [
            "When you create an account on any Xynoos Vertex platform:",
            "• You are responsible for maintaining the security of your account credentials.",
            "• You must provide accurate and complete information during registration.",
            "• You are responsible for all activities that occur under your account.",
            "• You must notify us immediately of any unauthorized use of your account.",
            "We reserve the right to suspend or terminate accounts that violate these terms.",
        ],
    },
    {
        title: "4. Acceptable Use",
        content: [
            "You agree not to use our services to:",
            "• Upload, share, or distribute illegal, harmful, or offensive content.",
            "• Attempt to gain unauthorized access to our systems or other users' accounts.",
            "• Distribute malware, spam, or engage in phishing activities.",
            "• Reverse engineer, decompile, or attempt to extract source code from our products.",
            "• Use our services in any way that could damage, disable, or overburden our infrastructure.",
            "• Violate any applicable local, national, or international laws.",
        ],
    },
    {
        title: "5. Intellectual Property",
        content: [
            "All content, code, designs, logos, and branding associated with Xynoos Vertex are the intellectual property of Xynoos Vertex and its founder, Samuel Indra Bastian.",
            "• You may not copy, modify, or redistribute our proprietary materials without written permission.",
            "• Content you create and upload to our platforms remains your property. By uploading, you grant us a limited license to store, display, and serve that content as necessary to provide the service.",
            "• For commissioned work (web development, PCB design), intellectual property transfer is governed by the individual project agreement.",
        ],
    },
    {
        title: "6. Payment & Billing",
        content: [
            "For paid services (web development, PCB design, premium features):",
            "• All prices are quoted in the agreed currency and are exclusive of taxes unless stated otherwise.",
            "• Payment terms and milestones are defined in the individual project agreement.",
            "• Late payments may result in suspension of work until the outstanding balance is settled.",
            "• Refund policies are handled on a case-by-case basis and depend on the project stage and agreement.",
        ],
    },
    {
        title: "7. Limitation of Liability",
        content: [
            "Xynoos Vertex provides services on an \"as is\" and \"as available\" basis.",
            "• We are not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services.",
            "• Our total liability for any claim related to our services shall not exceed the amount you paid for the service in the 12 months preceding the claim.",
            "• We do not guarantee that our services will be uninterrupted, error-free, or completely secure at all times.",
        ],
    },
    {
        title: "8. Service Level & Uptime",
        content: [
            "We strive to maintain high availability for all our products:",
            "• We aim for 99.9% uptime for our hosted platforms.",
            "• Scheduled maintenance will be communicated in advance when possible.",
            "• We are not liable for downtime caused by circumstances beyond our control (force majeure, third-party outages, etc.).",
        ],
    },
    {
        title: "9. Termination",
        content: [
            "Either party may terminate the use of services:",
            "• **By you** — You may delete your account at any time. Upon deletion, your data will be removed according to our data retention policy.",
            "• **By us** — We may suspend or terminate your access if you violate these terms, with or without prior notice depending on the severity of the violation.",
            "Upon termination, your right to use the services ceases immediately. Provisions that by their nature should survive termination will remain in effect.",
        ],
    },
    {
        title: "10. Governing Law",
        content: [
            "These Terms of Service are governed by and construed in accordance with the laws of the Republic of Indonesia.",
            "Any disputes arising from these terms shall be resolved through good-faith negotiation first. If unresolved, disputes will be settled through the appropriate legal channels in Malang, East Java, Indonesia.",
        ],
    },
    {
        title: "11. Changes to Terms",
        content: [
            "We may update these Terms of Service from time to time. When we make changes:",
            "• We will update the \"Last updated\" date at the top of this page.",
            "• For significant changes, we will notify users through our platforms or via email.",
            "• Continued use of our services after changes constitutes acceptance of the updated terms.",
        ],
    },
    {
        title: "12. Contact",
        content: [
            "For questions about these Terms of Service:",
            "• **Email** — contact@xynoos.com",
            "• **Location** — Malang, East Java, Indonesia",
        ],
    },
];

export function TermsPage() {
    return (
        <PageLayout>
            {/* Hero */}
            <section className="relative flex items-end overflow-hidden">
                <Container className="relative pt-40 pb-16">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-accent-500" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">Legal</span>
                        </div>
                        <div className="w-8 h-px bg-accent-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white mb-4"
                    >
                        Terms of Service
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-neutral-500 text-[14px] font-mono"
                    >
                        Last updated: February 22, 2026
                    </motion.p>
                </Container>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </section>

            {/* Content */}
            <Container className="py-20 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Sidebar nav */}
                    <motion.aside
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="lg:col-span-3 hidden lg:block"
                    >
                        <div className="sticky top-28 space-y-2">
                            <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-[0.15em] block mb-4">On this page</span>
                            {sections.map((s, i) => (
                                <a key={i} href={`#terms-${i + 1}`} className="block text-[13px] text-neutral-500 hover:text-neutral-200 transition-colors py-1 truncate">
                                    {s.title}
                                </a>
                            ))}
                        </div>
                    </motion.aside>

                    {/* Main content */}
                    <div className="lg:col-span-9 space-y-12">
                        <motion.p custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-neutral-300 text-[17px] leading-[1.8]">
                            These terms govern your use of all Xynoos Vertex products and services.
                            Please read them carefully before using our platform.
                        </motion.p>

                        {sections.map((section, i) => (
                            <motion.div key={i} id={`terms-${i + 1}`} custom={i + 1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="scroll-mt-28">
                                <h2 className="text-white text-[20px] font-semibold tracking-[-0.01em] mb-5 pb-3 border-b border-white/[0.06]">
                                    {section.title}
                                </h2>
                                <div className="space-y-3">
                                    {section.content.map((line, j) => (
                                        <p key={j} className="text-neutral-400 text-[15px] leading-[1.8]" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<span class="text-neutral-200 font-medium">$1</span>') }} />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Bottom nav */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-16">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <Link href="/privacy" className="text-neutral-400 text-[14px] hover:text-white transition-colors flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
                            Privacy Policy
                        </Link>
                        <Link href="/contact" className="text-neutral-400 text-[14px] hover:text-white transition-colors">
                            Questions? Contact us →
                        </Link>
                    </div>
                </Container>
            </section>
        </PageLayout>
    );
}
