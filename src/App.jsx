import React, { useEffect } from "react";
import Navbar from "./components/navbar.jsx";
import Welcome from "./components/welcome.jsx";
import Dock from "./components/dock.jsx";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";
import useSystemStore from "@store/system.js";
import BootScreen from "./components/BootScreen.jsx";
import Spotlight from "./components/Spotlight.jsx";
import ContextMenu from "./components/ContextMenu.jsx";
import DesktopIcons from "./components/DesktopIcons.jsx";
gsap.registerPlugin(Draggable);
import { Terminal } from "@windows";
import { Contact } from "@windows";
import { Articles } from "@windows";
import { Article1, Article2, Article3 } from "@windows";
import { Photos, Resume, Finder, Archive } from "@windows";

import useWindowStore from "@store/window.js";

const App = () => {
    const { wallpaper, isMissionControl, toggleMissionControl, spotlightOpen } = useSystemStore();
    const { closeFocusedWindow } = useWindowStore();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "m") {
                e.preventDefault();
                toggleMissionControl();
            }
            if (e.key === "Escape") {
                // If Spotlight is open, the Spotlight component handles its own close
                if (!useSystemStore.getState().spotlightOpen) {
                    closeFocusedWindow();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleMissionControl, closeFocusedWindow]);

    return (
        <main
            className={isMissionControl ? "mission-control-active" : ""}
            style={{
                backgroundImage: `url('/images/${wallpaper}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <BootScreen />
            <Spotlight />
            <ContextMenu />

            <Navbar/>
            <DesktopIcons />
            <Welcome/>
            <Dock/>

            <Finder />
            <Archive />
            <Articles/>
            <Article1 />
            <Article2 />
            <Article3 />
            
            <Contact />
            <Terminal/>
            <Photos />
            <Resume />
        </main>
    );
};
export default App;