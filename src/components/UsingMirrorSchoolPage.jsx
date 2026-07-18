import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './UsingMirrorSchoolPage.css';
import hierarchyImg from '../assets/mst_hierarchy_chart.png';
import learningImg from '../assets/mst_learning_session.png';

export default function UsingMirrorSchoolPage() {
  const [activeFaculty, setActiveFaculty] = useState(0);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faculties = [
    {
      title: "1. Office of the Director",
      head: "Jeremiah Hilson (Coach Hilson)",
      purpose: "Provides vision, strategic direction, oversight, and final approval for major organizational decisions.",
      departments: [
        { name: "Strategy & Planning Unit", desc: "Responsible for long-term planning, innovation, and growth initiatives." },
        { name: "Partnerships & External Relations", desc: "Responsible for collaborations, sponsorships, and institutional relationships." },
        { name: "Special Projects Unit", desc: "Handles high-priority assignments and initiatives approved by the Director." }
      ]
    },
    {
      title: "2. Faculty of Administration & HR",
      head: "Linda Nkechi Ohazulike (Chief Administrative Officer)",
      purpose: "Ensures organizational order, operational efficiency, compliance, documentation, and people management.",
      departments: [
        { name: "Administration Department", desc: "Responsible for records, documentation, meetings, logistics, and internal policy implementation." },
        { name: "Human Resources Department", desc: "Manages recruitment, staff onboarding, volunteer management, welfare, and performance reviews." }
      ]
    },
    {
      title: "3. Faculty of Finance & Operations",
      head: "Linda Nkechi Ohazulike (Finance Director)",
      purpose: "Manages the financial health and operational sustainability of the organization.",
      departments: [
        { name: "Finance & Accounts Department", desc: "Responsible for budgeting, accounting, financial reporting, expense tracking, and payroll." },
        { name: "Operations Support Department", desc: "Handles procurement, resource allocation, event support, and operational logistics." }
      ]
    },
    {
      title: "4. Faculty of Programs, Learning & Transformation",
      head: "Jeremiah Hilson (Director of Programs & Learning)",
      purpose: "Responsible for creating and delivering transformational products and educational courses.",
      departments: [
        { name: "Curriculum & Course Development", desc: "Creates course structures, workbooks, training manuals, and certification frameworks." },
        { name: "Research & Knowledge Development", desc: "Focuses on research projects, content sourcing, program improvement, and knowledge tracking." },
        { name: "Coaching, Counseling & Facilitation", desc: "Manages counseling support, coaching programs, facilitation of learning, and student transformation." }
      ]
    },
    {
      title: "5. Faculty of Marketing, Sales & CX",
      head: "Winner Richards (Director of Growth)",
      purpose: "Drives organizational visibility, enrollment, revenue generation, customer acquisition, and retention.",
      departments: [
        { name: "Marketing & Advertising", desc: "Runs marketing campaigns, paid advertisements, lead generation, and brand awareness." },
        { name: "Sales Department", desc: "Responsible for lead conversion, enrollment drives, corporate sales, and partnership sales." },
        { name: "Customer Experience Department", desc: "Handles customer support, student follow-ups, feedback collection, and client relations." },
        { name: "Email & CRM Department", desc: "Manages email/SMS marketing, customer databases, automation campaigns, and lead nurturing." }
      ]
    },
    {
      title: "6. Faculty of Media, Tech & Digital Systems",
      head: "Vivian Chima Ugwoke & Winner Richards",
      purpose: "Manages technology infrastructure, digital communication, branding, media production, and online presence.",
      departments: [
        { name: "Technology Development & Support", desc: "Website development, webinar platforms, LMS (learning management systems), digital integrations, and technical support." },
        { name: "Digital Media Production", desc: "Handles video production, webinar recordings, audio editing, and multimedia storytelling." },
        { name: "Social Media & Community Management", desc: "Manages Facebook, Instagram, Threads, WhatsApp communities, and audience growth." },
        { name: "Graphic Design & Creative Services", desc: "Creates flyers, branding assets, promotional banners, and visual creative campaigns." },
        { name: "Content Communications Department", desc: "Creates social media copy, campaign messages, sales copy, and marketing communications." }
      ]
    }
  ];

  return (
    <div className="manual-page-layout">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Header */}
      <section className="manual-hero-banner">
        <div className="manual-banner-container">
          <div className="manual-breadcrumbs">
            <Link to="/" className="manual-breadcrumb-link">Home</Link>
            <span className="manual-breadcrumb-separator">&gt;</span>
            <span className="manual-breadcrumb-current">Using Mirror School</span>
          </div>
          <h1 className="manual-banner-title">Using Mirror School</h1>
          <p className="manual-banner-subtitle">Team Orientation & Organizational Structure Manual</p>
        </div>
      </section>

      {/* Welcome & Introduction */}
      <section className="manual-intro-section">
        <div className="manual-intro-container">
          <div className="intro-card-box">
            <div className="intro-card-content">
              <span className="manual-badge">Team Orientation</span>
              <h2>Welcome to the MST Team</h2>
              <p>
                We are delighted that you have chosen to become part of a movement committed to helping people experience genuine transformation and become everything God designed them to be.
              </p>
              <p className="strong-text">
                As a member of the MST Team, you are not merely joining an organization; you are becoming part of a transformational mission dedicated to healing lives, unlocking potential, and raising change agents.
              </p>
            </div>
            <div className="intro-card-image">
              <img src={learningImg} alt="Counseling and coaching session at MST" />
            </div>
          </div>
        </div>
      </section>

      {/* Major Arms */}
      <section className="manual-arms-section">
        <div className="manual-arms-container">
          <div className="section-header-centered">
            <h2>Our Two Major Arms</h2>
            <p>We fulfill our mission through two distinct organizational platforms.</p>
          </div>
          
          <div className="arms-grid">
            <div className="arm-card school-arm">
              <div className="arm-badge">GROWTH & HEALING</div>
              <h3>1. The Mirror School of Transformation</h3>
              <p>
                The primary transformational platform focused on personal growth, emotional healing, purpose discovery, and transformational group programs.
              </p>
            </div>
            <div className="arm-card academy-arm">
              <div className="arm-badge">EDUCATION & CERTIFICATIONS</div>
              <h3>2. MST Academy</h3>
              <p>
                The educational and training arm responsible for courses, professional certifications, practical workshops, learning resources, and structured development programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure & Hierarchy */}
      <section className="manual-structure-section">
        <div className="manual-structure-container">
          <div className="structure-grid">
            <div className="structure-text-content">
              <span className="manual-badge">Leadership Model</span>
              <h2>Organizational Structure</h2>
              <p>
                The Mirror School operates through a lean leadership model designed for growth, accountability, collaboration, and efficiency.
              </p>
              <p>
                At the center of the organization is the Director, supported by Faculty Heads who collectively form the Executive Leadership Team (Cabinet).
              </p>

              <div className="hierarchy-steps">
                <div className="step-item"><span className="step-num">1</span> <strong>Director</strong> — Provides vision and final approvals</div>
                <div className="step-item"><span className="step-num">2</span> <strong>Faculty Heads</strong> — Executive Cabinet running faculties</div>
                <div className="step-item"><span className="step-num">3</span> <strong>Department Leads</strong> — Manage operations of teams</div>
                <div className="step-item"><span className="step-num">4</span> <strong>Team Members</strong> — Execute projects and objectives</div>
                <div className="step-item"><span className="step-num">5</span> <strong>Volunteers / Interns</strong> — Support programs and outreach</div>
              </div>
            </div>
            
            <div className="structure-image-content">
              <div className="chart-card">
                <h4 className="chart-title">Leadership Hierarchy Flow</h4>
                <img src={hierarchyImg} alt="Leadership Hierarchy Chart" className="hierarchy-chart-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Six Faculties (Interactive Tab Layout) */}
      <section className="manual-faculties-section">
        <div className="manual-faculties-container">
          <div className="section-header-centered">
            <span className="manual-badge">Faculties & Divisions</span>
            <h2>The Six Faculties of MST</h2>
            <p>Click on any faculty in the tab list below to view its Leadership, Core Purpose, and Sub-Departments.</p>
          </div>

          <div className="faculties-tabs-layout">
            {/* Left side tabs menu */}
            <div className="faculties-menu">
              {faculties.map((f, index) => (
                <button
                  key={index}
                  className={`faculty-menu-item ${activeFaculty === index ? 'active' : ''}`}
                  onClick={() => setActiveFaculty(index)}
                >
                  {f.title}
                </button>
              ))}
            </div>

            {/* Right side active faculty panel */}
            <div className="faculty-panel-card">
              <div className="panel-header">
                <h3>{faculties[activeFaculty].title.substring(3)}</h3>
                <div className="panel-leader-tag">
                  <span>FACULTY HEAD:</span> <strong>{faculties[activeFaculty].head}</strong>
                </div>
              </div>

              <div className="panel-purpose">
                <p><strong>Core Purpose:</strong> {faculties[activeFaculty].purpose}</p>
              </div>

              <div className="panel-departments">
                <h4>Departments & Responsibilities:</h4>
                <div className="departments-list">
                  {faculties[activeFaculty].departments.map((d, dIdx) => (
                    <div key={dIdx} className="dept-item-box">
                      <h5>🔑 {d.name}</h5>
                      <p>{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Structure Rules & Collaboration */}
      <section className="manual-collaboration-section">
        <div className="manual-collaboration-container">
          <div className="collab-grid">
            {/* Left box: Content Categories */}
            <div className="collab-box content-categories-box">
              <h3 className="collab-box-title">Content Creation Structure</h3>
              <p>Content creation within MST is divided into two distinct categories to preserve quality and branding:</p>
              
              <div className="category-item border-teal">
                <h4>Category One: Communication Content</h4>
                <p className="managed-by">Managed by: <em>Faculty of Media, Technology & Digital Systems</em></p>
                <p>Examples: Social media posts, sales copy, marketing content, email campaigns, promotional flyers/banners.</p>
              </div>

              <div className="category-item border-navy">
                <h4>Category Two: Educational Content</h4>
                <p className="managed-by">Managed by: <em>Faculty of Programs, Learning & Transformation</em></p>
                <p>Examples: Training courses, student workbooks, orientation manuals, learning materials, educational frameworks.</p>
              </div>
            </div>

            {/* Right box: How we work together */}
            <div className="collab-box how-we-work-box">
              <h3 className="collab-box-title">Faculty Synergy & Workflow</h3>
              <p>Genuine transformation is achieved through collaborative handoffs:</p>
              
              <div className="workflow-cycle">
                <div className="cycle-step"><span className="cycle-badge bg-primary">Programs</span> Develops transformational solutions.</div>
                <div className="cycle-step"><span className="cycle-badge bg-navy">Media</span> Packages and communicates those solutions.</div>
                <div className="cycle-step"><span className="cycle-badge bg-primary">Marketing</span> Promotes the solutions to the public.</div>
                <div className="cycle-step"><span className="cycle-badge bg-navy">Sales</span> Converts public interest into student enrollment.</div>
                <div className="cycle-step"><span className="cycle-badge bg-primary">CX Team</span> Supports participants throughout programs.</div>
                <div className="cycle-step"><span className="cycle-badge bg-navy">Finance</span> Allocates and manages resources.</div>
                <div className="cycle-step"><span className="cycle-badge bg-primary">Admin/HR</span> Manages people, compliance, and processes.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expectations & Commitments */}
      <section className="manual-expectations-section">
        <div className="manual-expectations-container">
          <div className="expectations-grid">
            {/* Expectations List */}
            <div className="expectations-block">
              <h3>What We Expect From You</h3>
              <p className="block-subtitle">Every MST team member embodies these expectations in their daily actions:</p>
              <ul className="check-list">
                <li>Embody our core values in everything you do.</li>
                <li>Demonstrate high professionalism and work quality.</li>
                <li>Pursue continuous learning and personal growth.</li>
                <li>Maintain absolute integrity, aligning words with actions.</li>
                <li>Respect and follow organizational policies.</li>
                <li>Communicate effectively and transparently.</li>
                <li>Work collaboratively across faculties.</li>
                <li>Protect confidential student and organizational information.</li>
                <li>Represent the organization positively at all times.</li>
              </ul>
            </div>

            {/* Our Commitment */}
            <div className="commitment-block">
              <h3>Our Shared Commitment</h3>
              <blockquote className="quote-box">
                "Transformed people transform people."
              </blockquote>
              <p>
                At The Mirror School of Transformation, we believe that real change begins from within. As a member of this team, you are part of a mission bigger than yourself—a mission committed to helping people heal, discover, grow, and positively influence their world.
              </p>
              <p className="welcome-tag">
                Welcome to the journey!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
