"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Props {
    onClose: () => void;
    onPosted?: () => void;
}

export function NewPostModal({ onClose, onPosted }: Props) {
    const [text, setText] = useState("");
    const [tags, setTags] = useState("");
    const [media, setMedia] = useState<{ file: File; preview: string; type: "image" | "video" } | null>(null);
    const [uploading, setUploading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");
        if (!isImage && !isVideo) { setError("Only images or videos allowed"); return; }
        if (isImage && file.size > 10 * 1024 * 1024) { setError("Image max 10 MB"); return; }
        if (isVideo && file.size > 50 * 1024 * 1024) { setError("Video max 50 MB"); return; }
        setError("");
        const preview = URL.createObjectURL(file);
        setMedia({ file, preview, type: isImage ? "image" : "video" });
    };

    const handlePost = async () => {
        if (!text.trim() && !media) return;
        setPosting(true); setError("");
        try {
            let mediaUrl: string | undefined;
            let mediaType: string | undefined;

            if (media) {
                setUploading(true);
                const fd = new FormData();
                fd.append("file", media.file);
                const res = await fetch(`${API}/posts/media`, { method: "POST", credentials: "include", body: fd });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message ?? "Upload failed");
                mediaUrl = data.mediaUrl;
                mediaType = data.mediaType;
                setUploading(false);
            }

            const parsedTags = tags.split(",").map(t => t.trim().replace(/^#/, "")).filter(Boolean);
            const res = await fetch(`${API}/posts`, {
                method: "POST", credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: text.trim() || " ", tags: parsedTags, mediaUrl, mediaType }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message ?? "Post failed");
            onPosted?.();
            onClose();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong");
            setUploading(false);
        } finally { setPosting(false); }
    };

    const canPost = (text.trim() || media) && !posting;

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
                    <h2 className="text-[15px] font-semibold text-white">New Post</h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/[0.06] text-neutral-500 hover:text-white transition-all">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    {/* Text */}
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="What's on your mind? Share something with the community…"
                        maxLength={1000}
                        rows={4}
                        autoFocus
                        className="w-full bg-transparent text-[14px] text-white placeholder:text-neutral-600 resize-none outline-none leading-[1.75]"
                    />

                    {/* Media preview */}
                    {media && (
                        <div className="relative rounded-xl overflow-hidden border border-white/[0.07]">
                            {media.type === "image" ? (
                                <img src={media.preview} alt="preview" className="w-full max-h-72 object-cover" />
                            ) : (
                                <video src={media.preview} controls className="w-full max-h-72 object-cover" />
                            )}
                            <button
                                onClick={() => { setMedia(null); if (fileRef.current) fileRef.current.value = ""; }}
                                className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-all"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
                            </button>
                        </div>
                    )}

                    {/* Tags */}
                    <input
                        type="text" value={tags} onChange={e => setTags(e.target.value)}
                        placeholder="Tags: firmware, stm32, pcb  (comma separated)"
                        className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-neutral-700 focus:border-white/[0.15] focus:outline-none transition-all"
                    />

                    {error && <p className="text-red-400 text-[12px]">{error}</p>}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                            {/* Photo */}
                            <button onClick={() => { if (fileRef.current) { fileRef.current.accept = "image/*"; fileRef.current.click(); } }}
                                className="p-2 rounded-lg text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all" title="Add photo">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
                            </button>
                            {/* Video */}
                            <button onClick={() => { if (fileRef.current) { fileRef.current.accept = "video/*"; fileRef.current.click(); } }}
                                className="p-2 rounded-lg text-neutral-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all" title="Add video">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
                            </button>
                            <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFile} />
                            <span className={`text-[11px] ml-2 ${text.length > 800 ? "text-amber-400" : "text-neutral-700"}`}>{1000 - text.length}</span>
                        </div>

                        <button onClick={handlePost} disabled={!canPost}
                            className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black text-[13px] font-semibold transition-all flex items-center gap-2">
                            {(posting || uploading) && <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
                            {uploading ? "Uploading…" : posting ? "Posting…" : "Post"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
