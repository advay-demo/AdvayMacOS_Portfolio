import React from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import WindowControls from "@components/WindowControls.jsx";
import useWindowStore from "@store/window.js";

const ARTICLES_CONTENT = {
  "article-1": {
    title: "Why I use GSAP + Vite over plain React",
    content: `
Why I Use GSAP + Vite Over Plain React

When I first started with React, I was honestly pretty clueless. I had just begun programming, and everything felt overwhelming — components, hooks, state, props… it was a lot to process all at once.

Like most beginners, I kind of ChatGPT’d my way through it and followed tutorials without fully understanding what was happening under the hood.

At some point, I started exploring alternatives and watching frontend videos, and that’s when I came across Vite.

And the first time I used it… it just clicked.

First Impression Matters

When I ran Vite for the first time and saw the default page load instantly, I genuinely thought:

“Wait… did I just build something already?”

That moment hooked me.

It wasn’t just about speed — it was the feeling of instant feedback. No long loading times, no confusing setup, no boilerplate fatigue.

Why Vite Felt Better (From Day 1)

Compared to my early experience with React setups:

No complex configurations
No heavy build setup upfront
No confusing file structure
Super fast startup and hot reload

Everything felt lighter, faster, and more intuitive.

The Technical Side (Why It Actually Wins)

After using both more seriously, I realized it wasn’t just a “feels good” thing — there are real technical advantages:

⚡ Lightning-fast dev server
Vite uses native ES modules, so it doesn’t bundle everything before serving.
🔁 Instant Hot Module Replacement (HMR)
Changes reflect almost instantly — no waiting, no reload lag.
📦 Optimized builds with Rollup
Production builds are clean and efficient without extra effort.
🧠 Simpler mental model
You focus on writing code, not configuring tooling.
Where GSAP Comes In

Now combine that with GSAP — and things get really interesting.

React animations (especially with CSS or basic libraries) can feel:

Limited
Hard to sequence
Messy for complex interactions

GSAP fixes that completely.

With GSAP, I get:

🎬 Precise timeline control
🔄 Smooth sequencing of animations
🧩 Fine-grained control over every element
⚡ High performance (even with complex UI)
Why This Combo Works So Well

Vite handles the development experience,
GSAP handles the visual experience.

Together:

Fast dev workflow
Smooth UI animations
Clean code structure
Better control over interactions
What I Realized

At some point, I stopped thinking:

“Which framework is more popular?”

And started thinking:

“Which tool lets me build what I imagine — faster and cleaner?”

For me, that answer became:

Vite + GSAP

Final Thoughts

React is powerful — no doubt.
But for someone starting out, or someone who wants speed + control + creativity…

This combo just feels better.

It’s not about replacing React entirely —
it’s about choosing tools that make building fun again.

    `,
  },
  "article-2": {
    title: "How Open Source Made Me a Better Developer",
    content: `
Contributing to open source helped me:
- Understand real-world codebases
- Collaborate with developers globally
- Improve debugging and code reading skills

It’s one of the fastest ways to grow as a developer.
    `,
  },
  "article-3": {
    title: "Recreating Apple UI Animations on the Web",
    content: `
Apple UI feels smooth because of physics-based animations.

Using GSAP, I recreated:
- Dock animations
- Window transitions
- Micro-interactions

Focus is on realism, responsiveness, and detail.
    `,
  },
};

const ArticleView = ({ windowKey }) => {
  const { windows } = useWindowStore();
  const data = ARTICLES_CONTENT[windowKey];

  if (!windows[windowKey]?.isOpen) return null;

  return (
    <>
      {/* HEADER */}
      <div id="window-header">
        <WindowControls target={windowKey} />
        <h2>{data.title}</h2>
      </div>

      {/* CONTENT */}
      <div className="article-body">
        <div className="article-content">

          <div className="article-text">
            {data.content.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const Article1 = WindowWrapper((props) => (
  <ArticleView {...props} windowKey="article-1" />
), "article-1");

export const Article2 = WindowWrapper((props) => (
  <ArticleView {...props} windowKey="article-2" />
), "article-2");

export const Article3 = WindowWrapper((props) => (
  <ArticleView {...props} windowKey="article-3" />
), "article-3");