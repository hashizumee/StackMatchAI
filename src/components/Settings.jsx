import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Key, CheckCircle } from 'lucide-react';

export default function Settings() {
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('sm_settings');
    if (data) {
      const parsed = JSON.parse(data);
      setName(parsed.name || '');
      setGithub(parsed.github || '');
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('sm_settings', JSON.stringify({ name, github }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="card animate-fade-in">
      <h2 className="card-title">
        <SettingsIcon size={24} color="var(--primary-color)" /> Account Settings
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginTop: '2rem' }}>
        
        {/* Profile Details */}
        <div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} color="var(--text-muted)" /> Profile Details
          </h3>
          <div style={{ background: 'var(--secondary-bg)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              Data disimpan secara lokal di browser Anda.
            </p>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Default GitHub Username</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="johndoe123" 
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
              {saved && <span style={{ color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18} /> Tersimpan</span>}
            </div>
          </div>
        </div>

        {/* API Keys (Moved to Server) */}
        <div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={18} color="var(--text-muted)" /> API Connections
          </h3>
          <div style={{ background: 'var(--secondary-bg)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              API Key Anda saat ini dikonfigurasi dan diamankan di sisi server (Vercel Environment Variables). Tidak perlu konfigurasi klien.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
