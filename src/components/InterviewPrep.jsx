import React from 'react';
import { MessageSquare, Play, HelpCircle } from 'lucide-react';

export default function InterviewPrep() {
  const questions = [
    { q: "How does React's Virtual DOM work?", category: "React.js", difficulty: "Medium" },
    { q: "Explain the difference between a Container and an Image in Docker.", category: "DevOps", difficulty: "Easy" },
    { q: "How would you optimize the performance of a large React application?", category: "Architecture", difficulty: "Hard" }
  ];

  return (
    <div className="card animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="card-title" style={{ marginBottom: 0 }}>
          <MessageSquare size={24} color="var(--primary-color)" /> Tech Interview Prep
        </h2>
        <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
          <Play size={16} /> Start Mock Interview
        </button>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Practicing questions tailored for <strong>Senior Frontend Engineer</strong> positions.
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {questions.map((item, idx) => (
          <div key={idx} style={{ padding: '1.5rem', background: 'var(--secondary-bg)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge badge-outline">{item.category}</span>
              <span className={`badge ${item.difficulty === 'Easy' ? 'badge-success' : item.difficulty === 'Medium' ? 'badge-warning' : 'badge-danger'}`}>
                {item.difficulty}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <HelpCircle size={24} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
              <h4 style={{ fontSize: '1.125rem', lineHeight: '1.5' }}>{item.q}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
