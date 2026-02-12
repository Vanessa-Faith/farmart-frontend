import React from 'react';
import './About.css';


const About = () => {
  return (
    <div className="about-page">
      {/* Video background */}
      <video className="about-video-bg" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400">
        <source src="https://www.pexels.com/download/video/31524919/" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay content */}
      <div className="about-overlay about-fullscreen">
        <h1 className="about-title" style={{ marginTop: '2rem', color: '#fff', fontWeight: 'bold', fontSize: '2.8rem', textAlign: 'center', letterSpacing: '1px' }}>About</h1>
        <h2 style={{ color: '#fff', fontWeight: 'bold', fontSize: '2.2rem', textAlign: 'center', margin: '1.5rem 0 0.5rem' }}>Our Story</h2>
        <p style={{ color: '#fff', fontSize: '1.15rem', textAlign: 'center', maxWidth: 900, margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          Farmers have always relied on trust, community, and hard work to raise their animals. Yet, despite all their effort, many are forced to depend on middlemen who take a large share of the profits. This leaves farmers earning less while buyers pay more.<br />
          Farmart was created to change that. We built a platform that connects farmers directly to buyers, removing unnecessary intermediaries and restoring fairness to the market.<br />
          By giving farmers control over how they sell and buyers confidence in what they purchase, Farmart creates a transparent, trusted marketplace for farm animals.
        </p>

        <h2 style={{ color: '#fff', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '2rem 0 0.5rem' }}>🎯 Our Mission</h2>
        <p style={{ color: '#fff', fontSize: '1.15rem', textAlign: 'center', maxWidth: 800, margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          To empower farmers by providing a direct, fair, and transparent digital marketplace where they can sell their farm animals at the right value, while enabling buyers to access quality livestock with confidence.
        </p>

        <h2 style={{ color: '#fff', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '2rem 0 0.5rem' }}>🌍 Our Vision</h2>
        <p style={{ color: '#fff', fontSize: '1.15rem', textAlign: 'center', maxWidth: 800, margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          To build a future where farmers thrive, middlemen no longer exploit the supply chain, and technology bridges the gap between producers and buyers—creating sustainable livelihoods and stronger agricultural communities.
        </p>
      </div>
    </div>
  );
};

export default About;
