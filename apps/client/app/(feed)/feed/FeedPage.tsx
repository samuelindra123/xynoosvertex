"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { PostViewer } from "../PostViewer";

const API = process.env.NEXT_PUBLIC_API_URL;

interface PostUser { id: string; name: string; alias: string | null; avatarUrl: string | null; }
interface Post { id: string; content: string; tags: string[]; mediaUrl: string | null; mediaType: string | null; likesCount: number; commentsCount: number; likedByMe: boolean; savedByMe: boolean; createdAt: string; user: PostUser; }
interface Me { id: string; name: string; email: string; avatarUrl?: string; alias?: string; }

const GRADIENTS = ["bg-gradient-to-br from-emerald-500/40 to-cyan-500/40","bg-gradient-to-br from-violet-500/40 to-pink-500/40","bg-gradient-to-br from-orange-500/40 to-amber-400/40","bg-gradient-to-br from-blue-500/40 to-indigo-500/40","bg-gradient-to-br from-rose-500/40 to-red-400/40"];

function timeAgo(d: string) {
    const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (s < 60) return `${s}s`; if (s < 3600) return `${Math.floor(s/60)}m`;
    if (s < 86400) return `${Math.floor(s/3600)}h`; return `${Math.floor(s/86400)}d`;
}
function initials(name: string) { return name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(); }

function UserAvatar({ user, size=40, idx=0 }: { user: PostUser|Me; size?: number; idx?: number }) {
    if (user.avatarUrl) {
        const src = user.avatarUrl.startsWith("http") ? user.avatarUrl : `${API}${user.avatarUrl}`;
        return <img src={src} alt={user.name} style={{width:size,height:size}} className="rounded-full object-cover flex-shrink-0 border border-white/10" />;
    }
    return (
        <div style={{width:size,height:size,fontSize:size/3.2}} className={`rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 border border-white/10 ${GRADIENTS[idx%GRADIENTS.length]}`}>
            {initials(user.name)}
        </div>
    );
}

