import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  Tag, 
  Plus 
} from 'lucide-react';

export default function TaskList({ tasks, onToggleStatus, onEdit, onDelete, onOpenModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');

  // Extract unique subjects
  const subjects = ['All', ...new Set(tasks.map(t => t.subject).filter(Boolean))];

  // Filtering logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesSubject = subjectFilter === 'All' || task.subject === subjectFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;

    return matchesSearch && matchesSubject && matchesPriority && matchesStatus;
  });

  // Sorting logic
  filteredTasks.sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const pMap = { High: 3, Medium: 2, Low: 1 };
      return (pMap[b.priority] || 0) - (pMap[a.priority] || 0);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="task-list-view">
      {/* Controls Bar */}
      <div className="controls-bar glass-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search tasks, descriptions, tags..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select 
            className="select-custom" 
            value={subjectFilter} 
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="All">All Subjects</option>
            {subjects.filter(s => s !== 'All').map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>

          <select 
            className="select-custom" 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select 
            className="select-custom" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select 
            className="select-custom" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Task Grid */}
      {filteredTasks.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <CheckCircle2 size={48} style={{ color: 'var(--text-dim)', marginBottom: '16px' }} />
          <h3>No tasks found</h3>
          <p style={{ color: 'var(--text-muted)', margin: '8px 0 20px 0' }}>
            Try adjusting your search filter or create a new student task.
          </p>
          <button className="btn-primary" onClick={onOpenModal}>
            <Plus size={18} /> Create Task
          </button>
        </div>
      ) : (
        <div className="task-grid">
          {filteredTasks.map(task => {
            const isDone = task.status === 'Completed';
            return (
              <div key={task.id} className={`glass-card task-card ${isDone ? 'completed-card' : ''}`}>
                <div>
                  <div className="task-header">
                    <span className="badge badge-subject">{task.subject || 'General'}</span>
                    <span className={`badge badge-${(task.priority || 'Low').toLowerCase()}`}>
                      {task.priority || 'Low'}
                    </span>
                  </div>

                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-desc">{task.description || 'No description provided.'}</p>

                  <div className="task-meta">
                    <div className="task-meta-item">
                      <Calendar size={14} />
                      <span>{task.dueDate}</span>
                    </div>
                    {task.dueTime && (
                      <div className="task-meta-item">
                        <Clock size={14} />
                        <span>{task.dueTime}</span>
                      </div>
                    )}
                  </div>

                  {task.tags && task.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {task.tags.map((tag, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.7rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          color: 'var(--text-muted)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="task-footer">
                  <button 
                    className={`status-btn ${isDone ? 'is-completed' : ''}`}
                    onClick={() => onToggleStatus(task.id, task.status)}
                  >
                    <CheckCircle2 size={16} />
                    <span>{task.status}</span>
                  </button>

                  <div className="card-actions">
                    <button className="icon-btn" onClick={() => onEdit(task)} title="Edit Task">
                      <Edit3 size={16} />
                    </button>
                    <button className="icon-btn delete" onClick={() => onDelete(task.id)} title="Delete Task">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
