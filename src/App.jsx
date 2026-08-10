import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function AppContent() {
  return (
    <div>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<div className="animate-fade-in"><UploadModule /></div>} />
          <Route path="/loading" element={<div className="animate-fade-in"><LoadingState /></div>} />
          <Route path="/dashboard" element={<div className="animate-fade-in"><Dashboard /></div>} />
          <Route path="/resumes" element={<Resumes />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/interview" element={<InterviewPrep />} />
          <Route path="/jobs" element={<SavedJobs />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
