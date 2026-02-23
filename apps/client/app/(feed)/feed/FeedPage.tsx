"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Types ── */
interface Post {
    id: number;
    author: string;
    handle: string;
    avatar: string;
    role: string;
    time: string;
    content: string;
    code?: { lang: string; snippet: string };
    image?: string;
    tags: string[];
    reactions: { spark: number; circuit: number; build: number };
    comments: number;
    reposts: number;
    bookmarked?: boolean;
}

/* ── Mock Data ── */
const MOCK_POSTS: Post[] = [
    {
        id: 1,
        author: "Reza Firmansyah",
        handle: "rezafirmansyah",
        avatar: "RF",
        role: "Firmware Engineer",
        time: "2m",
        content: "Finally got the STM32 ADC reading stable at 1 MSPS with DMA. The trick was aligning the buffer to 32-byte boundaries and disabling cache for the DMA region. Hours well spent 🔌",
        code: {
            lang: "c",
            snippet: `// Align DMA buffer\n__attribute__((aligned(32)))\nstatic uint16_t adc_buf[ADC_BUF_LEN];\n\n// Disable cache for DMA region\nSCB_CleanInvalidateDCache_by_Addr(\n  (uint32_t*)adc_buf, sizeof(adc_buf));`,
        },
        tags: ["STM32", "firmware", "ADC", "DMA"],
        reactions: { spark: 48, circuit: 12, build: 7 },
        comments: 9,
        reposts: 5,
    },
    {
        id: 2,
        author: "Layla Kusuma",
        handle: "laylakusuma",
        avatar: "LK",
        role: "PCB Designer",
        time: "14m",
        content: "Finished the 6-layer power delivery board for the new compute module. Stackup: Signal / GND / Power / Signal / GND / Signal. Kept power planes as solid pours with stitching vias every 2mm. Impedance controlled traces at 100Ω differential. Ready for fab! 🟢",
        tags: ["PCB", "hardware", "signal-integrity"],
        reactions: { spark: 93, circuit: 34, build: 21 },
        comments: 18,
        reposts: 12,
    },
    {
        id: 3,
        author: "Ahmad Noor",
        handle: "ahmadnoor_dev",
        avatar: "AN",
        role: "Embedded Systems",
        time: "1h",
        content: "Hot take: most firmware bugs are just undefined behavior masquerading as hardware problems. Always check your memory alignment and volatile declarations before blaming the MCU. 🫠",
        tags: ["embedded", "firmware", "debugging"],
        reactions: { spark: 211, circuit: 67, build: 14 },
        comments: 44,
        reposts: 38,
    },
    {
        id: 4,
        author: "Siti Rahayu",
        handle: "siti_iot",
        avatar: "SR",
        role: "IoT Architect",
        time: "2h",
        content: "Just deployed our MQTT broker cluster on bare-metal. 80k concurrent connections with sub-5ms latency. The secret sauce: one broker per CPU core with topic sharding + Redis for session persistence.",
        code: {
            lang: "yaml",
            snippet: `# mosquitto cluster config\nlistener: 1883\nmax_connections: 20000\npersistence: true\nlog_type: error\nallow_anonymous: false\nauthplugin: auth-plug.so`,
        },
        tags: ["IoT", "MQTT", "backend", "infrastructure"],
        reactions: { spark: 156, circuit: 45, build: 29 },
        comments: 31,
        reposts: 24,
    },
    {
        id: 5,
        author: "Budi Santoso",
        handle: "budi_3d",
        avatar: "BS",
        role: "3D Modeling & CNC",
        time: "3h",
        content: "New enclosure design using parametric STEP models. Tolerances set to 0.15mm for FDM printing. The snap-fit tabs are the trickiest part — too stiff and they break, too loose and they won't hold.",
        tags: ["3D-modeling", "mechanical", "FDM", "CAD"],
        reactions: { spark: 77, circuit: 28, build: 41 },
        comments: 13,
        reposts: 8,
    },
];

const TRENDING = [
    { tag: "#STM32", posts: "2.4k" },
    { tag: "#PCBDesign", posts: "1.8k" },
    { tag: "#RustEmbedded", posts: "934" },
    { tag: "#ESP32", posts: "876" },
    { tag: "#KiCad", posts: "712" },
    { tag: "#RTOS", posts: "601" },
];

const SUGGESTED = [
    { name: "Fikri Hakim", handle: "fikrihakim", avatar: "FH", role: "RF Engineer" },
    { name: "Dewi Anggraeni", handle: "dewi_hw", avatar: "DA", role: "Hardware Architect" },
    { name: "Taufik Rahman", handle: "taufikr", avatar: "TR", role: "FPGA Developer" },
];

