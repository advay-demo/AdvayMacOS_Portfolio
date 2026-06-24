import React, { useState, useEffect } from "react";
import useSystemStore from "@store/system.js";

const BootScreen = () => {
    const { isBooted, isLoggedIn, setBooted, setLoggedIn } = useSystemStore();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isBooted) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setBooted(true), 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isBooted, setBooted]);

    if (isLoggedIn) return null;

    return (
        <div className="absolute inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none">
            {!isBooted ? (
                // Booting Sequence
                <div className="flex flex-col items-center gap-10">
                    <svg className="w-24 h-24 text-white" viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                    <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white transition-all duration-100 ease-out" 
                            style={{ width: `${progress}%` }} 
                        />
                    </div>
                </div>
            ) : (
                // Login Screen
                <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
                    <img 
                        src="/images/adrian.jpg" 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover border-2 border-gray-600 shadow-2xl"
                    />
                    <h1 className="text-white text-2xl font-bold">Advay</h1>
                    <button 
                        onClick={() => setLoggedIn(true)}
                        className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all font-medium"
                    >
                        Enter as Guest
                    </button>
                    <p className="text-gray-500 text-sm mt-10">Click to login</p>
                </div>
            )}
        </div>
    );
};

export default BootScreen;
