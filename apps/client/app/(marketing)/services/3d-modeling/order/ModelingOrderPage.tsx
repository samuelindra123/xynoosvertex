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
                            ? "border-amber-500/50 bg-amber-500/[0.08] text-white ring-1 ring-amber-500/20"
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
const modelTypeOpts = [
    { value: "enclosure", label: "Enclosure / Housing", sub: "For electronics or devices" },
    { value: "bracket", label: "Bracket / Mount", sub: "Mechanical support parts" },
    { value: "product", label: "Full Product Design", sub: "End-to-end concept" },
    { value: "assembly", label: "Multi-Part Assembly", sub: "Multiple fitted parts" },
];

const purposeOpts = [
    { value: "prototype", label: "Prototype / Concept", sub: "Design validation" },
    { value: "production", label: "Production Ready", sub: "Manufacturing files" },
    { value: "visualization", label: "Visualization Only", sub: "Renders for presentation" },
    { value: "redesign", label: "Redesign Existing", sub: "Improve or fix design" },
];

const partsOpts = [
    { value: "1", label: "1 Part", sub: "Single body" },
    { value: "2-3", label: "2 – 3 Parts", sub: "Simple assembly" },
    { value: "4-6", label: "4 – 6 Parts", sub: "Detailed assembly" },
    { value: "7+", label: "7+ Parts", sub: "Complex assembly" },
];

const complexityOpts = [
    { value: "simple", label: "Simple", sub: "Basic shapes, few features" },
    { value: "moderate", label: "Moderate", sub: "Multiple features & fits" },
    { value: "complex", label: "Complex", sub: "Organic shapes, tight tol." },
    { value: "advanced", label: "Advanced", sub: "Parametric, surfacing" },
];

const toolOpts = [
    { value: "solidworks", label: "SolidWorks" },
    { value: "fusion360", label: "Fusion 360" },
    { value: "autocad", label: "AutoCAD" },
    { value: "any", label: "No Preference" },
];

const hasReferenceOpts = [
    { value: "none", label: "No, start from scratch", sub: "Only verbal description" },
    { value: "sketch", label: "I have sketches or photos", sub: "Hand-drawn or photo" },
    { value: "dimensions", label: "I have measurements", sub: "Specific dimensions" },
    { value: "cad", label: "I have existing CAD files", sub: "Modify or improve" },
];

const outputOpts = [
    { value: "cad-only", label: "CAD Source Files", sub: "Editable 3D model" },
    { value: "cad-drawing", label: "+ 2D Technical Drawing", sub: "DWG / PDF drawing" },
    { value: "cad-render", label: "+ Photorealistic Renders", sub: "Marketing visuals" },
    { value: "everything", label: "Complete Package", sub: "CAD + Drawing + Renders" },
];

const timelineOpts = [
    { value: "flexible", label: "Flexible", sub: "No rush" },
    { value: "2-3weeks", label: "2 – 3 Weeks", sub: "Standard" },
    { value: "1week", label: "About 1 Week", sub: "Priority" },
    { value: "urgent", label: "< 5 Days", sub: "Urgent" },
];

/* ── Price estimate ── */
function calcPrice(cfg: Record<string, string>): number {
    let base = 50;
    if (cfg.modelType === "bracket") base = 40;
    if (cfg.modelType === "product") base = 120;
    if (cfg.modelType === "assembly") base = 100;

    if (cfg.complexity === "moderate") base += 30;
    if (cfg.complexity === "complex") base += 80;
    if (cfg.complexity === "advanced") base += 150;

    if (cfg.parts === "2-3") base += 40;
    if (cfg.parts === "4-6") base += 100;
    if (cfg.parts === "7+") base += 200;

    if (cfg.output === "cad-drawing") base += 20;
    if (cfg.output === "cad-render") base += 30;
    if (cfg.output === "everything") base += 50;

    if (cfg.timeline === "1week") base *= 1.3;
    if (cfg.timeline === "urgent") base *= 1.8;

    return Math.round(base);
}