/* ── Avatar ── */
function Avatar({ initials, gradient }: { initials: string; gradient: string }) {
    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0 border border-white/10 ${gradient}`}>
            {initials}
        </div>
    );
}

const GRADIENTS = [
    "bg-gradient-to-br from-emerald-500/40 to-cyan-500/40",
    "bg-gradient-to-br from-violet-500/40 to-pink-500/40",
    "bg-gradient-to-br from-orange-500/40 to-amber-400/40",
    "bg-gradient-to-br from-blue-500/40 to-indigo-500/40",
    "bg-gradient-to-br from-rose-500/40 to-red-400/40",
];

/* ── Reaction Button ── */
function ReactionBtn({ icon, count, label, active, onClick }: { icon: React.ReactNode; count: number; label: string; active?: boolean; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            title={label}
            className={`flex items-center gap-1.5 text-[12px] font-medium px-2 py-1 rounded-lg transition-all
            ${active ? "text-emerald-400 bg-emerald-500/10" : "text-neutral-500 hover:text-emerald-400 hover:bg-emerald-500/10"}`}
        >
            {icon}
            <span>{count}</span>
        </button>
    );
}

/* ── Post Card ── */
function PostCard({ post, index }: { post: Post; index: number }) {
    const [reactions, setReactions] = useState(post.reactions);
    const [liked, setLiked] = useState({ spark: false, circuit: false, build: false });
    const [bookmarked, setBookmarked] = useState(post.bookmarked ?? false);

    const react = (key: keyof typeof reactions) => {
        setReactions(r => ({ ...r, [key]: liked[key] ? r[key] - 1 : r[key] + 1 }));
        setLiked(l => ({ ...l, [key]: !l[key] }));
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
            className="border-b border-white/[0.05] px-5 py-5 hover:bg-white/[0.015] transition-all cursor-pointer"
        >
            <div className="flex gap-3">
                <Avatar initials={post.avatar} gradient={GRADIENTS[index % GRADIENTS.length]} />
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[14px] font-semibold text-white">{post.author}</span>
                            <span className="text-[12px] text-neutral-600">@{post.handle}</span>
                            <span className="hidden sm:inline text-neutral-700 text-[10px]">·</span>
                            <span className="hidden sm:inline text-[11px] text-neutral-600 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded-full">{post.role}</span>
                        </div>
                        <span className="text-[11px] text-neutral-600 flex-shrink-0">{post.time}</span>
                    </div>

                    {/* Content */}
                    <p className="text-[14px] text-neutral-300 leading-[1.7] mb-3">{post.content}</p>

                    {/* Code snippet */}
                    {post.code && (
                        <div className="mb-3 rounded-xl overflow-hidden border border-white/[0.06] bg-[#0d0d0d]">
                            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.05]">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">{post.code.lang}</span>
                                <button className="text-[10px] text-neutral-600 hover:text-neutral-300 transition-colors">Copy</button>
                            </div>
                            <pre className="px-4 py-3 text-[12px] font-mono text-emerald-300/80 overflow-x-auto leading-[1.8] whitespace-pre">
                                {post.code.snippet}
                            </pre>
                        </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-[11px] text-blue-400/70 hover:text-blue-300 cursor-pointer transition-colors">#{tag}</span>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5">
                            {/* Spark (like) */}
                            <ReactionBtn
                                icon={<svg width="13" height="13" viewBox="0 0 24 24" fill={liked.spark ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
                                count={reactions.spark} label="Spark" active={liked.spark} onClick={() => react("spark")}
                            />
                            {/* Circuit (repost) */}
                            <ReactionBtn
                                icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>}
                                count={reactions.circuit} label="Repatch" active={liked.circuit} onClick={() => react("circuit")}
                            />
                            {/* Build (save/bookmark) */}
                            <ReactionBtn
                                icon={<svg width="13" height="13" viewBox="0 0 24 24" fill={liked.build ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>}
                                count={reactions.build} label="Build later" active={liked.build} onClick={() => react("build")}
                            />
                            {/* Comment */}
                            <button className="flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-blue-400 px-2 py-1 rounded-lg hover:bg-blue-500/10 transition-all">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                <span>{post.comments}</span>
                            </button>
                        </div>

                        {/* Share */}
                        <button className="text-neutral-600 hover:text-neutral-300 p-1 rounded-lg hover:bg-white/[0.05] transition-all">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

/* ── Compose Box ── */
function ComposeBox() {
    const [text, setText] = useState("");
    const [focused, setFocused] = useState(false);
    const MAX = 280;

    return (
        <div className="border-b border-white/[0.05] px-5 py-4">
            <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/40 to-blue-500/40 border border-white/10 flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0">
                    ME
                </div>
                <div className="flex-1">
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => !text && setFocused(false)}
                        placeholder="Share something with the engineering community..."
                        maxLength={MAX}
                        rows={focused || text ? 3 : 1}
                        className="w-full bg-transparent text-[14px] text-white placeholder:text-neutral-600 resize-none outline-none leading-[1.7] transition-all"
                    />

                    <AnimatePresence>
                        {(focused || text) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] mt-2">
                                    <div className="flex items-center gap-2">
                                        <button className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all" title="Add code snippet">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                                        </button>
                                        <button className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all" title="Add image">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                        </button>
                                        <button className="p-1.5 rounded-lg text-neutral-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all" title="Add tag">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[11px] ${text.length > MAX * 0.8 ? "text-amber-400" : "text-neutral-600"}`}>
                                            {MAX - text.length}
                                        </span>
                                        <button
                                            disabled={!text.trim()}
                                            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black text-[13px] font-semibold transition-all"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

