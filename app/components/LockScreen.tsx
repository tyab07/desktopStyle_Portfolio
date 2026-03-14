"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface LockScreenProps {
    onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
            setDate(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleUnlock = useCallback(() => {
        onUnlock();
    }, [onUnlock]);

    return (
        <motion.div
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            onClick={handleUnlock}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            {/* Background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001128] via-[#0a1628] to-[#0d0820]" />

            {/* Ambient light effects */}
            <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,120,212,0.3), transparent 60%)" }}
            />
            <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(100,60,200,0.3), transparent 60%)" }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-2">
                <p className="lock-clock">{time}</p>
                <p className="lock-date">{date}</p>
            </div>

            {/* User Avatar and Name */}
            <motion.div
                className="relative z-10 mt-16 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-gradient-to-br from-[var(--win-accent)] to-purple-600 flex items-center justify-center relative">
                    <img src={`/pic-nobg.png?t=${Date.now()}`} alt="Profile avatar" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p className="text-xl font-semibold tracking-wide">Muhammad Tayyab</p>
                <p className="text-sm text-white/50">Full Stack Developer</p>
            </motion.div>

            {/* Swipe hint */}
            <motion.div
                className="absolute bottom-12 flex flex-col items-center gap-2 z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
                <ChevronUp size={24} className="text-white/40" />
                <p className="text-xs font-medium tracking-widest uppercase text-white/30">Click to unlock</p>
            </motion.div>
        </motion.div>
    );
}
