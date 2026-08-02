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
    title: "FOSSEE Internship Experience",
    content: `
My FOSSEE Internship Journey

When I first found out I was going to IIT Bombay for my FOSSEE internship, I was honestly stunned. Walking into that campus for the first time felt surreal. The whole Bombay experience was incredible, but what really made it special were the people. 

The colleagues and mentors I worked with were incredibly welcoming and helpful. I came in with a lot of excitement but also a healthy dose of imposter syndrome, and they made sure I always had someone to turn to when I hit a wall.

And trust me, I hit a few walls.

The Setup Struggle
Before I even got to write any meaningful code, I got completely stuck on just setting up the project. The codebase had gone through several version changes, and getting all the dependencies to play nicely on my machine was a nightmare. I spent what felt like forever just wrestling with environments, reading outdated docs, and feeling like I was already falling behind. 

But looking back, that struggle was exactly what I needed. It forced me to actually understand how the project was wired together under the hood rather than just blindly running 'npm install' or 'pip install'.

Diving into the Tech
Once the environment was finally stable, I got to dive into the actual open-source work. My focus was on building and refining tools meant to democratize technical education. The shift from writing solo projects to contributing to a massive, shared codebase was huge. I had to learn how to write cleaner code, structure proper pull requests, and communicate my technical decisions during code reviews.

FOSSEE wasn't just about the code I wrote; it was about learning how real software is built by real teams. It was challenging, sometimes frustrating, but entirely worth it.
    `,
  },
  "article-3": {
    title: "The Internship Hustle: Balancing It All",
    content: `
The Realities of the Internship Hunt

Looking for an internship isn't just about sending out resumes—it's practically a full-time job on its own. 

The Balancing Act
At any given moment, my brain was juggling multiple demanding tracks simultaneously. On one hand, there was the relentless grind of Data Structures and Algorithms (DSA). Solving LeetCode problems became a daily ritual, constantly trying to optimize time and space complexities while keeping up with the patterns. 

On the other hand, there were the personal projects. It's one thing to solve algorithmic puzzles, but building actual, functioning software that looks good and solves a problem is what truly stands out. I was constantly pushing myself to learn new frameworks, squash bugs, and polish the UI of my apps to build a solid portfolio.

The Academic Reality
And let's not forget the GPA. Navigating coursework, assignments, and exams while keeping grades up was an ongoing pressure. Trying to be a good student, a competent problem solver, and an active developer all at once is incredibly demanding. 

Avoiding the Burnout
With all this going on, burnout is a very real threat. I learned the hard way that you cannot just grind 24/7. 

I had to consciously make time to just enjoy life—hanging out with friends, taking breaks away from the screen, and letting my brain rest. I realized that enjoying the journey and taking care of my mental health actually made me sharper when I did sit back down to code. The hustle is important, but staying sane and enjoying life along the way is what actually makes the whole process sustainable.
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