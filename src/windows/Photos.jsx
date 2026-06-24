import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import WindowControls from "@components/WindowControls.jsx";
import { gallery, photosLinks } from "@constants/index.js";

const Photos = () => {
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isReady, setIsReady] = useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-300/50" style={{ width: '800px', height: '550px', maxWidth: '100vw' }}>
            <div id="window-header" className="bg-[#f6f6f6] border-b border-gray-200">
                <WindowControls target={"photos"} />
                <h2>Photos</h2>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-[#f5f5f7] border-r border-gray-200 flex flex-col p-3 overflow-y-auto hidden md:flex">
                    <h3 className="text-[11px] font-bold text-gray-400 mb-2 px-2 uppercase tracking-wider">Library</h3>
                    <ul className="space-y-1">
                        {photosLinks.map((link) => (
                            <li key={link.id}>
                                <button 
                                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedCategory === link.id ? 'bg-[#007aff] text-white' : 'hover:bg-gray-200 text-gray-700'}`}
                                    onClick={() => setSelectedCategory(link.id)}
                                >
                                    <img 
                                        src={link.icon} 
                                        alt={link.title} 
                                        className={`w-4 h-4 ${selectedCategory === link.id ? 'brightness-0 invert' : 'opacity-70'}`} 
                                    />
                                    <span>{link.title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 bg-white overflow-y-auto p-4 relative">
                    {selectedImage ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-4">
                            <div className="w-full flex justify-start mb-4">
                                <button 
                                    className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium transition flex items-center gap-1"
                                    onClick={() => setSelectedImage(null)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    Back
                                </button>
                            </div>
                            <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                                <img src={selectedImage} alt="Expanded" className="max-w-full max-h-full object-contain rounded-sm shadow-sm" />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1">
                            {isReady ? gallery.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-80 transition"
                                    onClick={() => setSelectedImage(item.img)}
                                >
                                    <img 
                                        src={item.img} 
                                        alt={`Gallery ${item.id}`} 
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            )) : (
                                <div className="col-span-full flex justify-center items-center h-full mt-20">
                                    <p className="text-gray-400 text-sm animate-pulse">Loading library...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;
