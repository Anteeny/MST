import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { classroomData } from '../data/classroomData';
import logoImg from '../assets/logo.png';
import './ClassroomView.css';

export default function ClassroomView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Classroom Syllabus Data
  const course = classroomData[id || '0'];

  // Flattened items list to calculate progress & handle navigation
  const allItems = course 
    ? course.syllabus.flatMap(week => week.items)
    : [];

  // State Management
  const [activeItemId, setActiveItemId] = useState('');
  const [completedItems, setCompletedItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);

  // Authentication gate
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) {
        navigate(`/sign-in?redirectTo=${encodeURIComponent(window.location.pathname)}`);
      } else {
        setSession(currentSession);
        
        // Load completion progress from localStorage if it exists
        const storedProgress = localStorage.getItem(`course_${id}_completed`);
        if (storedProgress) {
          try {
            setCompletedItems(JSON.parse(storedProgress));
          } catch (e) {
            console.error('Error parsing stored progress', e);
          }
        }
      }
      setLoading(false);
    };

    checkSession();
  }, [id, navigate]);

  // Set default active item to first syllabus item
  useEffect(() => {
    if (allItems.length > 0 && !activeItemId) {
      setActiveItemId(allItems[0].id);
    }
  }, [allItems, activeItemId]);

  if (loading) {
    return (
      <div className="classroom-loading">
        <div className="classroom-spinner"></div>
        <h3>Loading Classroom...</h3>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="classroom-error">
        <h2>Course Content Unavailable</h2>
        <p>This course content does not exist or has not been deployed to the classroom.</p>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  // Active Item Helper
  const activeItem = allItems.find(item => item.id === activeItemId) || allItems[0];

  // Toggle Item Completion & Sync with LocalStorage
  const toggleCompletion = (itemId) => {
    let newCompleted;
    if (completedItems.includes(itemId)) {
      newCompleted = completedItems.filter(id => id !== itemId);
    } else {
      newCompleted = [...completedItems, itemId];
    }
    setCompletedItems(newCompleted);
    localStorage.setItem(`course_${id}_completed`, JSON.stringify(newCompleted));
  };

  // Progress Computations
  const totalItems = allItems.length;
  const completedCount = completedItems.length;
  const progressPercent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // Find next item index to support "Next Lesson" navigation
  const currentIndex = allItems.findIndex(item => item.id === activeItemId);
  const nextItem = currentIndex !== -1 && currentIndex < allItems.length - 1 
    ? allItems[currentIndex + 1] 
    : null;

  const handleNextLesson = () => {
    // Auto mark current item as completed
    if (!completedItems.includes(activeItemId)) {
      toggleCompletion(activeItemId);
    }

    // Advance to next
    if (nextItem) {
      setActiveItemId(nextItem.id);
      setSelectedOption(null);
      setQuizFeedback(null);
    } else {
      // Completed last lesson
      alert("Congratulations! You have completed all content modules in this course.");
      navigate('/dashboard');
    }
  };

  const handleQuizSubmit = (quizItem) => {
    if (selectedOption === null) {
      setQuizFeedback({ type: 'error', text: 'Please select an answer option first.' });
      return;
    }

    const question = quizItem.questions[0];
    if (selectedOption === question.answer) {
      setQuizFeedback({ type: 'success', text: 'Correct! Great job.' });
      // Auto complete the item
      if (!completedItems.includes(quizItem.id)) {
        toggleCompletion(quizItem.id);
      }
    } else {
      setQuizFeedback({ type: 'warning', text: 'Incorrect answer. Please review the material and try again!' });
    }
  };

  return (
    <div className="classroom-layout">
      {/* 1. Header Bar */}
      <header className="classroom-header">
        <div className="classroom-header-left">
          <Link to="/dashboard" className="back-dashboard-btn" aria-label="Go to Dashboard">
            &larr; <span className="desktop-text">Dashboard</span>
          </Link>
          <div className="header-divider"></div>
          <span className="classroom-course-title">{course.title}</span>
        </div>

        <div className="classroom-header-right">
          <div className="classroom-progress-info">
            <span className="progress-label">{progressPercent}% Completed</span>
            <div className="progress-tracker-bar">
              <div className="progress-tracker-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Work Panel */}
      <div className="classroom-body">
        {/* Sidebar Navigation */}
        <aside className="classroom-sidebar">
          <div className="sidebar-intro">
            <h3>Course Syllabus</h3>
            <p>{totalItems} modules • {completedCount} completed</p>
          </div>

          <div className="syllabus-weeks-list">
            {course.syllabus.map((week, wIndex) => (
              <div className="syllabus-week-group" key={wIndex}>
                <div className="week-group-header">
                  {week.title}
                </div>
                <div className="week-group-items">
                  {week.items.map((item) => {
                    const isActive = item.id === activeItemId;
                    const isCompleted = completedItems.includes(item.id);
                    return (
                      <div 
                        className={`syllabus-nav-item ${isActive ? 'item-active' : ''} ${isCompleted ? 'item-completed' : ''}`}
                        key={item.id}
                        onClick={() => {
                          setActiveItemId(item.id);
                          setSelectedOption(null);
                          setQuizFeedback(null);
                        }}
                      >
                        <div 
                          className="item-checkbox-wrapper"
                          onClick={(e) => {
                            e.stopPropagation(); // Avoid triggering active item change
                            toggleCompletion(item.id);
                          }}
                        >
                          <input 
                            type="checkbox" 
                            checked={isCompleted}
                            readOnly
                            className="item-nav-checkbox"
                          />
                          <span className="custom-checkmark"></span>
                        </div>

                        <div className="item-nav-details">
                          <span className="item-nav-title">
                            {item.type === 'video' && '📹 '}
                            {item.type === 'reading' && '📄 '}
                            {item.type === 'quiz' && '📝 '}
                            {item.title}
                          </span>
                          <span className="item-nav-meta">{item.duration || 'Quiz'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Content Viewer Panel */}
        <main className="classroom-content-viewer">
          {activeItem ? (
            <div className="content-inner-wrapper">
              <div className="content-header-card">
                <span className="content-type-badge">{activeItem.type.toUpperCase()}</span>
                <h2>{activeItem.title}</h2>
              </div>

              <div className="content-body-card">
                {/* 1. Video Lecture Renderer */}
                {activeItem.type === 'video' && (
                  <div className="video-player-container">
                    <video 
                      key={activeItem.id} // Re-mount video element on ID changes
                      controls 
                      src={activeItem.videoUrl}
                      className="lecture-video-element"
                      poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="video-meta-description">
                      <h3>Lecture Overview</h3>
                      <p>{activeItem.content}</p>
                    </div>
                  </div>
                )}

                {/* 2. Reading Assignment Renderer */}
                {activeItem.type === 'reading' && (
                  <div className="reading-content-container">
                    <p className="reading-lead-text">{activeItem.content}</p>
                    <div className="reading-article-body">
                      <h4>Syllabus Deep-Dive</h4>
                      <p>
                        In order to master the core objectives of this section, it is critical to review 
                        the associated case studies and complete all supplementary workshop readings. 
                        As you work through this course, keep journal notes detailing how these paradigms 
                        apply to your personal leadership or pastoral counseling engagements.
                      </p>
                      <p>
                        Reviewing recovery methodologies helps bridge theoretical cognitive therapy with 
                        real-world application. Reflect on how to establish emotional safety boundaries 
                        within your support groups, and make note of the key takeaways to review with your mentor.
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. Quiz Module Renderer */}
                {activeItem.type === 'quiz' && (
                  <div className="quiz-content-container">
                    {activeItem.questions.map((q, qIndex) => (
                      <div className="quiz-question-box" key={qIndex}>
                        <p className="quiz-question-text"><strong>Question:</strong> {q.question}</p>
                        
                        <div className="quiz-options-list">
                          {q.options.map((opt, oIndex) => (
                            <label 
                              key={oIndex} 
                              className={`quiz-option-label ${selectedOption === oIndex ? 'option-selected' : ''}`}
                            >
                              <input 
                                type="radio" 
                                name={`quiz_${activeItem.id}`} 
                                value={oIndex}
                                checked={selectedOption === oIndex}
                                onChange={() => {
                                  setSelectedOption(oIndex);
                                  setQuizFeedback(null);
                                }}
                                className="quiz-radio-input"
                              />
                              <span className="option-text">{opt}</span>
                            </label>
                          ))}
                        </div>

                        <div className="quiz-action-bar">
                          <button 
                            onClick={() => handleQuizSubmit(activeItem)}
                            className="btn btn-outline"
                          >
                            Submit Answer
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Quiz Response Feedback */}
                    {quizFeedback && (
                      <div className={`quiz-feedback-box feedback-${quizFeedback.type}`}>
                        {quizFeedback.type === 'success' && '✅ '}
                        {quizFeedback.type === 'warning' && '⚠️ '}
                        {quizFeedback.type === 'error' && '❌ '}
                        <span>{quizFeedback.text}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Action Bar */}
              <div className="content-navigation-footer">
                <button 
                  onClick={() => toggleCompletion(activeItem.id)}
                  className={`btn ${completedItems.includes(activeItem.id) ? 'btn-outline' : 'btn-primary'}`}
                >
                  {completedItems.includes(activeItem.id) ? '✓ Completed' : 'Mark as Completed'}
                </button>

                <button 
                  onClick={handleNextLesson}
                  className="btn btn-primary next-lesson-btn"
                >
                  {nextItem ? 'Next Lecture &rarr;' : 'Finish Course 🎉'}
                </button>
              </div>
            </div>
          ) : (
            <div className="classroom-no-active-item">
              <p>Select a syllabus lecture item from the sidebar index to begin learning.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
