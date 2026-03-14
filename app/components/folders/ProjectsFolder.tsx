"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, Tag, Terminal, Database, Cpu, LayoutTemplate } from "lucide-react";

const projects = [
    {
        id: "fast-ragger",
        title: "Fast RAGger",
        filename: "Fast_RAGger",
        icon: Database,
        description: "AI-powered Retrieval-Augmented Generation system. Full-stack application with a JavaScript frontend and a dedicated backend service. Implements vector search, document chunking, and LLM integration for intelligent document Q&A.",
        tech: ["JavaScript", "Node.js", "React", "AI", "RAG"],
        url: "https://github.com/tyab07/fast-ragger",
        color: "#3b82f6",
    },
    {
        id: "urban-air",
        title: "Urban Air Analysis",
        filename: "Urban_Air_Analysis",
        icon: LayoutTemplate,
        description: "Data analysis project examining urban air quality metrics and pollution patterns. Uses Python for data processing, visualization with matplotlib/seaborn, and statistical analysis of environmental datasets.",
        tech: ["Python", "Data Science", "Analysis", "Visualization"],
        url: "https://github.com/tyab07/urban-air-analysis",
        color: "#10b981",
    },
    {
        id: "arabic-prose",
        title: "Arabic Prose Manager",
        filename: "Arabic_Prose_Manager",
        icon: Terminal,
        description: "A comprehensive full-stack management system for Arabic literature and prose with robust CRUD operations and a graphical user interface. Features authentication, search, and categorization.",
        tech: ["Java", "Full-Stack", "Backend", "GUI"],
        url: "https://github.com/tyab07/arabic-prose-manager-full-stack",
        color: "#8b5cf6",
    },
    {
        id: "os-simulator",
        title: "OS Simulator",
        filename: "OS_Simulator",
        icon: Cpu,
        description: "Operating system concepts implementation in C++, featuring process scheduling algorithms (FCFS, SJF, Round Robin), memory management simulation, and inter-process communication.",
        tech: ["C++", "Systems", "Low-Level", "Algorithms"],
        url: "https://github.com/tyab07/OS-Simulator",
        color: "#6b7280",
    },
    {
        id: "ping-pong",
        title: "Ping Pong Game",
        filename: "Ping_Pong_Game",
        icon: Code2,
        description: "Classic ping pong game built entirely in Assembly language. Demonstrates direct hardware interaction, interrupt handling, and low-level graphics rendering on DOS systems.",
        tech: ["Assembly", "Game Dev", "Low-Level", "Hardware"],
        url: "https://github.com/tyab07/ping-pong-game-assembly",
        color: "#ef4444",
    },
];

import type { Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ProjectsFolder() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <div className="h-full flex flex-col bg-[var(--win-bg)] relative overflow-hidden">
            {/* High-tech background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <AnimatePresence mode="wait">
                {selectedProject ? (
                    /* ── Detail View (High-tech HUD style) ── */
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex-1 flex flex-col relative z-10"
                    >
                        {/* Toolbar */}
                        <div className="flex items-center gap-3 px-6 py-4 bg-white/[0.02] border-b border-white/[0.06] backdrop-blur-md flex-shrink-0">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/[0.08] active:scale-95 transition-transform"
                            >
                                <ArrowLeft size={16} /> Back to Grid
                            </button>
                            <div className="flex-1" />
                            <div className="flex items-center gap-2 text-xs font-mono text-[var(--win-accent-light)]/70 bg-[var(--win-accent)]/10 px-3 py-1.5 rounded-full border border-[var(--win-accent)]/20">
                                <span className="w-2 h-2 rounded-full bg-[var(--win-accent-light)] animate-pulse" />
                                SYS.SECURE_CONNECTION
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 md:p-10 overflow-auto scroll-smooth">
                            <div className="max-w-4xl mx-auto">
                                <motion.div
                                    className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-white/[0.1] bg-black/40 backdrop-blur-xl shadow-2xl"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1, type: "spring" }}
                                >
                                    {/* Glowing accent border top */}
                                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${selectedProject.color}, transparent)` }} />

                                    {/* Background Glow */}
                                    <div
                                        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[128px] opacity-20 pointer-events-none"
                                        style={{ background: selectedProject.color }}
                                    />

                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 relative z-10">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center border"
                                                    style={{ borderColor: `${selectedProject.color}40`, background: `${selectedProject.color}15`, color: selectedProject.color }}
                                                >
                                                    <selectedProject.icon size={24} />
                                                </div>
                                                <div className="px-3 py-1 rounded-full text-xs font-mono border" style={{ borderColor: `${selectedProject.color}30`, color: selectedProject.color }}>
                                                    {selectedProject.id.toUpperCase()}_v1.0
                                                </div>
                                            </div>
                                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                                                {selectedProject.title}
                                            </h1>
                                            <p className="text-white/50 text-sm italic">Developed by Muhammad Tayyab</p>
                                        </div>

                                        <a
                                            href={selectedProject.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-all hover:scale-105 active:scale-95"
                                        >
                                            <ExternalLink size={18} className="text-white/70 group-hover:text-white" />
                                            Access Repository
                                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 20px ${selectedProject.color}40` }} />
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                                        {/* Description */}
                                        <div className="md:col-span-2 space-y-6">
                                            <div>
                                                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                    <span className="w-1.5 h-6 rounded-full" style={{ background: selectedProject.color }} />
                                                    System Overview
                                                </h2>
                                                <p className="text-white/70 leading-relaxed text-lg">
                                                    {selectedProject.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="space-y-6">
                                            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                                                <h2 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider flex items-center gap-2">
                                                    <Tag size={14} className="text-white/50" />
                                                    Architecture stack
                                                </h2>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedProject.tech.map((t) => (
                                                        <span
                                                            key={t}
                                                            className="px-4 py-2 text-xs font-medium rounded-lg border backdrop-blur-md"
                                                            style={{
                                                                borderColor: `${selectedProject.color}30`,
                                                                background: `${selectedProject.color}10`,
                                                                color: selectedProject.color,
                                                            }}
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* ── Grid View ── */
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 p-6 md:p-8 overflow-auto relative z-10"
                    >
                        {/* Address bar */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.08] text-sm text-white/50 shadow-lg">
                                <Terminal size={16} className="text-[var(--win-accent-light)]" />
                                <span className="font-mono">~/projects/portfolio <span className="text-white/30 ml-2">--view=grid</span></span>
                            </div>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {projects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants as any}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    {/* Card background/border setup */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.1] backdrop-blur-sm transition-all duration-300 group-hover:border-white/[0.2] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]" />

                                    {/* Hover glow effect */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                                        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}, transparent 60%)` }}
                                    />

                                    <div className="relative p-6 h-full flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-110"
                                                style={{ borderColor: `${project.color}40`, background: `${project.color}15` }}
                                            >
                                                <project.icon size={24} style={{ color: project.color }} />
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                                <ExternalLink size={18} className="text-white/40" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white/90 group-hover:text-white mb-2 transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-sm text-white/50 line-clamp-2 mb-6 flex-1 group-hover:text-white/70 transition-colors">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tech.slice(0, 3).map(t => (
                                                <span
                                                    key={t}
                                                    className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded-md border border-white/10 text-white/60 group-hover:border-white/20"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                            {project.tech.length > 3 && (
                                                <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded-md border border-white/10 text-white/40 flex items-center">
                                                    +{project.tech.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
