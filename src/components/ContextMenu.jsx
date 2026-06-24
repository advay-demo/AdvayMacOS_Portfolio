import React, { useEffect } from "react";
import useSystemStore from "@store/system.js";
import useWindowStore from "@store/window.js";
import { Settings, Info, User } from "lucide-react";

const ContextMenu = () => {
    const { contextMenu, openContextMenu, closeContextMenu, wallpaper, setWallpaper } = useSystemStore();
    const { openWindow } = useWindowStore();

    const wallpapers = ["wallpaper.png", "wallpaper-dark.png", "wallpaper-bigsur.png"];

    useEffect(() => {
        const handleContextMenu = (e) => {
            // Only trigger if clicking the desktop background itself or empty space
            // Easiest heuristic: if target has id="home" or is the main container
            if (e.target.tagName.toLowerCase() === "main" || e.target.id === "home") {
                e.preventDefault();
                openContextMenu(e.clientX, e.clientY);
            } else {
                closeContextMenu();
            }
        };

        const handleClick = () => {
            closeContextMenu();
        };

        window.addEventListener("contextmenu", handleContextMenu);
        window.addEventListener("click", handleClick);
        
        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("click", handleClick);
        };
    }, [openContextMenu, closeContextMenu]);

    if (!contextMenu.isOpen) return null;

    const handleNextWallpaper = () => {
        const currentIndex = wallpapers.indexOf(wallpaper);
        const nextIndex = (currentIndex + 1) % wallpapers.length;
        setWallpaper(wallpapers[nextIndex]);
    };

    return (
        <div 
            className="fixed z-[9999] bg-white/70 backdrop-blur-3xl shadow-2xl border border-white/50 rounded-lg py-1.5 w-56 text-sm font-medium text-gray-800 select-none"
            style={{ top: contextMenu.y, left: contextMenu.x }}
        >
            <div 
                className="px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-2"
                onClick={handleNextWallpaper}
            >
                <Settings size={14} /> Next Wallpaper
            </div>
            <div className="h-[1px] bg-gray-300/50 my-1 mx-2" />
            <div 
                className="px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-2"
                onClick={() => openWindow("terminal")}
            >
                <Info size={14} /> System Info
            </div>
            <div 
                className="px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-2"
                onClick={() => openWindow("contact")}
            >
                <User size={14} /> About Advay
            </div>
        </div>
    );
};

export default ContextMenu;
