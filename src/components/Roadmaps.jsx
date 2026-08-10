import React, { useState } from 'react';
import { Map, BookOpen, CheckCircle, Terminal, Server, Smartphone, Database, Lock, Shield, Cpu, Code, BrainCircuit, Activity } from 'lucide-react';

export default function Roadmaps() {
  const [selectedRole, setSelectedRole] = useState('frontend');

  const roles = [
    { id: 'frontend', name: 'Frontend Eng.', icon: <Terminal size={18} /> },
    { id: 'backend', name: 'Backend Dev', icon: <Server size={18} /> },
    { id: 'devops', name: 'DevOps & Cloud', icon: <Database size={18} /> },
    { id: 'mobile', name: 'Mobile Dev', icon: <Smartphone size={18} /> },
    { id: 'ai', name: 'AI / Machine Learning', icon: <BrainCircuit size={18} /> },
    { id: 'security', name: 'Cyber Security', icon: <Shield size={18} /> },
    { id: 'data', name: 'Data Engineer', icon: <Activity size={18} /> },
    { id: 'game', name: 'Game Developer', icon: <Cpu size={18} /> },
    { id: 'fullstack', name: 'Fullstack Eng.', icon: <Code size={18} /> }
  ];

  const roadmapsData = {
    frontend: {
      junior: [
        { title: 'HTML5, Semantic HTML, & Accessibility', status: 'completed' },
        { title: 'CSS3, Flexbox, Grid, & Media Queries', status: 'completed' },
        { title: 'JavaScript (ES6+), DOM Manipulation, Events', status: 'completed' },
        { title: 'Version Control (Git, GitHub, GitLab)', status: 'completed' },
        { title: 'Package Managers (npm/yarn)', status: 'in-progress' }
      ],
      intermediate: [
        { title: 'React.js Fundamentals & Hooks', status: 'in-progress' },
        { title: 'State Management (Redux Toolkit, Zustand, Context)', status: 'locked' },
        { title: 'CSS Architecture (BEM, Tailwind CSS, SASS)', status: 'locked' },
        { title: 'API Integration (Fetch, Axios, REST)', status: 'locked' },
        { title: 'Build Tools (Vite, Webpack)', status: 'locked' },
        { title: 'Unit Testing (Jest, React Testing Library)', status: 'locked' }
      ],
      expert: [
        { title: 'Next.js & Server-Side Rendering (SSR/SSG)', status: 'locked' },
        { title: 'GraphQL & Apollo Client', status: 'locked' },
        { title: 'Web Performance Optimization (Core Web Vitals)', status: 'locked' },
        { title: 'Micro-frontends Architecture & Module Federation', status: 'locked' },
        { title: 'End-to-End Testing (Cypress, Playwright)', status: 'locked' },
        { title: 'PWA (Progressive Web Apps) & Service Workers', status: 'locked' }
      ]
    },
    backend: {
      junior: [
        { title: 'Programming Fundamentals (Node.js/Python/Go)', status: 'completed' },
        { title: 'Basic Terminal / Command Line commands', status: 'completed' },
        { title: 'Relational Databases (PostgreSQL/MySQL)', status: 'in-progress' },
        { title: 'Basic SQL (CRUD operations, Joins)', status: 'locked' },
        { title: 'Building Simple REST APIs', status: 'locked' }
      ],
      intermediate: [
        { title: 'Authentication (JWT, OAuth, Session)', status: 'locked' },
        { title: 'NoSQL Databases (MongoDB, Cassandra)', status: 'locked' },
        { title: 'Advanced Database Design (Indexing, Normalization)', status: 'locked' },
        { title: 'Caching (Redis, Memcached)', status: 'locked' },
        { title: 'Testing (Mocha, Chai, PyTest)', status: 'locked' },
        { title: 'WebSockets & Real-time Communication', status: 'locked' }
      ],
      expert: [
        { title: 'Microservices & Message Brokers (Kafka, RabbitMQ)', status: 'locked' },
        { title: 'GraphQL API Development', status: 'locked' },
        { title: 'High Availability, Load Balancing, & Scaling', status: 'locked' },
        { title: 'System Design & Distributed Systems', status: 'locked' },
        { title: 'Docker Containerization & Deployment', status: 'locked' },
        { title: 'Database Sharding & Replication', status: 'locked' }
      ]
    },
    devops: {
      junior: [
        { title: 'Linux Fundamentals & Shell Scripting', status: 'completed' },
        { title: 'Networking Basics (DNS, TCP/IP, OSI Model)', status: 'in-progress' },
        { title: 'Basic Cloud Concepts (AWS, GCP, Azure)', status: 'locked' },
        { title: 'Server Setup & SSH', status: 'locked' }
      ],
      intermediate: [
        { title: 'Containerization (Docker, Docker Compose)', status: 'locked' },
        { title: 'CI/CD Pipelines (GitHub Actions, Jenkins, GitLab CI)', status: 'locked' },
        { title: 'Infrastructure as Code (Terraform, Ansible)', status: 'locked' },
        { title: 'Web Servers (Nginx, Apache)', status: 'locked' },
        { title: 'Secrets Management (HashiCorp Vault)', status: 'locked' }
      ],
      expert: [
        { title: 'Container Orchestration (Kubernetes, Helm)', status: 'locked' },
        { title: 'Monitoring & Observability (Prometheus, Grafana, ELK)', status: 'locked' },
        { title: 'Service Mesh (Istio, Linkerd)', status: 'locked' },
        { title: 'Site Reliability Engineering (SRE) Practices', status: 'locked' },
        { title: 'Chaos Engineering', status: 'locked' }
      ]
    },
    mobile: {
      junior: [
        { title: 'OOP & Programming Basics (Dart/Kotlin/Swift)', status: 'completed' },
        { title: 'Building Simple UI Layouts', status: 'completed' },
        { title: 'Handling User Input & Forms', status: 'in-progress' },
        { title: 'Lists & Scroll Views', status: 'locked' }
      ],
      intermediate: [
        { title: 'State Management (Provider, Bloc, Redux)', status: 'locked' },
        { title: 'API Integration (REST/GraphQL)', status: 'locked' },
        { title: 'Local Storage (SQLite, Shared Preferences)', status: 'locked' },
        { title: 'App Navigation & Deep Routing', status: 'locked' },
        { title: 'Animations & Custom UI Components', status: 'locked' }
      ],
      expert: [
        { title: 'App Performance & Memory Profiling', status: 'locked' },
        { title: 'Native Modules Integration (JNI/Platform Channels)', status: 'locked' },
        { title: 'Push Notifications & Background Services', status: 'locked' },
        { title: 'Automated Testing (Detox, XCTest, Espresso)', status: 'locked' },
        { title: 'App Store / Play Store Deployment & CI/CD', status: 'locked' }
      ]
    },
    ai: {
      junior: [
        { title: 'Python Fundamentals & Data Structures', status: 'completed' },
        { title: 'Math Basics (Linear Algebra, Calculus, Statistics)', status: 'in-progress' },
        { title: 'Data Manipulation (Pandas, NumPy)', status: 'locked' },
        { title: 'Data Visualization (Matplotlib, Seaborn)', status: 'locked' }
      ],
      intermediate: [
        { title: 'Machine Learning Algorithms (Scikit-Learn)', status: 'locked' },
        { title: 'Deep Learning Basics (Neural Networks)', status: 'locked' },
        { title: 'Frameworks (TensorFlow, PyTorch)', status: 'locked' },
        { title: 'Natural Language Processing (NLP) Basics', status: 'locked' },
        { title: 'Model Evaluation & Hyperparameter Tuning', status: 'locked' }
      ],
      expert: [
        { title: 'Large Language Models (LLMs) & Fine-Tuning', status: 'locked' },
        { title: 'Computer Vision & Convolutional Neural Networks', status: 'locked' },
        { title: 'MLOps & Model Deployment (MLflow, Kubeflow)', status: 'locked' },
        { title: 'Reinforcement Learning', status: 'locked' },
        { title: 'Generative AI (GANs, Diffusion Models)', status: 'locked' }
      ]
    },
    security: {
      junior: [
        { title: 'IT & Networking Fundamentals', status: 'completed' },
        { title: 'Linux & Command Line Kung Fu', status: 'in-progress' },
        { title: 'Basic Cryptography Concepts', status: 'locked' },
        { title: 'Understanding Web Protocols (HTTP/HTTPS)', status: 'locked' }
      ],
      intermediate: [
        { title: 'OWASP Top 10 Vulnerabilities', status: 'locked' },
        { title: 'Web Application Penetration Testing', status: 'locked' },
        { title: 'Network Scanning & Reconnaissance', status: 'locked' },
        { title: 'Security Auditing & Compliance', status: 'locked' },
        { title: 'Intrusion Detection Systems (IDS/IPS)', status: 'locked' }
      ],
      expert: [
        { title: 'Exploit Development', status: 'locked' },
        { title: 'Reverse Engineering & Malware Analysis', status: 'locked' },
        { title: 'Advanced Persistent Threats (APT) Defense', status: 'locked' },
        { title: 'Zero Trust Architecture', status: 'locked' },
        { title: 'Incident Response & Forensics', status: 'locked' }
      ]
    },
    data: {
      junior: [
        { title: 'Advanced SQL Queries', status: 'completed' },
        { title: 'Python for Data Engineering', status: 'in-progress' },
        { title: 'Understanding Data Warehousing (ETL/ELT)', status: 'locked' },
        { title: 'Command Line & Bash Scripting', status: 'locked' }
      ],
      intermediate: [
        { title: 'Data Modeling (Star/Snowflake Schema)', status: 'locked' },
        { title: 'Distributed Processing (Apache Spark)', status: 'locked' },
        { title: 'Cloud Data Warehouses (Snowflake, BigQuery)', status: 'locked' },
        { title: 'Workflow Orchestration (Apache Airflow)', status: 'locked' },
        { title: 'NoSQL & Big Data Stores (HBase, Cassandra)', status: 'locked' }
      ],
      expert: [
        { title: 'Real-time Data Streaming (Kafka, Flink)', status: 'locked' },
        { title: 'Data Lakehouse Architecture (Databricks, Delta Lake)', status: 'locked' },
        { title: 'Data Quality & Governance', status: 'locked' },
        { title: 'Cost Optimization & Performance Tuning', status: 'locked' }
      ]
    },
    game: {
      junior: [
        { title: 'C# or C++ Fundamentals', status: 'completed' },
        { title: 'Math for Game Dev (Vectors, Matrices)', status: 'in-progress' },
        { title: 'Game Engine Basics (Unity or Unreal Engine)', status: 'locked' },
        { title: 'Basic 2D/3D Movement & Physics', status: 'locked' }
      ],
      intermediate: [
        { title: 'Object-Oriented Design Patterns for Games', status: 'locked' },
        { title: 'Animation & Rigging Systems', status: 'locked' },
        { title: 'UI/UX in Games (Canvas, HUD)', status: 'locked' },
        { title: 'Sound Design & Audio Integration', status: 'locked' },
        { title: 'Particle Systems & Visual Effects (VFX)', status: 'locked' }
      ],
      expert: [
        { title: 'Multiplayer Networking & Synchronization', status: 'locked' },
        { title: 'Advanced AI (Pathfinding, Behavior Trees)', status: 'locked' },
        { title: 'Shader Programming (HLSL, GLSL)', status: 'locked' },
        { title: 'Performance Profiling & Memory Management', status: 'locked' },
        { title: 'Console Porting & Publishing', status: 'locked' }
      ]
    },
    fullstack: {
      junior: [
        { title: 'Mastering Frontend Basics (HTML/CSS/JS)', status: 'completed' },
        { title: 'Mastering Backend Basics (Node/Python)', status: 'completed' },
        { title: 'Connecting Frontend to Backend (REST APIs)', status: 'in-progress' },
        { title: 'Basic Database Integration (SQL/NoSQL)', status: 'locked' }
      ],
      intermediate: [
        { title: 'Fullstack Frameworks (Next.js / Nuxt.js)', status: 'locked' },
        { title: 'Authentication Strategies (JWT, NextAuth)', status: 'locked' },
        { title: 'State Management across Client & Server', status: 'locked' },
        { title: 'Deployment (Vercel, Railway, Render)', status: 'locked' },
        { title: 'Version Control & CI/CD Pipelines', status: 'locked' }
      ],
      expert: [
        { title: 'System Architecture & Scalability', status: 'locked' },
        { title: 'Microservices & Mono-repos (Turborepo)', status: 'locked' },
        { title: 'Advanced Performance Tuning', status: 'locked' },
        { title: 'Security Best Practices (OWASP, Rate Limiting)', status: 'locked' },
        { title: 'Real-time Data (WebSockets, Server-Sent Events)', status: 'locked' }
      ]
    }
  };

  const currentRoadmap = roadmapsData[selectedRole];

  const renderLevel = (levelName, items) => {
    if (!items || items.length === 0) return null;
    return (
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-color)', marginBottom: '1.5rem', textTransform: 'capitalize', display: 'inline-block', borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem' }}>
          {levelName} Level
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '23px', top: '24px', bottom: '24px', width: '2px', background: 'var(--card-border)' }}></div>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 1 }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                background: item.status === 'completed' ? 'var(--primary-color)' : item.status === 'in-progress' ? 'var(--secondary-bg)' : 'var(--bg-color)',
                border: `2px solid ${item.status === 'completed' ? 'var(--primary-color)' : item.status === 'in-progress' ? 'var(--primary-color)' : 'var(--card-border)'}`,
                color: item.status === 'completed' ? '#000' : 'var(--text-main)'
              }}>
                {item.status === 'completed' ? <CheckCircle size={24} /> : item.status === 'locked' ? <Lock size={20} color="var(--text-muted)" /> : <BookOpen size={20} />}
              </div>
              <div style={{ flex: 1, padding: '1.25rem', background: 'var(--secondary-bg)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)' }}>
                <h4 style={{ fontSize: '1.125rem', color: item.status === 'locked' ? 'var(--text-muted)' : 'var(--text-main)' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'Continue Learning →' : 'Locked'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="card animate-fade-in" style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 className="card-title" style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>
          <Map size={32} color="var(--primary-color)" /> Complete Skill Roadmaps
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
          Pilih spesialisasi yang Anda inginkan dan ikuti kurikulum ekstensif dari tahap Junior hingga Expert.
        </p>
      </div>
      
      {/* Role Selection Grid */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        overflowX: 'auto', 
        paddingBottom: '1.5rem', 
        marginBottom: '3rem',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--primary-color) var(--secondary-bg)'
      }}>
        {roles.map(role => (
          <button 
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem',
              background: selectedRole === role.id ? 'rgba(62, 224, 152, 0.1)' : 'var(--secondary-bg)',
              border: `1px solid ${selectedRole === role.id ? 'var(--primary-color)' : 'var(--card-border)'}`,
              color: selectedRole === role.id ? 'var(--primary-color)' : 'var(--text-main)',
              borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontWeight: '600',
              transition: 'all 0.2s', whiteSpace: 'nowrap', fontSize: '1rem'
            }}
          >
            {role.icon} {role.name}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        {renderLevel('junior', currentRoadmap?.junior)}
        {renderLevel('intermediate', currentRoadmap?.intermediate)}
        {renderLevel('expert', currentRoadmap?.expert)}
      </div>
    </div>
  );
}
