"use client";

import {
    useEffect, useRef, useState, useCallback,
    type RefObject,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL;

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface PostUser { id: string; name: string; alias: string | null; avatarUrl: string | null; }
interface CommentUser { id: string; name: string; alias: string | null; avatarUrl: string | null; }
interface Comment { id: string; content: string; createdAt: string; user: CommentUser; }
export interface ViewerPost {
    id: string; content: string; tags: string[];
    mediaUrl: string | null; mediaType: string | null;
    likesCount: number; commentsCount: number;
    likedByMe: boolean; savedByMe: boolean;
    createdAt: string; user: PostUser;
}

/* ─── Micro-helpers ─────────────────────────────────────────────────────── */
const GRADS = [
    "from-emerald-500/60 to-cyan-500/60", "from-violet-500/60 to-pink-500/60",
    "from-orange-500/60 to-amber-400/60", "from-blue-500/60 to-indigo-500/60",
    "from-rose-500/60 to-red-400/60",
];
function timeAgo(d: string) {
    const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (s < 60) return `${s}s`; if (s < 3600) return `${Math.floor(s / 60)}m`;
    if (s < 86400) return `${Math.floor(s / 3600)}h`; return `${Math.floor(s / 86400)}d`;
}
function fmt(s: number) { return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` }

function Avatar({ user, size = 32, idx = 0 }: { user: PostUser | CommentUser; size?: number; idx?: number }) {
    const init = user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    if (user.avatarUrl) {
        const src = user.avatarUrl.startsWith("http") ? user.avatarUrl : `${API}${user.avatarUrl}`;
        return <img src={src} alt={user.name} style={{ width: size, height: size }} className="rounded-full object-cover flex-shrink-0" />;
    }
    return (
        <div style={{ width: size, height: size, fontSize: size / 3 }}
            className={`rounded-full bg-gradient-to-br ${GRADS[idx % GRADS.length]} flex items-center justify-center font-bold text-white flex-shrink-0 border border-white/10`}>
            {init}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PREMIUM VIDEO PLAYER
   ══════════════════════════════════════════════════════════════════════════ */
function PremiumVideo({ src, containerRef }: { src: string; containerRef?: RefObject<HTMLDivElement | null> }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const fadeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Autoplay when visible
    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && e.intersectionRatio >= 0.5) {
                el.play().then(() => setPlaying(true)).catch(() => null);
            } else {
                el.pause(); setPlaying(false);
            }
        }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const showAndFade = useCallback(() => {
        setShowControls(true);
        clearTimeout(fadeTimer.current);
        fadeTimer.current = setTimeout(() => setShowControls(false), 3000);
    }, []);

    useEffect(() => () => clearTimeout(fadeTimer.current), []);

    const togglePlay = () => {
        const v = videoRef.current; if (!v) return;
        if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
        showAndFade();
    };

    const handleProgress = () => {
        const v = videoRef.current; if (!v) return;
        setProgress(v.currentTime);
        if (v.buffered.length > 0) setBuffered(v.buffered.end(v.buffered.length - 1));
    };

    const seekTo = useCallback((e: React.MouseEvent | MouseEvent, el: HTMLElement) => {
        const v = videoRef.current; if (!v || !duration) return;
        const r = el.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (('clientX' in e ? e.clientX : 0) - r.left) / r.width));
        v.currentTime = ratio * duration;
        setProgress(v.currentTime);
    }, [duration]);

    const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        seekTo(e, e.currentTarget);
    };

    return (
        <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black"
            onMouseMove={showAndFade}
            onMouseLeave={() => { clearTimeout(fadeTimer.current); fadeTimer.current = setTimeout(() => setShowControls(false), 800); }}
            onClick={togglePlay}
        >
            {/* Blurred backdrop for letterbox fill */}
            {loaded && (
                <video
                    src={src} muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-110 opacity-20 blur-3xl pointer-events-none"
                    aria-hidden
                />
            )}

            {/* Main video */}
            <video
                ref={videoRef}
                src={src}
                muted={muted}
                playsInline
                loop={false}
                className="relative z-10 w-full h-full object-contain"
                style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
                onLoadedData={() => setLoaded(true)}
                onTimeUpdate={handleProgress}
                onDurationChange={e => setDuration(e.currentTarget.duration)}
                onEnded={() => { setPlaying(false); setShowControls(true); }}
                onClick={e => e.stopPropagation()}
            />

            {/* Loading spinner */}
            {!loaded && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
                </div>
            )}

            {/* Center play/pause indicator */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        key={playing ? "p" : "pa"}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.3 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 pointer-events-none w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10"
                    >
                        {playing
                            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                            : <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 2 }}><polygon points="6,3 20,12 6,21" /></svg>}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top: mute toggle */}
            <motion.button
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                onClick={e => { e.stopPropagation(); setMuted(m => { const v = videoRef.current; if (v) v.muted = !m; return !m; }); showAndFade(); }}
                className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all"
            >
                {muted
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>}
            </motion.button>

            {/* Bottom controls */}
            <motion.div
                animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-3 pt-10"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
                onClick={e => e.stopPropagation()}
            >
                {/* Progress bar */}
                <div
                    ref={progressRef}
                    className="relative h-1 rounded-full cursor-pointer mb-3 group"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                    onClick={handleSeekClick}
                >
                    {/* Buffered */}
                    <div className="absolute inset-y-0 left-0 rounded-full bg-white/20 transition-all"
                        style={{ width: `${duration ? (buffered / duration) * 100 : 0}%` }} />
                    {/* Played */}
                    <div className="absolute inset-y-0 left-0 rounded-full bg-white transition-all"
                        style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
                    {/* Thumb */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `${duration ? (progress / duration) * 100 : 0}%`, transform: "translate(-50%,-50%)" }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={togglePlay} className="text-white hover:text-white/80 transition-colors">
                            {playing
                                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                                : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 1 }}><polygon points="6,3 20,12 6,21" /></svg>}
                        </button>
                        <span className="text-white/60 text-[11px] font-mono tabular-nums">{fmt(progress)} / {fmt(duration)}</span>
                    </div>
                    <button
                        onClick={e => { e.stopPropagation(); const v = videoRef.current; if (document.fullscreenElement) document.exitFullscreen(); else v?.requestFullscreen?.(); }}
                        className="text-white/50 hover:text-white transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PREMIUM IMAGE VIEWER
   ══════════════════════════════════════════════════════════════════════════ */
function PremiumImage({ src }: { src: string }) {
    const [loaded, setLoaded] = useState(false);
    const [naturalW, setNaturalW] = useState(0);
    const [naturalH, setNaturalH] = useState(0);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
            {/* Blurred backdrop */}
            {loaded && (
                <img
                    src={src} alt=""
                    className="absolute inset-0 w-full h-full object-cover scale-110 opacity-30 blur-3xl pointer-events-none select-none"
                    aria-hidden
                />
            )}

            {/* Loading skeleton */}
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
                </div>
            )}

            {/* Main image */}
            <motion.img
                src={src} alt=""
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.97 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 w-full h-full object-contain select-none"
                style={{
                    willChange: "opacity, transform",
                    imageRendering: "high-quality" as React.CSSProperties["imageRendering"],
                }}
                onLoad={e => {
                    setLoaded(true);
                    const img = e.currentTarget;
                    setNaturalW(img.naturalWidth);
                    setNaturalH(img.naturalHeight);
                }}
                draggable={false}
            />

            {/* Dimensions badge */}
            {loaded && naturalW > 0 && (
                <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white/40 font-mono tabular-nums pointer-events-none">
                    {naturalW} × {naturalH}
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ADAPTIVE MEDIA CONTAINER
   Detects aspect ratio and sizes container accordingly
   ══════════════════════════════════════════════════════════════════════════ */
function MediaContainer({ src, type }: { src: string; type: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden relative"
            style={{ background: "#080808" }}
        >
            {type === "video"
                ? <PremiumVideo src={src} containerRef={containerRef} />
                : <PremiumImage src={src} />}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN POST VIEWER — IG Split Panel
   ══════════════════════════════════════════════════════════════════════════ */
export function PostViewer({ post, myId, onClose, onLike, onSave }: {
    post: ViewerPost; myId: string;
    onClose: () => void;
    onLike: (id: string) => void;
    onSave: (id: string) => void;
}) {
    const router = useRouter();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [text, setText] = useState("");
    const [posting, setPosting] = useState(false);
    const [localLiked, setLocalLiked] = useState(post.likedByMe);
    const [localLikes, setLocalLikes] = useState(post.likesCount);
    const [localSaved, setLocalSaved] = useState(post.savedByMe);
    const [localComments, setLocalComments] = useState(post.commentsCount);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const hasMedia = !!post.mediaUrl && !!post.mediaType;

    const goToUser = (userId: string) => {
        onClose();
        if (userId === myId) router.push("/feed/profile");
        else router.push(`/feed/profile/${userId}`);
    };

    useEffect(() => {
        const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [onClose]);

    useEffect(() => {
        fetch(`${API}/posts/${post.id}/comments`, { credentials: "include" })
            .then(r => r.json())
            .then(d => setComments(Array.isArray(d) ? d : []))
            .finally(() => setLoadingComments(false));
    }, [post.id]);

    const doLike = async () => {
        const was = localLiked;
        setLocalLiked(!was); setLocalLikes(c => was ? c - 1 : c + 1);
        await fetch(`${API}/posts/${post.id}/like`, { method: "POST", credentials: "include" });
        onLike(post.id);
    };

    const doSave = async () => {
        setLocalSaved(s => !s);
        await fetch(`${API}/posts/${post.id}/save`, { method: "POST", credentials: "include" });
        onSave(post.id);
    };

    const doComment = async () => {
        if (!text.trim() || posting) return;
        setPosting(true);
        try {
            const res = await fetch(`${API}/posts/${post.id}/comments`, {
                method: "POST", credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: text.trim() }),
            });
            const data = await res.json();
            if (!res.ok) return;
            setComments(prev => [data, ...prev]);
            setLocalComments(c => c + 1);
            setText("");
            listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        } finally { setPosting(false); }
    };

    const doDeleteComment = async (id: string) => {
        await fetch(`${API}/posts/${post.id}/comments/${id}`, { method: "DELETE", credentials: "include" });
        setComments(prev => prev.filter(c => c.id !== id));
        setLocalComments(c => Math.max(0, c - 1));
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4"
            style={{ willChange: "opacity" }}>

            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/92 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Close */}
            <button onClick={onClose}
                className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.09] text-white/50 hover:text-white hover:bg-white/[0.12] flex items-center justify-center transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>

            {/* Dialog */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={e => e.stopPropagation()}
                className={`
                    relative z-10 flex w-full bg-[#0d0d0d] overflow-hidden
                    rounded-none md:rounded-2xl shadow-2xl
                    ${hasMedia
                        ? "flex-col md:flex-row"
                        : "max-w-[500px] flex-col"}
                `}
                style={{
                    maxWidth: hasMedia ? "min(90vw, 1400px)" : "500px",
                    height: hasMedia ? "90vh" : "auto",
                    maxHeight: "90vh",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)",
                    willChange: "opacity, transform",
                }}
            >
                {/* ══ LEFT: Media panel ══ */}
                {hasMedia && (
                    <div className="flex-1 bg-black h-full min-w-0 overflow-hidden"
                        style={{ minWidth: 0 }}>
                        <MediaContainer src={post.mediaUrl!} type={post.mediaType!} />
                    </div>
                )}

                {/* ══ RIGHT: Info + comments panel ══ */}
                <div className={`flex flex-col ${hasMedia ? "w-full md:w-[420px] md:flex-shrink-0 border-t md:border-t-0 md:border-l border-white/[0.05]" : "w-full"}`}
                    style={{ height: hasMedia ? "100%" : "auto", maxHeight: hasMedia ? "100%" : "90vh", overflow: "hidden" }}>

                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.05] flex-shrink-0">
                        <button onClick={() => goToUser(post.user.id)} className="flex-shrink-0">
                            <Avatar user={post.user} size={34} />
                        </button>
                        <div className="flex-1 min-w-0">
                            <button onClick={() => goToUser(post.user.id)} className="text-[13px] font-semibold text-white leading-tight truncate hover:underline block text-left">{post.user.name}</button>
                            {post.user.alias && <p className="text-[11px] text-neutral-600">@{post.user.alias}</p>}
                        </div>
                        <span className="text-[11px] text-neutral-700 flex-shrink-0">{timeAgo(post.createdAt)}</span>
                    </div>

                    {/* Scrollable: caption + comments */}
                    <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-3.5 min-h-0"
                        style={{ scrollbarWidth: "none" }}>

                        {/* Caption */}
                        {post.content.trim() && (
                            <div className="flex gap-2.5">
                                <button onClick={() => goToUser(post.user.id)} className="flex-shrink-0 self-start mt-0.5">
                                    <Avatar user={post.user} size={26} />
                                </button>
                                <div className="flex-1 min-w-0">
                                    <div className="bg-white/[0.04] rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                                        <button onClick={() => goToUser(post.user.id)} className="text-[12px] font-semibold text-white mr-1.5 hover:underline">{post.user.name}</button>
                                        <span className="text-[13px] text-neutral-300 leading-relaxed break-words">{post.content}</span>
                                    </div>
                                    {post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-1.5 px-1">
                                            {post.tags.map(t => (
                                                <span key={t} className="text-[11px] text-blue-400/70 hover:text-blue-300 transition-colors cursor-pointer">#{t}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Divider */}
                        {post.content.trim() && <div className="h-px bg-white/[0.04]" />}

                        {/* Comments */}
                        {loadingComments ? (
                            <div className="flex justify-center py-8">
                                <div className="w-5 h-5 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-2.5 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-neutral-700">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <p className="text-neutral-500 text-[13px] font-medium">No comments yet</p>
                                <p className="text-neutral-700 text-[12px]">Be the first to comment</p>
                            </div>
                        ) : (
                            <AnimatePresence initial={false}>
                                {comments.map((c, i) => (
                                    <motion.div key={c.id}
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -16 }}
                                        transition={{ duration: 0.18 }}
                                        className="flex gap-2.5 group"
                                    >
                                        <button onClick={() => goToUser(c.user.id)} className="flex-shrink-0 self-start mt-0.5">
                                            <Avatar user={c.user} size={26} idx={i} />
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <div className="bg-white/[0.04] rounded-2xl rounded-tl-sm px-3 py-2.5">
                                                <button onClick={() => goToUser(c.user.id)} className="text-[12px] font-semibold text-white mr-1.5 hover:underline">{c.user.name}</button>
                                                <span className="text-[13px] text-neutral-300 leading-relaxed break-words">{c.content}</span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 px-1">
                                                <span className="text-[10px] text-neutral-700">{timeAgo(c.createdAt)}</span>
                                                {c.user.id === myId && (
                                                    <button onClick={() => doDeleteComment(c.id)}
                                                        className="text-[10px] text-neutral-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
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

                    {/* Actions bar */}
                    <div className="flex-shrink-0 border-t border-white/[0.05] px-4 pt-3 pb-2">
                        <div className="flex items-center gap-0.5 -ml-2 mb-2">
                            {/* Like */}
                            <button onClick={doLike}
                                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[13px] font-medium transition-all ${localLiked ? "text-rose-400" : "text-neutral-500 hover:text-rose-400 hover:bg-rose-500/[0.06]"}`}>
                                <motion.div animate={localLiked ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.28 }}>
                                    <svg width="21" height="21" viewBox="0 0 24 24" fill={localLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                </motion.div>
                            </button>
                            {/* Comment focus */}
                            <button onClick={() => inputRef.current?.focus()}
                                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[13px] text-neutral-500 hover:text-sky-400 hover:bg-sky-500/[0.06] transition-all">
                                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </button>
                            {/* Save */}
                            <button onClick={doSave}
                                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[13px] transition-all ml-auto ${localSaved ? "text-amber-400" : "text-neutral-500 hover:text-amber-400 hover:bg-amber-500/[0.06]"}`}>
                                <motion.div animate={localSaved ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.22 }}>
                                    <svg width="21" height="21" viewBox="0 0 24 24" fill={localSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                    </svg>
                                </motion.div>
                            </button>
                        </div>

                        {/* Likes count */}
                        {localLikes > 0 && (
                            <p className="text-[12px] font-semibold text-white px-1 mb-0.5">
                                {localLikes.toLocaleString()} {localLikes === 1 ? "like" : "likes"}
                            </p>
                        )}
                    </div>

                    {/* Comment input */}
                    <div className="flex-shrink-0 border-t border-white/[0.05] px-4 py-3 flex items-center gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && !e.shiftKey && doComment()}
                            placeholder="Add a comment…"
                            maxLength={500}
                            className="flex-1 bg-transparent text-[13px] text-white placeholder:text-neutral-700 outline-none min-w-0"
                        />
                        <AnimatePresence>
                            {text.trim() && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={doComment} disabled={posting}
                                    className="text-sky-400 hover:text-sky-300 text-[13px] font-semibold transition-colors disabled:opacity-40 flex-shrink-0">
                                    {posting
                                        ? <div className="w-4 h-4 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
                                        : "Post"}
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
