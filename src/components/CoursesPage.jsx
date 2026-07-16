import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { coursesList } from '../data/coursesData';
import Navbar from './Navbar';
import Footer from './Footer';
import './CoursesPage.css';

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSubject = searchParams.get('subject') || 'All';

  // Scroll to top on page load or filter search changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSubject]);

  const handleTabClick = (subject) => {
    if (subject === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ subject });
    }
  };

  // Filter courses list based on chosen active subject classification
  const filteredCourses = activeSubject === 'All'
    ? coursesList
    : coursesList.filter(course => course.subject === activeSubject);

  return (
    <div className="courses-page-layout">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Banner Header */}
      <section className="courses-hero-banner">
        <div className="courses-banner-container">
          <div className="courses-breadcrumbs">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Our Courses</span>
          </div>
          <h1 className="courses-banner-title">Our Courses</h1>
        </div>
      </section>

      {/* Grid Content Section */}
      <main className="courses-grid-section">
        <div className="courses-grid-container">
          
          {/* Interactive Subject Filter Tabs */}
          <div className="filter-tabs-container">
            {['All', 'School of Healing', 'School of Money', 'School of Leadership'].map((sub) => (
              <button
                key={sub}
                onClick={() => handleTabClick(sub)}
                className={`filter-tab ${activeSubject === sub ? 'active' : ''}`}
              >
                {sub}
              </button>
            ))}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="empty-courses-state">
              <p>No courses found under this subject.</p>
            </div>
          ) : (
            <div className="courses-grid">
              {filteredCourses.map((course) => {
                // Create star rating elements
                const fullStars = Math.floor(course.rating);
                const hasHalfStar = course.rating % 1 !== 0;
                const stars = [];
                for (let i = 0; i < 5; i++) {
                  if (i < fullStars) {
                    stars.push(<span key={i} className="star-filled">&#9733;</span>);
                  } else if (i === fullStars && hasHalfStar) {
                    stars.push(<span key={i} className="star-half">&#9733;</span>);
                  } else {
                    stars.push(<span key={i} className="star-empty">&#9734;</span>);
                  }
                }

                return (
                  <div key={course.id} className="courses-card">
                    <div className="courses-card-image-wrapper">
                      <img src={course.image} alt={course.title} className="courses-card-image" />
                    </div>
                    
                    <div className="courses-card-details">
                      <span className="courses-card-tag">#{course.category}</span>
                      <h3 className="courses-card-title">{course.title}</h3>
                      
                      <div className="courses-card-meta">
                        <div className="meta-item">
                          <span className="meta-icon">📚</span>
                          <span>{course.lessonsCount} Lessons</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon">⏱️</span>
                          <span>{course.duration}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon">💬</span>
                          <span>Group Chat</span>
                        </div>
                      </div>

                      <div className="courses-card-rating">
                        <div className="stars-wrapper">{stars}</div>
                        <span className="reviews-count">({course.reviewsCount} Reviews)</span>
                      </div>

                      <div className="courses-card-footer">
                        <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm join-btn" style={{ width: '100%', textAlign: 'center' }}>
                          View Course
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
