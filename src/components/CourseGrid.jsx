import React from 'react';
import './CourseGrid.css';
import Resizable from './Resizable';

const defaultCoursesData = [
  {
    type: 'Short course',
    title: 'Introduction to Trauma-Informed Care',
    university: 'The Mirror School Academy',
    duration: '4 weeks',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    type: 'Certificate',
    title: 'Addiction Recovery: Train the Trainer',
    university: 'The Mirror School Academy',
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    type: 'Short course',
    title: 'Foundations of Peer Support',
    university: 'The Mirror School Academy',
    duration: '6 weeks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    type: 'Microcredential',
    title: 'Advanced Counseling Techniques',
    university: 'The Mirror School Academy',
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
];

const CourseGrid = ({
  id,
  puck,
  title = "Top courses to build your skills",
  courses = defaultCoursesData,
  buttonText = "View all courses",
  buttonUrl = "/courses",
  containerWidth,
  paddingY,
  titleSize
}) => {
  const isEditing = puck?.isEditing;

  return (
    <section className="course-grid-section" style={paddingY ? { padding: `${paddingY} 0` } : {}}>
      <Resizable
        id={id}
        widthPropName="containerWidth"
        currentWidth={containerWidth || "100%"}
        isEditing={isEditing}
        className="course-grid-container-resizable"
      >
        <div 
          className="container course-grid-container" 
          style={{ width: '100%', maxWidth: '100%' }}
        >
          <div className="course-grid-header">
            <h2 className="heading-lg section-title" style={titleSize ? { fontSize: titleSize } : {}}>{title}</h2>
            <a href={buttonUrl} className="btn btn-outline">{buttonText}</a>
          </div>
          <div className="course-grid">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <Resizable
                  id={id}
                  widthPropName="dummy" // We don't change width, only height
                  heightPropName="imageHeight"
                  arrayPropName="courses"
                  index={index}
                  currentWidth="100%"
                  currentHeight={course.imageHeight || "160px"}
                  isEditing={isEditing}
                  className="course-card-image-resizable"
                >
                  <div className="course-image-wrapper" style={{ width: '100%', height: '100%' }}>
                    <img src={course.image} alt={course.title} className="course-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="course-type-badge">{course.type}</span>
                  </div>
                </Resizable>
                <div className="course-content">
                  <p className="course-uni">{course.university}</p>
                  <h3 className="course-title">{course.title}</h3>
                  <div className="course-footer">
                    <span className="course-duration">{course.duration}</span>
                    <a href={`/courses/${index}`} className="btn btn-primary btn-sm">Find out more</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Resizable>
    </section>
  );
};

export default CourseGrid;
