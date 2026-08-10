import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchGithubProfile } from '../services/githubApi';
import { extractTextFromPDF } from '../services/pdfParser';
import { analyzePortfolio } from '../services/aiAnalyzer';
import { AlertCircle } from 'lucide-react';

const MESSAGES = [
  "Menyambungkan ke GitHub API...",
  "Mengekstrak teks dari CV PDF Anda...",
  "Mengirim data ke AI untuk dicocokkan dengan Job Description...",
  "Menyusun rekomendasi proyek...",
  "Menganalisis skill gap..."
];

export default function LoadingState() {
  const location = useLocation();
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Rotasi pesan loading
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const { github, jd, file } = location.state || {};
        if (!github || !jd || !file) {
          throw new Error('Data tidak lengkap. Silakan ulangi proses upload.');
        }

        // 1. Fetch GitHub
        const githubData = await fetchGithubProfile(github);
        
        // 2. Parse PDF
        const cvText = await extractTextFromPDF(file);

        // 3. AI Analysis
        const result = await analyzePortfolio(cvText, githubData, jd);

        // 4. Save to LocalStorage History
        const newHistoryItem = {
          id: '#ANL-' + Math.floor(1000 + Math.random() * 9000),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          role: jd.substring(0, 30) + '...', // We don't have a specific title, so just use a snippet
          score: result.matchScore,
          status: 'Completed',
          result,
          cvText,
          jdText: jd,
          filename: file.name
        };

        const currentHistory = JSON.parse(localStorage.getItem('sm_history') || '[]');
        localStorage.setItem('sm_history', JSON.stringify([newHistoryItem, ...currentHistory]));

        // 5. Save CV Text to My Resumes
        const currentResumes = JSON.parse(localStorage.getItem('sm_resumes') || '[]');
        if (!currentResumes.find(r => r.filename === file.name)) {
          localStorage.setItem('sm_resumes', JSON.stringify([{ filename: file.name, cvText, date: newHistoryItem.date }, ...currentResumes]));
        }

        // 6. Go to Dashboard
        navigate('/dashboard', { 
          state: { 
            result, 
            cvText, 
            jdText: jd, 
            filename: file.name,
            githubData 
          } 
        });

      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat memproses data.');
      }
    };

    runAnalysis();
  }, [location, navigate]);

  if (error) {
    return (
      <div className="loading-container">
        <AlertCircle size={48} color="var(--accent-danger)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--accent-danger)' }}>Analisis Gagal</h2>
        <p style={{ color: 'var(--text-main)', maxWidth: '400px', marginBottom: '1.5rem' }}>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate('/upload')}>Kembali ke Upload</button>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Analyzing Portfolio...</h2>
      <p style={{ color: 'var(--primary-color)', maxWidth: '400px', fontWeight: '500', transition: 'all 0.3s ease' }}>
        {MESSAGES[msgIndex]}
      </p>
    </div>
  );
}
