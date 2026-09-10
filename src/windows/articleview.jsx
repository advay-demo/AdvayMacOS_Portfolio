import React from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import WindowControls from "@components/WindowControls.jsx";
import useWindowStore from "@store/window.js";

const ARTICLES_CONTENT = {
  "article-1": {
    title: "Overnight Hackathon: Coffee, Code, and the 24-Hour Grind",
    content: `
Overnight Hackathon: Coffee, Code, and the 24-Hour Grind

There is nothing quite like the adrenaline rush of a 24-hour overnight hackathon.

It usually starts with a burst of excitement, a whiteboard full of overly ambitious ideas, and the naive belief that "we'll definitely have time to sleep for a few hours."

Spoiler alert: We never do.

---

The Brainstorming Phase (8:00 PM)

We spent the first few hours debating ideas. The theme was "Tech for Social Good", which meant everyone was pitching some variation of a crowd-sourced donation app. We wanted to do something different, so we settled on an accessibility tool.

The architecture was drawn up, the repo was initialized, and we assigned roles. Everything was going perfectly.

The Midway Crash (3:00 AM)

This is the hardest part of any hackathon. The initial energy has worn off, the caffeine is losing its edge, and you've hit your first major roadblock. For us, it was a nasty CORS error when trying to fetch data from an external API, coupled with a mysterious state bug in React that only seemed to happen on every alternate re-render.

I spent an hour just staring at the screen, questioning why I chose this field. Then, a team member suggested a completely hacky workaround. Under normal circumstances, I'd never merge it. At 4:00 AM in a hackathon? It was the most beautiful code I'd ever seen.

The Final Sprint (9:00 AM)

The deadline was looming. We scrambled to piece together the frontend UI while the backend was barely held together by duct tape and prayers. We didn't have time to write tests, and we definitely didn't have time to refactor.

But somehow, it compiled. It ran. The demo worked.

We presented our project on stage, sleep-deprived but incredibly proud. We didn't win first place, but the experience of building something from scratch, under intense pressure, with a team of passionate developers, was a prize in itself.
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