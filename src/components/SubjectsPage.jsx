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
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Equipping leaders and support teams with counseling keys, trauma-informed methodologies, and recovery models to restore hearts, minds, and lives.",
      tag: "healing"
    },
    {
      name: "School of Money",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Empowering leaders with stewardship structures, financial intelligence, and resource development frameworks to fuel sustainable impact.",
      tag: "finance"
    },
    {
      name: "School of Leadership",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
          <div className="subjects-grid">
            {subjects.map((subject, index) => {
              const count = getCourseCount(subject.name);
              return (
                <div key={index} className="subject-card">
                  <div className="subject-card-image-wrapper">
                    <img src={subject.image} alt={subject.name} className="subject-card-image" />
                    <span className="subject-badge">{count} {count === 1 ? 'Course' : 'Courses'}</span>
                  </div>
                  
                  <div className="subject-card-details">
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
