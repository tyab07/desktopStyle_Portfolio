"use client";

import { useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Square, X, Copy } from "lucide-react";
import type { WindowState } from "../hooks/useWindowManager";

interface WindowProps {
    window: WindowState;
    children: React.ReactNode;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onFocus: () => void;
    onUpdatePosition: (x: number, y: number) => void;
}

export default function Window({
    window: win,
    children,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    onUpdatePosition,
}: WindowProps) {
    const dragRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0 });

    const handleDragStart = useCallback(
        (e: React.MouseEvent) => {
            if (win.isMaximized) return;
            e.preventDefault();
            onFocus();
            setIsDragging(true);
            dragStart.current = { x: e.clientX, y: e.clientY, winX: win.x, winY: win.y };

            const handleMove = (ev: MouseEvent) => {
                const dx = ev.clientX - dragStart.current.x;
                const dy = ev.clientY - dragStart.current.y;
                onUpdatePosition(dragStart.current.winX + dx, dragStart.current.winY + dy);
            };
            const handleUp = () => {
                setIsDragging(false);
                document.removeEventListener("mousemove", handleMove);
                document.removeEventListener("mouseup", handleUp);
            };
            document.addEventListener("mousemove", handleMove);
            document.addEventListener("mouseup", handleUp);
        },
        [win.isMaximized, win.x, win.y, onFocus, onUpdatePosition]
    );

    if (win.isMinimized) return null;

    const style = win.isMaximized
        ? { top: 0, left: 0, width: "100vw", height: "calc(100vh - 48px)" }
        : { top: win.y, left: win.x, width: win.width, height: win.height };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="window-chrome fixed flex flex-col"
                style={{
                    ...style,
                    zIndex: win.zIndex,
                    cursor: isDragging ? "grabbing" : "default",
                }}
                onMouseDown={onFocus}
            >
                {/* Title Bar */}
                <div
                    ref={dragRef}
                    className="flex items-center h-[32px] bg-[var(--win-titlebar)] px-3 gap-3 flex-shrink-0"
                    style={{ cursor: win.isMaximized ? "default" : "grab" }}
                    onMouseDown={handleDragStart}
                >
                    <span className="text-sm">{win.icon}</span>
                    <span className="text-xs font-medium text-[var(--win-text-secondary)] flex-1 truncate">
                        {win.title}
                    </span>
                    <div className="flex -mr-3">
                        <button className="titlebar-btn" onClick={onMinimize} title="Minimize">
                            <Minus size={12} />
                        </button>
                        <button className="titlebar-btn" onClick={onMaximize} title="Maximize">
                            {win.isMaximized ? <Copy size={11} /> : <Square size={11} />}
                        </button>
                        <button className="titlebar-btn close" onClick={onClose} title="Close" style={{ borderRadius: "0 12px 0 0" }}>
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto bg-[#0d1117]/95 backdrop-blur-xl">
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
