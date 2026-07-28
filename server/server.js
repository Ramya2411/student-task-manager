import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');
const NOTES_FILE = path.join(__dirname, 'data', 'notes.json');

// Ensure data directory and files exist
const ensureFilesExist = () => {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initialTasks = [
      {
        id: '1',
        title: 'Complete Web Development Lab Assignment 3',
        subject: 'Web Development',
        category: 'Lab',
        priority: 'High',
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        dueTime: '23:59',
        status: 'In Progress',
        description: 'Build a responsive portfolio page using CSS Flexbox/Grid and Javascript DOM manipulation.',
        tags: ['React', 'CSS', 'Internship']
      },
      {
        id: '2',
        title: 'Prepare for Data Structures & Algorithms Midterm',
        subject: 'Data Structures',
        category: 'Exam Prep',
        priority: 'High',
        dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
        dueTime: '10:00',
        status: 'To Do',
        description: 'Review Binary Search Trees, Graph Traversals (BFS/DFS), and Dynamic Programming patterns.',
        tags: ['Trees', 'Graphs', 'Revision']
      },
      {
        id: '3',
        title: 'Submit Express.js REST API Architecture Diagram',
        subject: 'Backend Engineering',
        category: 'Assignment',
        priority: 'Medium',
        dueDate: new Date(Date.now() + 432000000).toISOString().split('T')[0],
        dueTime: '18:00',
        status: 'To Do',
        description: 'Document endpoints for CRUD operations, JWT authentication flow, and MongoDB schema.',
        tags: ['Express', 'NodeJS', 'API']
      },
      {
        id: '4',
        title: 'Flutter UI Components Layout Practice',
        subject: 'Mobile Development',
        category: 'Project',
        priority: 'Low',
        dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        dueTime: '15:00',
        status: 'Completed',
        description: 'Design multi-screen UI with BottomNavigationBar and custom themes in Dart.',
        tags: ['Flutter', 'Dart', 'Mobile']
      }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialTasks, null, 2));
  }

  if (!fs.existsSync(NOTES_FILE)) {
    const initialNotes = [
      {
        id: 'n1',
        title: 'React Hooks Cheat Sheet',
        subject: 'Web Development',
        content: 'useState for state management, useEffect for side effects, useMemo/useCallback for performance optimization.',
        date: new Date().toISOString().split('T')[0],
        links: ['https://react.dev']
      },
      {
        id: 'n2',
        title: 'Express REST API Best Practices',
        subject: 'Backend Engineering',
        content: 'Use HTTP status codes (200, 201, 400, 404, 500). Validate request body before processing.',
        date: new Date().toISOString().split('T')[0],
        links: ['https://expressjs.com']
      }
    ];
    fs.writeFileSync(NOTES_FILE, JSON.stringify(initialNotes, null, 2));
  }
};

const readTasks = () => {
  ensureFilesExist();
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data || '[]');
};

const writeTasks = (tasks) => {
  ensureFilesExist();
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

const readNotes = () => {
  ensureFilesExist();
  const data = fs.readFileSync(NOTES_FILE, 'utf8');
  return JSON.parse(data || '[]');
};

const writeNotes = (notes) => {
  ensureFilesExist();
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
};

// API Endpoints
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'To Do',
    ...req.body
  };
  tasks.unshift(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  let tasks = readTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks[index] = { ...tasks[index], ...req.body };
  writeTasks(tasks);
  res.json(tasks[index]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  let tasks = readTasks();
  tasks = tasks.filter(t => t.id !== id);
  writeTasks(tasks);
  res.json({ success: true, id });
});

app.get('/api/stats', (req, res) => {
  const tasks = readTasks();
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const toDo = tasks.filter(t => t.status === 'To Do').length;
  const highPriority = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length;
  
  res.json({
    total,
    completed,
    inProgress,
    toDo,
    highPriority,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  });
});

app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: 'n_' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    ...req.body
  };
  notes.unshift(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  let notes = readNotes();
  notes = notes.filter(n => n.id !== id);
  writeNotes(notes);
  res.json({ success: true, id });
});

app.listen(PORT, () => {
  console.log(`EduFlow Student Task Manager Express Server running on http://localhost:${PORT}`);
});
