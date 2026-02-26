"use client";

import { use, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PostViewer, type ViewerPost } from "../../../PostViewer";

const API = process.env.NEXT_PUBLIC_API_URL;

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

interface PostItem {
    id: string;
    content: string;
    tags: string[];
    mediaUrl: string | null;
    mediaType: string | null;
    likesCount: number;
    commentsCount: number;
    likedByMe: boolean;
    savedByMe: boolean;
    createdAt: string;
    user: { id: string; name: string; alias: string | null; avatarUrl: string | null };
}

function Avatar({ profile, size = 80 }: { profile: Profile | null; size?: number }) {
    const initials = profile?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() ?? "??";
    if (profile?.avatarUrl) {
        const src = profile.avatarUrl.startsWith("http") ? profile.avatarUrl : `${API}${profile.avatarUrl}`;
        return <img src={src} alt={profile.name} style={{ width: size, height: size }} className="rounded-full object-cover" />;
    }
    return (
        <div style={{ width: size, height: size, fontSize: size / 3.5 }}
            className="rounded-full bg-gradient-to-br from-violet-500/50 to-pink-500/50 flex items-center justify-center font-bold text-white">
            {initials}
        </div>
    );
}

export function UserProfilePage({ paramsPromise }: { paramsPromise: Promise<{ userId: string }> }) {
    const { userId } = use(paramsPromise);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState<ViewerPost | null>(null);
    const [myId, setMyId] = useState<string>("");

    useEffect(() => {
        fetch(`${API}/auth/me`, { credentials: "include" })
            .then(r => r.json())
            .then(d => setMyId(d?.user?.id ?? ""))
            .catch(() => null);
    }, []);

    useEffect(() => {
        fetch(`${API}/profile/${userId}`, { credentials: "include" })
            .then(r => r.json())
            .then(data => setProfile(data))
            .finally(() => setLoading(false));
    }, [userId]);

    useEffect(() => {
        setPostsLoading(true);
        fetch(`${API}/posts/me`, { credentials: "include" })
            .then(r => r.json())
            .then(data => setPosts(Array.isArray(data) ? data : []))
            .finally(() => setPostsLoading(false));
    }, [userId]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin" />
        </div>
    );

    if (!profile) return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center">
            <p className="text-neutral-400 text-[15px] font-semibold">User not found</p>
        </div>
    );

    const joinedDate = profile.createdAt
        ? new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(profile.createdAt))
        : "";

    return (
        <>
            <div className="max-w-2xl mx-auto pb-24 md:pb-8">
                <div className="px-4 md:px-6 pt-8">
                    {/* Avatar + Stats */}
                    <div className="flex items-center gap-6 md:gap-10 mb-5">
                        <div className="rounded-full border-2 border-white/[0.08] overflow-hidden flex-shrink-0">
                            <Avatar profile={profile} size={80} />
                        </div>
                        <div className="flex gap-6 md:gap-10">
                            <div className="text-center">
                                <p className="text-white text-[18px] font-bold">{profile.postsCount ?? 0}</p>
                                <p className="text-neutral-500 text-[12px]">Posts</p>
                            </div>
                            <div className="text-center">
                                <p className="text-white text-[18px] font-bold">0</p>
                                <p className="text-neutral-500 text-[12px]">Followers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-white text-[18px] font-bold">0</p>
                                <p className="text-neutral-500 text-[12px]">Following</p>
                            </div>
                        </div>
                    </div>

                    {/* Name + bio */}
                    <div className="mb-4">
                        <p className="text-white text-[15px] font-semibold">{profile.name}</p>
                        {profile.alias && <p className="text-neutral-500 text-[13px]">@{profile.alias}</p>}
                        {profile.bio && <p className="text-neutral-300 text-[13px] mt-2 leading-relaxed whitespace-pre-wrap">{profile.bio}</p>}
                        {profile.website && (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer"
                                className="text-emerald-400 text-[13px] mt-1 hover:underline block truncate">
                                {profile.website.replace(/^https?:\/\//, "")}
                            </a>
                        )}
                        <p className="text-neutral-600 text-[12px] mt-1.5 flex items-center gap-1">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            Joined {joinedDate}
                        </p>
                    </div>

                    <div className="h-px bg-white/[0.06] mb-0" />
                </div>

                {/* Posts tab */}
                <div className="px-4 md:px-6">
                    <div className="flex border-b border-white/[0.06]">
                        <button className="flex items-center gap-1.5 px-2 py-3 text-[13px] font-semibold text-white border-b-2 border-white -mb-px">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                            Posts
                        </button>
                    </div>

                    <div className="mt-0.5">
                        {postsLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-6 h-6 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin" />
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="py-14 flex flex-col items-center justify-center text-center gap-3">
                                <p className="text-neutral-400 text-[14px]">No posts yet</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-0.5 mt-0.5">
                                {posts.map(post => (
                                    <button key={post.id} onClick={() => setSelectedPost(post as ViewerPost)}
                                        className="relative aspect-square bg-neutral-900 overflow-hidden group">
                                        {post.mediaType === "image" && post.mediaUrl ? (
                                            <img src={post.mediaUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : post.mediaType === "video" && post.mediaUrl ? (
                                            <>
                                                <video src={post.mediaUrl} className="w-full h-full object-cover" muted />
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
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <span className="text-white text-[12px] font-semibold flex items-center gap-1">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                                {post.likesCount}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedPost && (
                    <PostViewer
                        post={selectedPost}
                        myId={myId}
                        onClose={() => setSelectedPost(null)}
                        onLike={(id) => {
                            setSelectedPost(p => p?.id === id ? { ...p, likedByMe: !p.likedByMe, likesCount: p.likedByMe ? p.likesCount - 1 : p.likesCount + 1 } : p);
                            setPosts(prev => prev.map(p => p.id === id ? { ...p, likedByMe: !p.likedByMe, likesCount: p.likedByMe ? p.likesCount - 1 : p.likesCount + 1 } : p));
                        }}
                        onSave={(id) => {
                            setSelectedPost(p => p?.id === id ? { ...p, savedByMe: !p.savedByMe } : p);
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
