import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Phone, Download, X, Menu, Code2, Briefcase, User, Home, FileText, MessageSquare } from 'lucide-react';
import './portfolio.css';
import profilePic from '../assets/profile.jpg';
const RESUME_DRIVE_LINK = "https://drive.google.com/uc?export=download&id=1W28QHKAQ5UrHACWaVx0lnv2gJnEUDTkq";

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
];

const skills = {
  'Programming Languages': {
    items: ['Java', 'Python', 'C', 'JavaScript'],
    icon: '💻',
    color: '#06b6d4'
  },
  'Web Technologies': {
    items: ['HTML', 'CSS', 'Tailwind CSS', 'REST APIs'],
    icon: '🌐',
    color: '#6366f1'
  },
  'Frameworks & Libraries': {
    items: ['React.js', 'Node.js', 'Express.js', 'Spring Boot'],
    icon: '⚛️',
    color: '#a855f7'
  },
  'Databases': {
    items: ['MongoDB', 'MySQL', 'Firebase'],
    icon: '🗄️',
    color: '#10b981'
  },
  'Tools & Platforms': {
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Netlify', 'Hostinger'],
    icon: '🛠️',
    color: '#f59e0b'
  },
};

const projects = [
  {
    title: "LMS Platform",
    desc: "Full-featured Learning Management System with live classes, quizzes, assignments, progress tracking, and real-time analytics dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com/Abuthahir31/lms-platform",
    live: "https://lms-demo-abuthahir.netlify.app"
  },
  {
    title: "HRMS",
    desc: "Enterprise-grade HR system with payroll automation, biometric attendance, leave management, and AI performance insights.",
    tech: ["React", "Express", "MongoDB", "JWT", "Firebase"],
    github: "https://github.com/Abuthahir31/hrms-pro",
    live: "https://hrms-pro-abuthahir.netlify.app"
  },
  {
    title: "E-Commerce Hub",
    desc: "Multi-vendor marketplace with Stripe/PayPal payments, real-time chat, order tracking, and review system.",
    tech: ["React", "Node.js", "MongoDB", "Firebase"],
    github: "https://github.com/Abuthahir31/ecommerce-hub",
    live: "https://ecomhub-abuthahir.vercel.app"
  },
  {
    title: "Exam Shield",
    desc: "AI-powered online proctoring system with face detection, tab switch alerts, and screen recording.",
    tech: ["React.js", "Node.js", "WebSocket", "MongoDB", "Firebase", "Express.js"],
    github: "https://github.com/Abuthahir31/exam-shield"
  },
  {
    title: "NewsFlow",
    desc: "Real-time news aggregator with live comments, dark mode, and personalized feeds using Firebase.",
    tech: ["React", "Firebase", "Node.js", "MongoDB", "Express.js"],
    github: "https://github.com/Abuthahir31/newsflow",
    live: "https://newsflow-abuthahir.web.app"
  },
];

