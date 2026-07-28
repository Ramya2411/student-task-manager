import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, taskToEdit = null }) {
  const [formData, setFormData] = useState({
    title: '',
    subject: 'Web Development',
    category: 'Assignment',
    priority: 'Medium',
    status: 'To Do',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '23:59',
    description: '',
    tags: ''
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        subject: taskToEdit.subject || 'Web Development',
        category: taskToEdit.category || 'Assignment',
        priority: taskToEdit.priority || 'Medium',
        status: taskToEdit.status || 'To Do',
        dueDate: taskToEdit.dueDate || new Date().toISOString().split('T')[0],
        dueTime: taskToEdit.dueTime || '23:59',
        description: taskToEdit.description || '',
        tags: taskToEdit.tags ? taskToEdit.tags.join(', ') : ''
      });
    } else {
      setFormData({
        title: '',
        subject: 'Web Development',
        category: 'Assignment',
        priority: 'Medium',
        status: 'To Do',
        dueDate: new Date().toISOString().split('T')[0],
        dueTime: '23:59',
        description: '',
        tags: ''
      });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const formattedTask = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    };

    onSave(formattedTask, taskToEdit ? taskToEdit.id : null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Build Web Dev React Component" 
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Subject / Course</label>
              <select 
                className="form-select"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              >
                <option value="Web Development">Web Development</option>
                <option value="Data Structures">Data Structures</option>
                <option value="Backend Engineering">Backend Engineering</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Database Systems">Database Systems</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select 
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Assignment">Assignment</option>
                <option value="Lab">Lab Exercise</option>
                <option value="Exam Prep">Exam Prep</option>
                <option value="Project">Mini Project</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select 
                className="form-select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select 
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Due Time</label>
              <input 
                type="time" 
                className="form-input" 
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              className="form-textarea" 
              rows="3" 
              placeholder="Task instructions, links, or notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tags (Comma separated)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. React, Express, Quiz" 
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Check size={18} />
              <span>{taskToEdit ? 'Save Changes' : 'Create Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
