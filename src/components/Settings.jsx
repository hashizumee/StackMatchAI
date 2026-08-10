import React from 'react';
import { Settings as SettingsIcon, User, Key, Bell } from 'lucide-react';

export default function Settings() {
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
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="form-control" defaultValue="John Doe" />
            </div>
            <div className="form-group">
              <label>Default GitHub Username</label>
              <input type="text" className="form-control" defaultValue="johndoe123" />
            </div>
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>

        {/* API Keys (Future Integration) */}
        <div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={18} color="var(--text-muted)" /> API Connections
          </h3>
          <div style={{ background: 'var(--secondary-bg)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Connect your own OpenAI or Anthropic API key to unlock unlimited premium analysis.
            </p>
            <div className="form-group">
              <label>OpenAI API Key</label>
              <input type="password" className="form-control" placeholder="sk-..." />
            </div>
            <button className="btn btn-outline">Verify Key</button>
          </div>
        </div>

      </div>
    </div>
  );
}
