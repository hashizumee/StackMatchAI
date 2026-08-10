import React, { useState } from 'react';
import { Upload, GitBranch, Briefcase, Search } from 'lucide-react';

export default function UploadModule({ onAnalyze }) {
  const [github, setGithub] = useState('');
  const [jd, setJd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze({ github, jd });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="split-grid">
        {/* Left Column */}
        <div>
          <div className="form-group">
            <label>1. Upload CV (PDF)</label>
            <div className="upload-box">
              <Upload size={36} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-main)', fontWeight: '500', marginBottom: '0.25rem' }}>Drop your CV here</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>PDF format, up to 5MB</p>
              <input 
                type="file" 
                accept=".pdf" 
                style={{ display: 'none' }} 
                id="cv-upload"
              />
              <button type="button" className="btn btn-outline" onClick={() => document.getElementById('cv-upload').click()}>
                Browse Files
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>2. GitHub Username</label>
            <div style={{ position: 'relative' }}>
              <GitBranch size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '12px' }} />
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. torvalds" 
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label>3. Job Description</label>
            <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Briefcase size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '12px' }} />
              <textarea 
                className="form-control" 
                placeholder="Paste the target job description here..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                style={{ paddingLeft: '2.5rem', flex: 1 }}
                required
              ></textarea>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 'auto', padding: '1.25rem' }}>
            <Search size={20} /> Analyze Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}
