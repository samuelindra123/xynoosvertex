"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";
import Link from "next/link";
import { useState, useMemo } from "react";

/* ── Option chips ── */
function OptionGroup({ label, options, value, onChange, columns = 4 }: {
    label: string;
    options: { value: string; label: string; sub?: string }[];
    value: string;
    onChange: (v: string) => void;
    columns?: number;
}) {
    return (
        <div>
            <label className="block text-[12px] font-semibold text-neutral-400 uppercase tracking-[0.12em] mb-3">{label}</label>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(opt.value)}
                        className={`relative px-3 py-2.5 rounded-lg border text-[13px] font-medium transition-all duration-200 text-left ${value === opt.value
                            ? "border-blue-500/50 bg-blue-500/[0.08] text-white ring-1 ring-blue-500/20"
                            : "border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:border-white/[0.12] hover:text-neutral-200"
                            }`}
                    >
                        {opt.label}
                        {opt.sub && <span className="block text-[10px] text-neutral-600 mt-0.5">{opt.sub}</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ── Design-focused options ── */
const designTypeOpts = [
    { value: "schematic", label: "Schematic Only", sub: "Circuit design" },
    { value: "layout", label: "PCB Layout Only", sub: "Board routing" },
    { value: "full", label: "Full Design", sub: "Schematic + Layout" },
];

const circuitTypeOpts = [
    { value: "microcontroller", label: "Microcontroller", sub: "ESP32, STM32, etc" },
    { value: "power", label: "Power Supply", sub: "DC-DC, LDO, charger" },
    { value: "sensor", label: "Sensor Board", sub: "IoT / monitoring" },
    { value: "motor", label: "Motor Driver", sub: "BLDC, stepper" },
    { value: "comms", label: "Communication", sub: "RF, LoRa, WiFi" },
    { value: "custom", label: "Custom / Other", sub: "Describe below" },
];

const componentCountOpts = [
    { value: "under-20", label: "< 20", sub: "Simple" },
    { value: "20-50", label: "20 – 50", sub: "Moderate" },
    { value: "50-100", label: "50 – 100", sub: "Complex" },
    { value: "100+", label: "100+", sub: "High density" },
];

const layerOpts = [
    { value: "1", label: "1 Layer" },
    { value: "2", label: "2 Layers" },
    { value: "4", label: "4 Layers" },
    { value: "6+", label: "6+ Layers" },
];

const toolOpts = [
    { value: "kicad", label: "KiCad" },
    { value: "easyeda", label: "EasyEDA" },
    { value: "altium", label: "Altium" },
    { value: "any", label: "No Preference" },
];

const hasReferenceOpts = [
    { value: "none", label: "No, start from scratch", sub: "We design everything" },
    { value: "sketch", label: "I have a sketch / diagram", sub: "Rough idea" },
    { value: "partial", label: "I have a partial design", sub: "Needs completion" },
    { value: "redesign", label: "Redesign existing board", sub: "Improve or fix" },
];

const timelineOpts = [
    { value: "flexible", label: "Flexible", sub: "No rush" },
    { value: "2-4weeks", label: "2 – 4 Weeks", sub: "Standard" },
    { value: "1-2weeks", label: "1 – 2 Weeks", sub: "Priority" },
    { value: "urgent", label: "< 1 Week", sub: "Urgent" },
];

const deliverableOpts = [
    { value: "source", label: "Source Files", sub: "Editable project" },
    { value: "gerber", label: "+ Gerber / Fab Files", sub: "Ready to order" },
    { value: "bom", label: "+ BOM & Assembly", sub: "Full handoff" },
    { value: "everything", label: "Complete Package", sub: "All of the above" },
];

/* ── Price estimate ── */
function calcPrice(cfg: Record<string, string>): number {
    let base = 0;
    if (cfg.designType === "schematic") base = 60;
    else if (cfg.designType === "layout") base = 80;
    else base = 120;

    const components = cfg.components;
    if (components === "20-50") base += 40;
    if (components === "50-100") base += 100;
    if (components === "100+") base += 200;

    const layers = cfg.layers;
    if (layers === "4") base += 40;
    if (layers === "6+") base += 100;

    if (cfg.deliverables === "gerber") base += 20;
    if (cfg.deliverables === "bom") base += 40;
    if (cfg.deliverables === "everything") base += 60;

    if (cfg.timeline === "1-2weeks") base *= 1.3;
    if (cfg.timeline === "urgent") base *= 1.8;

    return Math.round(base);
}

export function PcbOrderPage() {
    const [cfg, setCfg] = useState<Record<string, string>>({
        designType: "full", circuitType: "microcontroller", components: "under-20",
        layers: "2", tool: "any", reference: "none", timeline: "2-4weeks", deliverables: "everything",
    });
    const [contact, setContact] = useState({ name: "", email: "", company: "", notes: "" });
    const [step, setStep] = useState(0);
    const set = (key: string) => (val: string) => setCfg((c) => ({ ...c, [key]: val }));

    const price = useMemo(() => calcPrice(cfg), [cfg]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    return (
        <PageLayout>
            {/* Demo Banner */}
            <div className="bg-amber-500/[0.08] border-b border-amber-500/20 pt-16">
                <Container className="py-2.5">
                    <p className="text-center text-[12px] text-amber-400/80">
                        <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />This order page is a <strong className="text-amber-300">demo preview</strong> — service ordering is <strong className="text-amber-300">coming soon</strong>.</span>
                    </p>
                </Container>
            </div>

            {/* Top bar */}
            <section className="border-b border-white/[0.06]">
                <Container className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/services/pcb-design" className="text-neutral-500 hover:text-white transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
                            </Link>
                            <div>
                                <h1 className="text-white text-[16px] font-semibold flex items-center gap-2">
                                    PCB Design Order
                                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">Demo</span>
                                </h1>
                                <p className="text-neutral-600 text-[11px]">Order a custom PCB design — schematic, layout, or full package</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-3 text-[12px]">
                            {["Specifications", "Contact", "Confirm"].map((s, i) => (
                                <div key={s} className="flex items-center gap-2">
                                    {i > 0 && <div className="w-8 h-px bg-white/[0.06]" />}
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${step >= i
                                        ? "border-blue-500 bg-blue-500/20 text-blue-400"
                                        : "border-white/[0.08] text-neutral-600"
                                        }`}>{i + 1}</span>
                                    <span className={step >= i ? "text-neutral-300" : "text-neutral-600"}>{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <Container className="py-8 md:py-12 min-h-[80vh]">
                <AnimatePresence mode="wait">
                    {step === 2 ? (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[60vh]">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }} className="w-20 h-20 flex items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mb-8">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400"><path d="M22 4 12 14.01l-3-3" /></svg>
                            </motion.div>
                            <h2 className="text-white text-[28px] font-semibold tracking-[-0.02em] mb-3">Design Request Submitted!</h2>
                            <p className="text-neutral-400 text-[15px] text-center max-w-[440px] mb-3">We&apos;ll review your project requirements and respond within 24 hours with a detailed scope and quote.</p>
                            <p className="text-neutral-600 text-[13px] mb-8">Reference: <span className="text-neutral-400 font-mono">XV-PCB-{Date.now().toString(36).toUpperCase()}</span></p>
                            <div className="flex gap-3">
                                <Link href="/" className="h-10 px-6 inline-flex items-center justify-center border border-white/[0.08] text-neutral-300 text-[13px] rounded-lg hover:bg-white/[0.04] transition-all">Back to Home</Link>
                                <Link href="/services/pcb-design" className="h-10 px-6 inline-flex items-center justify-center bg-white text-neutral-950 text-[13px] font-medium rounded-lg hover:bg-neutral-100 transition-all">View Service</Link>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left: configurator */}
                            <motion.div key={`step-${step}`} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.3 }} className="lg:col-span-8">
                                {step === 0 ? (
                                    <div className="space-y-8">
                                        <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] space-y-7">
                                            <h3 className="text-white text-[15px] font-semibold flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold">1</span>
                                                What do you need designed?
                                            </h3>
                                            <OptionGroup label="Design Scope" options={designTypeOpts} value={cfg.designType} onChange={set("designType")} columns={3} />
                                            <OptionGroup label="Circuit Type" options={circuitTypeOpts} value={cfg.circuitType} onChange={set("circuitType")} columns={3} />
                                            <OptionGroup label="Estimated Component Count" options={componentCountOpts} value={cfg.components} onChange={set("components")} columns={4} />
                                            <OptionGroup label="Board Layers" options={layerOpts} value={cfg.layers} onChange={set("layers")} columns={4} />
                                        </div>

                                        <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] space-y-7">
                                            <h3 className="text-white text-[15px] font-semibold flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold">2</span>
                                                Design Preferences
                                            </h3>
                                            <OptionGroup label="Preferred CAD Tool" options={toolOpts} value={cfg.tool} onChange={set("tool")} columns={4} />
                                            <OptionGroup label="Do you have references or existing files?" options={hasReferenceOpts} value={cfg.reference} onChange={set("reference")} columns={2} />
                                            <OptionGroup label="Deliverables" options={deliverableOpts} value={cfg.deliverables} onChange={set("deliverables")} columns={2} />
                                            <OptionGroup label="Timeline" options={timelineOpts} value={cfg.timeline} onChange={set("timeline")} columns={4} />
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} id="contact-form" className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] space-y-6">
                                        <h3 className="text-white text-[15px] font-semibold flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold">3</span>
                                            Contact & Project Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Full Name *</label>
                                                <input type="text" required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-blue-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="Your full name" />
                                            </div>
                                            <div>
                                                <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Email *</label>
                                                <input type="email" required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-blue-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="you@company.com" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Company / Organization</label>
                                            <input type="text" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-blue-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="Optional" />
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Project Description *</label>
                                            <textarea required rows={6} value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-blue-500/30 focus:bg-white/[0.05] focus:outline-none transition-all resize-none" placeholder="Describe your project: what the circuit does, key components, specific requirements, constraints, reference designs links..." />
                                        </div>
                                    </form>
                                )}
                            </motion.div>

                            {/* Right: summary */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-24 space-y-5">
                                    {/* Summary card */}
                                    <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                                        <h4 className="text-neutral-400 text-[11px] font-semibold uppercase tracking-[0.15em] mb-4">Design Summary</h4>
                                        <div className="space-y-2.5 text-[13px]">
                                            <div className="flex justify-between"><span className="text-neutral-500">Scope</span><span className="text-white font-medium capitalize">{cfg.designType === "full" ? "Full Design" : cfg.designType}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Circuit</span><span className="text-white font-medium capitalize">{cfg.circuitType}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Components</span><span className="text-white font-medium">{cfg.components}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Layers</span><span className="text-white font-medium">{cfg.layers}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">CAD Tool</span><span className="text-white font-medium capitalize">{cfg.tool === "any" ? "No Preference" : cfg.tool}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Reference</span><span className="text-white font-medium capitalize">{hasReferenceOpts.find(o => o.value === cfg.reference)?.label.split(",")[0]}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Deliverables</span><span className="text-white font-medium capitalize">{deliverableOpts.find(o => o.value === cfg.deliverables)?.label}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Timeline</span><span className="text-white font-medium">{timelineOpts.find(o => o.value === cfg.timeline)?.label}</span></div>
                                        </div>
                                        <div className="mt-5 pt-4 border-t border-white/[0.06]">
                                            <div className="flex justify-between items-end">
                                                <span className="text-neutral-400 text-[12px]">Estimated Price</span>
                                                <div className="text-right">
                                                    <span className="text-white text-[28px] font-semibold tracking-[-0.02em]">${price}</span>
                                                    <span className="text-neutral-600 text-[12px] block">starting from</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* What you get */}
                                    <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                                        <h4 className="text-neutral-400 text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">Included in design</h4>
                                        <ul className="space-y-2">
                                            {["Design consultation", "Component selection advice", "DRC validation", "2 revision rounds", "Email support"].map((item) => (
                                                <li key={item} className="flex items-center gap-2 text-[12px]">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 shrink-0"><path d="M22 4 12 14.01l-3-3" /></svg>
                                                    <span className="text-neutral-400">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Action */}
                                    {step === 0 ? (
                                        <button onClick={() => setStep(1)} className="w-full h-12 bg-white text-neutral-950 text-[14px] font-medium rounded-xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2">
                                            Continue to Contact Info
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </button>
                                    ) : (
                                        <div className="space-y-2">
                                            <button type="submit" form="contact-form" className="w-full h-12 bg-white text-neutral-950 text-[14px] font-medium rounded-xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2">
                                                Submit Design Request
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4 12 14.01l-3-3" /></svg>
                                            </button>
                                            <button onClick={() => setStep(0)} className="w-full h-10 text-neutral-500 text-[13px] hover:text-white transition-colors">← Back to Specifications</button>
                                        </div>
                                    )}

                                    <p className="text-neutral-600 text-[11px] text-center">Final price confirmed after project review</p>
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </Container>
        </PageLayout>
    );
}
