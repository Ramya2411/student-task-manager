import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  BookOpen, 
  TrendingUp, 
  CalendarDays,
  ArrowRight
} from 'lucide-react';

export default function Dashboard({ tasks, setActiveTab, onToggleStatus, onOpenModal }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const toDo = tasks.filter(t => t.status === 'To Do').length;
  const pending = inProgress + toDo;
  const highPriority = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Group tasks by subject
  const subjects = {};
  tasks.forEach(t => {
    const sub = t.subject || 'General';
    if (!subjects[sub]) {
      subjects[sub] = { total: 0, completed: 0 };
    }
    subjects[sub].total += 1;
    if (t.status === 'Completed') subjects[sub].completed += 1;
  });

  // Get upcoming 3 tasks
  const upcomingTasks = [...tasks]
    .filter(t => t.status !== 'Completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  return (
    <div className="dashboard-view">
      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="glass-card metric-card">
          <div className="metric-icon" style={{ color: '#8b5cf6' }}>
            <BookOpen size={24} />
          </div>
          <div className="metric-info">
            <h3>{total}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="glass-card metric-card completed">
          <div className="metric-icon" style={{ color: '#10b981' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="metric-info">
            <h3>{completed}</h3>
            <p>Completed ({completionRate}%)</p>
          </div>
        </div>

        <div className="glass-card metric-card progress">
          <div className="metric-icon" style={{ color: '#06b6d4' }}>
            <Clock size={24} />
          </div>
          <div className="metric-info">
            <h3>{pending}</h3>
            <p>Pending Tasks</p>
          </div>
        </div>

        <div className="glass-card metric-card urgent">
          <div className="metric-icon" style={{ color: '#f43f5e' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="metric-info">
            <h3>{highPriority}</h3>
            <p>High Priority Urgent</p>
          </div>
        </div>
      </div>

      {/* Progress & Quick Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        
        {/* Overall Completion Progress */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} style={{ color: '#10b981' }} />
              Coursework Completion
            </h3>
            <span style={{ fontWeight: '700', color: '#10b981' }}>{completionRate}%</span>
          </div>

          <div className="progress-container" style={{ marginBottom: '20px' }}>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${completionRate}%` }}></div>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {completed} of {total} assigned tasks completed. Keep going to reach your academic study goals!
          </p>
        </div>

        {/* Subject Breakdown */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Subject-wise Progress</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.keys(subjects).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No tasks available yet.</p>
            ) : (
              Object.entries(subjects).map(([subjectName, data]) => {
                const subPct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
                return (
                  <div key={subjectName}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '500' }}>{subjectName}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{data.completed}/{data.total} ({subPct}%)</span>
                    </div>
                    <div className="progress-bar-bg" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${subPct}%`, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Upcoming Deadlines Widget */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CalendarDays size={20} style={{ color: '#8b5cf6' }} />
            Upcoming Task Deadlines
          </h3>
          <button 
            className="btn-secondary" 
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            onClick={() => setActiveTab('tasks')}
          >
            View All Tasks <ArrowRight size={14} />
          </button>
        </div>

        {upcomingTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
            <p>🎉 All caught up! No upcoming pending tasks.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingTasks.map(t => (
              <div 
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span className="badge badge-subject">{t.subject}</span>
                    <span className={`badge badge-${t.priority.toLowerCase()}`}>{t.priority}</span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{t.title}</h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <div style={{ color: 'var(--accent-amber)', fontWeight: '600' }}>Due {t.dueDate}</div>
                    <div>{t.dueTime || '23:59'}</div>
                  </div>

                  <button 
                    className="status-btn"
                    onClick={() => onToggleStatus(t.id, t.status)}
                    title="Mark as Completed"
                  >
                    Mark Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
