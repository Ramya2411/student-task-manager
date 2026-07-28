import React from 'react';
import { Plus, Bell, User } from 'lucide-react';

export default function Navbar({ activeTab, onOpenModal, tasks = [] }) {
  const urgentCount = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length;

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Student Dashboard';
      case 'tasks': return 'Task Manager';
      case 'calendar': return 'Academic Calendar';
      case 'timer': return 'Pomodoro Focus Session';
      case 'notes': return 'Study Notes & Resources';
      default: return 'EduFlow Workspace';
    }
  };

  return (
    <header className="top-header">
      <div className="header-title">
        <h1>{getTitle()}</h1>
        <p>Organize your coursework, track deadlines, and supercharge study productivity.</p>
      </div>

      <div className="header-actions">
        <button className="btn-primary" onClick={onOpenModal}>
          <Plus size={18} />
          <span>New Task</span>
        </button>

        <div style={{ position: 'relative' }}>
          <button className="btn-secondary" style={{ padding: '10px' }} title="Alerts">
            <Bell size={18} />
          </button>
          {urgentCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#f43f5e',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700'
            }}>
              {urgentCount}
            </span>
          )}
        </div>

        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          <User size={18} />
        </div>
      </div>
    </header>
  );
}
