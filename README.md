# 💻 macOS Portfolio – Interactive Web Experience

## 📌 Overview

This project is a macOS-inspired interactive portfolio built using modern frontend technologies. It simulates a desktop-like environment where users can navigate through apps like Finder, Terminal, Contact, and more.

The goal was to create a visually engaging and unique portfolio that stands out while maintaining smooth performance and clean architecture.

---

## 🚀 Features & Highlights

### 🖥️ macOS UI Simulation

* Fully interactive desktop-like interface
* Draggable and layered windows with proper z-index handling
* Dock with clickable apps
* Navbar behaving like macOS menu bar

---

### 🧑‍💻 Terminal (Tech Stack)

* Terminal-style UI to display skills
* Dynamic rendering using structured data
* Clean, minimal, developer-focused design

---

### 📇 Contact Window

* Terminal-style contact display for consistency
* Includes GitHub, LinkedIn, Phone, Email, LeetCode, Location
* Profile image integrated into UI
* Centralized data using constants

---

### 📂 Finder (Projects)

* Folder-based navigation system
* Simulates macOS Finder experience
* Supports nested project structure

---

### 🖼️ Gallery

* Image preview system
* Organized sections like library, memories, etc.

---

### 🌐 Articles (Safari)

* Blog-style UI with external links
* Clean reading experience

---

## 🎨 Design Principles

* **Consistency** – Unified terminal-style and window UI
* **Minimalism** – Clean layouts with no unnecessary clutter
* **Realism** – macOS-inspired interactions and structure
* **User Experience** – Smooth transitions and intuitive navigation

---

## ⚙️ Tech Stack

* React.js
* Vite
* Tailwind CSS
* GSAP (Draggable)
* JavaScript (ES6+)

---

## 🧠 Architecture Highlights

* Centralized data management using `constants/index.js`
* Reusable window system using `WindowWrapper`
* Modular component structure
* Scalable window configuration system

---

## 📱 Responsiveness

* Optimized for desktop-first experience
* Basic support for smaller screens
* Non-essential UI hidden on mobile for clarity

---

## ⚖️ Design vs Performance

* Lightweight animations using GSAP
* No heavy UI libraries used
* Efficient rendering with minimal re-renders
* Focus on smooth UX over excessive effects

---

## 🧠 Challenges & Approach

### Challenge:

Creating a fully interactive OS-like interface in a web environment.

### Approach:

* Built a reusable window management system
* Used centralized state for window control
* Designed components to mimic real macOS behavior
* Maintained separation between UI and data

---

## 📸 Preview

(Add your screenshots here)

---

## 🛠️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/your-username/macos-portfolio.git
cd macos-portfolio
