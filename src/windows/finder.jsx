import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import WindowControls from "@components/WindowControls.jsx";
import useWindowStore from "@store/window.js";
import { ExternalLink, Github, ChevronLeft } from "lucide-react";

const projects = [
  {
    id: "kirana-iq",
    title: "Kirana IQ",
    desc: "A smart platform for Kirana stores providing analytics and management tools.",
    github: "https://github.com/advay-demo/kirana-iq",
    live: "https://thekiranaiq.vercel.app/",
    tags: ["React", "Analytics", "Full-Stack"],
    caseStudy: {
        problem: "Local Kirana (grocery) stores in India lack modern digital tools for inventory, sales analytics, and customer relationship management, relying heavily on pen and paper.",
        architecture: "A full-stack web application built with React on the frontend and Node.js/Express on the backend. Data is persisted in a MongoDB database, utilizing RESTful APIs for communication.",
        decisions: "Chose a MERN stack for rapid development and real-time updates. Implemented JWT-based authentication for secure access. Focused heavily on a mobile-first responsive design since most shopkeepers use smartphones as their primary device.",
        outcome: "Successfully deployed a working prototype that allows store owners to track daily sales, manage inventory alerts, and view graphical analytics of their performance."
    }
  },
  {
    id: "crowdpulse",
    title: "CrowdPulse",
    desc: "Concert crowd density predictor and management system.",
    github: "https://github.com/advay-demo/crowdpulse",
    tags: ["Machine Learning", "Python", "Data Viz"],
    caseStudy: {
        problem: "Event organizers struggle to predict crowd density and movement during large concerts, leading to potential safety hazards and poor resource allocation (security, concessions).",
        architecture: "Python-based backend leveraging machine learning models (Random Forest) trained on historical event data, weather patterns, and ticket sales. Frontend visualization using React and D3.js.",
        decisions: "Used Python for its robust data science ecosystem (Pandas, Scikit-learn). Opted for a time-series forecasting approach. Built a lightweight API using FastAPI to serve predictions to the frontend dashboard.",
        outcome: "Created a predictive model with 85% accuracy on historical validation sets. The resulting dashboard provides actionable heatmaps for event staff to preemptively deploy resources."
    }
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
    desc: "Group Project: AI Vision for the blind. An Android application using object detection and real-time camera analysis.",
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
  const [activeProjectId, setActiveProjectId] = useState(null);

  if (!windows.finder.isOpen) return null;

  const activeProject = activeProjectId ? projects.find(p => p.id === activeProjectId) : null;

  return (
    <>
      <div id="window-header" className="bg-gray-100 flex items-center px-4 py-2 border-b border-gray-300 shrink-0">
        <WindowControls target="finder" />
        <h2 className="text-sm font-bold text-center flex-1 pr-12">Projects {activeProject ? `- ${activeProject.title}` : ''}</h2>
      </div>

      <div className="bg-white flex-1 overflow-y-auto p-6 h-[calc(100%-2.5rem)]">
        
        {activeProject && activeProject.caseStudy ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <button 
                    onClick={() => setActiveProjectId(null)}
                    className="flex items-center text-sm text-gray-500 hover:text-black mb-6 transition-colors"
                >
                    <ChevronLeft size={16} className="mr-1" /> Back to Projects
                </button>
                
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{activeProject.title}</h1>
                    <div className="flex gap-3">
                        {activeProject.github && (
                            <a href={activeProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors">
                                <Github size={16} /> Source
                            </a>
                        )}
                        {activeProject.live && (
                            <a href={activeProject.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors">
                                <ExternalLink size={16} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>

                <div className="prose prose-sm max-w-none">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold border-b pb-2 mb-3">The Problem</h3>
                        <p className="text-gray-700 leading-relaxed">{activeProject.caseStudy.problem}</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-lg font-bold border-b pb-2 mb-3">Architecture</h3>
                        <p className="text-gray-700 leading-relaxed">{activeProject.caseStudy.architecture}</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-lg font-bold border-b pb-2 mb-3">Tech Decisions & Tradeoffs</h3>
                        <p className="text-gray-700 leading-relaxed">{activeProject.caseStudy.decisions}</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-lg font-bold border-b pb-2 mb-3">Outcome</h3>
                        <p className="text-gray-700 leading-relaxed">{activeProject.caseStudy.outcome}</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-end mb-6 border-b pb-2">
                    <div>
                        <p className="font-mono text-sm text-gray-500 mb-1">
                        <span className="font-bold text-black">@advay % </span>
                        ls -la ~/projects
                        </p>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                        <p>Development Hub</p>
                        <p>v2.5</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div 
                    key={project.id} 
                    className="group border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all hover:border-blue-300 bg-gray-50/50 flex flex-col cursor-pointer"
                    onClick={() => project.caseStudy ? setActiveProjectId(project.id) : null}
                    >
                    <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center justify-between">
                        {project.title}
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
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
                    
                    <div className="flex flex-wrap gap-2 mt-auto items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-gray-200 text-gray-700 rounded-md">
                            {tag}
                        </span>
                        ))}
                        </div>
                        {project.caseStudy && (
                            <span className="text-xs font-semibold text-blue-500 group-hover:underline">View Case Study &rarr;</span>
                        )}
                    </div>
                    </div>
                ))}
                </div>
            </div>
        )}
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
