import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Navbar.css';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';
import Resizable from './Resizable';

const Navbar = ({
  id,
  puck,
  logoText = "Mirror School of Transformation",
  logoImgSrc,
  logoWidth = "32px",
  logoHeight = "32px",
  containerPadding,
  signInText = "Sign in",
  registerText = "Register"
}) => {
  const isEditing = puck?.isEditing;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileSubjectsOpen, setMobileSubjectsOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  // Monitor the user session state using Supabase auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container" style={containerPadding ? { padding: containerPadding } : {}}>
        <div className="navbar-left">
          <Link to="/" className="logo">
            <Resizable
              id={id}
              widthPropName="logoWidth"
              heightPropName="logoHeight"
              currentWidth={logoWidth}
              currentHeight={logoHeight}
              isEditing={isEditing}
            >
              <img
                src={logoImgSrc || logoImg}
                alt="Logo"
                className="logo-icon"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Resizable>
            {logoText === "The Mirror School Academy" || logoText === "Mirror School of Transformation" ? (
              <span className="logo-text">
                <span className="logo-line1">MIRROR SCHOOL</span>
                <span className="logo-line2">OF TRANSFORMATION</span>
              </span>
            ) : (
              <span className="logo-text">{logoText}</span>
            )}
          </Link>
        </div>

        <nav className="nav-desktop">
          <div className="nav-dropdown-wrapper">
            <Link to="/subjects" className="nav-link">
              Subjects <ChevronDown size={16} />
            </Link>
            <div className="dropdown-menu">
              <Link to="/courses?subject=School of Healing" className="dropdown-item">School of Healing</Link>
              <Link to="/courses?subject=School of Money" className="dropdown-item">School of Money</Link>
              <Link to="/courses?subject=School of Leadership" className="dropdown-item">School of Leadership</Link>
            </div>
          </div>

          <div className="nav-dropdown-wrapper">
            <Link to="/courses" className="nav-link">
              Courses <ChevronDown size={16} />
            </Link>
            <div className="dropdown-menu">
              <Link to="/courses" className="dropdown-item">All Courses</Link>
              <Link to="/courses?subject=School of Healing" className="dropdown-item">Healing Programs</Link>
              <Link to="/courses?subject=School of Money" className="dropdown-item">Finance & Admin</Link>
            </div>
          </div>

          <div className="nav-dropdown-wrapper">
            <Link to="/about-us" className="nav-link">
              About Us <ChevronDown size={16} />
            </Link>
            <div className="dropdown-menu">
              <Link to="/about-us#team" className="dropdown-item">Meet the Team</Link>
              <Link to="/about-us#books" className="dropdown-item">Books & Materials</Link>
              <Link to="/about-us#counselor" className="dropdown-item">Talk to a Counselor</Link>
            </div>
          </div>
        </nav>

        <div className="navbar-right">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/courses?search=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="navbar-search-form desktop-only"
          >
            <div className="search-input-wrapper">
              <input
                type="text"
                className="navbar-static-search-input"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="static-search-submit-btn" aria-label="Search">
                <Search size={16} />
              </button>
            </div>
          </form>

          <button 
            type="button" 
            className="icon-btn mobile-only-search-btn" 
            aria-label="Search"
            onClick={() => {
              window.location.href = '/courses';
            }}
          >
            <Search size={20} />
          </button>
          <button
            className="icon-btn mobile-menu-btn"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Conditional rendering depending on authentication state */}
          {session ? (
            <>
              <Link to="/dashboard" className="btn btn-primary register-btn desktop-only">
                My Dashboard
              </Link>
              <Link to="/dashboard" className="btn btn-primary register-btn mobile-only-btn">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="btn btn-outline desktop-only">
                {signInText}
              </Link>
              <Link to="/register" className="btn btn-primary register-btn desktop-only">
                {registerText}
              </Link>
              <Link to="/sign-in" className="btn btn-outline mobile-only-btn">
                {signInText}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                setIsMenuOpen(false);
                window.location.href = `/courses?search=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="mobile-search-form"
          >
            <input
              type="text"
              className="mobile-search-input"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="mobile-search-submit-btn">
              <Search size={16} />
            </button>
          </form>
          <Link to="/" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          
          <div 
            className="mobile-menu-link mobile-menu-dropdown-trigger" 
            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>About Us</span>
            <ChevronDown 
              size={18} 
              style={{ 
                transform: mobileAboutOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: 'var(--color-primary, #0d9488)'
              }} 
            />
          </div>
          
          {mobileAboutOpen && (
            <div className="mobile-sub-menu" style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px' }}>
              <Link to="/about-us" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— About Us Overview</Link>
              <Link to="/about-us#team" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— Meet the Team</Link>
              <Link to="/about-us#books" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— Books & Materials</Link>
              <Link to="/about-us#counselor" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— Talk to a Counselor</Link>
            </div>
          )}
          
          
          <div 
            className="mobile-menu-link mobile-menu-dropdown-trigger" 
            onClick={() => setMobileSubjectsOpen(!mobileSubjectsOpen)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Subjects</span>
            <ChevronDown 
              size={18} 
              style={{ 
                transform: mobileSubjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: 'var(--color-primary, #0d9488)'
              }} 
            />
          </div>
          
          {mobileSubjectsOpen && (
            <div className="mobile-sub-menu" style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px' }}>
              <Link to="/subjects" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— Subjects Directory</Link>
              <Link to="/courses?subject=School of Healing" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— School of Healing</Link>
              <Link to="/courses?subject=School of Money" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— School of Money</Link>
              <Link to="/courses?subject=School of Leadership" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— School of Leadership</Link>
            </div>
          )}
          
          <div 
            className="mobile-menu-link mobile-menu-dropdown-trigger" 
            onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Courses</span>
            <ChevronDown 
              size={18} 
              style={{ 
                transform: mobileCoursesOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: 'var(--color-primary, #0d9488)'
              }} 
            />
          </div>
          
          {mobileCoursesOpen && (
            <div className="mobile-sub-menu" style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px' }}>
              <Link to="/courses" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— All Courses</Link>
              <Link to="/courses?subject=School of Healing" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— Healing Programs</Link>
              <Link to="/courses?subject=School of Money" className="mobile-menu-link mobile-sub-link" onClick={() => setIsMenuOpen(false)}>— Finance & Admin</Link>
            </div>
          )}
          {session ? (
            <Link to="/dashboard" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              My Dashboard
            </Link>
          ) : (
            <>
              <Link to="/sign-in" className="mobile-menu-link mobile-only-link" onClick={() => setIsMenuOpen(false)}>
                {signInText}
              </Link>
              <Link to="/register" className="mobile-menu-link mobile-only-link" onClick={() => setIsMenuOpen(false)}>
                {registerText}
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
