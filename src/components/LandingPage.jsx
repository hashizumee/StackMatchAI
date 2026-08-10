import React from 'react';
import { ArrowRight, TerminalSquare, Brain, Target, Code, CheckCircle, Zap } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-container animate-fade-in">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="badge-pill">✨ AI-Powered Portfolio Analyzer</div>
        <h1>
          Analisis Portofolio Dev Anda <br />
          <span className="highlight-text">Akurat, Cerdas, & Tanpa Ribet.</span>
        </h1>
        <p className="hero-subtitle">
          Solusi cerdas membandingkan kecocokan CV dan riwayat GitHub Anda dengan Job Description target. Temukan <i>skill gap</i>, dapatkan rekomendasi proyek, dan tingkatkan peluang karir.
        </p>
        
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onStart}>
            <TerminalSquare size={20} /> Mulai Analisis Sekarang <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Kenapa Menggunakan DevAnalyzer?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Brain size={28} /></div>
            <h3>AI Matching</h3>
            <p>Algoritma cerdas yang tidak hanya mencocokkan kata kunci, tapi memahami konteks skill dari CV dan GitHub Anda.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Target size={28} /></div>
            <h3>Skill Gap Analysis</h3>
            <p>Ketahui secara presisi skill apa saja yang kurang dan sangat dibutuhkan oleh perusahaan target Anda.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Code size={28} /></div>
            <h3>Project Recommendations</h3>
            <p>Dapatkan ide proyek konkrit yang perlu Anda bangun untuk menutupi kelemahan portofolio Anda.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">Cara Kerja Sangat Mudah</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Upload Data</h4>
              <p>Unggah file CV PDF Anda dan masukkan username GitHub.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Paste Job Description</h4>
              <p>Masukkan deskripsi pekerjaan dari lowongan yang ingin Anda lamar.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Terima Hasil</h4>
              <p>AI akan memproses dan memberikan skor kecocokan serta evaluasi mendalam.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Siap Meningkatkan Karir Anda?</h2>
        <p>Jangan asal melamar. Persiapkan portofolio Anda secara presisi dengan bantuan AI.</p>
        <button className="btn btn-primary" onClick={onStart}>
          <Zap size={20} /> Coba Gratis Sekarang
        </button>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 DevAnalyzer AI. Dibangun untuk Developer oleh Developer.</p>
      </footer>
    </div>
  );
}
