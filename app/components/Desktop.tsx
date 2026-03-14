"use client";

import { motion } from "framer-motion";
import { FolderOpen, User, Code2, Mail, Briefcase } from "lucide-react";
import CodeRainBackground from "./CodeRainBackground";

interface DesktopProps {
    onOpenFolder: (folder: string) => void;
}

const folders = [
    { id: "about", label: "About", icon: User, color: "#60cdff" },
    { id: "projects", label: "Projects", icon: Briefcase, color: "#fbbf24" },
    { id: "techs", label: "Techs", icon: Code2, color: "#34d399" },
    { id: "contact", label: "Contact", icon: Mail, color: "#a78bfa" },
];

export default function Desktop({ onOpenFolder }: DesktopProps) {
    return (
        <div className="absolute inset-0 bottom-[48px] overflow-hidden">
            {/* Animated Code Background */}
            <CodeRainBackground />

            {/* Subtle overlay to ensure icon readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/30 via-transparent to-[#0a0e1a]/50 pointer-events-none z-[1]" />

            {/* Folder Icons Grid */}
            <div className="relative z-[2] p-6 flex flex-col gap-3">
                {folders.map((folder, idx) => (
                    <motion.div
                        key={folder.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.08, type: "spring", stiffness: 200 }}
                        className="desktop-icon group"
                        onDoubleClick={() => onOpenFolder(folder.id)}
                        onClick={() => onOpenFolder(folder.id)}
                    >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/[0.06] border border-white/[0.08] group-hover:bg-white/[0.1] group-hover:border-white/[0.15] transition-all shadow-lg">
                            <folder.icon size={24} style={{ color: folder.color }} />
                        </div>
                        <span className="text-[11px] font-medium text-white/80 group-hover:text-white transition-colors leading-tight">
                            {folder.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
