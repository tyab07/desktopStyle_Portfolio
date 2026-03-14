"use client";

import { useState, useCallback } from "react";

export interface WindowState {
    id: string;
    title: string;
    icon: string;
    component: string;
    props?: Record<string, unknown>;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    isMinimized: boolean;
    isMaximized: boolean;
}

let nextZ = 10;

export function useWindowManager() {
    const [windows, setWindows] = useState<WindowState[]>([]);

    const openWindow = useCallback((config: Omit<WindowState, "zIndex" | "isMinimized" | "isMaximized"> & { isMaximized?: boolean }) => {
        setWindows((prev) => {
            const exists = prev.find((w) => w.id === config.id);
            if (exists) {
                // Focus existing window
                nextZ++;
                return prev.map((w) =>
                    w.id === config.id ? { ...w, zIndex: nextZ, isMinimized: false } : w
                );
            }
            nextZ++;
            return [...prev, { ...config, isMaximized: config.isMaximized || false, zIndex: nextZ, isMinimized: false }];
        });
    }, []);

    const closeWindow = useCallback((id: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
    }, []);

    const minimizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
    }, []);

    const maximizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
        );
    }, []);

    const focusWindow = useCallback((id: string) => {
        nextZ++;
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w))
        );
    }, []);

    const updatePosition = useCallback((id: string, x: number, y: number) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, x, y } : w))
        );
    }, []);

    return { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition };
}
