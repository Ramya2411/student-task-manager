import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, CheckCircle, BellRing } from 'lucide-react';

export default function PomodoroTimer({ tasks }) {
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const modeTimes = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'work') {
        setSessionsCompleted(prev => prev + 1);
        setMode('shortBreak');
        setTimeLeft(modeTimes.shortBreak);
      } else {
        setMode('work');
        setTimeLeft(modeTimes.work);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(modeTimes[newMode]);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeTimes[mode]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="timer-view">
      <div className="glass-card timer-container">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Pomodoro Study Timer</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Boost focus using structured 25-minute study intervals followed by restorative breaks.
        </p>

        {/* Mode Selector */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '6px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px'
        }}>
          <button 
            className={`btn-secondary ${mode === 'work' ? 'btn-primary' : ''}`}
            onClick={() => switchMode('work')}
            style={{ border: 'none' }}
          >
            Study Focus (25m)
          </button>
          <button 
            className={`btn-secondary ${mode === 'shortBreak' ? 'btn-primary' : ''}`}
            onClick={() => switchMode('shortBreak')}
            style={{ border: 'none' }}
          >
            Short Break (5m)
          </button>
          <button 
            className={`btn-secondary ${mode === 'longBreak' ? 'btn-primary' : ''}`}
            onClick={() => switchMode('longBreak')}
            style={{ border: 'none' }}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Task Link Selector */}
        <div style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
          <select 
            className="form-select"
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
          >
            <option value="">-- Link Session to a Task (Optional) --</option>
            {tasks.filter(t => t.status !== 'Completed').map(t => (
              <option key={t.id} value={t.id}>[{t.subject}] {t.title}</option>
            ))}
          </select>
        </div>

        {/* Circular Display */}
        <div className="timer-circle">
          <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.1em', marginBottom: '8px' }}>
            {mode === 'work' ? 'Study Session' : mode === 'shortBreak' ? 'Short Rest' : 'Deep Rest'}
          </div>
          <div className="timer-time">{formatTime(timeLeft)}</div>
          {selectedTaskId && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Focusing on: {tasks.find(t => t.id === selectedTaskId)?.title}
            </div>
          )}
        </div>

        {/* Timer Control Buttons */}
        <div className="timer-controls">
          <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.1rem' }} onClick={toggleTimer}>
            {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Start Session</>}
          </button>
          <button className="btn-secondary" style={{ padding: '14px 20px' }} onClick={resetTimer}>
            <RotateCcw size={20} /> Reset
          </button>
        </div>

        {/* Stats Footer */}
        <div style={{
          marginTop: '36px',
          display: 'flex',
          gap: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-glass)',
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={18} style={{ color: 'var(--accent-amber)' }} />
            <span>Completed Today: <strong style={{ color: 'var(--text-main)' }}>{sessionsCompleted} sessions</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={18} style={{ color: 'var(--accent-emerald)' }} />
            <span>Study Time: <strong style={{ color: 'var(--text-main)' }}>{sessionsCompleted * 25} mins</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
