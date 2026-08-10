import React, { useState, useEffect } from 'react';
import { Bookmark, FileText, Calendar, Trash2 } from 'lucide-react';

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('sm_saved_jobs');
    if (data) {
      setJobs(JSON.parse(data));
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Hapus lowongan ini dari penyimpanan lokal?')) {
      const filtered = jobs.filter(j => j.id !== id);
      setJobs(filtered);
      localStorage.setItem('sm_saved_jobs', JSON.stringify(filtered));
    }
  };

  return (
    <div className="card animate-fade-in">
      <h2 className="card-title">
        <Bookmark size={24} color="var(--primary-color)" /> Saved Jobs
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Job descriptions you've saved for future reference.
      </p>

      {jobs.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>Belum ada lowongan yang disimpan.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {jobs.map((job) => (
            <div key={job.id} style={{ padding: '1.5rem', background: 'var(--secondary-bg)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Job Snippet</h4>
                <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', borderRadius: '50%', color: 'var(--accent-danger)', borderColor: 'rgba(248, 113, 113, 0.3)' }} onClick={() => handleDelete(job.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={16} /> {job.snippet}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> Saved on {job.date}</span>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', maxHeight: '100px', overflowY: 'auto' }}>
                {job.fullText}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
