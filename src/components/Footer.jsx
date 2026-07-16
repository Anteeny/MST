import React from 'react';
import './Footer.css';
import Resizable from './Resizable';

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
                <li><a href="#">School of Healing</a></li>
                <li><a href="#">School of Personal Transformation</a></li>
                <li><a href="#">School of Finance and Administration</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Courses</h4>
              <ul className="footer-links">
                <li><a href="#">Short courses</a></li>
                <li><a href="#">Certifications</a></li>
                <li><a href="#">Workshops</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Mirror School of Transformation</h4>
              <ul className="footer-links">
                <li><a href="#">About us</a></li>
                <li><a href="#">Learning online</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Help Centre</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Follow us</h4>
              <div className="social-links">
                <a href="#" className="social-link">FB</a>
                <a href="#" className="social-link">TW</a>
                <a href="#" className="social-link">IN</a>
                <a href="#" className="social-link">IG</a>
                <a href="#" className="social-link">YT</a>
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
