import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-950 relative">
            {/* Minimal auth header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.04]">
                <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 h-14">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <VertexMark
                            size={22}
                            color="white"
                            className="group-hover:opacity-80 transition-opacity duration-300"
                        />
                        <span className="text-white font-semibold text-[14px] tracking-tight">
                            Xynoos<span className="text-neutral-500 ml-0.5">Vertex</span>
                        </span>
                    </Link>
                    <Link
                        href="/"
                        className="text-neutral-500 hover:text-white text-[13px] transition-colors duration-300 flex items-center gap-1.5"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
                        Back to home
                    </Link>
                </nav>
            </header>

            {/* Content */}
            <main className="pt-14">
                {children}
            </main>

            {/* Minimal footer */}
            <footer className="border-t border-white/[0.04] py-6">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
                    <p className="text-neutral-600 text-[11px]">© 2025 Xynoos Vertex. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="text-neutral-600 hover:text-neutral-400 text-[11px] transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-neutral-600 hover:text-neutral-400 text-[11px] transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
