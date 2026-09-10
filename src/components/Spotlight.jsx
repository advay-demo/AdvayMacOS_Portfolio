import React, { useState, useEffect, useRef } from "react";
import useSystemStore from "@store/system.js";
import useWindowStore from "@store/window.js";
import { dockApps, navLinks } from "@constants/index.js";
import { Search } from "lucide-react";

const Spotlight = () => {
    const { spotlightOpen, setSpotlight } = useSystemStore();
    const { openWindow } = useWindowStore();
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    // Combine apps and some nav links for search
    const searchItems = [
        ...dockApps.map(a => ({ id: a.id, name: a.name, type: "App" })),
        ...navLinks.map(n => ({ id: n.id, name: n.name, type: "Link" }))
    ];

    const filtered = searchItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

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

    const handleInputKeyDown = (e) => {
        if (filtered.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % filtered.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            handleSelect(filtered[selectedIndex].id);
        }
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
                        onKeyDown={handleInputKeyDown}
                        placeholder="Spotlight Search"
                        className="w-full bg-transparent outline-none text-2xl font-light text-gray-800 placeholder:text-gray-400"
                    />
                </div>

                {query && (
                    <div className="max-h-[300px] overflow-y-auto p-2">
                        {filtered.length > 0 ? (
                            filtered.map((item, index) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleSelect(item.id)}
                                    className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer group transition-colors ${
                                        index === selectedIndex 
                                        ? "bg-blue-500 text-white" 
                                        : "hover:bg-blue-50 hover:text-gray-900"
                                    }`}
                                >
                                    <span className="font-medium">{item.name}</span>
                                    <span className={`text-xs ${index === selectedIndex ? "text-blue-100" : "text-gray-400"}`}>
                                        {item.type}
                                    </span>
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
