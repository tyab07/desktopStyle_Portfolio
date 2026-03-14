"use client";

import { motion } from "framer-motion";
import { Code2, GraduationCap, MapPin, Sparkles, Heart, Zap, Terminal } from "lucide-react";

const bentoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function AboutFolder() {
    return (
        <div className="h-full w-full bg-[var(--win-bg)] overflow-auto p-4 md:p-8 lg:p-12 relative scroll-smooth">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 auto-rows-[160px] gap-6"
                >
                    {/* Hero Profile Card */}
                    <motion.div variants={bentoVariants} className="md:col-span-4 lg:col-span-8 row-span-2 rounded-3xl p-8 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md relative overflow-hidden group hover:bg-white/[0.05] transition-all">
                        <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl group-hover:opacity-20 transition-opacity">
                            <Sparkles size={200} className="text-blue-400" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4 tracking-tight">
                                    Muhammad Tayyab
                                </h1>
                                <p className="text-xl md:text-2xl text-blue-400 font-medium mb-6">
                                    Full Stack Developer & AI Enthusiast
                                </p>
                                <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
                                    I build scalable web applications and intelligent systems, blending modern frontend frameworks with robust backend architectures. Focused on beautiful UI/UX and high-performance infrastructure.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <span className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 text-sm font-medium">
                                    <MapPin size={16} /> Pakistan
                                </span>
                                <span className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 text-sm font-medium">
                                    <GraduationCap size={16} /> CS Student
                                </span>
                                <span className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-300 rounded-full border border-emerald-500/20 text-sm font-medium">
                                    <Terminal size={16} /> Linux User
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image/Avatar Card */}
                    <motion.div variants={bentoVariants} className="md:col-span-4 lg:col-span-4 row-span-2 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-white/[0.08] backdrop-blur-md overflow-hidden relative group flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 via-transparent to-transparent z-10 opacity-60" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,205,255,0.1)_0%,transparent_60%)]" />
                        <img src="/pic-nobg.png" alt="Muhammad Tayyab" className="w-[85%] h-[85%] object-contain object-bottom group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out relative z-10 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
                    </motion.div>

                    {/* Tech Focus */}
                    <motion.div variants={bentoVariants} className="md:col-span-2 lg:col-span-4 row-span-1 rounded-3xl p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-md flex flex-col justify-center hover:-translate-y-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3 mb-3">
                            <Code2 className="text-blue-400" size={24} />
                            <h3 className="text-xl font-semibold text-white">Full-Stack</h3>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            React, Next.js, Node.js, Express, and modern Database Design architecture.
                        </p>
                    </motion.div>

                    {/* AI Focus */}
                    <motion.div variants={bentoVariants} className="md:col-span-2 lg:col-span-4 row-span-1 rounded-3xl p-6 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-md flex flex-col justify-center hover:-translate-y-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="text-purple-400" size={24} />
                            <h3 className="text-xl font-semibold text-white">AI / Deep Learning</h3>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            RAG Pipelines, working with LLMs, Computer Vision, and applied Data Science.
                        </p>
                    </motion.div>

                    {/* Hobbies / Interests */}
                    <motion.div variants={bentoVariants} className="md:col-span-4 lg:col-span-4 row-span-1 rounded-3xl p-6 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex flex-col justify-center gap-4 hover:-translate-y-1 transition-transform cursor-default">
                        <div className="flex items-center gap-2 text-white/80">
                            <Heart className="text-pink-400" size={18} />
                            <span className="font-medium text-lg">Core Interests</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {["Open Source", "System Design", "Algorithms", "Game Dev"].map(i => (
                                <span key={i} className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.05] rounded-lg text-xs font-medium text-white/70">
                                    {i}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Second Row/Section of Bento */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                >
                    <motion.div variants={bentoVariants} className="rounded-3xl p-8 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                        <h4 className="text-emerald-400 font-bold mb-4 tracking-wider text-sm uppercase">Currently Focused On</h4>
                        <p className="text-white/70 leading-relaxed text-sm">
                            Building real-world production web applications with Next.js and TailwindCSS. Exploring the intersections of full-stack engineering and embedded AI models to create smarter web experiences.
                        </p>
                    </motion.div>
                    <motion.div variants={bentoVariants} className="rounded-3xl p-8 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                        <h4 className="text-blue-400 font-bold mb-4 tracking-wider text-sm uppercase">Development Philosophy</h4>
                        <p className="text-white/70 leading-relaxed text-sm">
                            Write clean, maintainable code. Focus on the user experience first. Keep performance in mind from day one, and always be willing to learn new paradigms and tools to solve complex problems.
                        </p>
                    </motion.div>
                    <motion.div variants={bentoVariants} className="rounded-3xl p-8 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                        <h4 className="text-purple-400 font-bold mb-4 tracking-wider text-sm uppercase">Future Goals</h4>
                        <p className="text-white/70 leading-relaxed text-sm">
                            Becoming a highly proficient professional full-stack engineer and contributing back to the open-source community. Diving deeper into distributed systems and large-scale application architecture.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
