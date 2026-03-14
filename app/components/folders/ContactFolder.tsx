"use client";

import { Mail, Github, Linkedin, Globe, ExternalLink } from "lucide-react";

const contacts = [
    {
        label: "Email",
        value: "tyab.mujahid@gmail.com",
        icon: Mail,
        color: "#60cdff",
        href: "mailto:tyab.mujahid@gmail.com",
        fileType: "Email Shortcut",
    },
    {
        label: "GitHub",
        value: "github.com/tyab07",
        icon: Github,
        color: "#f0f0f0",
        href: "https://github.com/tyab07",
        fileType: "Internet Shortcut",
    },
    {
        label: "LinkedIn",
        value: "Muhammad Tayyab",
        icon: Linkedin,
        color: "#0a66c2",
        href: "https://www.linkedin.com/in/muhammad-tayyab-76b9923b1/",
        fileType: "Internet Shortcut",
    },
];

export default function ContactFolder() {
    return (
        <div className="p-6 space-y-6">
            {/* Address bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg border border-white/[0.06] text-xs text-white/40">
                <Globe size={12} /> C:\Users\Tayyab\Contact
            </div>

            {/* Contact Items */}
            <div className="space-y-2">
                {contacts.map((contact) => (
                    <a
                        key={contact.label}
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-item group hover:!bg-white/[0.06]"
                    >
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: `${contact.color}15`, border: `1px solid ${contact.color}25` }}
                        >
                            <contact.icon size={18} style={{ color: contact.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white/80 group-hover:text-white">
                                {contact.label}.lnk
                            </p>
                            <p className="text-xs text-white/40">{contact.value}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-[10px] text-white/25">{contact.fileType}</span>
                            <ExternalLink size={12} className="text-white/20 group-hover:text-white/50 transition-colors" />
                        </div>
                    </a>
                ))}
            </div>

            {/* Info Box */}
            <div className="mt-8 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                <p className="text-sm text-white/50 leading-relaxed">
                    💬 Feel free to reach out! I am currently looking for opportunities in full-stack development and computer vision. Whether you have a project in mind or just want to connect — I'd love to hear from you.
                </p>
            </div>
        </div>
    );
}
