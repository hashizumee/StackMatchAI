import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import UploadModule from './components/UploadModule';
import LoadingState from './components/LoadingState';
import Dashboard from './components/Dashboard';
import Resumes from './components/Resumes';
import Roadmaps from './components/Roadmaps';
import InterviewPrep from './components/InterviewPrep';
import SavedJobs from './components/SavedJobs';
import History from './components/History';
import Settings from './components/Settings';
import './index.css';

function App() {
  const [appState, setAppState] = useState('landing'); // landing, upload, loading, dashboard, etc.

  const handleStart = () => {
    setAppState('upload');
  };

  const handleAnalyze = (data) => {
    setAppState('loading');
    
    // Simulasi delay AI (3 detik)
    setTimeout(() => {
      setAppState('dashboard');
    }, 3000);
  };

  const handleReset = () => {
    setAppState('upload');
  };

  return (
    <div>
      <Header activeTab={appState} setActiveTab={setAppState} />
      
      <main className="main-container">
        {appState === 'landing' && <LandingPage onStart={handleStart} />}
        
        {appState === 'upload' && (
          <div className="animate-fade-in"><UploadModule onAnalyze={handleAnalyze} /></div>
        )}

        {appState === 'loading' && (
          <div className="animate-fade-in"><LoadingState /></div>
        )}

        {appState === 'dashboard' && (
          <div className="animate-fade-in"><Dashboard onReset={handleReset} /></div>
        )}

        {appState === 'resumes' && <Resumes />}
        {appState === 'roadmaps' && <Roadmaps />}
        {appState === 'interview' && <InterviewPrep />}
        {appState === 'jobs' && <SavedJobs />}
        {appState === 'history' && <History />}
        {appState === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default App;
