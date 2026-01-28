import React from 'react';

export default function ProjectModal({ project, onClose }) {
  return (
    <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.95)' }} onClick={onClose}>
      <div className="modal-dialog modal-xl modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header border-0">
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body p-5">
            <div className="row">
              <div className="col-lg-7">
                <h1 className="display-3 fw-bold gradient-text">{project.title}</h1>
                <p className="lead mt-4 text-light">{project.desc}</p>
                <div className="mt-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="badge-tech me-3 mb-3">{t}</span>
                  ))}
                </div>
                <div className="mt-5">
                  {project.github && (
                    <a href={project.github} target="_blank" className="btn btn-gradient btn-lg me-3">
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" className="btn btn-outline-cyan btn-lg">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              <div className="col-lg-5 text-center">
                <div className="display-1 fw-bold opacity-10 gradient-text">
                  0{project.id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}