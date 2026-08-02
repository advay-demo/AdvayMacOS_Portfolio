import React from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import WindowControls from "@components/WindowControls.jsx";
import useWindowStore from "@store/window.js";

const Resume = () => {
  const { windows } = useWindowStore();

  if (!windows.resume.isOpen) return null;

  return (
    <div className="flex flex-col w-full h-full">
      <div id="window-header" className="bg-gray-100 flex items-center px-4 py-2 border-b border-gray-300">
        <WindowControls target="resume" />
        <h2 className="text-sm font-bold text-center flex-1 pr-12">Resume</h2>
      </div>
      <div className="flex-1 w-full h-full bg-white overflow-hidden">
        <iframe 
            src="/resume.pdf" 
            title="Resume" 
            className="w-full h-full border-none block" 
        />
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
