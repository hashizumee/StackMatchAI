import React from 'react';
import { History as HistoryIcon, ArrowRight } from 'lucide-react';

export default function History() {
  const historyData = [
    { id: '#ANL-003', role: 'Senior React Developer', date: 'Oct 14, 2026', score: 85, status: 'Completed' },
    { id: '#ANL-002', role: 'Backend Node.js Engineer', date: 'Sep 28, 2026', score: 60, status: 'Completed' },
    { id: '#ANL-001', role: 'Fullstack Dev', date: 'Aug 10, 2026', score: 72, status: 'Completed' }
  ];

  return (
    <div className="card animate-fade-in">
      <h2 className="card-title">
        <HistoryIcon size={24} color="var(--primary-color)" /> Analysis History
      </h2>
      
      <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Analysis ID</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Target Role</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Date</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Match Score</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>{row.id}</td>
                <td style={{ padding: '1.25rem 1rem', fontWeight: '600' }}>{row.role}</td>
                <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>{row.date}</td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <span className={`badge ${row.score >= 80 ? 'badge-success' : row.score >= 70 ? 'badge-warning' : 'badge-danger'}`}>
                    {row.score}%
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                    View <ArrowRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
