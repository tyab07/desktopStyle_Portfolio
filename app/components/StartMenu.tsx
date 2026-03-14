"use client";

import { motion } from "framer-motion";
import { Power, RotateCcw, LogOut } from "lucide-react";

interface StartMenuProps {
    onClose: () => void;
    onShutdown: () => void;
}

export default function StartMenu({ onClose, onShutdown }: StartMenuProps) {
    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9998]"
                onClick={onClose}
            />

            {/* Menu */}
            <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="start-menu acrylic-heavy"
            >
                {/* Header */}
                <div className="p-8 pb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--win-accent)] to-purple-600 flex items-center justify-center shadow-lg relative overflow-hidden">
                            <img src="/pic-nobg.png" alt="Profile avatar" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Muhammad Tayyab</h2>
                            <p className="text-sm text-white/50">Full Stack Developer</p>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="bg-white/[0.04] rounded-xl p-5 border border-white/[0.06]">
                        <p className="text-sm text-white/70 leading-relaxed">
                            👋 Thank you for visiting my portfolio! I am passionate about building scalable web applications and intelligent systems. Feel free to explore my projects and get in touch.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mx-6" />

                {/* Power Options */}
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 px-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--win-accent)] to-purple-600 flex items-center justify-center text-xs font-bold relative overflow-hidden">
                            <img src="/pic-nobg.png" alt="Profile avatar" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <span className="text-sm text-white/60">Tayyab</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={onShutdown}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/[0.06] hover:text-red-400 transition-all"
                            title="Shut down"
                        >
                            <Power size={16} />
                            <span>Shut down</span>
                        </button>
                        <button
                            onClick={onShutdown}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/[0.06] hover:text-yellow-400 transition-all"
                            title="Restart"
                        >
                            <RotateCcw size={16} />
                        </button>
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/[0.06] hover:text-blue-400 transition-all"
                            title="Sign out"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
