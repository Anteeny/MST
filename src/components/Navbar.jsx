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

          <Link to="/using-mirror-school" className="nav-link text-link" style={{ textDecoration: 'none' }}>
            Using Mirror School
          </Link>
        </nav>

        <div className="navbar-right">
          <button className="icon-btn" aria-label="Search">
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
            <Link to="/dashboard" className="btn btn-primary register-btn">
              My Dashboard
            </Link>
          ) : (
            <>
              <Link to="/sign-in" className="btn btn-outline desktop-only">
                {signInText}
              </Link>
              <Link to="/register" className="btn btn-primary register-btn">
                {registerText}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/subjects" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Subjects</Link>
          <Link to="/courses" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Courses</Link>
          <Link to="/using-mirror-school" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Using Mirror School</Link>
          {session ? (
            <Link to="/dashboard" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              My Dashboard
            </Link>
          ) : (
            <Link to="/sign-in" className="mobile-menu-link mobile-only-link" onClick={() => setIsMenuOpen(false)}>
              {signInText}
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
