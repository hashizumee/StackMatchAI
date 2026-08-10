import React from 'react';
import { Bookmark, Building, MapPin, DollarSign } from 'lucide-react';

export default function SavedJobs() {
  const jobs = [
    { title: 'Senior Frontend Engineer', company: 'Tokopedia', location: 'Jakarta, Indonesia', salary: 'Rp 20M - 35M / month', match: '85%' },
    { title: 'Fullstack Web Developer', company: 'Gojek', location: 'Remote', salary: 'Undisclosed', match: '72%' }
  ];

  return (
    <div className="card animate-fade-in">
      <h2 className="card-title">
        <Bookmark size={24} color="var(--primary-color)" /> Saved Jobs
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Job descriptions you've analyzed and saved for future reference.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {jobs.map((job, idx) => (
          <div key={idx} style={{ padding: '1.5rem', background: 'var(--secondary-bg)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{job.title}</h4>
              <div style={{ background: 'rgba(62, 224, 152, 0.1)', color: 'var(--primary-color)', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.875rem' }}>
                {job.match} Match
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building size={16} /> {job.company}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {job.location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={16} /> {job.salary}</span>
            </div>

            <button className="btn btn-outline btn-block" style={{ fontSize: '0.875rem', padding: '0.75rem' }}>
              View Analysis
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
