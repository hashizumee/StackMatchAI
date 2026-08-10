import React from 'react';

export default function LoadingState() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Analyzing Portfolio...</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
        AI is scanning your CV, exploring your GitHub repositories, and matching your skills against the Job Description.
      </p>
    </div>
  );
}
