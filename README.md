# 🎓 EduFlow - Student Task & Study Manager

> **Avishkarana Andhra Summer Internship — Mini Project (Days 21–30)**

EduFlow is a modern, high-performance web application designed for students to organize coursework, track assignment deadlines, monitor subject-wise progress, manage study notes, and boost study focus using an integrated Pomodoro timer.

![EduFlow App](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Express.js-8b5cf6)
![Design](https://img.shields.io/badge/UI-Dark%20Glassmorphism-06b6d4)

---

## ✨ Features

- **📊 Student Dashboard & Analytics**: Visual progress indicators, total completion percentage, subject breakdown, and upcoming deadline warnings.
- **📝 Task Management**: Full CRUD operations, search bar, filter by subject/priority/status, sort by due date/priority.
- **📅 Academic Schedule & Calendar**: Interactive monthly calendar with deadline badges and task counts.
- **⏱️ Pomodoro Study Timer**: Built-in 25-minute study focus and break timer with session counters.
- **📚 Study Notes & Resources**: Attach code snippets and documentation links categorized by subjects.
- **⚡ Express REST API Backend**: Node.js/Express server (`server/server.js`) with automatic LocalStorage fallback.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/student-task-manager.git
   cd student-task-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run Full Stack Application** (Express API + React Frontend):
   ```bash
   npm run start
   ```

   Or run individual services:
   - **Backend API**: `npm run server` (runs on `http://localhost:5000`)
   - **Frontend App**: `npm run dev` (runs on `http://localhost:3000`)

---

## 🛠️ Project Structure

```
Student Task Manager/
├── server/
│   ├── server.js          # Express.js REST API server
│   └── data/              # JSON database storage
├── src/
│   ├── components/        # React components (Dashboard, TaskList, Calendar, Timer, Notes)
│   ├── services/          # API service client with local storage fallback
│   ├── App.jsx            # Main application component
│   ├── index.css          # Design system & dark glassmorphism styling
│   └── main.jsx           # Entry point
├── index.html             # HTML entry template
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```
