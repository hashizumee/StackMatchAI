import React, { useState } from 'react';
import { Target, Menu, LayoutDashboard, History, Settings, X } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="header">
        <button className="kebab-btn" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={20} />
        </button>
        <div className="header-brand">
          <Target size={24} color="var(--primary-color)" />
          <span>DevAnalyzer</span>
        </div>
      </header>

      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside className={`sidebar-drawer ${isSidebarOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="header-brand" style={{ marginLeft: 0 }}>
            <Target size={24} color="var(--primary-color)" /> DevAnalyzer
          </div>
          <button className="kebab-btn" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li 
            className={`sidebar-item ${activeTab === 'landing' || activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => { setActiveTab('upload'); setIsSidebarOpen(false); }}
          >
            <LayoutDashboard size={20} />
            New Analysis
          </li>
          <li 
            className={`sidebar-item ${activeTab === 'resumes' ? 'active' : ''}`}
            onClick={() => { setActiveTab('resumes'); setIsSidebarOpen(false); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            My Resumes
          </li>
          <li 
            className={`sidebar-item ${activeTab === 'roadmaps' ? 'active' : ''}`}
            onClick={() => { setActiveTab('roadmaps'); setIsSidebarOpen(false); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            Skill Roadmaps
          </li>
          <li 
            className={`sidebar-item ${activeTab === 'interview' ? 'active' : ''}`}
            onClick={() => { setActiveTab('interview'); setIsSidebarOpen(false); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Interview Prep
          </li>
          <li 
            className={`sidebar-item ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => { setActiveTab('jobs'); setIsSidebarOpen(false); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            Saved Jobs
          </li>
          <li 
            className={`sidebar-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => { setActiveTab('history'); setIsSidebarOpen(false); }}
          >
            <History size={20} />
            History
          </li>
          <li 
            className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
          >
            <Settings size={20} />
            Settings
          </li>
          <li 
            className="sidebar-item" style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem', borderRadius: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Help & Support
          </li>
        </ul>
      </aside>
    </>
  );
}
