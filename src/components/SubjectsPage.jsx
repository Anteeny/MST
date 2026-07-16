import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesList } from '../data/coursesData';
import Navbar from './Navbar';
import Footer from './Footer';
import './SubjectsPage.css';

export default function SubjectsPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subjects = [
    {
      name: "School of Healing",
      icon: "🌱",
      description: "Equipping leaders and support teams with counseling keys, trauma-informed methodologies, and recovery models to restore hearts, minds, and lives.",
      tag: "healing"
    },
    {
      name: "School of Money",
      icon: "🪙",
      description: "Empowering leaders with stewardship structures, financial intelligence, and resource development frameworks to fuel sustainable impact.",
      tag: "finance"
    },
    {
      name: "School of Leadership",
      icon: "🏢",
      description: "Building administrative systems, project coordination keys, operational policies, and administrative excellence for healthy, scalable teams.",
      tag: "leadership"
    }
  ];

  // Helper to count courses matching a subject
  const getCourseCount = (subjectName) => {
    return coursesList.filter(course => course.subject === subjectName).length;
  };

  return (
    <div className="subjects-page-layout">
      {/* Navbar */}
      <Navbar />

      {/* Sub-hero Breadcrumb Banner */}
      <section className="subjects-hero-banner">
        <div className="subjects-banner-container">
          <div className="subjects-breadcrumbs">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Subjects</span>
          </div>
          <h1 className="subjects-banner-title">Our Subjects</h1>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="subjects-main-content">
        <div className="subjects-container">
          <p className="subjects-intro-text">
            Explore our foundational academic schools. Each school is curated with specialized programs designed to empower you in personal transformation, stewardship, and leadership.
          </p>

          <div className="subjects-grid">
            {subjects.map((subject, index) => {
              const count = getCourseCount(subject.name);
              return (
                <div key={index} className="subject-card">
                  <div className="subject-card-header">
                    <span className="subject-icon">{subject.icon}</span>
                    <span className="subject-badge">{count} {count === 1 ? 'Course' : 'Courses'}</span>
                  </div>
                  
                  <div className="subject-card-body">
                    <h2 className="subject-card-title">{subject.name}</h2>
                    <p className="subject-card-desc">{subject.description}</p>
                  </div>

                  <div className="subject-card-footer">
                    <Link to={`/courses?subject=${encodeURIComponent(subject.name)}`} className="btn btn-primary view-subject-btn">
                      Explore Courses &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
