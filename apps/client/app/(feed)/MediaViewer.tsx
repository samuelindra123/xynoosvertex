"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Custom Video Player ── */
function VideoPlayer({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const resetHide = useCallback(() => {
        setShowControls(true);
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => playing && setShowControls(false), 2500);
    }, [playing]);

    useEffect(() => { if (playing) resetHide(); else setShowControls(true); }, [playing, resetHide]);
    useEffect(() => () => clearTimeout(hideTimer.current), []);

    const togglePlay = () => {
        const v = videoRef.current; if (!v) return;
        if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
    };

    const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const v = videoRef.current; if (!v || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        v.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
    };

    const handleVolume = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const val = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setVolume(val); if (videoRef.current) videoRef.current.volume = val;
        setMuted(val === 0);
    };

    const toggleMute = () => {
        const v = videoRef.current; if (!v) return;
        v.muted = !muted; setMuted(!muted);
    };

    const toggleFullscreen = () => {
        const v = videoRef.current;
        if (!v) return;
        if (document.fullscreenElement) document.exitFullscreen();
        else v.requestFullscreen?.();
    };

    return (
        <div className="relative bg-black w-full group" onMouseMove={resetHide} onClick={togglePlay}>
            <video
                ref={videoRef}
                src={src}
                className="w-full max-h-[70vh] object-contain"
                onTimeUpdate={e => setProgress(e.currentTarget.currentTime)}
                onDurationChange={e => setDuration(e.currentTarget.duration)}
                onEnded={() => setPlaying(false)}
                onClick={e => e.stopPropagation()}
            />

            {/* Big play overlay */}
            <AnimatePresence>
                {!playing && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls bar */}
            <motion.div
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-8 pb-3 px-3"
                onClick={e => e.stopPropagation()}
            >
                {/* Progress */}
                <div className="mb-2 cursor-pointer group/prog" onClick={seek}>
                    <div className="h-1 bg-white/20 rounded-full relative">
                        <div className="h-full bg-white rounded-full transition-all" style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm opacity-0 group-hover/prog:opacity-100 transition-opacity"
                            style={{ left: `${duration ? (progress / duration) * 100 : 0}%`, transform: "translate(-50%,-50%)" }} />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <button onClick={togglePlay} className="text-white hover:text-white/70 transition-colors">
                        {playing
                            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                            : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-1.5 group/vol">
                        <button onClick={toggleMute} className="text-white hover:text-white/70 transition-colors">
                            {muted || volume === 0
                                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>}
                        </button>
                        <div className="w-14 cursor-pointer hidden group-hover/vol:block" onClick={handleVolume}>
                            <div className="h-1 bg-white/20 rounded-full">
                                <div className="h-full bg-white rounded-full" style={{ width: `${muted ? 0 : volume * 100}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Time */}
                    <span className="text-white/60 text-[11px] font-mono">{fmt(progress)} / {fmt(duration)}</span>

                    {/* Fullscreen */}
                    <button onClick={toggleFullscreen} className="ml-auto text-white hover:text-white/70 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

/* ── Image Lightbox ── */
function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
    const [scale, setScale] = useState(1);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const dragging = useRef(false);
    const last = useRef({ x: 0, y: 0 });

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        setScale(s => Math.max(1, Math.min(4, s - e.deltaY * 0.002)));
    };

    const onMouseDown = (e: React.MouseEvent) => {
        if (scale <= 1) return;
        dragging.current = true;
        last.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!dragging.current) return;
        setPos(p => ({ x: p.x + e.clientX - last.current.x, y: p.y + e.clientY - last.current.y }));
        last.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { dragging.current = false; };

    const reset = () => { setScale(1); setPos({ x: 0, y: 0 }); };

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onWheel={handleWheel}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            {/* Zoom controls */}
            <div className="absolute top-3 right-3 z-10 flex gap-2">
                <button onClick={() => setScale(s => Math.min(4, s + 0.5))}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                </button>
                <button onClick={() => setScale(s => Math.max(1, s - 0.5))}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/></svg>
                </button>
                {scale > 1 && (
                    <button onClick={reset}
                        className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all text-[10px] font-bold">
                        1:1
                    </button>
                )}
            </div>

            <img
                src={src} alt=""
                style={{
                    transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
                    cursor: scale > 1 ? "grab" : "zoom-in",
                    transition: dragging.current ? "none" : "transform 0.15s ease",
                    maxWidth: "100%", maxHeight: "85vh", objectFit: "contain",
                    userSelect: "none",
                }}
                draggable={false}
                onDoubleClick={() => scale === 1 ? setScale(2) : reset()}
            />
            {scale > 1 && <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-white/40">Double-click to reset · Scroll to zoom</p>}
        </div>
    );
}

/* ── Main MediaViewer Modal ── */
export function MediaViewer({ src, type, onClose }: { src: string; type: "image" | "video"; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] flex-shrink-0">
                <span className="text-[11px] text-neutral-500 uppercase tracking-widest">{type === "video" ? "Video" : "Photo"}</span>
                <button onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/[0.15] transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
            </div>

            {/* Media */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                {type === "video"
                    ? <VideoPlayer src={src} />
                    : <ImageLightbox src={src} onClose={onClose} />}
            </div>
        </motion.div>
    );
}

/* ── Inline video/image thumbnail with click to expand ── */
export function MediaThumbnail({ src, type, onClick }: { src: string; type: string; onClick: () => void }) {
    const [videoLoaded, setVideoLoaded] = useState(false);

    if (type === "video") {
        return (
            <div className="relative cursor-pointer group rounded-xl overflow-hidden border border-white/[0.06]" onClick={onClick}>
                <video src={src} className="w-full max-h-[360px] object-cover bg-black" muted preload="metadata"
                    onLoadedMetadata={() => setVideoLoaded(true)} />
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${videoLoaded ? "opacity-100" : "opacity-0"}`}>
                    <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] text-white/70 font-mono">
                    TAP TO PLAY
                </div>
            </div>
        );
    }
    return (
        <div className="cursor-pointer rounded-xl overflow-hidden border border-white/[0.06] group" onClick={onClick}>
            <img src={src} alt="" className="w-full max-h-[400px] object-cover group-hover:scale-[1.01] transition-transform duration-300" />
        </div>
    );
}
