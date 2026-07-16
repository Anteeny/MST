import React from 'react';
import './Testimonials.css';

export default function Testimonials({
  title = "What Our Learners Say",
  subtitle = "Stories of transformation, restoration, and growth from our global community",
  testimonials = []
}) {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        {/* Header Block */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">{title}</h2>
          {subtitle && <p className="testimonials-subtitle">{subtitle}</p>}
        </div>

        {/* Testimonials Card Grid */}
        {testimonials && testimonials.length > 0 ? (
          <div className="testimonials-grid">
            {testimonials.map((item, index) => {
              // Build star elements based on rating value
              const stars = [];
              const rating = item.rating || 5;
              for (let i = 0; i < 5; i++) {
                if (i < rating) {
                  stars.push(<span key={i} className="test-star filled">&#9733;</span>);
                } else {
                  stars.push(<span key={i} className="test-star">&#9734;</span>);
                }
              }

              return (
                <div key={index} className="testimonial-card">
                  {/* Stars Row */}
                  <div className="testimonial-rating">{stars}</div>
                  
                  {/* Testimony Quote */}
                  <blockquote className="testimonial-quote">
                    "{item.text || 'Transformation testimony text placeholder.'}"
                  </blockquote>

                  {/* Profile Section */}
                  <div className="testimonial-profile">
                    {item.avatarUrl ? (
                      <img 
                        src={item.avatarUrl} 
                        alt={item.name || 'Student'} 
                        className="testimonial-avatar" 
                      />
                    ) : (
                      <div className="testimonial-avatar-fallback">
                        {(item.name || 'S').charAt(0)}
                      </div>
                    )}
                    <div className="testimonial-meta">
                      <h4 className="testimonial-name">{item.name || 'Anonymous Learner'}</h4>
                      <p className="testimonial-role">{item.role || 'Student'}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="testimonials-empty">
            <p>No testimonials added yet. Use the editor to add testimonies.</p>
          </div>
        )}

      </div>
    </section>
  );
}
