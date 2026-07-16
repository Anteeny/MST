import React, { useState, useEffect } from 'react';
import './Subjects.css';
import Resizable from './Resizable';

const defaultFeaturedFaculties = [
  {
    badge: "Explore Our Faculties",
    title: "School of Personal Transformation",
    description: "Discover how to align with your authentic, God-designed identity and express your highest potential. This faculty offers transformative courses designed for deep personal growth, self-discovery, and professional train-the-trainer development.",
    exploreUrl: "/faculties/personal-transformation",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Students collaborating in a workshop"
  },
  {
    badge: "Explore Our Faculties",
    title: "School of Healing",
    description: "Equipping leaders and professionals in addiction recovery, trauma-informed care, and pastoral counseling. Learn clinical and faith-based counseling methodologies to help bring restoration, recovery, and wholeness to families and communities.",
    exploreUrl: "/faculties/healing",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Supportive counseling session"
  },
  {
    badge: "Explore Our Faculties",
    title: "School of Finance and Administration",
    description: "Empowering you with stewardship keys, administrative excellence, and financial intelligence. Gain practical tools to manage, govern, and scale organizations, projects, and resources effectively to maximize kingdom and community impact.",
    exploreUrl: "/faculties/finance-admin",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Financial strategy session"
  }
];

const Subjects = ({
  id,
  puck,
  badge = "Explore Our Faculties",
  faculties = defaultFeaturedFaculties,
  containerWidth,
  paddingY,
  badgeSize
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isEditing = puck?.isEditing;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % faculties.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [faculties.length]);

  return (
    <section className="subjects-section-wrapper" style={paddingY ? { padding: `${paddingY} 0` } : {}}>
      <Resizable
        id={id}
        widthPropName="containerWidth"
        currentWidth={containerWidth || "calc(100% - 60px)"}
        isEditing={isEditing}
      >
        <div 
          className="subjects" 
          style={{ width: '100%', maxWidth: '100%' }}
        >
          <div className="subjects-header-static">
            <span className="faculty-badge" style={badgeSize ? { fontSize: badgeSize } : {}}>{badge}</span>
          </div>
          <div className="slides-viewport">
            <div
              className="slides-wrapper"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {faculties.map((faculty, index) => (
                <div key={index} className="slide-item container subjects-container">
                  <div className="faculty-featured-content">
                    <h2 className="heading-xl faculty-title" style={faculty.titleSize ? { fontSize: faculty.titleSize } : {}}>{faculty.title}</h2>
                    <p className="faculty-description" style={faculty.descriptionSize ? { fontSize: faculty.descriptionSize } : {}}>{faculty.description}</p>
                    <div className="faculty-actions">
                      <a href={faculty.exploreUrl} className="btn btn-primary">Explore courses</a>
                      <a href="/faculties" className="btn btn-outline">View all faculties</a>
                    </div>
                  </div>
                  <div className="faculty-featured-image-wrapper">
                    <Resizable
                      id={id}
                      widthPropName="imageWidth"
                      heightPropName="imageHeight"
                      arrayPropName="faculties"
                      index={index}
                      currentWidth={faculty.imageWidth || "100%"}
                      currentHeight={faculty.imageHeight || "340px"}
                      isEditing={isEditing}
                    >
                      <img
                        src={faculty.image}
                        alt={faculty.alt || faculty.title}
                        className="faculty-image"
                        style={{
                          width: '100%',
                          height: '100%',
                          ...(faculty.imageBorderRadius ? { borderRadius: faculty.imageBorderRadius } : {})
                        }}
                      />
                    </Resizable>
                    <div 
                      className="faculty-image-decoration"
                      style={faculty.imageBorderRadius ? { borderRadius: faculty.imageBorderRadius } : {}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        <div className="slide-indicators">
          {faculties.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      </Resizable>
    </section>
  );
};

export default Subjects;
