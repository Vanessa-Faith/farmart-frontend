import React from 'react';
import './About.css';

// About page component with video background and app info
const About = () => {
  return (
    <div className="about-page">
      {/* Video background */}
      <video className="about-video-bg" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400">
        <source src="https://www.pexels.com/download/video/31524919/" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay content */}
      <div className="about-overlay">
        <h1 className="about-title">About FarMart</h1>
        <p className="about-desc">
          FarMart helps farmers reach buyers directly, with transparent pricing and safer transactions.
        </p>
        <div className="about-section">
          <h2>For Farmers</h2>
          <p>
            Farmers can list their livestock, manage orders, and connect with buyers without middlemen. The platform offers easy tools for uploading animal details, tracking sales, and receiving payments securely.
          </p>
        </div>
        <div className="about-section">
          <h2>For Buyers</h2>
          <p>
            Buyers can browse available animals, filter by type and breed, and purchase directly from trusted farmers. Transparent pricing and verified sellers ensure a safe and fair marketplace experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
