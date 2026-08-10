import React from 'react';
import { FileText, Plus, Trash2, Eye } from 'lucide-react';

export default function Resumes() {
  const resumes = [
    { id: 1, name: 'CV_Frontend_Dev_2025.pdf', date: '12 Oct 2025', size: '2.1 MB' },
    { id: 2, name: 'Resume_Fullstack_Go.pdf', date: '05 Sep 2025', size: '1.8 MB' }
  ];

  return (
    <div className="card animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="card-title" style={{ marginBottom: 0 }}>
          <FileText size={24} color="var(--primary-color)" /> My Resumes
        </h2>
        <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
          <Plus size={16} /> Upload New
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {resumes.map(cv => (
          <div key={cv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--secondary-bg)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{cv.name}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Uploaded on {cv.date} • {cv.size}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                <Eye size={18} />
              </button>
              <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%', color: 'var(--accent-danger)', borderColor: 'rgba(248, 113, 113, 0.3)' }}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
