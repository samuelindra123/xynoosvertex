"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Types ── */
interface Profile {
    id: string;
    name: string;
    email: string;
    alias: string | null;
    bio: string | null;
    website: string | null;
    avatarUrl: string | null;
    createdAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL;

/* ── Avatar display ── */
function Avatar({ profile, size = 96 }: { profile: Profile | null; size?: number }) {
    const initials = profile?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() ?? "??";
    if (profile?.avatarUrl) {
        const src = profile.avatarUrl.startsWith("http")
            ? profile.avatarUrl
            : `${API}${profile.avatarUrl}`;
        return (
            <img
                src={src}
                alt={profile.name}
                style={{ width: size, height: size }}
                className="rounded-full object-cover border-4 border-[#111] ring-2 ring-white/10"
            />
        );
    }
    return (
        <div
            style={{ width: size, height: size, fontSize: size / 4 }}
            className="rounded-full bg-gradient-to-br from-emerald-500/40 to-blue-500/40 border-4 border-[#111] ring-2 ring-white/10 flex items-center justify-center font-bold text-white"
        >
            {initials}
        </div>
    );
}

/* ── Main component ── */
export function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [aliasError, setAliasError] = useState("");

    const [form, setForm] = useState({ alias: "", bio: "", website: "" });
    const fileRef = useRef<HTMLInputElement>(null);

    /* fetch profile */
    useEffect(() => {
        fetch(`${API}/profile/me`, { credentials: "include" })
            .then(r => r.json())
            .then(data => {
                setProfile(data);
                setForm({
                    alias: data.alias ?? "",
                    bio: data.bio ?? "",
                    website: data.website ?? "",
                });
            })
            .catch(() => setError("Failed to load profile."))
            .finally(() => setLoading(false));
    }, []);

    /* validate alias live */
    const handleAliasChange = (val: string) => {
        setForm(f => ({ ...f, alias: val }));
        if (val && !/^[a-z0-9_]+$/.test(val)) {
            setAliasError("Only lowercase letters, numbers, and underscores");
        } else {
            setAliasError("");
        }
    };

