"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL;

interface CommentUser { id: string; name: string; alias: string | null; avatarUrl: string | null; }
interface Comment { id: string; content: string; createdAt: string; user: CommentUser; }

const GRADIENTS = [
    "from-emerald-500/50 to-cyan-500/50",
    "from-violet-500/50 to-pink-500/50",
    "from-orange-500/50 to-amber-400/50",
    "from-blue-500/50 to-indigo-500/50",
    "from-rose-500/50 to-red-400/50",
];

function timeAgo(d: string) {
    const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (s < 60) return `${s}s`; if (s < 3600) return `${Math.floor(s / 60)}m`;
    if (s < 86400) return `${Math.floor(s / 3600)}h`; return `${Math.floor(s / 86400)}d`;
}

function Avatar({ user, size = 32, idx = 0 }: { user: CommentUser; size?: number; idx?: number }) {
    const init = user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    if (user.avatarUrl) {
        const src = user.avatarUrl.startsWith("http") ? user.avatarUrl : `${API}${user.avatarUrl}`;
        return <img src={src} alt={user.name} style={{ width: size, height: size }} className="rounded-full object-cover flex-shrink-0" />;
    }
    return (
        <div style={{ width: size, height: size, fontSize: size / 3 }}
            className={`rounded-full bg-gradient-to-br ${GRADIENTS[idx % GRADIENTS.length]} flex items-center justify-center font-bold text-white flex-shrink-0`}>
            {init}
        </div>
    );
}

export function CommentsSheet({ postId, myId, onClose, onCountChange }: {
    postId: string;
    myId: string;
    onClose: () => void;
    onCountChange: (count: number) => void;
}) {
    const [list, setList] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [posting, setPosting] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`${API}/posts/${postId}/comments`, { credentials: "include" })
            .then(r => r.json())
            .then(data => { setList(Array.isArray(data) ? data : []); setLoading(false); })
            .catch(() => setLoading(false));
        // Focus input
        setTimeout(() => inputRef.current?.focus(), 300);
    }, [postId]);

    // Close on backdrop or Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const handlePost = async () => {
        if (!text.trim() || posting) return;
        setPosting(true);
        try {
            const res = await fetch(`${API}/posts/${postId}/comments`, {
                method: "POST", credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: text.trim() }),
            });
            const data = await res.json();
            if (!res.ok) return;
            setList(prev => [data, ...prev]);
            onCountChange(list.length + 1);
            setText("");
            // Scroll to top (newest)
            listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        } finally { setPosting(false); }
    };

    const handleDelete = async (id: string) => {
        await fetch(`${API}/posts/${postId}/comments/${id}`, { method: "DELETE", credentials: "include" });
        setList(prev => {
            const next = prev.filter(c => c.id !== id);
            onCountChange(next.length);
            return next;
        });
    };

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Sheet */}
            <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-[61] bg-[#111] border-t border-white/[0.07] rounded-t-3xl overflow-hidden"
                style={{ maxHeight: "80vh", display: "flex", flexDirection: "column" }}
                onClick={e => e.stopPropagation()}
            >
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                    <div className="w-10 h-1 rounded-full bg-white/10" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
                    <h3 className="text-[15px] font-semibold text-white">
                        Comments <span className="text-neutral-500 font-normal text-[13px]">{list.length > 0 ? list.length : ""}</span>
                    </h3>
                    <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full bg-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-all">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                </div>

                {/* Comments list */}
                <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-5 h-5 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin" />
                        </div>
                    ) : list.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-neutral-700">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                            <p className="text-neutral-500 text-[13px]">No comments yet</p>
                            <p className="text-neutral-700 text-[12px]">Be the first to comment</p>
                        </div>
                    ) : (
                        <AnimatePresence initial={false}>
                            {list.map((c, idx) => (
                                <motion.div key={c.id}
                                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
                                    className="flex gap-2.5 group">
                                    <Avatar user={c.user} size={30} idx={idx} />
                                    <div className="flex-1 min-w-0">
                                        <div className="bg-white/[0.04] rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[12px] font-semibold text-white">{c.user.name}</span>
                                                {c.user.alias && <span className="text-[11px] text-neutral-600">@{c.user.alias}</span>}
                                            </div>
                                            <p className="text-[13px] text-neutral-300 leading-relaxed">{c.content}</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 px-1">
                                            <span className="text-[11px] text-neutral-600">{timeAgo(c.createdAt)}</span>
                                            {c.user.id === myId && (
                                                <button onClick={() => handleDelete(c.id)}
                                                    className="text-[11px] text-neutral-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {/* Input */}
                <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-3 flex items-center gap-3 bg-[#111]">
                    <div className="flex-1 flex items-center gap-3 bg-white/[0.05] border border-white/[0.08] rounded-2xl px-4 py-2.5 focus-within:border-white/[0.15] transition-all">
                        <input
                            ref={inputRef}
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handlePost()}
                            placeholder="Add a comment…"
                            maxLength={500}
                            className="flex-1 bg-transparent text-[13px] text-white placeholder:text-neutral-600 outline-none"
                        />
                        {text.length > 0 && (
                            <span className={`text-[10px] flex-shrink-0 ${text.length > 450 ? "text-amber-400" : "text-neutral-600"}`}>{500 - text.length}</span>
                        )}
                    </div>
                    <button
                        onClick={handlePost}
                        disabled={!text.trim() || posting}
                        className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0"
                    >
                        {posting
                            ? <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-black translate-x-0.5">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                            </svg>}
                    </button>
                </div>
            </motion.div>
        </>
    );
}
