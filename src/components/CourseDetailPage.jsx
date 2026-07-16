import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesList } from '../data/coursesData';
import Navbar from './Navbar';
import Footer from './Footer';
import './CourseDetailPage.css';

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the course details
  const course = coursesList.find((c) => c.id === parseInt(id || '0'));

  // State to manage active FAQ index
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Scroll to top on page load or ID change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <div className="course-not-found">
        <Navbar />
        <div className="not-found-content">
          <h2>Course Not Found</h2>
          <p>The course you are looking for does not exist or has been removed.</p>
          <Link to="/courses" className="btn btn-primary">Back to Catalog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get 3 other courses to show in the "New Courses" sidebar widget
  const relatedCourses = coursesList
    .filter((c) => c.id !== course.id)
    .slice(0, 3);

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleBuyCourse = () => {
    alert(`Thank you for your interest! Initiating enrollment checkout for: "${course.title}"`);
  };

  return (
    <div className="detail-page-layout">
      {/* Top Navbar */}
      <Navbar />

      {/* Sub-hero Breadcrumb Banner */}
      <section className="detail-hero-banner">
        <div className="detail-banner-container">
          <div className="detail-breadcrumbs">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/courses" className="breadcrumb-link">Courses</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Course Details</span>
          </div>
          <h1 className="detail-banner-title">Course Details</h1>
        </div>
      </section>

      {/* Split Columns Grid */}
      <main className="detail-main-content">
        <div className="detail-container">
          <div className="detail-grid">
            
            {/* Left Sidebar Column (35% width) */}
            <aside className="detail-sidebar">
              
              {/* 1. Course Details Metadata Card */}
              <div className="sidebar-widget details-widget">
                <ul className="details-list">
                  <li className="details-item">
                    <span className="item-icon">⏱️</span>
                    <span className="item-label">Duration:</span>
                    <span className="item-value">{course.duration}</span>
                  </li>
                  <li className="details-item">
                    <span className="item-icon">📖</span>
                    <span className="item-label">Lectures:</span>
                    <span className="item-value">{course.lectures}</span>
                  </li>
                  <li className="details-item">
                    <span className="item-icon">👥</span>
                    <span className="item-label">Students:</span>
                    <span className="item-value">{course.students}</span>
                  </li>
                  <li className="details-item">
                    <span className="item-icon">⚡</span>
                    <span className="item-label">Skill Level:</span>
                    <span className="item-value">{course.skillLevel}</span>
                  </li>
                  <li className="details-item">
                    <span className="item-icon">🌐</span>
                    <span className="item-label">Language:</span>
                    <span className="item-value">{course.language}</span>
                  </li>
                </ul>
              </div>

              {/* 2. Course Price & CTA Buy Button (Prices hidden) */}
              <div className="sidebar-widget price-widget">
                <button onClick={handleBuyCourse} className="btn btn-primary buy-now-btn" style={{ marginTop: '0' }}>
                  ENROLL IN COURSE
                </button>
              </div>

              {/* 3. New Courses Widget (3 related items) */}
              <div className="sidebar-widget related-widget">
                <h3 className="widget-title">New Courses</h3>
                <div className="related-stack">
                  {relatedCourses.map((rel) => (
                    <div key={rel.id} className="related-item">
                      <img src={rel.image} alt={rel.title} className="related-thumbnail" />
                      <div className="related-info">
                        <Link to={`/courses/${rel.id}`} className="related-name-link">
                          {rel.title}
                        </Link>
                        <div className="related-rating">
                          <span className="rating-star">&#9733;</span>
                          <span className="rating-value">{rel.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </aside>

            {/* Right Main Section Column (65% width) */}
            <article className="detail-article">
              
              {/* Featured Image */}
              <div className="article-image-wrapper">
                <img src={course.image} alt={course.title} className="article-featured-image" />
              </div>

              {/* Course Overview */}
              <section className="article-section">
                <h2 className="article-section-title">Course Overview</h2>
                <div className="article-text">
                  <p>{course.overview}</p>
                </div>
              </section>

              {/* What You Will Learn */}
              <section className="article-section">
                <h2 className="article-section-title">What You Will Learn?</h2>
                <div className="article-text">
                  <p>In this course, you will develop a deep theoretical understanding and gain practical keys to:</p>
                  <ul className="learning-goals-list">
                    {course.learningGoals.map((goal, index) => (
                      <li key={index} className="goal-item">
                        <span className="check-icon">&#10003;</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Program Highlights (Grid of 3) */}
              <section className="article-section">
                <div className="programs-grid">
                  <div className="program-card">
                    <div className="program-icon-box deg-box">🎓</div>
                    <h3>Online degree programs</h3>
                    <p>Earn standard academic credits and credentials flexibly online.</p>
                  </div>
                  
                  <div className="program-card">
                    <div className="program-icon-box nondeg-box">📋</div>
                    <h3>Non-degree programs</h3>
                    <p>Build job-ready specialized skills and professional workshop certifications.</p>
                  </div>

                  <div className="program-card">
                    <div className="program-icon-box offcampus-box">🏢</div>
                    <h3>Off campus programs</h3>
                    <p>Participate in local group gatherings, hands-on clinical coaching and peer workshops.</p>
                  </div>
                </div>
              </section>

              {/* Frequently Asked Questions */}
              {course.faqs && course.faqs.length > 0 && (
                <section className="article-section faq-section">
                  <h2 className="article-section-title">Frequently Asked Question</h2>
                  <div className="faq-accordion">
                    {course.faqs.map((faq, index) => {
                      const isOpen = activeFaqIndex === index;
                      return (
                        <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                          <button onClick={() => toggleFaq(index)} className="faq-question-btn">
                            <span className="question-text">{faq.question}</span>
                            <span className="accordion-indicator">{isOpen ? '−' : '+'}</span>
                          </button>
                          
                          <div className="faq-answer-wrapper">
                            <div className="faq-answer-content">
                              <p>{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

            </article>

          </div>
        </div>
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
