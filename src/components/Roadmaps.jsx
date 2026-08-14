import React, { useState, useEffect } from 'react';
import { Map, Play, BookOpen, CheckCircle, ExternalLink, Loader2, RefreshCcw, Briefcase } from 'lucide-react';

export default function Roadmaps() {
  const [historyData, setHistoryData] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
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
    setRoadmap([]);
    
    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          skillGaps: selectedAnalysis.result.skillGaps,
          role: selectedAnalysis.role 
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate roadmap');
      }

      const data = await response.json();
      setRoadmap(data.roadmap);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-fade-in" style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 className="card-title" style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>
          <Map size={32} color="var(--primary-color)" /> Personalized Skill Roadmap
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
          Buat kurikulum belajar khusus yang berfokus pada "Skill Gaps" Anda agar lebih siap melamar posisi impian.
        </p>
      </div>

      <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'var(--secondary-bg)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '500', fontSize: '1.1rem' }}>Pilih Hasil Analisis CV Terakhir:</label>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select 
            className="form-control" 
            style={{ flex: 1, minWidth: '250px' }} 
            onChange={(e) => setSelectedAnalysis(historyData.find(h => h.id === e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>-- Pilih Analisis --</option>
            {historyData.map(h => (
              <option key={h.id} value={h.id}>{h.id} - {h.role} ({h.date})</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleGenerate} disabled={!selectedAnalysis || loading}>
            {loading ? <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Loader2 size={16} className="spinner" /> Meracik Kurikulum...</span> : <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Play size={16} /> Generate Roadmap</span>}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {roadmap.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem', display: 'inline-block' }}>
            Kurikulum Spesifik: {selectedAnalysis?.role}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '23px', top: '24px', bottom: '24px', width: '2px', background: 'var(--card-border)' }}></div>
            
            {roadmap.map((module, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', zIndex: 1 }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: 'var(--bg-color)',
                  border: '2px solid var(--primary-color)',
                  color: 'var(--text-main)',
                  marginTop: '0.5rem'
                }}>
                  <BookOpen size={20} />
                </div>
                
                <div style={{ flex: 1, padding: '1.5rem', background: 'var(--secondary-bg)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Modul {idx + 1}: {module.title}</h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>{module.description}</p>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h5 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Topik yang akan dipelajari:</h5>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                      {module.topics.map((topic, tIdx) => (
                        <li key={tIdx} style={{ marginBottom: '0.25rem' }}>{topic}</li>
                      ))}
                    </ul>
                  </div>

                  {module.resources && module.resources.length > 0 && (
                    <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
                      <h5 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>Referensi Belajar:</h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {module.resources.map((resource, rIdx) => (
                          <a key={rIdx} href={resource.url} target="_blank" rel="noopener noreferrer" 
                             style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '500' }}>
                            <ExternalLink size={16} /> {resource.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Next Steps Section */}
          <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(62, 224, 152, 0.05)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--primary-color)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Apa Selanjutnya?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Setelah Anda menyelesaikan semua modul belajar di atas dan mengimplementasikannya dalam portofolio Anda, segera perbarui CV Anda.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <CheckCircle size={20} color="var(--primary-color)" /> Update CV & Portfolio
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <RefreshCcw size={20} color="var(--primary-color)" /> Re-upload & Analisis Ulang
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <Briefcase size={20} color="var(--primary-color)" /> Apply Pekerjaan!
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
