import React, { useState, useEffect, useRef } from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import { techStack } from "@constants/index.js";
import { Check, Flag, Terminal as TerminalIcon } from "lucide-react";
import WindowControls from "@components/WindowControls.jsx";

const Terminal = () => {
    const [step, setStep] = useState(0);
    const [githubData, setGithubData] = useState([]);
    const [loadingGithub, setLoadingGithub] = useState(false);
    const scrollRef = useRef(null);

    // Simulate terminal boot sequence and commands
    useEffect(() => {
        if (step === 0) {
            const t1 = setTimeout(() => setStep(1), 800); // Type command 1
            return () => clearTimeout(t1);
        }
        if (step === 1) {
            const t2 = setTimeout(() => setStep(2), 500); // Show tech stack
            return () => clearTimeout(t2);
        }
        if (step === 2) {
            const t3 = setTimeout(() => setStep(3), 1500); // Type command 2
            return () => clearTimeout(t3);
        }
        if (step === 3) {
            // Fetch github data
            setLoadingGithub(true);
            fetch('https://api.github.com/users/advay-demo/events/public')
                .then(res => res.json())
                .then(data => {
                    const pushEvents = data.filter(e => e.type === 'PushEvent').slice(0, 5);
                    setGithubData(pushEvents);
                    setLoadingGithub(false);
                    setStep(4);
                })
                .catch(() => {
                    setGithubData([]);
                    setLoadingGithub(false);
                    setStep(4);
                });
        }
    }, [step]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [step, githubData]);

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm">
            <div id="window-header" className="bg-[#323233] flex items-center px-4 py-2 border-b border-[#1e1e1e] shrink-0">
                <WindowControls target={"terminal"} />
                <h2 className="text-xs font-bold text-center flex-1 pr-12 text-[#cccccc] flex justify-center items-center gap-2">
                    <TerminalIcon size={14} /> advay@macbook-pro:~
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {/* Initial Boot */}
                <div>
                    <p className="text-green-400">Last login: {new Date().toDateString()} on ttys001</p>
                </div>

                {/* Command 1: Tech Stack */}
                {step >= 0 && (
                    <div className="space-y-2">
                        <p className="flex items-center">
                            <span className="text-blue-400 font-bold mr-2">advay@macbook-pro ~ %</span>
                            <span className="typing-animation overflow-hidden whitespace-nowrap border-r-4 border-gray-400 pr-1 animate-[typing_1s_steps(20,end),blink_1s_step-end_infinite] max-w-fit">
                                {step >= 1 ? "show tech-stack" : "show tech-stack".slice(0, 5)}
                            </span>
                        </p>
                        
                        {step >= 2 && (
                            <div className="pl-2 border-l-2 border-gray-600 ml-2 animate-in fade-in duration-500">
                                {techStack.map((entry, index) => (
                                    <div key={index} className="mb-2">
                                        <span className="text-purple-400 font-bold">{entry.category}: </span>
                                        <span className="text-yellow-300">{entry.items.join(", ")}</span>
                                    </div>
                                ))}
                                <p className="text-gray-500 mt-2">✓ 5 of 5 stacks loaded successfully</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Command 2: Github Activity */}
                {step >= 2 && (
                    <div className="space-y-2">
                        <p className="flex items-center">
                            <span className="text-blue-400 font-bold mr-2">advay@macbook-pro ~ %</span>
                            {step >= 3 && (
                                <span className={`overflow-hidden whitespace-nowrap border-r-4 border-gray-400 pr-1 ${step === 3 ? 'animate-[blink_1s_step-end_infinite]' : 'border-transparent'}`}>
                                    git log --activity
                                </span>
                            )}
                        </p>

                        {step >= 3 && loadingGithub && (
                            <p className="text-gray-400 pl-4 animate-pulse">Fetching recent commits from GitHub...</p>
                        )}

                        {step >= 4 && (
                            <div className="pl-2 border-l-2 border-gray-600 ml-2 space-y-3 animate-in fade-in duration-500">
                                {githubData.length > 0 ? (
                                    githubData.map((event, i) => (
                                        <div key={i} className="text-sm">
                                            <p className="text-yellow-400">commit {event.payload.commits[0]?.sha.substring(0,7)}</p>
                                            <p>Author: <span className="text-blue-300">advay-demo</span></p>
                                            <p>Date:   <span className="text-gray-400">{new Date(event.created_at).toLocaleString()}</span></p>
                                            <p className="pl-4 mt-1 text-green-300">{event.payload.commits[0]?.message}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-red-400">No recent push activity found or API rate limited.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Final Prompt */}
                {step >= 4 && (
                    <p className="flex items-center animate-in fade-in">
                        <span className="text-blue-400 font-bold mr-2">advay@macbook-pro ~ %</span>
                        <span className="w-2 h-4 bg-gray-400 animate-[blink_1s_step-end_infinite]"></span>
                    </p>
                )}
            </div>
        </div>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;
