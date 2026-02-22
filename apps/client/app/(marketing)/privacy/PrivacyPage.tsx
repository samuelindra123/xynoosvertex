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
        title: "1. Information We Collect",
        content: [
            "When you use Xynoos Vertex products and services, we may collect:",
            "• **Account information** — name, email address, and credentials when you create an account on any Xynoos Vertex platform.",
            "• **Usage data** — pages visited, features used, and interaction patterns to improve our services.",
            "• **Device information** — browser type, operating system, and IP address for security and analytics.",
            "• **Communications** — messages sent through our contact form or support channels.",
            "We do not collect data beyond what is necessary to provide and improve our services.",
        ],
    },
    {
        title: "2. How We Use Your Data",
        content: [
            "Your data is used exclusively to:",
            "• Provide and maintain our products (Xynoos Social, Cloud Storage, Web Development, PCB Design services).",
            "• Respond to your inquiries and support requests.",
            "• Improve service quality, performance, and user experience.",
            "• Send important updates about your account or our services.",
            "We never sell your personal data to third parties. We never use your data for targeted advertising.",
        ],
    },
    {
        title: "3. Data Storage & Security",
        content: [
            "We take the security of your data seriously:",
            "• All data is encrypted in transit using TLS/SSL protocols.",
            "• Cloud Storage files are encrypted at rest using industry-standard AES-256 encryption.",
            "• We use self-hosted infrastructure where possible to maintain full control over your data.",
            "• Access to user data is restricted to authorized personnel only.",
            "• Regular security audits and updates are performed on all systems.",
        ],
    },
    {
        title: "4. Third-Party Services",
        content: [
            "We use limited third-party services to operate our platform:",
            "• **Hosting** — DigitalOcean and Vercel for reliable infrastructure.",
            "• **Analytics** — Privacy-respecting analytics to understand usage patterns (no personal tracking).",
            "• **Payment processing** — If applicable, payments are processed through trusted payment gateways. We never store your payment card details.",
            "We carefully evaluate all third-party providers for their privacy and security practices.",
        ],
    },
    {
        title: "5. Your Rights",
        content: [
            "You have the right to:",
            "• **Access** — Request a copy of the personal data we hold about you.",
            "• **Correction** — Request correction of inaccurate personal data.",
            "• **Deletion** — Request deletion of your account and associated data.",
            "• **Portability** — Request your data in a portable, machine-readable format.",
            "• **Withdraw consent** — Withdraw consent for data processing at any time.",
            "To exercise any of these rights, contact us at contact@xynoos.com.",
        ],
    },
    {
        title: "6. Cookies",
        content: [
            "We use minimal cookies strictly necessary for:",
            "• Session management and authentication.",
            "• Remembering your preferences (e.g., theme settings).",
            "We do not use tracking cookies, advertising cookies, or any third-party cookies for marketing purposes.",
        ],
    },
    {
        title: "7. Changes to This Policy",
        content: [
            "We may update this Privacy Policy from time to time. When we do, we will update the \"Last updated\" date at the top of this page.",
            "We encourage you to review this policy periodically to stay informed about how we protect your data.",
        ],
    },
    {
        title: "8. Contact",
        content: [
            "If you have any questions about this Privacy Policy or how we handle your data, please contact us:",
            "• **Email** — contact@xynoos.com",
            "• **Location** — Malang, East Java, Indonesia",
        ],
    },
];

export function PrivacyPage() {
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
                        Privacy Policy
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
                                <a key={i} href={`#privacy-${i + 1}`} className="block text-[13px] text-neutral-500 hover:text-neutral-200 transition-colors py-1">
                                    {s.title}
                                </a>
                            ))}
                        </div>
                    </motion.aside>

                    {/* Main content */}
                    <div className="lg:col-span-9 space-y-12">
                        <motion.p custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-neutral-300 text-[17px] leading-[1.8]">
                            At Xynoos Vertex, we believe your privacy is a fundamental right — not a feature.
                            This policy explains what data we collect, how we use it, and the measures we take to keep it safe.
                        </motion.p>

                        {sections.map((section, i) => (
                            <motion.div key={i} id={`privacy-${i + 1}`} custom={i + 1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="scroll-mt-28">
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
                        <Link href="/terms" className="text-neutral-400 text-[14px] hover:text-white transition-colors flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            Terms of Service
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
