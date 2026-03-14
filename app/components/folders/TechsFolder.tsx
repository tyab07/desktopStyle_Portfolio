"use client";

import { motion } from "framer-motion";

const techCategories = [
    {
        title: "Frontend",
        color: "#60cdff",
        techs: [
            { name: "React", emoji: "⚛️" },
            { name: "Next.js", emoji: "▲" },
            { name: "TypeScript", emoji: "🔷" },
            { name: "Tailwind CSS", emoji: "💨" },
            { name: "HTML5", emoji: "🌐" },
            { name: "CSS3", emoji: "🎨" },
            { name: "Framer Motion", emoji: "🎬" },
        ],
    },
    {
        title: "Backend",
        color: "#34d399",
        techs: [
            { name: "Node.js", emoji: "🟢" },
            { name: "Express.js", emoji: "🚀" },
            { name: "Python", emoji: "🐍" },
            { name: "REST APIs", emoji: "🔗" },
            { name: "MongoDB", emoji: "🍃" },
            { name: "PostgreSQL", emoji: "🐘" },
            { name: "Redis", emoji: "🔴" },
        ],
    },
    {
        title: "AI & Data",
        color: "#a78bfa",
        techs: [
            { name: "LLMs", emoji: "🤖" },
            { name: "RAG Pipelines", emoji: "📚" },
            { name: "OpenCV", emoji: "👁️" },
            { name: "LangChain", emoji: "🔗" },
            { name: "PyTorch", emoji: "🔥" },
        ],
    },
    {
        title: "Tools",
        color: "#fbbf24",
        techs: [
            { name: "Git", emoji: "📦" },
            { name: "Docker", emoji: "🐳" },
            { name: "Linux", emoji: "🐧" },
            { name: "VS Code", emoji: "💙" },
            { name: "GitHub", emoji: "🐙" },
        ],
    },
];

export default function TechsFolder() {
    return (
        <div className="p-6 space-y-8">
            {techCategories.map((category, catIdx) => (
                <div key={category.title}>
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: category.color }} />
                        <span style={{ color: category.color }}>{category.title}</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {category.techs.map((tech, idx) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: catIdx * 0.1 + idx * 0.03 }}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-default group"
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform">{tech.emoji}</span>
                                <span className="text-[11px] text-white/60 group-hover:text-white/80 font-medium text-center transition-colors">{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