    /* save profile */
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (aliasError) return;
        setSaving(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`${API}/profile/me`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    alias: form.alias || undefined,
                    bio: form.bio || undefined,
                    website: form.website || undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message ?? "Save failed.");
            setProfile(prev => prev ? { ...prev, ...data } : data);
            setSuccess("Profile updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setSaving(false);
        }
    };

    /* upload avatar */
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setError("");
        try {
            const fd = new FormData();
            fd.append("avatar", file);
            const res = await fetch(`${API}/profile/avatar`, {
                method: "POST",
                credentials: "include",
                body: fd,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message ?? "Upload failed.");
            setProfile(prev => prev ? { ...prev, avatarUrl: data.avatarUrl } : prev);
            setSuccess("Avatar updated!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Upload failed.");
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    };

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
        <div className="max-w-2xl mx-auto px-4 py-8 pb-24 md:pb-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-[22px] font-semibold text-white tracking-[-0.02em]">Profile</h1>
                <p className="text-neutral-500 text-[14px] mt-1">Manage your public identity</p>
            </div>

            {/* Avatar section */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <Avatar profile={profile} size={80} />
                        {uploading && (
                            <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <p className="text-white text-[15px] font-medium mb-1">{profile?.name}</p>
                        <p className="text-neutral-500 text-[13px] mb-3">
                            {profile?.alias ? `@${profile.alias}` : "No alias set yet"} · Joined {joinedDate}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => fileRef.current?.click()}
                                disabled={uploading}
                                className="px-4 py-1.5 rounded-lg bg-white text-neutral-950 text-[12px] font-semibold hover:bg-neutral-100 transition-all disabled:opacity-50"
                            >
                                {uploading ? "Uploading…" : "Change Photo"}
                            </button>
                            {profile?.avatarUrl && (
                                <button
                                    onClick={async () => {
                                        await fetch(`${API}/profile/me`, {
                                            method: "PATCH",
                                            credentials: "include",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ avatarUrl: null }),
                                        });
                                        setProfile(prev => prev ? { ...prev, avatarUrl: null } : prev);
                                    }}
                                    className="px-4 py-1.5 rounded-lg border border-white/[0.08] text-[12px] text-neutral-400 hover:text-red-400 hover:border-red-500/20 transition-all"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <p className="text-neutral-600 text-[11px] mt-2">JPG, PNG, WebP or GIF · max 5 MB</p>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>
            </div>

            {/* Profile form */}
            <form onSubmit={handleSave} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
                {/* Full name (read-only) */}
                <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.12em] mb-2">
                        Full Name
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={profile?.name ?? ""}
                            disabled
                            className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[14px] text-neutral-500 cursor-not-allowed"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-700 bg-white/[0.04] px-2 py-0.5 rounded-md">
                            From registration
                        </span>
                    </div>
                </div>

                {/* Email (read-only) */}
                <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.12em] mb-2">
                        Email
                    </label>
                    <input
                        type="text"
                        value={profile?.email ?? ""}
                        disabled
                        className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[14px] text-neutral-500 cursor-not-allowed"
                    />
                </div>

                {/* Alias */}
                <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.12em] mb-2">
                        Alias <span className="text-neutral-700 normal-case tracking-normal font-normal ml-1">Your public @handle</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-[14px]">@</span>
                        <input
                            type="text"
                            value={form.alias}
                            onChange={e => handleAliasChange(e.target.value)}
                            placeholder="your_alias"
                            maxLength={64}
                            className={`w-full h-11 pl-8 pr-4 bg-white/[0.03] border rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:outline-none transition-all
                                ${aliasError ? "border-red-500/40 focus:border-red-500/60" : "border-white/[0.08] focus:border-emerald-500/30 focus:bg-white/[0.05]"}`}
                        />
                    </div>
                    {aliasError && <p className="text-red-400 text-[11px] mt-1.5">{aliasError}</p>}
                    <p className="text-neutral-600 text-[11px] mt-1.5">Lowercase letters, numbers, underscores only</p>
                </div>

                {/* Bio */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.12em]">Bio</label>
                        <span className={`text-[11px] ${form.bio.length > 240 ? "text-amber-400" : "text-neutral-600"}`}>
                            {form.bio.length}/280
                        </span>
                    </div>
                    <textarea
                        value={form.bio}
                        onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                        placeholder="Firmware engineer. Building IoT at the edge. Obsessed with low-power design."
                        maxLength={280}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-emerald-500/30 focus:bg-white/[0.05] focus:outline-none transition-all resize-none"
                    />
                </div>

                {/* Website */}
                <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.12em] mb-2">
                        Website
                    </label>
                    <div className="relative">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                        <input
                            type="url"
                            value={form.website}
                            onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                            placeholder="https://yoursite.com"
                            className="w-full h-11 pl-9 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-neutral-600 focus:border-emerald-500/30 focus:bg-white/[0.05] focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Feedback */}
                <AnimatePresence>
                    {(error || success) && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`p-3 rounded-xl border text-[13px] text-center
                                ${success
                                    ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400"
                                    : "border-red-500/20 bg-red-500/[0.06] text-red-400"
                                }`}
                        >
                            {success || error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Save */}
                <button
                    type="submit"
                    disabled={saving || !!aliasError}
                    className="w-full h-11 bg-white text-neutral-950 text-[14px] font-semibold rounded-xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {saving
                        ? <><div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-950 rounded-full animate-spin" /> Saving…</>
                        : "Save Changes"
                    }
                </button>
            </form>

            {/* Profile preview card */}
            <div className="mt-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-4">Preview</p>
                <div className="flex items-start gap-4">
                    <Avatar profile={profile} size={52} />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[15px] font-semibold text-white">{profile?.name}</span>
                            {profile?.alias && (
                                <span className="text-[13px] text-neutral-500">@{profile.alias}</span>
                            )}
                        </div>
                        {profile?.bio && (
                            <p className="text-[13px] text-neutral-400 mt-1 leading-[1.6]">{profile.bio}</p>
                        )}
                        {profile?.website && (
                            <a
                                href={profile.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[12px] text-blue-400 hover:text-blue-300 mt-2 transition-colors"
                            >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                {profile.website.replace(/^https?:\/\//, "")}
                            </a>
                        )}
                        {!profile?.bio && !profile?.website && !profile?.alias && (
                            <p className="text-[13px] text-neutral-700 mt-1 italic">Fill in your profile above to see a preview here.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
