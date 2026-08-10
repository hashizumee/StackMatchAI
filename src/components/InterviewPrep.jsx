import React, { useState, useEffect } from 'react';
import { MessageSquare, Play, HelpCircle, Loader2 } from 'lucide-react';

export default function InterviewPrep() {
  const [historyData, setHistoryData] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('sm_history');
    if (data) {
      setHistoryData(JSON.parse(data));
    }
  }, []);

  const handleGenerate = async () => {
    if (!selectedAnalysis) return;
    setLoading(true);
    setError('');
    setQuestions([]);
    
    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cvText: selectedAnalysis.cvText, 
          jdText: selectedAnalysis.jdText 
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="card-title" style={{ marginBottom: 0 }}>
          <MessageSquare size={24} color="var(--primary-color)" /> Tech Interview Prep
        </h2>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Past Analysis to Prepare For:</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            className="form-control" 
            style={{ flex: 1 }} 
            onChange={(e) => setSelectedAnalysis(historyData.find(h => h.id === e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>-- Select Analysis --</option>
            {historyData.map(h => (
              <option key={h.id} value={h.id}>{h.id} - {h.role} ({h.date})</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleGenerate} disabled={!selectedAnalysis || loading}>
            {loading ? <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Loader2 size={16} className="spinner" /> Generating...</span> : <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Play size={16} /> Start Mock Interview</span>}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {questions.length > 0 && (
        <>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Pertanyaan disesuaikan berdasarkan kelemahan dan kecocokan Anda pada <strong>{selectedAnalysis?.role}</strong>.
          </p>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {questions.map((item, idx) => (
              <div key={idx} style={{ padding: '1.5rem', background: 'var(--secondary-bg)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <HelpCircle size={24} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <h4 style={{ fontSize: '1.125rem', lineHeight: '1.5', marginBottom: '0.5rem' }}>{item.question}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}><strong>Alasan:</strong> {item.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
