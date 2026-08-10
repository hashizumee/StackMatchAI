import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Resumes() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('sm_resumes');
    if (data) {
      setResumes(JSON.parse(data));
    }
  }, []);

  const handleDelete = (filename) => {
    if (window.confirm('Hapus CV ini dari penyimpanan lokal?')) {
      const filtered = resumes.filter(r => r.filename !== filename);
      setResumes(filtered);
      localStorage.setItem('sm_resumes', JSON.stringify(filtered));
    }
  };

  return (
    <div className="card animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="card-title" style={{ marginBottom: 0 }}>
          <FileText size={24} color="var(--primary-color)" /> My Resumes
        </h2>
        <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }} onClick={() => navigate('/upload')}>
          <Plus size={16} /> Upload New
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {resumes.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>Belum ada CV yang tersimpan.</p>
        ) : (
          resumes.map((cv, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--secondary-bg)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(62, 224, 152, 0.1)', borderRadius: 'var(--border-radius-sm)', color: 'var(--primary-color)' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{cv.filename}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Uploaded on {cv.date}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%', color: 'var(--accent-danger)', borderColor: 'rgba(248, 113, 113, 0.3)' }} onClick={() => handleDelete(cv.filename)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
