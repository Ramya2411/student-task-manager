const INITIAL_TASKS = [
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

const INITIAL_NOTES = [
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
    content: 'Use HTTP status codes (200, 201, 400, 404, 500). Validate request parameters and body.',
    date: new Date().toISOString().split('T')[0],
    links: ['https://expressjs.com']
  }
];

// Helper functions for LocalStorage fallback
const getLocalTasks = () => {
  const local = localStorage.getItem('eduflow_tasks');
  if (!local) {
    localStorage.setItem('eduflow_tasks', JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  }
  return JSON.parse(local);
};

const setLocalTasks = (tasks) => {
  localStorage.setItem('eduflow_tasks', JSON.stringify(tasks));
};

const getLocalNotes = () => {
  const local = localStorage.getItem('eduflow_notes');
  if (!local) {
    localStorage.setItem('eduflow_notes', JSON.stringify(INITIAL_NOTES));
    return INITIAL_NOTES;
  }
  return JSON.parse(local);
};

const setLocalNotes = (notes) => {
  localStorage.setItem('eduflow_notes', JSON.stringify(notes));
};

export const apiService = {
  async getTasks() {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend server disconnected, using local storage fallback.');
    }
    return getLocalTasks();
  },

  async createTask(taskData) {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend server disconnected, using local storage fallback.');
    }
    const tasks = getLocalTasks();
    const newTask = {
      id: Date.now().toString(),
      status: 'To Do',
      ...taskData
    };
    tasks.unshift(newTask);
    setLocalTasks(tasks);
    return newTask;
  },

  async updateTask(id, updates) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend server disconnected, using local storage fallback.');
    }
    const tasks = getLocalTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
      tasks[idx] = { ...tasks[idx], ...updates };
      setLocalTasks(tasks);
      return tasks[idx];
    }
    return null;
  },

  async deleteTask(id) {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend server disconnected, using local storage fallback.');
    }
    let tasks = getLocalTasks();
    tasks = tasks.filter(t => t.id !== id);
    setLocalTasks(tasks);
    return { success: true, id };
  },

  async getNotes() {
    try {
      const res = await fetch('/api/notes');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend server disconnected, using local storage fallback.');
    }
    return getLocalNotes();
  },

  async createNote(noteData) {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend server disconnected, using local storage fallback.');
    }
    const notes = getLocalNotes();
    const newNote = {
      id: 'n_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...noteData
    };
    notes.unshift(newNote);
    setLocalNotes(notes);
    return newNote;
  },

  async deleteNote(id) {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend server disconnected, using local storage fallback.');
    }
    let notes = getLocalNotes();
    notes = notes.filter(n => n.id !== id);
    setLocalNotes(notes);
    return { success: true, id };
  }
};
