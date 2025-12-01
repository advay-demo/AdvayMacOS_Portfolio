import React from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import { techStack } from "@constants/index.js";
import { Check, Flag } from "lucide-react";
import WindowControls from "@components/WindowControls.jsx";
const Terminal = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target={"terminal"}/>
                <h2>Tech Stack</h2>
            </div>

            {/* FIXED: missing '=' */}
            <div className="techstack">
                <p>
                    <span className="font-bold">@advay % </span>
                    show tech stack
                </p>

                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>

                <ul className="content">
                    {techStack.map((entry, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="check" size={20} />
                            <h3>{entry.category}</h3>

                            <ul className="flex flex-wrap gap-1 ml-4">
                                {entry.items.map((item, i) => (
                                    <li key={i}>
                                        {item}
                                        {i < entry.items.length - 1 ? "," : ""}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="footnote">
                    <p>
                        <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
                    </p>

                    <p className="text-black flex items-center gap-1">
                        <Flag size={15} fill="black" />
                        Render time: 6ms
                    </p>
                </div>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;
