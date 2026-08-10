import React from 'react';
import { Target, LayoutDashboard, History, Map, Settings } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'upload', icon: LayoutDashboard, label: 'New Analysis' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'roadmaps', icon: Map, label: 'Roadmaps' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Target size={28} color="var(--primary-color)" />
        <span>DevAnalyzer.ai</span>
      </div>
      
      <ul className="nav-menu">
        {menuItems.map(item => (
          <li 
            key={item.id} 
            className={`nav-item ${activeTab === item.id || (activeTab === 'dashboard' && item.id === 'upload') ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id === 'dashboard' ? 'dashboard' : item.id)} // For demo logic
          >
            <item.icon size={20} />
            {item.label}
          </li>
        ))}
      </ul>

    </aside>
  );
}
