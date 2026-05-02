import React from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import WindowControls from "@components/WindowControls.jsx";
import useWindowStore from "@store/window.js";

const articles = [
  {
    id: "article-1",
    title: "Why I use GSAP + Vite over plain React",
    desc: "Performance, animation control, and dev experience.",
  },
  {
    id: "article-2",
    title: "How Open Source Made Me a Better Developer",
    desc: "Lessons from contributing to real-world projects.",
  },
  {
    id: "article-3",
    title: "Recreating Apple UI Animations on the Web",
    desc: "GSAP, physics, and UI details.",
  },
];

const Articles = () => {
  const { openWindow, windows } = useWindowStore();

  if (!windows.articles.isOpen) return null;

  return (
    <>
      {/* HEADER */}
      <div id="window-header">
        <WindowControls target={"articles"} />
        <h2>Articles</h2>
      </div>

      {/* SAME STRUCTURE AS CONTACT */}
      <div className="techstack">
        <div className="flex justify-between items-start">
          <div>
            <p>
              <span className="font-bold">@advay % </span>
              show articles
            </p>

            <div className="label">
              <p className="w-40">Title</p>
              <p>Description</p>
            </div>
          </div>

          {/* optional right side (like profile in contact) */}
          <div className="text-right text-sm opacity-60">
            <p>Knowledge Base</p>
            <p>v1.0</p>
          </div>
        </div>

        {/* CONTENT */}
        <ul className="content">
          {articles.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 cursor-pointer hover:bg-black/5 px-2 py-1 rounded transition"
              onClick={() => openWindow(item.id)}
            >
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
              <h3 className="text-[#00A154] font-semibold min-w-[260px]">
                {item.title}
              </h3>
              <div className="ml-2">
                <span>{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* FOOTNOTE */}
        <div className="footnote">
          <p>📄 {articles.length} articles available</p>

          <p className="text-black">
            Click to open →
          </p>
        </div>
      </div>
    </>
  );
};

const ArticlesWindow = WindowWrapper(Articles, "articles");
export default ArticlesWindow;