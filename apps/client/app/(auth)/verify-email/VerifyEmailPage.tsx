"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { VertexMark } from "@/components/system/VertexLogo";

export function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("No verification token provided.");
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`)
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message ?? "Verification failed.");
                setStatus("success");
                setMessage(data.message);
                setTimeout(() => router.push("/login?verified=true"), 2000);
            })
            .catch((err: unknown) => {
                setStatus("error");
                setMessage(err instanceof Error ? err.message : "Verification failed.");
            });
    }, [token, router]);

    return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `radial-gradient(circle, var(--color-neutral-400) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
                <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative w-full max-w-[420px] mx-4"
            >
                <div className="p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm text-center">
                    <div className="flex justify-center mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                            <VertexMark size={24} color="white" />
                        </div>
                    </div>

                    {status === "loading" && (
                        <>
                            <div className="flex justify-center mb-4">
                                <div className="w-8 h-8 border-2 border-white/[0.15] border-t-emerald-400 rounded-full animate-spin" />
                            </div>
                            <h1 className="text-white text-[20px] font-semibold mb-2">Verifying your email…</h1>
                            <p className="text-neutral-500 text-[14px]">Please wait a moment.</p>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="flex justify-center mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400"><path d="M22 4 12 14.01l-3-3" /></svg>
                                </div>
                            </motion.div>
                            <h1 className="text-white text-[20px] font-semibold mb-2">Email Verified!</h1>
                            <p className="text-neutral-400 text-[14px] mb-4">{message}</p>
                            <p className="text-neutral-600 text-[13px]">Redirecting to login…</p>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <div className="flex justify-center mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-400"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
                                </div>
                            </div>
                            <h1 className="text-white text-[20px] font-semibold mb-2">Verification Failed</h1>
                            <p className="text-neutral-400 text-[14px] mb-6">{message}</p>
                            <Link href="/register" className="inline-block px-6 py-2.5 bg-white text-neutral-950 text-[14px] font-medium rounded-xl hover:bg-neutral-100 transition-all">
                                Register Again
                            </Link>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
