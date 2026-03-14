"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Volume2 } from "lucide-react";
import type { WindowState } from "../hooks/useWindowManager";
import StartMenu from "./StartMenu";

const TECH_LOGOS = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "🟢" },
    { name: "Python", icon: "🐍" },
    { name: "TypeScript", icon: "🔷" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Docker", icon: "🐳" },
    { name: "Git", icon: "📦" },
    { name: "Tailwind", icon: "💨" },
    { name: "Express", icon: "🚀" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Redis", icon: "🔴" },
];

interface TaskbarProps {
    windows: WindowState[];
    onFocusWindow: (id: string) => void;
    onShutdown: () => void;
}

export default function Taskbar({ windows, onFocusWindow, onShutdown }: TaskbarProps) {
    const [time, setTime] = useState("");
    const [dateStr, setDateStr] = useState("");
    const [startOpen, setStartOpen] = useState(false);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
            setDateStr(now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    const doubled = [...TECH_LOGOS, ...TECH_LOGOS];

    return (
        <>
            {/* Start Menu */}
            <AnimatePresence>
                {startOpen && (
                    <StartMenu
                        onClose={() => setStartOpen(false)}
                        onShutdown={() => {
                            setStartOpen(false);
                            onShutdown();
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Taskbar */}
            <div className="taskbar acrylic-heavy">
                {/* Start Button */}
                <button
                    className="taskbar-app hover:!bg-white/10"
                    onClick={() => setStartOpen(!startOpen)}
                    title="Start"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="1" y="1" width="10" height="10" rx="1.5" opacity="0.9" />
                        <rect x="13" y="1" width="10" height="10" rx="1.5" opacity="0.7" />
                        <rect x="1" y="13" width="10" height="10" rx="1.5" opacity="0.7" />
                        <rect x="13" y="13" width="10" height="10" rx="1.5" opacity="0.5" />
                    </svg>
                </button>

                {/* Center: Sliding Tech Logos + Open Windows */}
                <div className="flex-1 flex items-center justify-center gap-1 overflow-hidden mx-4">
                    {/* Open Window Buttons */}
                    {windows.filter(w => !w.isMinimized || true).map((w) => (
                        <button
                            key={w.id}
                            className={`taskbar-app ${!w.isMinimized ? 'active' : ''}`}
                            onClick={() => onFocusWindow(w.id)}
                            title={w.title}
                        >
                            <span className="text-sm">{w.icon}</span>
                            <span className="hidden md:block text-xs truncate max-w-[100px]">{w.title}</span>
                        </button>
                    ))}

                    {/* Separator */}
                    {windows.length > 0 && (
                        <div className="w-px h-6 bg-white/10 mx-2 flex-shrink-0" />
                    )}

                    {/* Tech Logo Slider */}
                    <div className="overflow-hidden flex-1 max-w-[400px]">
                        <div className="tech-slider">
                            {doubled.map((tech, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 flex-shrink-0" title={tech.name}>
                                    <span className="text-sm">{tech.icon}</span>
                                    <span className="text-[10px] text-white/40 font-medium whitespace-nowrap">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: System Tray */}
                <div className="flex items-center gap-3 px-3">
                    <Wifi size={14} className="text-white/50" />
                    <Volume2 size={14} className="text-white/50" />
                    <div className="text-right leading-tight">
                        <p className="text-[11px] font-medium text-white/70">{time}</p>
                        <p className="text-[10px] text-white/40">{dateStr}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
