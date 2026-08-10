import React from 'react';
import { Target, Code, AlertCircle, RefreshCw, CheckCircle, XCircle, Bookmark } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, jdText } = location.state || {};
  const [jobSaved, setJobSaved] = React.useState(false);

  const handleSaveJob = () => {
    if (!jdText) return;
    const currentJobs = JSON.parse(localStorage.getItem('sm_saved_jobs') || '[]');
    const newJob = {
      id: Date.now(),
      snippet: jdText.substring(0, 50) + '...',
      fullText: jdText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    localStorage.setItem('sm_saved_jobs', JSON.stringify([newJob, ...currentJobs]));
    setJobSaved(true);
  };

  if (!result) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Data Analisis Tidak Ditemukan</h2>
        <button className="btn btn-primary" onClick={() => navigate('/upload')}>
          Mulai Analisis Baru
        </button>
      </div>
    );
  }

  const { matchScore, jobReadiness, readinessDescription, matchingSkills, skillGaps, projectRecommendation } = result;
  
  const scoreClass = matchScore >= 80 ? 'score-success' : matchScore >= 60 ? 'score-warning' : 'score-danger';

  const READINESS_LEVELS = ["Beginner", "Entry Ready", "Interview Ready", "Highly Competitive"];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Analysis Results</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={handleSaveJob} disabled={jobSaved}>
            <Bookmark size={16} /> {jobSaved ? 'Job Saved' : 'Save Job'}
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/upload')}>
            <RefreshCw size={16} /> New Analysis
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card score-card">
          <h3 className="card-title" style={{ justifyContent: 'center' }}>Match Score</h3>
          <div className={`score-value ${scoreClass}`}>{matchScore}%</div>
          <p style={{ color: 'var(--text-muted)' }}>Berdasarkan CV & GitHub Anda</p>
        </div>

        <div className="card">
          <h3 className="card-title">Job Readiness</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {READINESS_LEVELS.map(level => (
              <span 
                key={level} 
                className={`badge ${level.toLowerCase() === (jobReadiness || '').toLowerCase() ? 'badge-success' : 'badge-outline'}`}
              >
                {level} {level.toLowerCase() === (jobReadiness || '').toLowerCase() ? '(Current)' : ''}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {readinessDescription}
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-title"><Target size={20} color="var(--primary-color)" /> Matching Skills</h3>
          <ul className="list-group">
            {matchingSkills && matchingSkills.map((item, idx) => (
              <li className="list-item" key={idx}>
                <CheckCircle className="list-icon" size={18} color="var(--accent-success)" />
                <div>
                  <strong>{item.skill}</strong>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.evidence}</p>
                </div>
              </li>
            ))}
            {(!matchingSkills || matchingSkills.length === 0) && (
              <p style={{ color: 'var(--text-muted)' }}>Belum ada skill yang cocok secara spesifik.</p>
            )}
          </ul>
        </div>

        <div className="card">
          <h3 className="card-title"><AlertCircle size={20} color="var(--accent-warning)" /> Skill Gaps</h3>
          <ul className="list-group">
            {skillGaps && skillGaps.map((item, idx) => (
              <li className="list-item" key={idx}>
                <XCircle className="list-icon" size={18} color="var(--accent-danger)" />
                <div>
                  <strong>{item.skill}</strong>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.reason}</p>
                </div>
              </li>
            ))}
            {(!skillGaps || skillGaps.length === 0) && (
              <p style={{ color: 'var(--text-muted)' }}>Tidak ditemukan gap skill yang signifikan!</p>
            )}
          </ul>
        </div>
      </div>

      {projectRecommendation && (
        <div className="card">
          <h3 className="card-title"><Code size={20} color="var(--primary-color)" /> Actionable Project Recommendation</h3>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Bangun proyek ini untuk menutupi kelemahan Anda dan meningkatkan peluang lolos:</p>
          <div style={{ padding: '1.5rem', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--bg-color)' }}>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>{projectRecommendation.title}</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              {projectRecommendation.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {projectRecommendation.tags && projectRecommendation.tags.map((tag, i) => (
                <span key={i} className="badge badge-warning">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
