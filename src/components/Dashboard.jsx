import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import logoImg from '../assets/logo.png';
import './Navbar.css';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [course0Progress, setCourse0Progress] = useState(45);
  const [course1Progress, setCourse1Progress] = useState(15);

  useEffect(() => {
    const fetchUserSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // Unauthenticated users are redirected to sign-in page
        navigate('/sign-in');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    fetchUserSession();

    // Set up auth state change listener to redirect immediately if logged out
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/sign-in');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    // Read dynamic progress values if they exist in localStorage
    const c0 = localStorage.getItem('course_0_completed');
    if (c0) {
      try {
        const count = JSON.parse(c0).length;
        setCourse0Progress(Math.round((count / 11) * 100));
      } catch (e) {}
    }
    const c1 = localStorage.getItem('course_1_completed');
    if (c1) {
      try {
        const count = JSON.parse(c1).length;
        setCourse1Progress(Math.round((count / 5) * 100));
      } catch (e) {}
    }
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <div className="dashboard-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const fullName = user?.user_metadata?.full_name || '';
  const userName = fullName.trim().split(' ')[0] || user?.email?.split('@')[0] || 'Learner';

  return (
    <div className="dashboard-layout">
      {/* Dashboard Header Bar */}
      {/* Dashboard Header Bar - styled exactly like main site Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="logo">
              <img 
                src={logoImg} 
                alt="Logo" 
                className="logo-icon" 
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
              <span className="logo-text">
                <span className="logo-line1">MIRROR SCHOOL</span>
                <span className="logo-line2">OF TRANSFORMATION</span>
              </span>
            </Link>
          </div>
          <div className="navbar-right">
            <span className="user-welcome-badge" style={{ marginRight: '16px', fontSize: '0.95rem' }}>
              <span className="welcome-label-desktop">Logged in as: </span><strong>{userName}</strong>
            </span>
            <button onClick={handleSignOut} className="btn btn-outline signout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <div className="dashboard-container">
          {/* Welcome Intro Card */}
          <div className="welcome-banner">
            <h1>Welcome back, {userName}!</h1>
            <p>Track your progress, explore new courses, and manage your learning account settings below.</p>
          </div>

          <div className="dashboard-grid">
            {/* Left Main Column: Courses */}
            <div className="dashboard-main-col">
              {/* Current Online Courses Section */}
              <section className="dashboard-section">
                <div className="section-header">
                  <h2 className="section-title">Current Online Courses</h2>
                  <span className="count-badge">2 Active</span>
                </div>
                <div className="dashboard-cards-grid">
                  <div className="dashboard-card course-active">
                    <div className="card-image-placeholder active-placeholder-1"></div>
                    <div className="card-details">
                      <span className="card-badge active-tag">Short Course</span>
                      <h3 className="card-name">Introduction to Trauma-Informed Care</h3>
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${course0Progress}%` }}></div>
                      </div>
                      <div className="card-footer">
                        <span className="progress-text">{course0Progress}% Completed</span>
                        <Link to="/classroom/0" className="btn btn-primary btn-sm">Resume Learning</Link>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-card course-active">
                    <div className="card-image-placeholder active-placeholder-2"></div>
                    <div className="card-details">
                      <span className="card-badge active-tag">Certificate</span>
                      <h3 className="card-name">Stewardship Keys and Financial Intelligence</h3>
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${course1Progress}%` }}></div>
                      </div>
                      <div className="card-footer">
                        <span className="progress-text">{course1Progress}% Completed</span>
                        <Link to="/classroom/1" className="btn btn-primary btn-sm">Resume Learning</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Courses Completed Section */}
              <section className="dashboard-section">
                <div className="section-header">
                  <h2 className="section-title">Courses Completed</h2>
                  <span className="count-badge">1 Certified</span>
                </div>
                <div className="dashboard-cards-grid">
                  <div className="dashboard-card course-completed">
                    <div className="card-image-placeholder completed-placeholder-1"></div>
                    <div className="card-details">
                      <span className="card-badge completed-tag">Workshop</span>
                      <h3 className="card-name">Foundations of Peer Support</h3>
                      <div className="card-footer completed-footer">
                        <span className="completion-date">Completed May 12, 2026</span>
                        <button className="btn btn-outline btn-sm">Download Certificate</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar Column: Interest list and account status */}
            <div className="dashboard-sidebar-col">
              {/* Courses of Interest Section */}
              <section className="dashboard-section">
                <div className="section-header">
                  <h2 className="section-title">Courses of Interest</h2>
                </div>
                <div className="interest-list">
                  <div className="interest-item">
                    <div className="interest-info">
                      <h4>Advanced Counseling Techniques</h4>
                      <p>The Mirror School Academy • 10 weeks</p>
                    </div>
                    <a href="/courses/3" className="interest-link">View Course &rarr;</a>
                  </div>
                  
                  <div className="interest-item">
                    <div className="interest-info">
                      <h4>Addiction Recovery: Train the Trainer</h4>
                      <p>The Mirror School Academy • 8 weeks</p>
                    </div>
                    <a href="/courses/2" className="interest-link">View Course &rarr;</a>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
