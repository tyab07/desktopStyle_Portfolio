"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "./components/LockScreen";
import Desktop from "./components/Desktop";
import Taskbar from "./components/Taskbar";
import Window from "./components/Window";
import { useWindowManager } from "./hooks/useWindowManager";
import AboutFolder from "./components/folders/AboutFolder";
import ProjectsFolder from "./components/folders/ProjectsFolder";
import TechsFolder from "./components/folders/TechsFolder";
import ContactFolder from "./components/folders/ContactFolder";

const FOLDER_CONFIG: Record<string, { title: string; icon: string; width: number; height: number; isMaximized?: boolean }> = {
  about: { title: "About Me", icon: "👤", width: 800, height: 600, isMaximized: true },
  projects: { title: "Projects", icon: "💼", width: 680, height: 560 },
  techs: { title: "Techs", icon: "⚡", width: 620, height: 540 },
  contact: { title: "Contact", icon: "✉️", width: 560, height: 480 },
};

const FOLDER_COMPONENTS: Record<string, () => React.JSX.Element> = {
  about: () => <AboutFolder />,
  projects: () => <ProjectsFolder />,
  techs: () => <TechsFolder />,
  contact: () => <ContactFolder />,
};

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition } = useWindowManager();

  const handleUnlock = useCallback(() => {
    setIsLocked(false);
  }, []);

  const handleOpenFolder = useCallback(
    (folderId: string) => {
      const config = FOLDER_CONFIG[folderId];
      if (!config) return;

      // Stagger window positions so they don't stack exactly
      const existingCount = windows.length;
      const offset = existingCount * 30;

      openWindow({
        id: folderId,
        title: config.title,
        icon: config.icon,
        component: folderId,
        x: 120 + offset,
        y: 60 + offset,
        width: config.width,
        height: config.height,
        isMaximized: config.isMaximized,
      });
    },
    [openWindow, windows.length]
  );

  const handleShutdown = useCallback(() => {
    setIsShuttingDown(true);
    setTimeout(() => {
      setIsShuttingDown(false);
      setIsLocked(true);
    }, 2500);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden bg-[var(--win-bg)]">
      {/* Lock Screen */}
      <AnimatePresence>
        {isLocked && !isShuttingDown && (
          <motion.div
            key="lock"
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          >
            <LockScreen onUnlock={handleUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop + Taskbar */}
      {!isLocked && !isShuttingDown && (
        <>
          <Desktop onOpenFolder={handleOpenFolder} />

          {/* Windows */}
          {windows.map((win) => {
            const ContentComponent = FOLDER_COMPONENTS[win.component];
            if (!ContentComponent) return null;

            return (
              <Window
                key={win.id}
                window={win}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onMaximize={() => maximizeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
                onUpdatePosition={(x, y) => updatePosition(win.id, x, y)}
              >
                <ContentComponent />
              </Window>
            );
          })}

          <Taskbar
            windows={windows}
            onFocusWindow={focusWindow}
            onShutdown={handleShutdown}
          />
        </>
      )}

      {/* Shutdown Animation */}
      <AnimatePresence>
        {isShuttingDown && (
          <motion.div
            key="shutdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="shutdown-screen"
          >
            <div className="shutdown-spinner" />
            <p className="text-sm text-white/60 font-medium tracking-wider">Shutting down...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
