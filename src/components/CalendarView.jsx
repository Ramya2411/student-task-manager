import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function CalendarView({ tasks, onToggleStatus }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Map tasks by date string YYYY-MM-DD
  const tasksByDate = {};
  tasks.forEach(t => {
    if (t.dueDate) {
      if (!tasksByDate[t.dueDate]) tasksByDate[t.dueDate] = [];
      tasksByDate[t.dueDate].push(t);
    }
  });

  const renderCalendarDays = () => {
    const days = [];
    
    // Blank days for start of month offset
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`blank-${i}`} style={{ background: 'transparent', padding: '12px' }}></div>);
    }

    // Days of month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayTasks = tasksByDate[dateStr] || [];
      const isToday = new Date().toISOString().split('T')[0] === dateStr;

      days.push(
        <div 
          key={d} 
          style={{
            background: isToday ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-card)',
            border: isToday ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-md)',
            padding: '10px',
            minHeight: '110px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            marginBottom: '6px',
            fontWeight: isToday ? '700' : '500',
            color: isToday ? 'var(--primary)' : 'var(--text-main)',
            fontSize: '0.9rem'
          }}>
            <span>{d}</span>
            {dayTasks.length > 0 && (
              <span style={{
                fontSize: '0.7rem',
                background: 'var(--primary-glow)',
                color: 'var(--primary)',
                padding: '1px 6px',
                borderRadius: '10px'
              }}>
                {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', flex: 1 }}>
            {dayTasks.map(t => (
              <div 
                key={t.id}
                style={{
                  fontSize: '0.72rem',
                  padding: '4px 6px',
                  borderRadius: '4px',
                  background: t.status === 'Completed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  borderLeft: `3px solid ${t.priority === 'High' ? '#f43f5e' : t.priority === 'Medium' ? '#f59e0b' : '#10b981'}`,
                  color: t.status === 'Completed' ? 'var(--text-muted)' : 'var(--text-main)',
                  textDecoration: t.status === 'Completed' ? 'line-through' : 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                title={`${t.title} (${t.subject})`}
              >
                {t.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-view">
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CalendarIcon size={22} style={{ color: '#8b5cf6' }} />
            {monthNames[month]} {year}
          </h2>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-secondary" onClick={prevMonth}>
              <ChevronLeft size={18} /> Prev
            </button>
            <button className="btn-secondary" onClick={() => setCurrentDate(new Date())}>
              Today
            </button>
            <button className="btn-secondary" onClick={nextMonth}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          fontWeight: '600',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--border-glass)',
          marginBottom: '12px'
        }}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
}
