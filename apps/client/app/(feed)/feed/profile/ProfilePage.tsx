"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PostItem {
    id: string;
    content: string;
    tags: string[];
    mediaUrl: string | null;
    mediaType: string | null;
    likesCount: number;
    createdAt: string;
}

interface Profile {
    id: string;
    name: string;
    email: string;
    alias: string | null;
    bio: string | null;
    website: string | null;
    avatarUrl: string | null;
    postsCount: number;
    createdAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL;
const TABS = ["Posts", "Replies", "Media", "Likes"] as const;

function Avatar({ profile, size = 96 }: { profile: Profile | null; size?: number }) {
    const initials = profile?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() ?? "??";
    if (profile?.avatarUrl) {
        const src = profile.avatarUrl.startsWith("http") ? profile.avatarUrl : `${API}${profile.avatarUrl}`;
        return <img src={src} alt={profile.name} style={{ width: size, height: size }} className="rounded-full object-cover" />;
    }
    return (
        <div style={{ width: size, height: size, fontSize: size / 3.5 }}
            className="rounded-full bg-gradient-to-br from-emerald-500/50 to-blue-600/50 flex items-center justify-center font-bold text-white">
            {initials}
        </div>
    );
}

/* ── Edit Profile Modal ── */
function EditModal({ profile, onClose, onSaved }: {
    profile: Profile;
    onClose: () => void;
    onSaved: (p: Profile) => void;
}) {
    const [form, setForm] = useState({ alias: profile.alias ?? "", bio: profile.bio ?? "", website: profile.website ?? "" });
    const [aliasError, setAliasError] = useState("");
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    const handleAlias = (v: string) => {
        setForm(f => ({ ...f, alias: v }));
        setAliasError(v && !/^[a-z0-9_]+$/.test(v) ? "Only lowercase letters, numbers, underscores" : "");
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (aliasError) return;
        setSaving(true); setError("");
        try {
            const res = await fetch(`${API}/profile/me`, {
                method: "PATCH", credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ alias: form.alias || undefined, bio: form.bio || undefined, website: form.website || undefined }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message ?? "Save failed");
            onSaved({ ...profile, ...data });
            onClose();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally { setSaving(false); }
    };

    const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true); setError("");
        try {
            const fd = new FormData(); fd.append("avatar", file);
            const res = await fetch(`${API}/profile/avatar`, { method: "POST", credentials: "include", body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message ?? "Upload failed");
            onSaved({ ...profile, avatarUrl: data.avatarUrl });
            window.dispatchEvent(new CustomEvent("profile:updated"));
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                className="relative w-full max-w-lg bg-[#111] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                    <h2 className="text-[16px] font-semibold text-white">Edit Profile</h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/[0.06] text-neutral-400 hover:text-white transition-all">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="rounded-full overflow-hidden border-2 border-white/10">
                                <Avatar profile={profile} size={64} />
                            </div>
                            {uploading && (
                                <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                        <div>
                            <button onClick={() => fileRef.current?.click()} disabled={uploading}
                                className="px-4 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] text-white text-[12px] font-medium transition-all disabled:opacity-40">
                                {uploading ? "Uploading…" : "Change Photo"}
                            </button>
                            <p className="text-neutral-600 text-[11px] mt-1.5">JPG, PNG, WebP · max 5 MB</p>
                        </div>
                        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleAvatar} />
                    </div>

                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">Alias</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-[14px]">@</span>
                                <input type="text" value={form.alias} onChange={e => handleAlias(e.target.value)} placeholder="your_alias" maxLength={64}
                                    className={`w-full h-10 pl-8 pr-4 bg-white/[0.04] border rounded-xl text-[14px] text-white placeholder:text-neutral-700 focus:outline-none transition-all
                                        ${aliasError ? "border-red-500/40" : "border-white/[0.08] focus:border-emerald-500/40"}`} />
                            </div>
                            {aliasError && <p className="text-red-400 text-[11px] mt-1">{aliasError}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between mb-1.5">
                                <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">Bio</label>
                                <span className={`text-[11px] ${form.bio.length > 240 ? "text-amber-400" : "text-neutral-600"}`}>{form.bio.length}/280</span>
                            </div>
                            <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                                placeholder="Tell the world what you're building…" maxLength={280} rows={3}
                                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-700 focus:border-emerald-500/40 focus:outline-none transition-all resize-none" />
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">Website</label>
                            <input type="url" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                                placeholder="https://yoursite.com"
                                className="w-full h-10 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-700 focus:border-emerald-500/40 focus:outline-none transition-all" />
                        </div>

                        {error && <p className="text-red-400 text-[12px] text-center">{error}</p>}

                        <button type="submit" disabled={saving || !!aliasError}
                            className="w-full h-10 bg-white text-neutral-950 text-[14px] font-semibold rounded-xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                            {saving ? <><div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-950 rounded-full animate-spin" />Saving…</> : "Save Changes"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

/* ── Main Profile Page ── */
export function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Posts");
    const [editOpen, setEditOpen] = useState(false);
    const [myPosts, setMyPosts] = useState<PostItem[]>([]);
    const [postsLoading, setPostsLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

    useEffect(() => {
        fetch(`${API}/profile/me`, { credentials: "include" })
            .then(r => r.json())
            .then(data => setProfile(data))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (activeTab !== "Posts") return;
        setPostsLoading(true);
        fetch(`${API}/posts/me`, { credentials: "include" })
            .then(r => r.json())
            .then(data => setMyPosts(Array.isArray(data) ? data : []))
            .finally(() => setPostsLoading(false));
    }, [activeTab]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin" />
            </div>
        );
    }

    const joinedDate = profile?.createdAt
        ? new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(profile.createdAt))
        : "";

    return (
        <>
            <div className="max-w-2xl mx-auto pb-24 md:pb-8">
                {/* ── Profile section — IG style ── */}
                <div className="px-4 md:px-6 pt-8">
                    {/* Avatar + Stats row */}
                    <div className="flex items-center gap-6 md:gap-10 mb-5">
                        {/* Avatar */}
                        <div className="rounded-full border-2 border-white/[0.08] overflow-hidden flex-shrink-0">
                            <Avatar profile={profile} size={80} />
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 md:gap-10">
                            {[{ label: "Posts", val: profile?.postsCount ?? 0 }, { label: "Followers", val: 0 }, { label: "Following", val: 0 }].map(s => (
                                <div key={s.label} className="flex flex-col items-center gap-0.5">
                                    <span className="text-[18px] font-bold text-white leading-tight">{s.val}</span>
                                    <span className="text-neutral-500 text-[12px]">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Name + alias */}
                    <div className="mb-2">
                        <h1 className="text-[15px] font-semibold text-white leading-snug">{profile?.name ?? "—"}</h1>
                        {profile?.alias && (
                            <p className="text-neutral-500 text-[13px]">@{profile.alias}</p>
                        )}
                    </div>

                    {/* Bio */}
                    {profile?.bio && (
                        <p className="text-[13px] text-neutral-300 leading-[1.6] mb-2 whitespace-pre-line">{profile.bio}</p>
                    )}

                    {/* Website */}
                    {profile?.website && (
                        <a href={profile.website} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] text-blue-400 hover:text-blue-300 transition-colors mb-2">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            {profile.website.replace(/^https?:\/\//, "")}
                        </a>
                    )}

                    {/* Joined */}
                    <p className="text-neutral-600 text-[12px] mb-5 flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                        Joined {joinedDate}
                    </p>

                    {/* Edit Profile button */}
                    <button
                        onClick={() => setEditOpen(true)}
                        className="w-full py-2 rounded-lg border border-white/[0.12] text-white text-[13px] font-semibold hover:bg-white/[0.05] transition-all mb-6"
                    >
                        Edit Profile
                    </button>

                    {/* Tabs */}
                    <div className="flex border-b border-white/[0.06] -mx-4 md:-mx-6 px-4 md:px-6">
                        {TABS.map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 text-[13px] font-medium transition-all relative
                                    ${activeTab === tab ? "text-white" : "text-neutral-600 hover:text-neutral-400"}`}>
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab-indicator"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    {activeTab === "Posts" ? (
                        postsLoading ? (
                            <div className="py-16 flex justify-center">
                                <div className="w-6 h-6 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin" />
                            </div>
                        ) : myPosts.length === 0 ? (
                            <div className="py-14 flex flex-col items-center justify-center text-center gap-3">
                                <div className="w-16 h-16 rounded-full border-2 border-white/[0.08] flex items-center justify-center text-neutral-600">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="m21 15-5-5L5 21" />
                                    </svg>
                                </div>
                                <p className="text-neutral-400 text-[15px] font-semibold">No Posts yet</p>
                                <p className="text-neutral-600 text-[13px]">When you share something, it'll appear here.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-0.5 mt-0.5">
                                {myPosts.map(post => (
                                    <button key={post.id} onClick={() => setSelectedPost(post)}
                                        className="relative aspect-square bg-neutral-900 overflow-hidden group">
                                        {post.mediaType === "image" && post.mediaUrl ? (
                                            <img src={post.mediaUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : post.mediaType === "video" && post.mediaUrl ? (
                                            <>
                                                <video src={post.mediaUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" muted />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center p-3 bg-white/[0.03]">
                                                <p className="text-neutral-400 text-[11px] line-clamp-4 text-left leading-relaxed">{post.content}</p>
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <span className="text-white text-[12px] font-semibold flex items-center gap-1">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                                {post.likesCount}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="py-14 flex flex-col items-center justify-center text-center gap-3">
                            <p className="text-neutral-400 text-[15px] font-semibold">No {activeTab}</p>
                            <p className="text-neutral-600 text-[13px]">{activeTab} will appear here.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editOpen && profile && (
                    <EditModal
                        profile={profile}
                        onClose={() => setEditOpen(false)}
                        onSaved={(updated) => { setProfile(updated); setEditOpen(false); }}
                    />
                )}
            </AnimatePresence>

            {/* Post Detail Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={e => e.stopPropagation()}
                            className="relative w-full max-w-lg bg-[#111] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <button onClick={() => setSelectedPost(null)}
                                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/10 transition-all">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                            </button>
                            {selectedPost.mediaType === "image" && selectedPost.mediaUrl && (
                                <img src={selectedPost.mediaUrl} alt="" className="w-full max-h-[60vh] object-contain bg-black" />
                            )}
                            {selectedPost.mediaType === "video" && selectedPost.mediaUrl && (
                                <video src={selectedPost.mediaUrl} controls className="w-full max-h-[60vh] bg-black" />
                            )}
                            <div className="p-4">
                                {selectedPost.content && <p className="text-white text-[14px] leading-relaxed mb-3">{selectedPost.content}</p>}
                                {selectedPost.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {selectedPost.tags.map(tag => (
                                            <span key={tag} className="text-[12px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">#{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-neutral-500 text-[12px]">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white" className="text-red-400"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                    <span>{selectedPost.likesCount} likes</span>
                                    <span className="ml-auto">{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(selectedPost.createdAt))}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
