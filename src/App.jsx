import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import CalendarView from './components/CalendarView';
import PomodoroTimer from './components/PomodoroTimer';
import NotesView from './components/NotesView';
import { apiService } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Load initial tasks & notes
  useEffect(() => {
    loadTasks();
    loadNotes();
  }, []);

  const loadTasks = async () => {
    const data = await apiService.getTasks();
    setTasks(data || []);
  };

  const loadNotes = async () => {
    const data = await apiService.getNotes();
    setNotes(data || []);
  };

  // Task Actions
  const handleSaveTask = async (taskData, id) => {
    if (id) {
      const updated = await apiService.updateTask(id, taskData);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } else {
      const created = await apiService.createTask(taskData);
      setTasks(prev => [created, ...prev]);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'To Do' : 'Completed';
    const updated = await apiService.updateTask(id, { status: newStatus });
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await apiService.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleOpenNewModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  // Note Actions
  const handleCreateNote = async (noteData) => {
    const created = await apiService.createNote(noteData);
    setNotes(prev => [created, ...prev]);
  };

  const handleDeleteNote = async (id) => {
    await apiService.deleteNote(id);
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <Navbar 
          activeTab={activeTab} 
          onOpenModal={handleOpenNewModal} 
          tasks={tasks} 
        />

        {activeTab === 'dashboard' && (
          <Dashboard 
            tasks={tasks} 
            setActiveTab={setActiveTab} 
            onToggleStatus={handleToggleStatus} 
            onOpenModal={handleOpenNewModal} 
          />
        )}

        {activeTab === 'tasks' && (
          <TaskList 
            tasks={tasks} 
            onToggleStatus={handleToggleStatus} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteTask} 
            onOpenModal={handleOpenNewModal} 
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView tasks={tasks} onToggleStatus={handleToggleStatus} />
        )}

        {activeTab === 'timer' && (
          <PomodoroTimer tasks={tasks} />
        )}

        {activeTab === 'notes' && (
          <NotesView 
            notes={notes} 
            onCreateNote={handleCreateNote} 
            onDeleteNote={handleDeleteNote} 
          />
        )}

        <TaskModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveTask} 
          taskToEdit={taskToEdit} 
        />
      </main>
    </div>
  );
}
