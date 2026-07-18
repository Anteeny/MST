import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Resizable from './Resizable';

import fbLogoImg from '../assets/logo_facebook.jpg';
import igLogoImg from '../assets/logo_instagram.jpg';
import ytLogoImg from '../assets/logo_youtube.png';
import twLogoImg from '../assets/logo_twitter.jpg';
import inLogoImg from '../assets/logo_linkedin.png';

const Footer = ({
  id,
  puck,
  copyrightText = `Mirror School of Transformation.`,
  containerWidth,
  paddingY
}) => {
  const isEditing = puck?.isEditing;

  return (
    <footer className="footer" style={paddingY ? { padding: paddingY } : {}}>
      <Resizable
        id={id}
        widthPropName="containerWidth"
        currentWidth={containerWidth || "100%"}
        isEditing={isEditing}
      >
        <div className="container" style={{ width: '100%', maxWidth: '100%' }}>
          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="footer-heading">Faculties</h4>
              <ul className="footer-links">
                <li><Link to="/courses?subject=School of Healing">School of Healing</Link></li>
                <li><Link to="/courses">School of Personal Transformation</Link></li>
                <li><Link to="/courses?subject=School of Money">School of Finance and Administration</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Courses</h4>
              <ul className="footer-links">
                <li><Link to="/courses">Short courses</Link></li>
                <li><Link to="/courses">Certifications</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Mirror School of Transformation</h4>
              <ul className="footer-links">
                <li><Link to="/about-us">About us</Link></li>
                <li><Link to="/courses">Learning online</Link></li>
                <li><Link to="/about-us#counselor">Help Centre</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Follow us</h4>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook" aria-label="Facebook">
                  <img src={fbLogoImg} alt="Facebook" className="social-icon-img" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter" aria-label="Twitter">
                  <img src={twLogoImg} alt="Twitter/X" className="social-icon-img" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link linkedin" aria-label="LinkedIn">
                  <img src={inLogoImg} alt="LinkedIn" className="social-icon-img" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram" aria-label="Instagram">
                  <img src={igLogoImg} alt="Instagram" className="social-icon-img" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link youtube" aria-label="YouTube">
                  <img src={ytLogoImg} alt="YouTube" className="social-icon-img" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {copyrightText}</p>
            <div className="footer-bottom-links">
              <a href="#">Terms & conditions</a>
              <a href="#">Privacy policy</a>
              <a href="#">Cookie policy</a>
            </div>
          </div>
        </div>
      </Resizable>
    </footer>
  );
};

export default Footer;