/* ═══ Feed Video — IntersectionObserver autoplay, click = play/pause only ═══ */
function FeedVideo({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(16 / 9);
    const fadeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Autoplay when ≥60% visible
    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                el.play().then(() => setPlaying(true)).catch(() => null);
            } else {
                el.pause(); setPlaying(false);
            }
        }, { threshold: 0.6 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const showAndFade = useCallback(() => {
        setShowControls(true);
        clearTimeout(fadeTimer.current);
        fadeTimer.current = setTimeout(() => setShowControls(false), 2500);
    }, []);
    useEffect(() => () => clearTimeout(fadeTimer.current), []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        const v = videoRef.current; if (!v) return;
        if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
        showAndFade();
    };

    return (
        <div
            className="relative overflow-hidden rounded-2xl bg-black cursor-pointer select-none"
            style={{ aspectRatio: `${aspectRatio}` }}
            onMouseMove={showAndFade}
            onMouseLeave={() => { clearTimeout(fadeTimer.current); fadeTimer.current = setTimeout(() => setShowControls(false), 800); }}
            onClick={togglePlay}
        >
            {/* Blurred backdrop fill for letterbox */}
            {loaded && (
                <video src={src} muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-110 opacity-20 blur-3xl pointer-events-none"
                    aria-hidden />
            )}

            <video
                ref={videoRef}
                src={src}
                muted={muted}
                playsInline
                preload="metadata"
                className="relative z-10 w-full h-full object-contain"
                style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s" }}
                onLoadedMetadata={e => {
                    setLoaded(true);
                    const v = e.currentTarget;
                    if (v.videoWidth && v.videoHeight) setAspectRatio(v.videoWidth / v.videoHeight);
                }}
                onTimeUpdate={e => setProgress(e.currentTarget.currentTime)}
                onDurationChange={e => setDuration(e.currentTarget.duration)}
                onEnded={() => { setPlaying(false); setShowControls(true); }}
            />

            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
                </div>
            )}

            {/* Center play/pause flash */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        key={playing ? "pl" : "pa"}
                        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.3 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-14 h-14 rounded-full bg-black/55 backdrop-blur-md border border-white/10 flex items-center justify-center">
                            {playing
                                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                                : <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 2 }}><polygon points="6,3 20,12 6,21" /></svg>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom gradient controls */}
            <motion.div
                animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 4 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 z-30 px-3.5 pb-3 pt-10"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), transparent)" }}
                onClick={e => e.stopPropagation()}
            >
                {/* Progress bar */}
                <div className="h-[3px] rounded-full mb-2.5 relative cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                    onClick={e => {
                        const v = videoRef.current; if (!v || !duration) return;
                        const r = e.currentTarget.getBoundingClientRect();
                        v.currentTime = ((e.clientX - r.left) / r.width) * duration;
                    }}>
                    <div className="absolute inset-y-0 left-0 rounded-full bg-white/80 pointer-events-none"
                        style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-white/50 text-[11px] font-mono tabular-nums">
                        {Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, "0")}
                    </span>
                    <button
                        onClick={e => { e.stopPropagation(); setMuted(m => { const v = videoRef.current; if (v) v.muted = !m; return !m; }); showAndFade(); }}
                        className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                        {muted
                            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                            : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

function FeedMedia({ src, type }: { src: string; type: string }) {
    if (type === "video") return <FeedVideo src={src} />;
    return (
        <div className="rounded-2xl overflow-hidden border border-white/[0.05]">
            <img
                src={src} alt=""
                loading="lazy"
                className="w-full object-contain block"
                style={{ maxHeight: "600px" }}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function PostCard({ post, index, me, onLike, onSave, onDelete, onOpen }: {
    post: Post; index: number; me: Me|null;
    onLike:(id:string)=>void; onSave:(id:string)=>void; onDelete:(id:string)=>void; onOpen:(p:Post)=>void;
}) {
    const isOwn = me?.id === post.user.id;
    const [menu, setMenu] = useState(false);
    const router = useRouter();

    const goToProfile = () => {
        if (isOwn) router.push("/feed/profile");
        else router.push(`/feed/profile/${post.user.id}`);
    };

    return (
        <motion.article initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3,delay:Math.min(index*0.04,0.3)}}
            className="border-b border-white/[0.05] px-5 py-4 hover:bg-white/[0.015] transition-all">
            <div className="flex gap-3">
                <button onClick={goToProfile} className="flex-shrink-0">
                    <UserAvatar user={post.user} size={40} idx={index} />
                </button>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <button onClick={goToProfile} className="text-[14px] font-semibold text-white hover:underline">{post.user.name}</button>
                            {post.user.alias && <span className="text-[12px] text-neutral-600">@{post.user.alias}</span>}
                            <span className="text-neutral-700">·</span>
                            <span className="text-[11px] text-neutral-600">{timeAgo(post.createdAt)}</span>
                        </div>
                        {isOwn && (
                            <div className="relative">
                                <button onClick={()=>setMenu(v=>!v)} className="p-1 rounded-lg text-neutral-600 hover:text-white hover:bg-white/[0.05] transition-all">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                                </button>
                                {menu && (
                                    <div className="absolute right-0 top-7 w-36 bg-[#141414] border border-white/[0.08] rounded-xl shadow-2xl py-1 z-20">
                                        <button onClick={()=>{onDelete(post.id);setMenu(false)}} className="w-full flex items-center gap-2 px-4 py-2 text-[13px] text-red-400 hover:bg-red-500/[0.08] transition-all">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {post.content.trim() && (
                        <p className="text-[14px] text-neutral-300 leading-[1.75] mb-3 whitespace-pre-wrap">{post.content}</p>
                    )}

                    {post.mediaUrl && post.mediaType && (
                        <div className="mb-3">
                            <FeedMedia src={post.mediaUrl} type={post.mediaType} />
                        </div>
                    )}

                    {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.map(t => <span key={t} className="text-[11px] text-blue-400/70 hover:text-blue-300 cursor-pointer transition-colors">#{t}</span>)}
                        </div>
                    )}

                    <div className="flex items-center gap-0.5 -ml-2">
                        <button onClick={()=>onLike(post.id)} className={`flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1.5 rounded-xl transition-all ${post.likedByMe?"text-rose-400":"text-neutral-500 hover:text-rose-400 hover:bg-rose-500/[0.08]"}`}>
                            <motion.div animate={post.likedByMe?{scale:[1,1.3,1]}:{}} transition={{duration:0.25}}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill={post.likedByMe?"currentColor":"none"} stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            </motion.div>
                            {post.likesCount > 0 && <span>{post.likesCount}</span>}
                        </button>
                        <button onClick={()=>onOpen(post)} className="flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-blue-400 px-2.5 py-1.5 rounded-xl hover:bg-blue-500/[0.08] transition-all">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            {post.commentsCount > 0 && <span>{post.commentsCount}</span>}
                        </button>
                        <button onClick={()=>onSave(post.id)} className={`flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-xl transition-all ml-auto ${post.savedByMe?"text-emerald-400":"text-neutral-500 hover:text-emerald-400 hover:bg-emerald-500/[0.08]"}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill={post.savedByMe?"currentColor":"none"} stroke="currentColor" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

function ComposeBox({ me, onPosted }: { me: Me|null; onPosted:(p:Post)=>void }) {
    const [text, setText] = useState("");
    const [tags, setTags] = useState("");
    const [focused, setFocused] = useState(false);
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState("");

    const handlePost = async () => {
        if (!text.trim()||posting) return;
        setPosting(true); setError("");
        try {
            const parsedTags = tags.split(",").map(t=>t.trim().replace(/^#/,"")).filter(Boolean);
            const res = await fetch(`${API}/posts`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:text.trim(),tags:parsedTags})});
            const data = await res.json();
            if (!res.ok) throw new Error(data.message??"Post failed");
            onPosted({...data, commentsCount: 0, savedByMe: false}); setText(""); setTags(""); setFocused(false);
        } catch(e:unknown) { setError(e instanceof Error?e.message:"Failed"); }
        finally { setPosting(false); }
    };

    return (
        <div className="border-b border-white/[0.05] px-5 py-4">
            <div className="flex gap-3">
                {me ? <UserAvatar user={me} size={40}/> : <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex-shrink-0"/>}
                <div className="flex-1">
                    <textarea value={text} onChange={e=>setText(e.target.value)} onFocus={()=>setFocused(true)}
                        placeholder="Share something with the community…" maxLength={1000}
                        rows={focused||text?3:1}
                        className="w-full bg-transparent text-[14px] text-white placeholder:text-neutral-600 resize-none outline-none leading-[1.7] transition-all"/>
                    <AnimatePresence>
                        {(focused||text) && (
                            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="overflow-hidden">
                                <input type="text" value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags: firmware, esp32  (comma separated)"
                                    className="w-full bg-transparent text-[12px] text-neutral-500 placeholder:text-neutral-700 outline-none mt-1 mb-2"/>
                                {error && <p className="text-red-400 text-[12px] mb-2">{error}</p>}
                                <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                                    <span className={`text-[11px] ${text.length>800?"text-amber-400":"text-neutral-600"}`}>{1000-text.length}</span>
                                    <button onClick={handlePost} disabled={!text.trim()||posting}
                                        className="px-5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black text-[13px] font-semibold transition-all flex items-center gap-2">
                                        {posting&&<div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin"/>}
                                        Post
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export function FeedPage() {
    const [postList, setPostList] = useState<Post[]>([]);
    const [me, setMe] = useState<Me|null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [viewerPost, setViewerPost] = useState<Post|null>(null);

    useEffect(()=>{
        Promise.all([
            fetch(`${API}/auth/me`,{credentials:"include"}).then(r=>r.json()),
            fetch(`${API}/profile/me`,{credentials:"include"}).then(r=>r.ok?r.json():null),
        ]).then(([auth,profile])=>{
            setMe({...auth.user, avatarUrl:profile?.avatarUrl, alias:profile?.alias});
        }).catch(()=>null);
    },[]);

    const loadPosts = useCallback(async(p:number,append=false)=>{
        if(p===1&&!append) setLoading(true); else setLoadingMore(true);
        try {
            const res = await fetch(`${API}/posts?page=${p}`,{credentials:"include"});
            const data:Post[] = await res.json();
            if(append) setPostList(prev=>[...prev,...data]); else setPostList(data);
            setHasMore(data.length===20);
        } finally { setLoading(false); setLoadingMore(false); }
    },[]);

    useEffect(()=>{ loadPosts(1); },[loadPosts]);

    useEffect(()=>{
        const handler = () => { setPage(1); loadPosts(1); };
        window.addEventListener("feed:refresh", handler);
        return () => window.removeEventListener("feed:refresh", handler);
    },[loadPosts]);

    const handleLike = async(id:string)=>{
        setPostList(prev=>prev.map(p=>p.id===id?{...p,likedByMe:!p.likedByMe,likesCount:p.likedByMe?p.likesCount-1:p.likesCount+1}:p));
        setViewerPost(prev=>prev?.id===id?{...prev,likedByMe:!prev.likedByMe,likesCount:prev.likedByMe?prev.likesCount-1:prev.likesCount+1}:prev);
        await fetch(`${API}/posts/${id}/like`,{method:"POST",credentials:"include"}).catch(()=>null);
    };

    const handleSave = async(id:string)=>{
        setPostList(prev=>prev.map(p=>p.id===id?{...p,savedByMe:!p.savedByMe}:p));
        setViewerPost(prev=>prev?.id===id?{...prev,savedByMe:!prev.savedByMe}:prev);
        await fetch(`${API}/posts/${id}/save`,{method:"POST",credentials:"include"}).catch(()=>null);
    };

    const handleDelete = async(id:string)=>{
        setPostList(prev=>prev.filter(p=>p.id!==id));
        await fetch(`${API}/posts/${id}`,{method:"DELETE",credentials:"include"});
    };

    return (
        <div className="flex max-w-[1060px] mx-auto px-4 xl:px-6 py-4">
            <div className="flex-1 min-w-0 border-x border-white/[0.05]">
                <div className="px-5 py-4 border-b border-white/[0.05]">
                    <h1 className="text-[16px] font-semibold text-white">Feed</h1>
                </div>

                <ComposeBox me={me} onPosted={p=>setPostList(prev=>[p,...prev])}/>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                        <div className="w-7 h-7 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin"/>
                        <p className="text-neutral-600 text-[13px]">Loading feed…</p>
                    </div>
                ) : postList.length===0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-8">
                        <div className="w-14 h-14 rounded-full border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-neutral-700">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </div>
                        <div>
                            <p className="text-white text-[15px] font-semibold mb-1">No posts yet</p>
                            <p className="text-neutral-600 text-[13px]">Be the first to share something.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {postList.map((p,i)=>(
                            <PostCard key={p.id} post={p} index={i} me={me}
                                onLike={handleLike} onSave={handleSave} onDelete={handleDelete}
                                onOpen={setViewerPost}
                            />
                        ))}
                        {hasMore && (
                            <div className="flex justify-center py-6">
                                <button onClick={()=>{const n=page+1;setPage(n);loadPosts(n,true);}} disabled={loadingMore}
                                    className="px-6 py-2 rounded-xl border border-white/[0.08] text-[13px] text-neutral-400 hover:text-white hover:border-white/[0.15] transition-all flex items-center gap-2 disabled:opacity-50">
                                    {loadingMore&&<div className="w-3 h-3 border-2 border-neutral-600 border-t-white rounded-full animate-spin"/>}
                                    Load more
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Right Sidebar */}
            <aside className="hidden lg:block w-[270px] flex-shrink-0 pl-5 pt-4">
                <div className="sticky top-4 space-y-4">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <input type="text" placeholder="Search…" className="w-full h-9 pl-9 pr-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-[13px] text-white placeholder:text-neutral-600 focus:border-white/[0.15] outline-none transition-all"/>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                        </div>
                        <p className="text-white text-[13px] font-semibold mb-1">Explore & Discover</p>
                        <p className="text-neutral-600 text-[11px] leading-relaxed">Trending topics, suggested users, and more</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                            <span className="text-emerald-400 text-[10px] font-semibold tracking-wider uppercase">Coming Soon</span>
                        </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <p className="text-white text-[13px] font-semibold mb-1">Who to Follow</p>
                        <p className="text-neutral-600 text-[11px] leading-relaxed">Discover engineers building things you care about</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"/>
                            <span className="text-blue-400 text-[10px] font-semibold tracking-wider uppercase">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Post Viewer — IG style split pane */}
            <AnimatePresence>
                {viewerPost && me && (
                    <PostViewer
                        post={viewerPost}
                        myId={me.id}
                        onClose={()=>setViewerPost(null)}
                        onLike={handleLike}
                        onSave={handleSave}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
