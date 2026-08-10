import React, { useState } from 'react';
import { Upload, GitBranch, Briefcase, Search, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UploadModule() {
  const navigate = useNavigate();
  const [github, setGithub] = useState('');
  const [jd, setJd] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.type !== 'application/pdf') {
        setError('Mohon unggah file dengan format PDF.');
        setFile(null);
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setError('Ukuran file maksimal adalah 5MB.');
        setFile(null);
        return;
      }
      setError('');
      setFile(selected);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Harap unggah CV PDF Anda terlebih dahulu.');
      return;
    }
    if (!github.trim()) {
      setError('Username GitHub wajib diisi.');
      return;
    }
    if (jd.trim().length < 50) {
      setError('Job Description terlalu singkat. Minimal 50 karakter.');
      return;
    }

    // Navigasi ke halaman loading sambil membawa data formulir
    navigate('/loading', { state: { github: github.trim(), jd: jd.trim(), file } });
  };

  return (
    <div className="card">
      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="split-grid">
        {/* Left Column */}
        <div>
          <div className="form-group">
            <label>1. Upload CV (PDF)</label>
            <div className="upload-box" style={{ borderColor: file ? 'var(--primary-color)' : 'var(--card-border)' }}>
              <Upload size={36} color={file ? "var(--primary-color)" : "var(--text-muted)"} style={{ marginBottom: '1rem' }} />
              {file ? (
                <p style={{ color: 'var(--primary-color)', fontWeight: '600', marginBottom: '0.25rem' }}>{file.name}</p>
              ) : (
                <>
                  <p style={{ color: 'var(--text-main)', fontWeight: '500', marginBottom: '0.25rem' }}>Drop your CV here</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>PDF format, up to 5MB</p>
                </>
              )}
              <input 
                type="file" 
                accept=".pdf" 
                style={{ display: 'none' }} 
                id="cv-upload"
                onChange={handleFileChange}
              />
              <button type="button" className="btn btn-outline" onClick={() => document.getElementById('cv-upload').click()}>
                {file ? 'Change File' : 'Browse Files'}
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
