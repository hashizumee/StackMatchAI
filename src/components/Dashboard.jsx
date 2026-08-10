import React from 'react';
import { Target, Code, AlertCircle, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function Dashboard({ onReset }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Analysis Results</h2>
        <button className="btn btn-primary" onClick={onReset}>
          <RefreshCw size={16} /> New Analysis
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="card score-card">
          <h3 className="card-title" style={{ justifyContent: 'center' }}>Match Score</h3>
          <div className="score-value score-success">85%</div>
          <p style={{ color: 'var(--text-muted)' }}>Highly aligned with Job Description</p>
        </div>

        <div className="card">
          <h3 className="card-title">Job Readiness</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="badge badge-outline">Beginner</span>
            <span className="badge badge-success">Entry Ready (Current)</span>
            <span className="badge badge-outline">Interview Ready</span>
            <span className="badge badge-outline">Highly Competitive</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Your portfolio is sufficient for entry-level positions, but lacks CI/CD experience for mid-level roles.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-title"><Target size={20} color="var(--primary-color)" /> Matching Skills</h3>
          <ul className="list-group">
            <li className="list-item">
              <CheckCircle className="list-icon" size={18} color="var(--accent-success)" />
              <div>
                <strong>React.js & Frontend</strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Found 3 projects using React in your GitHub.</p>
              </div>
            </li>
            <li className="list-item">
              <CheckCircle className="list-icon" size={18} color="var(--accent-success)" />
              <div>
                <strong>REST API Development</strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Mentioned in CV experience at Company X.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="card-title"><AlertCircle size={20} color="var(--accent-warning)" /> Skill Gaps</h3>
          <ul className="list-group">
            <li className="list-item">
              <XCircle className="list-icon" size={18} color="var(--accent-danger)" />
              <div>
                <strong>Docker & Containers</strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Required in JD, but missing from CV & GitHub.</p>
              </div>
            </li>
            <li className="list-item">
              <XCircle className="list-icon" size={18} color="var(--accent-danger)" />
              <div>
                <strong>CI/CD Pipelines</strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Highly requested skill not found in your portfolio.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><Code size={20} color="var(--primary-color)" /> Actionable Project Recommendation</h3>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Build this project to cover your skill gaps and boost your match score:</p>
        <div style={{ padding: '1.5rem', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--bg-color)' }}>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>E-Commerce API with Docker & CI/CD</h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Build a backend service using Node.js/TypeScript, dockerize the application, and set up GitHub Actions for automated testing & deployment.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-outline">Node.js</span>
            <span className="badge badge-warning">Docker</span>
            <span className="badge badge-warning">GitHub Actions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
