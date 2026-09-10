import React, { useRef, useEffect } from "react";
import useWindowStore from "@store/window.js";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const desktopApps = [
    { id: "finder", name: "Projects", icon: "/images/finder.png", x: 20, y: 60 },
    { id: "resume", name: "Resume", icon: "/images/notes.png", x: 20, y: 160 },
    { id: "photos", name: "Photos", icon: "/images/photos.svg", x: 20, y: 260 },
];

const DesktopIcons = () => {
    const { openWindow } = useWindowStore();
    const iconsRef = useRef([]);

    useEffect(() => {
        iconsRef.current.forEach((el) => {
            if (el) {
                Draggable.create(el, {
                    bounds: { top: 40, left: 0, width: window.innerWidth, height: window.innerHeight - 40 },
                    type: "x,y",
                });
            }
        });
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none" id="desktop-icons-container">
            {desktopApps.map((app, i) => (
                <div
                    key={app.id}
                    ref={(el) => (iconsRef.current[i] = el)}
                    className="absolute flex flex-col items-center justify-center w-24 p-2 rounded-md hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer pointer-events-auto transition-all"
                    style={{ left: app.x, top: app.y }}
                    onDoubleClick={() => openWindow(app.id)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            openWindow(app.id);
                        }
                    }}
                >
                    <img src={app.icon} alt={app.name} className="w-14 h-14 object-contain drop-shadow-md" />
                    <span className="text-white text-sm font-medium mt-1 drop-shadow-md bg-black/20 px-1.5 rounded">{app.name}</span>
                </div>
            ))}
        </div>
    );
};

export default DesktopIcons;
