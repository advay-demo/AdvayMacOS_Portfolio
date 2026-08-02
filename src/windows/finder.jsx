import React from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import WindowControls from "@components/WindowControls.jsx";
import useWindowStore from "@store/window.js";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: "kirana-iq",
    title: "Kirana IQ",
    desc: "A smart platform for Kirana stores providing analytics and management tools.",
    github: "https://github.com/advay-demo/kirana-iq",
    live: "https://thekiranaiq.vercel.app/",
    tags: ["React", "Analytics"],
  },
  {
    id: "world-cup-oracle",
    title: "World Cup Oracle",
    desc: "Currently in development. An oracle and prediction platform for World Cup matches.",
    github: "https://github.com/advay-demo/world-cup-oracle",
    tags: ["WIP", "Data Science"],
  },
  {
    id: "drishti",
    title: "DRISHTI",
    desc: "Group Project: AI Vision for the blind. An Android application using object detection and real-time camera analysis for navigation assistance.",
    github: "https://github.com/Sumit-5002/DRISHTI",
    tags: ["Android", "AI", "Group Project"],
  },
  {
    id: "anyfileforge",
    title: "AnyFileForge",
    desc: "Group Project: A privacy-first web application that handles complex file operations entirely in the browser using WebAssembly.",
    github: "https://github.com/Sumit-5002/Anyfileforge",
    tags: ["WebAssembly", "Privacy", "Group Project"],
  },
];

const Finder = () => {
  const { windows } = useWindowStore();

  if (!windows.finder.isOpen) return null;

  return (
    <>
      <div id="window-header" className="bg-gray-100 flex items-center px-4 py-2 border-b border-gray-300">
        <WindowControls target="finder" />
        <h2 className="text-sm font-bold text-center flex-1 pr-12">Projects</h2>
      </div>

      <div className="bg-white flex-1 overflow-y-auto p-6 h-[calc(100%-2.5rem)]">
        <div className="flex justify-between items-end mb-6 border-b pb-2">
            <div>
                <p className="font-mono text-sm text-gray-500 mb-1">
                <span className="font-bold text-black">@advay % </span>
                ls -la ~/projects
                </p>
            </div>
            <div className="text-right text-xs text-gray-400">
                <p>Development Hub</p>
                <p>v2.4</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all hover:border-blue-300 bg-gray-50/50 flex flex-col"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center justify-between">
                {project.title}
                <div className="flex gap-2">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black transition-colors" title="GitHub">
                            <Github size={18} />
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors" title="Live Site">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
              </h3>
              <p className="text-sm text-gray-600 flex-1 mb-4">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-gray-200 text-gray-700 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