/* ── Right Sidebar ── */
function RightSidebar() {
    return (
        <aside className="hidden lg:block w-[300px] xl:w-[320px] flex-shrink-0 pl-6 pt-4">
            {/* Search */}
            <div className="relative mb-5">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                <input
                    type="text"
                    placeholder="Search engineers, topics..."
                    className="w-full h-9 pl-9 pr-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-[13px] text-white placeholder:text-neutral-600 focus:border-white/[0.15] focus:bg-white/[0.05] outline-none transition-all"
                />
            </div>

            {/* Trending */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-4">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em]">Trending in Engineering</span>
                </div>
                <div className="space-y-3">
                    {TRENDING.map((t, i) => (
                        <div key={t.tag} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-2.5">
                                <span className="text-[10px] text-neutral-700 w-4">{i + 1}</span>
                                <span className="text-[13px] font-medium text-white group-hover:text-emerald-400 transition-colors">{t.tag}</span>
                            </div>
                            <span className="text-[11px] text-neutral-600">{t.posts} posts</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggested */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em]">Who to Follow</span>
                </div>
                <div className="space-y-3">
                    {SUGGESTED.map((u, i) => (
                        <div key={u.handle} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 border border-white/10 ${GRADIENTS[i]}`}>
                                    {u.avatar}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[13px] font-medium text-white truncate">{u.name}</div>
                                    <div className="text-[11px] text-neutral-500 truncate">{u.role}</div>
                                </div>
                            </div>
                            <button className="flex-shrink-0 px-3 py-1 rounded-lg border border-white/[0.1] text-[11px] font-medium text-neutral-300 hover:bg-white/[0.05] hover:text-white transition-all">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats bar */}
            <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                    { label: "Engineers", value: "1.2k" },
                    { label: "Posts Today", value: "348" },
                    { label: "Live Now", value: "12" },
                ].map(s => (
                    <div key={s.label} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                        <div className="text-[16px] font-semibold text-white">{s.value}</div>
                        <div className="text-[10px] text-neutral-600 mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

/* ── Feed Tabs ── */
const TABS = ["For You", "Following", "PCB & Hardware", "Firmware", "3D & CAD"];

/* ── Main Page ── */
export function FeedPage() {
    const [activeTab, setActiveTab] = useState("For You");

    return (
        <div className="flex max-w-[1100px] mx-auto px-4 xl:px-8 py-4">
            {/* Center column */}
            <div className="flex-1 min-w-0 border-x border-white/[0.05]">
                {/* Tabs */}
                <div className="flex items-center border-b border-white/[0.05] overflow-x-auto scrollbar-none">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative flex-shrink-0 px-5 py-4 text-[13px] font-medium transition-all
                                ${activeTab === tab ? "text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="feed-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Compose */}
                <ComposeBox />

                {/* Posts */}
                <div>
                    {MOCK_POSTS.map((post, i) => (
                        <PostCard key={post.id} post={post} index={i} />
                    ))}
                </div>

                {/* Load more */}
                <div className="py-8 text-center">
                    <button className="px-6 py-2.5 rounded-xl border border-white/[0.08] text-[13px] text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all">
                        Load more posts
                    </button>
                </div>
            </div>

            {/* Right sidebar */}
            <RightSidebar />
        </div>
    );
}