export function ModelingOrderPage() {
    const [cfg, setCfg] = useState<Record<string, string>>({
        modelType: "enclosure", purpose: "prototype", parts: "1",
        complexity: "simple", tool: "any", reference: "none", output: "everything", timeline: "2-3weeks",
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
                            <Link href="/services/3d-modeling" className="text-neutral-500 hover:text-white transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
                            </Link>
                            <div>
                                <h1 className="text-white text-[16px] font-semibold flex items-center gap-2">
                                    3D Modeling Order
                                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">Demo</span>
                                </h1>
                                <p className="text-neutral-600 text-[11px]">Order a custom 3D model — enclosure, product design, or assembly</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-3 text-[12px]">
                            {["Specifications", "Contact", "Confirm"].map((s, i) => (
                                <div key={s} className="flex items-center gap-2">
                                    {i > 0 && <div className="w-8 h-px bg-white/[0.06]" />}
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${step >= i
                                        ? "border-amber-500 bg-amber-500/20 text-amber-400"
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
                            <p className="text-neutral-400 text-[15px] text-center max-w-[440px] mb-3">We&apos;ll review your 3D modeling requirements and respond within 24 hours with a detailed scope and quote.</p>
                            <p className="text-neutral-600 text-[13px] mb-8">Reference: <span className="text-neutral-400 font-mono">XV-3D-{Date.now().toString(36).toUpperCase()}</span></p>
                            <div className="flex gap-3">
                                <Link href="/" className="h-10 px-6 inline-flex items-center justify-center border border-white/[0.08] text-neutral-300 text-[13px] rounded-lg hover:bg-white/[0.04] transition-all">Back to Home</Link>
                                <Link href="/services/3d-modeling" className="h-10 px-6 inline-flex items-center justify-center bg-white text-neutral-950 text-[13px] font-medium rounded-lg hover:bg-neutral-100 transition-all">View Service</Link>
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
                                                <span className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-[10px] font-bold">1</span>
                                                What do you need designed?
                                            </h3>
                                            <OptionGroup label="Model Type" options={modelTypeOpts} value={cfg.modelType} onChange={set("modelType")} columns={2} />
                                            <OptionGroup label="Purpose" options={purposeOpts} value={cfg.purpose} onChange={set("purpose")} columns={2} />
                                            <OptionGroup label="Number of Parts" options={partsOpts} value={cfg.parts} onChange={set("parts")} columns={4} />
                                            <OptionGroup label="Design Complexity" options={complexityOpts} value={cfg.complexity} onChange={set("complexity")} columns={2} />
                                        </div>

                                        <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] space-y-7">
                                            <h3 className="text-white text-[15px] font-semibold flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-[10px] font-bold">2</span>
                                                Design Preferences
                                            </h3>
                                            <OptionGroup label="Preferred CAD Tool" options={toolOpts} value={cfg.tool} onChange={set("tool")} columns={4} />
                                            <OptionGroup label="Do you have references?" options={hasReferenceOpts} value={cfg.reference} onChange={set("reference")} columns={2} />
                                            <OptionGroup label="Deliverables" options={outputOpts} value={cfg.output} onChange={set("output")} columns={2} />
                                            <OptionGroup label="Timeline" options={timelineOpts} value={cfg.timeline} onChange={set("timeline")} columns={4} />
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} id="contact-form" className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] space-y-6">
                                        <h3 className="text-white text-[15px] font-semibold flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-[10px] font-bold">3</span>
                                            Contact & Project Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Full Name *</label>
                                                <input type="text" required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-amber-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="Your full name" />
                                            </div>
                                            <div>
                                                <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Email *</label>
                                                <input type="email" required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-amber-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="you@company.com" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Company / Organization</label>
                                            <input type="text" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-amber-500/30 focus:bg-white/[0.05] focus:outline-none transition-all" placeholder="Optional" />
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-medium text-neutral-500 uppercase tracking-[0.1em] mb-2">Project Description *</label>
                                            <textarea required rows={6} value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-amber-500/30 focus:bg-white/[0.05] focus:outline-none transition-all resize-none" placeholder="Describe your part: dimensions, features, shape, mounting points, any specific tolerances, link to sketches or reference photos..." />
                                        </div>
                                    </form>
                                )}
                            </motion.div>

                            {/* Right: summary */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-24 space-y-5">
                                    <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                                        <h4 className="text-neutral-400 text-[11px] font-semibold uppercase tracking-[0.15em] mb-4">Design Summary</h4>
                                        <div className="space-y-2.5 text-[13px]">
                                            <div className="flex justify-between"><span className="text-neutral-500">Model</span><span className="text-white font-medium">{modelTypeOpts.find(o => o.value === cfg.modelType)?.label}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Purpose</span><span className="text-white font-medium">{purposeOpts.find(o => o.value === cfg.purpose)?.label}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Parts</span><span className="text-white font-medium">{cfg.parts}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Complexity</span><span className="text-white font-medium capitalize">{cfg.complexity}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">CAD Tool</span><span className="text-white font-medium capitalize">{cfg.tool === "any" ? "No Preference" : toolOpts.find(o => o.value === cfg.tool)?.label}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Reference</span><span className="text-white font-medium">{hasReferenceOpts.find(o => o.value === cfg.reference)?.label.split(",")[0]}</span></div>
                                            <div className="flex justify-between"><span className="text-neutral-500">Deliverables</span><span className="text-white font-medium">{outputOpts.find(o => o.value === cfg.output)?.label}</span></div>
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

                                    <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                                        <h4 className="text-neutral-400 text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">Included in design</h4>
                                        <ul className="space-y-2">
                                            {["Design consultation", "Material & process advice", "Fit & tolerance check", "2 revision rounds", "Email support"].map((item) => (
                                                <li key={item} className="flex items-center gap-2 text-[12px]">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 shrink-0"><path d="M22 4 12 14.01l-3-3" /></svg>
                                                    <span className="text-neutral-400">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

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
