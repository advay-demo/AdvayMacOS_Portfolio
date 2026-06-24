import React, { useState, useEffect, useRef } from "react";
import useSystemStore from "@store/system.js";
import useWindowStore from "@store/window.js";
import { dockApps, navLinks } from "@constants/index.js";
import { Search } from "lucide-react";

const Spotlight = () => {
    const { spotlightOpen, setSpotlight } = useSystemStore();
    const { openWindow } = useWindowStore();
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    // Combine apps and some nav links for search
    const searchItems = [
        ...dockApps.map(a => ({ id: a.id, name: a.name, type: "App" })),
        ...navLinks.map(n => ({ id: n.id, name: n.name, type: "Link" }))
    ];

    const filtered = searchItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    // Global keyboard shortcut (Cmd+K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setSpotlight(!spotlightOpen);
            }
            if (e.key === "Escape" && spotlightOpen) {
                setSpotlight(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [spotlightOpen, setSpotlight]);

    // Focus input when opened
    useEffect(() => {
        if (spotlightOpen && inputRef.current) {
            inputRef.current.focus();
            setQuery("");
        }
    }, [spotlightOpen]);

    if (!spotlightOpen) return null;

    const handleSelect = (id) => {
        openWindow(id);
        setSpotlight(false);
    };

    return (
        <div className="fixed inset-0 z-[9998] flex items-start justify-center pt-[20vh]">
            <div className="absolute inset-0 bg-transparent" onClick={() => setSpotlight(false)} />
            
            <div className="relative z-10 w-[600px] bg-white/70 backdrop-blur-3xl shadow-2xl rounded-2xl overflow-hidden border border-white/20">
                <div className="flex items-center px-4 py-3 border-b border-gray-200/50">
                    <Search className="w-6 h-6 text-gray-500 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Spotlight Search"
                        className="w-full bg-transparent outline-none text-2xl font-light text-gray-800 placeholder:text-gray-400"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && filtered.length > 0) {
                                handleSelect(filtered[0].id);
                            }
                        }}
                    />
                </div>

                {query && (
                    <div className="max-h-[300px] overflow-y-auto p-2">
                        {filtered.length > 0 ? (
                            filtered.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleSelect(item.id)}
                                    className="flex items-center justify-between px-4 py-2 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer group"
                                >
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-xs text-gray-400 group-hover:text-blue-200">{item.type}</span>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                No results found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Spotlight;
