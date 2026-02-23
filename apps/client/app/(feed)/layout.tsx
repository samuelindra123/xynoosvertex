"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

const NAV_ITEMS = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" /><path d="M9 21V12h6v9" />
            </svg>
        ),
        label: "Feed",
        href: "/feed",
        active: true,
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
        ),
        label: "Explore",
        href: "/feed/explore",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
        ),
        label: "Notifications",
        href: "/feed/notifications",
        badge: 3,
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        label: "Messages",
        href: "/feed/messages",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
        ),
        label: "Profile",
        href: "/feed/profile",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49" />
            </svg>
        ),
        label: "Projects",
        href: "/feed/projects",
    },
];

export default function FeedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const stored = localStorage.getItem("user");
        if (!token || !stored) {
            router.replace("/login");
            return;
        }
        try { setUser(JSON.parse(stored)); } catch { router.replace("/login"); }
    }, [router]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        router.push("/login");
    };

    const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() ?? "??";

    return (
        <div className="min-h-screen bg-[#080808] text-white flex">

            {/* ── Left Sidebar ── */}
            <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[72px] xl:w-[240px] border-r border-white/[0.05] px-3 xl:px-5 py-6 z-40">
                {/* Logo */}
                <Link href="/feed" className="flex items-center gap-3 mb-8 px-2 xl:px-3">
                    <VertexMark size={26} color="white" />
                    <span className="hidden xl:block text-white font-semibold text-[15px] tracking-tight">
                        Xynoos<span className="text-neutral-500">Social</span>
                    </span>
                </Link>

                {/* Nav */}
                <nav className="flex-1 flex flex-col gap-1">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`relative flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all group
                                ${item.active
                                    ? "bg-white/[0.06] text-white"
                                    : "text-neutral-500 hover:text-white hover:bg-white/[0.04]"
                                }`}
                        >
                            <span className="flex-shrink-0">{item.icon}</span>
                            <span className="hidden xl:block text-[14px] font-medium">{item.label}</span>
                            {item.badge && (
                                <span className="hidden xl:flex absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 items-center justify-center bg-emerald-500 text-[10px] font-bold text-black rounded-full">
                                    {item.badge}
                                </span>
                            )}
                            {item.badge && (
                                <span className="xl:hidden absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                            )}
                        </Link>
                    ))}

                    {/* Post button */}
                    <button className="mt-4 flex items-center justify-center xl:justify-start gap-3 px-3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-[14px] transition-all">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                        <span className="hidden xl:block">New Post</span>
                    </button>
                </nav>

                {/* User profile bottom */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center gap-3 px-2 xl:px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/40 to-blue-500/40 border border-white/10 flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0">
                            {initials}
                        </div>
                        <div className="hidden xl:block text-left min-w-0">
                            <div className="text-[13px] font-medium text-white truncate">{user?.name ?? "..."}</div>
                            <div className="text-[11px] text-neutral-500 truncate">{user?.email ?? ""}</div>
                        </div>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute bottom-full left-0 xl:left-0 mb-2 w-48 rounded-xl border border-white/[0.08] bg-[#111] shadow-2xl py-1 z-50">
                            <Link href="/feed/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-neutral-300 hover:text-white hover:bg-white/[0.05] transition-all">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                Profile
                            </Link>
                            <div className="h-px bg-white/[0.05] my-1" />
                            <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.05] transition-all">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 md:ml-[72px] xl:ml-[240px] min-h-screen">
                {children}
            </main>

            {/* ── Mobile Bottom Nav ── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/[0.05] bg-[#080808]/95 backdrop-blur-md flex items-center justify-around px-4 py-3 z-40">
                {NAV_ITEMS.slice(0, 5).map((item) => (
                    <Link key={item.label} href={item.href} className={`relative flex flex-col items-center gap-1 ${item.active ? "text-white" : "text-neutral-600"}`}>
                        {item.icon}
                        {item.badge && <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
