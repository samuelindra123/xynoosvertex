"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL;

interface PostUser { id: string; name: string; alias: string | null; avatarUrl: string | null; }
interface Post { id: string; content: string; tags: string[]; mediaUrl: string | null; mediaType: string | null; likesCount: number; likedByMe: boolean; createdAt: string; user: PostUser; }
interface Me { id: string; name: string; email: string; avatarUrl?: string; alias?: string; }

const GRADIENTS = [
    "bg-gradient-to-br from-emerald-500/40 to-cyan-500/40",
    "bg-gradient-to-br from-violet-500/40 to-pink-500/40",
    "bg-gradient-to-br from-orange-500/40 to-amber-400/40",
    "bg-gradient-to-br from-blue-500/40 to-indigo-500/40",
    "bg-gradient-to-br from-rose-500/40 to-red-400/40",
];

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

function PostCard({ post, index, me, onLike, onDelete }: { post: Post; index: number; me: Me|null; onLike:(id:string)=>void; onDelete:(id:string)=>void }) {
    const isOwn = me?.id === post.user.id;
    const [menu, setMenu] = useState(false);
    return (
        <motion.article initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3,delay:Math.min(index*0.04,0.3)}}
            className="border-b border-white/[0.05] px-5 py-4 hover:bg-white/[0.015] transition-all">
            <div className="flex gap-3">
                <UserAvatar user={post.user} size={40} idx={index} />
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[14px] font-semibold text-white">{post.user.name}</span>
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

                    {/* Content */}
                    {post.content.trim() && (
                        <p className="text-[14px] text-neutral-300 leading-[1.75] mb-3 whitespace-pre-wrap">{post.content}</p>
                    )}

                    {/* Media */}
                    {post.mediaUrl && (
                        <div className="mb-3 rounded-xl overflow-hidden border border-white/[0.06]">
                            {post.mediaType === "video" ? (
                                <video src={post.mediaUrl} controls className="w-full max-h-[400px] object-contain bg-black" />
                            ) : (
                                <img src={post.mediaUrl} alt="post media" className="w-full max-h-[400px] object-cover cursor-pointer" />
                            )}
                        </div>
                    )}

                    {/* Tags */}
                    {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.map(t => <span key={t} className="text-[11px] text-blue-400/70 hover:text-blue-300 cursor-pointer transition-colors">#{t}</span>)}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                        <button onClick={()=>onLike(post.id)} className={`flex items-center gap-1.5 text-[12px] font-medium px-2 py-1 rounded-lg transition-all ${post.likedByMe?"text-rose-400 bg-rose-500/10":"text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10"}`}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill={post.likedByMe?"currentColor":"none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            <span>{post.likesCount}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-blue-400 px-2 py-1 rounded-lg hover:bg-blue-500/10 transition-all">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </button>
                        <button className="flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-emerald-400 px-2 py-1 rounded-lg hover:bg-emerald-500/10 transition-all">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
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
            onPosted(data); setText(""); setTags(""); setFocused(false);
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

    // Listen for refresh events from NewPostModal (via layout)
    useEffect(()=>{
        const handler = () => { setPage(1); loadPosts(1); };
        window.addEventListener("feed:refresh", handler);
        return () => window.removeEventListener("feed:refresh", handler);
    },[loadPosts]);

    const handleLike = async(id:string)=>{
        setPostList(prev=>prev.map(p=>p.id===id?{...p,likedByMe:!p.likedByMe,likesCount:p.likedByMe?p.likesCount-1:p.likesCount+1}:p));
        try { await fetch(`${API}/posts/${id}/like`,{method:"POST",credentials:"include"}); }
        catch { setPostList(prev=>prev.map(p=>p.id===id?{...p,likedByMe:!p.likedByMe,likesCount:p.likedByMe?p.likesCount-1:p.likesCount+1}:p)); }
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
                            <PostCard key={p.id} post={p} index={i} me={me} onLike={handleLike} onDelete={handleDelete}/>
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
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
                        <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-3">Trending</p>
                        <div className="space-y-2.5">
                            {["#STM32","#PCBDesign","#RustEmbedded","#ESP32","#KiCad"].map((t,i)=>(
                                <div key={t} className="flex items-center gap-2.5 cursor-pointer group">
                                    <span className="text-[10px] text-neutral-700 w-3">{i+1}</span>
                                    <span className="text-[13px] text-white group-hover:text-emerald-400 transition-colors">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
