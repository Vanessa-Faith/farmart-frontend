import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About FarmArt</h1>
        <p>Connecting farmers and buyers for quality livestock trading</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>FarmArt is dedicated to revolutionizing livestock trading by providing a transparent, secure, and efficient platform that connects farmers directly with buyers across Kenya.</p>
        </section>

        <section className="about-section">
          <h2>What We Do</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🐄 Quality Livestock</h3>
              <p>Browse verified farm animals from trusted farmers</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Secure Trading</h3>
              <p>Safe and transparent transactions for all parties</p>
            </div>
            <div className="feature-card">
              <h3>📱 Easy Access</h3>
              <p>Simple platform accessible from anywhere</p>
            </div>
            <div className="feature-card">
              <h3>🤝 Direct Connection</h3>
              <p>Connect farmers and buyers without middlemen</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Why Choose FarmArt?</h2>
          <ul>
            <li>Verified farmers and quality livestock</li>
            <li>Transparent pricing and information</li>
            <li>Secure payment processing</li>
            <li>Nationwide delivery options</li>
            <li>Dedicated customer support</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