function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">
          <X size={32} />
        </button>
        <div className="row g-4">
          <div className="col-lg-6">
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-desc">{project.desc}</p>
            <div className="tech-tags">
              {project.tech.map((t, i) => (
                <span key={i} className="badge tech-badge">{t}</span>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="project-number">
              0{projects.indexOf(project) + 1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  const texts = ['MERN Stack Developer', 'MCA Graduate'];

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('.project-card') ||
        e.target.closest('.skill-card') ||
        e.target.closest('.nav-item')) {
        setCursorHover(true);
      } else {
        setCursorHover(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setTypedText(
        isDeleting
          ? fullText.substring(0, typedText.length - 1)
          : fullText.substring(0, typedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsSidebarOpen(false);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('syedabuthahirabbas53@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        className={`custom-cursor ${cursorHover ? 'cursor-hover' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div
        className="custom-cursor-dot"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2 className="sidebar-logo">SYED</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="sidebar-close d-lg-none">
              <X size={28} />
            </button>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                >
                  <Icon size={24} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="mobile-menu-btn d-lg-none"
      >
        <Menu size={28} />
      </button>

      <div className="main-content">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6 fade-in">
                <h1 className="hero-title">
                  Syed Abuthahir
                  <span className="hero-name-highlight">Appas B</span>
                </h1>
                <div className="hero-subtitle">
                  {typedText}<span className="cursor">|</span>
                </div>
                <p className="hero-description">
                  Master of Computer Applications (MCA) • Building scalable, real-time web applications with MERN stack
                </p>
                <div className="hero-buttons">
                  <button onClick={copyEmail} className="btn btn-primary btn-hero">
                    {copied ? 'Copied!' : 'Copy Email'}
                  </button>
                  <a href="tel:+916382659368" className="btn btn-outline btn-hero">
                    Call Me
                  </a>
                </div>
              </div>
              <div className="col-lg-6 fade-in delay-1">
                <div className="profile-image-wrapper">
                  <img
                    src={profilePic}
                    alt="Syed Abuthahir Appas B"
                    className="profile-image"
                  />
                  <div className="profile-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <p className="about-text">
              MCA Graduate | MERN Stack Developer | Passionate about creating high-performance,
              real-time web applications using React, Node.js, MongoDB, and modern tools.
              Skilled in full-stack development, AI integrations, and scalable architectures.
              Currently seeking challenging opportunities to contribute and grow.
            </p>
          </div>
        </section>

        {/* Skills Section - Updated */}
        <section id="skills" className="skills-section">
          <div className="container">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
              {Object.entries(skills).map(([category, data]) => (
                <div key={category} className="skill-card-modern">
                  <div className="skill-card-header">
                    <span className="skill-icon">{data.icon}</span>
                    <h3 className="skill-category-modern">{category}</h3>
                  </div>
                  <div className="skill-items-grid">
                    {data.items.map((skill, idx) => (
                      <div
                        key={skill}
                        className="skill-item"
                        style={{
                          animationDelay: `${idx * 0.1}s`,
                          '--skill-color': data.color
                        }}
                      >
                        <span className="skill-dot"></span>
                        <span className="skill-text">{skill}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="skill-card-glow"
                    style={{ background: `radial-gradient(circle at center, ${data.color}30, transparent)` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="container">
            <h2 className="section-title">MERN Projects</h2>
            <div className="row g-4">
              {projects.map((p, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div className="project-card" onClick={() => setSelectedProject(p)}>
                    <div className="project-header">
                      <div className="project-index">0{i + 1}</div>
                    </div>
                    <div className="project-body">
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-desc">{p.desc.substring(0, 100)}...</p>
                      <div className="project-footer">Click to view</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="resume-section">
          <div className="container">
            <h2 className="section-title">Resume</h2>
            <div className="resume-card">
              <a
                href={RESUME_DRIVE_LINK}
                download="Syed_Abuthahir_Resume_MCA.pdf"
                className="btn btn-download"
              >
                <Download size={32} />
                <span>Download Resume (PDF)</span>
              </a>
              <p className="resume-subtitle">MCA Graduate • MERN Stack Developer • 2025</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-card">
              <div className="contact-info">
                <div className="contact-item">
                  <Mail className="contact-icon" size={32} />
                  <span>syedabuthahirabbas53@gmail.com</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" size={32} />
                  <span>+91 6382659368</span>
                </div>
              </div>
              <a href="mailto:syedabuthahirabbas53@gmail.com?subject=Hiring%20Inquiry%20-%20MERN%20Stack%20Developer&body=Hi%20Syed%20Abuthahir,%0D%0A%0D%0AI%20am%20interested%20in%20discussing%20a%20potential%20opportunity%20with%20you.%0D%0A%0D%0A" className="btn btn-hire">
                Hire Me Now
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          © 2025 Syed Abuthahir Appas B • MCA Graduate • MERN Stack Developer • Made with passion in India
        </footer>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
}