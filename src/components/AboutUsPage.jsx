import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './AboutUsPage.css';
import unlearnAdviceImg from '../assets/about_unlearn_advice.jpg';
import coachHilsonImg from '../assets/coach_hilson.jpg';
import adminNkechiImg from '../assets/admin_nkechi.jpg';
import bookRestoredImg from '../assets/book_restored.jpg';
import bookRoadToHappinessImg from '../assets/book_road_to_happiness.jpg';
import bookAddictionCycleImg from '../assets/book_addiction_cycle.jpg';

export default function AboutUsPage() {
  const location = useLocation();

  // Scroll to hash target on location change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const coreValues = [
    {
      number: "01",
      title: "Passion for God",
      description: "We acknowledge God as the ultimate source of truth, healing, wisdom, and transformation."
    },
    {
      number: "02",
      title: "Passion for Knowledge",
      description: "We believe transformation is accelerated through learning, understanding, and continuous growth."
    },
    {
      number: "03",
      title: "Passion for Personal Transformation",
      description: "We are committed to becoming before helping others become."
    },
    {
      number: "04",
      title: "Integrity",
      description: "We strive to align our words, values, and actions."
    },
    {
      number: "05",
      title: "Excellence",
      description: "We pursue quality and professionalism in everything we do."
    }
  ];

  const teamMembers = [
    {
      name: "Coach Jeremiah Hilson",
      role: "Founder & Director",
      desc: "Jeremiah Hilson provides vision, strategic direction, and leadership at MST. He has authored multiple online books and guides hundreds of students worldwide through personal transformation frameworks.",
      img: coachHilsonImg,
      badge: "Founder"
    },
    {
      name: "Nkechi Ohazulike",
      role: "Chief Administrative Officer",
      desc: "Linda Nkechi Ohazulike ensures operational compliance, HR efficiency, people management, documentation, and internal operational alignment at MST.",
      img: adminNkechiImg,
      badge: "Admin"
    },
    {
      name: "Winner Richard",
      role: "Chief Operations & Growth Manager",
      desc: "Winner Richard leads operations, technology integrations, and Visibility/Growth initiatives across the MST School and Academy platforms.",
      img: null, // renders as elegant text avatar
      badge: "Operations"
    }
  ];

  const books = [
    {
      title: "Understanding the Addiction Cycle",
      type: "Online Book",
      desc: "An in-depth guide mapping out psychological roots, triggers, coping mechanisms, and biblical recovery paths from dependencies.",
      platform: "Amazon Store",
      color: "#0f766e",
      img: bookAddictionCycleImg,
      link: "https://www.amazon.com/Understanding-Addiction-Cycle-Jeremiah-Hilson/dp/B0BW2MGYNM"
    },
    {
      title: "Road to Happiness",
      type: "Digital Release",
      desc: "A practical guide to emotional wellness, healing, and restoring joy, available online via Selar.",
      platform: "Selar Store",
      color: "#1e293b",
      img: bookRoadToHappinessImg,
      link: "https://selar.com/7n424a?currency=KES"
    },
    {
      title: "Restored",
      type: "Paperback & Ebook",
      desc: "A transformational journal outlining steps to reconstruct your identity, break limiting beliefs, and walk in freedom.",
      platform: "Bookshop Store",
      color: "#0369a1",
      img: bookRestoredImg,
      link: "https://bookshop.org/p/books/restored-from-sexually-abused-to-healed-jeremiah-hilson/3c2b2d1befe8ac60?ean=9798873539321"
    }
  ];

  const workshops = [
    {
      code: "BARS",
      title: "Basic Addiction Recovery",
      frequency: "Regular Online Workshop",
      desc: "A foundational online recovery intensive designed to break down habits, provide support frameworks, and build accountability structures."
    },
    {
      code: "CCS",
      title: "Crucial Conversations Series",
      frequency: "Monthly Session Group",
      desc: "Interactive webinars focused on communication strategies, relationship healing, identity boundaries, and personal leadership."
    }
  ];

  return (
    <div className="about-page-layout">
      {/* Top Navigation */}
      <Navbar />

      {/* Hero Header */}
      <section className="about-hero-banner">
        <div className="about-banner-container">
          <div className="about-breadcrumbs">
            <Link to="/" className="about-breadcrumb-link">Home</Link>
            <span className="about-breadcrumb-separator">&gt;</span>
            <span className="about-breadcrumb-current">About Us</span>
          </div>
          <h1 className="about-banner-title">About Us</h1>
          <p className="about-banner-subtitle">Reflecting Your Truest Nature</p>
        </div>
      </section>

      {/* Welcome & Identity */}
      <section className="about-intro-section">
        <div className="about-intro-container">
          <div className="about-intro-grid">
            <div className="about-intro-text">
              <span className="about-section-badge">Welcome to MST</span>
              <h2 className="about-heading">Begin Your Transformational Journey</h2>
              <p className="about-paragraph highlight-text">
                Welcome to The Mirror School of Transformation (MST). We are committed to helping people experience genuine transformation and become everything God designed them to be.
              </p>
              <p className="about-paragraph">
                The Mirror School of Transformation is a faith-based transformational organization that combines biblical principles, psychological truths, counseling theories, and practical personal development strategies to help individuals become whole and effective.
              </p>
              
              <h3 className="about-subheading">Our Three Major Outcomes</h3>
              <ul className="outcomes-list">
                <li>
                  <span className="outcome-number">1</span>
                  <div className="outcome-content">
                    <h4>Healing Past Pain</h4>
                    <p>Overcoming wounds, limiting beliefs, emotional struggles, and negative life experiences.</p>
                  </div>
                </li>
                <li>
                  <span className="outcome-number">2</span>
                  <div className="outcome-content">
                    <h4>Discovering Capacity</h4>
                    <p>Unlocking the original design, potentials, and God-given capacities in your life.</p>
                  </div>
                </li>
                <li>
                  <span className="outcome-number">3</span>
                  <div className="outcome-content">
                    <h4>Deploying Potential</h4>
                    <p>Reconnecting with your identity and deploying your gifts to change the world.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="about-intro-image-wrapper">
              <img src={unlearnAdviceImg} alt="Addiction Counselor Outdated Advice" className="about-intro-image" />
              <div className="about-image-decoration"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="about-vision-mission-section">
        <div className="about-vision-mission-container">
          <div className="vision-mission-grid">
            <div className="vision-mission-card vision-card">
              <div className="card-icon-wrapper">👁️</div>
              <h2 className="card-title">Our Vision</h2>
              <p className="card-tagline">…Reflecting Your Truest Nature</p>
              <p className="card-body">
                We envision a world where individuals live from their authentic God-designed identity and express their highest potential in every area of life.
              </p>
            </div>

            <div className="vision-mission-card mission-card">
              <div className="card-icon-wrapper">🎯</div>
              <h2 className="card-title">Our Mission</h2>
              <p className="card-body">
                To help people overcome the past, discover their God-given potentials, and deploy those potentials to change their world.
              </p>
              <div className="mission-pillars">
                <h4 className="pillars-title">We achieve this by integrating:</h4>
                <ul className="pillars-list">
                  <li>Biblical truths</li>
                  <li>Counseling principles</li>
                  <li>Psychological insights</li>
                  <li>Personal development strategies</li>
                  <li>Practical transformational experiences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="team" className="about-team-section">
        <div className="about-team-container">
          <div className="section-header-centered">
            <span className="about-section-badge">Leadership Cabinet</span>
            <h2 className="about-heading text-center">Meet Our Team</h2>
            <p className="section-subtitle-text">Dedicated leaders, practitioners, and counselors driving the MST mission forward.</p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-image-box">
                  {member.img ? (
                    <img src={member.img} alt={member.name} className="team-photo" />
                  ) : (
                    <div className="team-avatar-fallback">
                      <span>{member.name.split(' ').map(n=>n[0]).join('')}</span>
                    </div>
                  )}
                </div>
                <div className="team-info-box">
                  <span className="team-badge-pill">{member.badge}</span>
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-desc">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books and Materials Section */}
      <section id="books" className="about-books-section">
        <div className="about-books-container">
          <div className="section-header-centered">
            <span className="about-section-badge">Publications & Guides</span>
            <h2 className="about-heading text-center">Books & Learning Materials</h2>
            <p className="section-subtitle-text">Expand your transformation journey with founder Coach Hilson's written guides and books.</p>
          </div>

          <div className="books-grid">
            {books.map((book, idx) => (
              <div key={idx} className="book-card">
                <div className="book-cover-box">
                  <img src={book.img} alt={book.title} className="book-cover-img" />
                </div>
                <div className="book-details">
                  <h3>{book.title}</h3>
                  <span className="book-platform">Store: <strong>{book.platform}</strong></span>
                  <p>{book.desc}</p>
                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm font-sm">
                    Get Copy Online
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Regular Workshops info box */}
          <div className="workshops-addon-container">
            <div className="workshops-addon-header">
              <h3>Regular Online Workshops</h3>
              <p>We hold structured virtual groups and coaching sessions regularly.</p>
            </div>
            
            <div className="workshops-list-grid">
              {workshops.map((w, wIdx) => (
                <div key={wIdx} className="workshop-item-card">
                  <div className="workshop-code-badge">{w.code}</div>
                  <div className="workshop-details">
                    <h4>{w.title}</h4>
                    <span className="workshop-freq">🕒 {w.frequency}</span>
                    <p>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values-section">
        <div className="about-values-container">
          <div className="about-values-header">
            <span className="about-section-badge">How We Lead</span>
            <h2 className="about-heading text-center">Our Core Values</h2>
            <p className="about-values-subtitle">These principles shape our culture, guide our decisions, and drive our daily operations.</p>
          </div>

          <div className="values-grid">
            {coreValues.map((val, idx) => (
              <div key={idx} className="value-card">
                <div className="value-header">
                  <span className="value-num">{val.number}</span>
                  <h3 className="value-title">{val.title}</h3>
                </div>
                <p className="value-desc">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talk to a Counselor Section */}
      <section id="counselor" className="about-counselor-section">
        <div className="about-counselor-container">
          <div className="counselor-form-box">
            <div className="counselor-info-pane">
              <span className="about-section-badge badge-white">Get Support</span>
              <h2>Talk to a Certified Counselor</h2>
              <p>
                Limiting beliefs, past wounds, and addiction loops can feel isolating. You do not have to walk the road to restoration alone.
              </p>
              <p>
                Our professional counseling and coaching team is here to listen, offer biblical and psychological insights, and guide you step-by-step.
              </p>
              
              <div className="support-features">
                <div className="s-feature">🛡️ <strong>100% Confidential</strong> — Your safety and privacy is our highest priority.</div>
                <div className="s-feature">👥 <strong>Certified Facilitators</strong> — Guides trained in recovery and counseling.</div>
                <div className="s-feature">💻 <strong>Convenient Zoom Sessions</strong> — Access coaching from anywhere in the world.</div>
              </div>

              <div className="alternative-contacts">
                <div className="contact-divider"><span>OR CONTACT US DIRECTLY</span></div>
                <div className="contact-buttons-row">
                  <a href="tel:08135953702" className="c-option-btn tel-btn">
                    📞 Call Emergency Line
                  </a>
                  <a href="https://wa.me/2348135953702" target="_blank" rel="noopener noreferrer" className="c-option-btn wa-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18" style={{ fill: 'currentColor', marginRight: '8px', flexShrink: 0 }}>
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.57 1.98 14.1.953 11.47 1.006c-5.434 0-9.858 4.37-9.862 9.801 0 1.954.551 3.86 1.595 5.525l-.999 3.648 3.738-.973c1.64.952 3.193 1.449 4.823 1.451zm10.742-7.534c-.29-.145-1.713-.845-1.978-.941-.266-.097-.459-.145-.653.146-.193.29-.748.941-.917 1.134-.169.193-.338.217-.628.072-2.316-1.16-3.21-1.488-4.595-3.875-.371-.64.371-.595 1.06-1.968.116-.232.058-.435-.029-.58-.087-.145-.748-1.8-.978-2.352-.224-.539-.446-.466-.653-.466-.169 0-.363-.024-.557-.024-.193 0-.507.072-.773.362-.266.29-1.014.99-1.014 2.415 0 1.425 1.039 2.802 1.184 2.995.145.193 2.043 3.12 4.949 4.373.69.298 1.229.476 1.65.61.694.22 1.326.19 1.825.115.556-.084 1.713-.7 1.955-1.376.242-.676.242-1.256.169-1.376-.073-.12-.266-.193-.556-.339z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="counselor-form-pane">
              <h3>Request a Counseling Call</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for reaching out! A certified MST counselor will contact you via email shortly.');
                e.target.reset();
              }} className="counselor-actual-form">
                <div className="form-row-grid">
                  <div className="form-field">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" placeholder="Enter your name" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="name@email.com" required />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="issue-category">Area of Counseling</label>
                  <select id="issue-category" defaultValue="" required>
                    <option value="" disabled>Select category...</option>
                    <option value="addiction">Addiction Recovery support</option>
                    <option value="emotional">Emotional Healing & Wounds</option>
                    <option value="identity">Identity & Purpose discovery</option>
                    <option value="other">General Personal growth coaching</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Briefly describe how we can support you</label>
                  <textarea id="message" rows="4" placeholder="Share as much details as you feel comfortable with..." required></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Send Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
