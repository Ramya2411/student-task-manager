import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Timer, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Schedule & Calendar', icon: Calendar },
    { id: 'timer', label: 'Pomodoro Timer', icon: Timer },
    { id: 'notes', label: 'Study Notes', icon: BookOpen },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <GraduationCap size={24} />
        </div>
        <div>
          <div className="brand-name">EduFlow</div>
          <span className="brand-tag">Student Pro</span>
        </div>
      </div>

      <ul className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <li 
              key={item.id} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} className="nav-icon" />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <div className="internship-badge">
          <h5>Student</h5>
          <p>Task Tracker</p>
        </div>
      </div>
    </aside>
  );
}
