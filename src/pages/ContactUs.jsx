import React from 'react';

export default function ContactUs() {
  return (
    <main className="contact-section" style={{ minHeight: '100vh', background: '#c6f3c6', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '3rem 1rem' }}>
      <h1 style={{ color: '#256029', fontWeight: 'bold', fontSize: '2.7rem', marginBottom: '0.2rem', textAlign: 'center', letterSpacing: '1px' }}>Get In Touch</h1>
      <h2 style={{ color: '#4caf50', fontWeight: 400, fontSize: '2.2rem', marginTop: 0, marginBottom: '1.5rem', textAlign: 'center' }}>With Us</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', maxWidth: 420, width: '100%', margin: '0 auto 2.2rem' }}>
        <input type="text" placeholder="Name" style={{ padding: '0.9rem', borderRadius: '1.5rem', border: 'none', background: '#8fd98f', fontSize: '1.1rem', color: '#256029' }} />
        <input type="email" placeholder="Email" style={{ padding: '0.9rem', borderRadius: '1.5rem', border: 'none', background: '#8fd98f', fontSize: '1.1rem', color: '#256029' }} />
        <textarea placeholder="Message" style={{ padding: '0.9rem', borderRadius: '1.5rem', border: 'none', background: '#8fd98f', fontSize: '1.1rem', color: '#256029', minHeight: 80 }} />
        <button type="submit" style={{ background: '#4caf50', color: '#fff', border: 'none', borderRadius: '1.5rem', padding: '0.9rem', fontWeight: 'bold', fontSize: '1.15rem', cursor: 'pointer', letterSpacing: '1px' }}>SEND MESSAGE</button>
      </form>
      <div style={{ color: '#256029', textAlign: 'center', marginBottom: '2.2rem', fontSize: '1.1rem' }}>
        <h3 style={{ color: '#256029', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>📞 Contact Us</h3>
        We’re here to help. Reach out to us for support, questions, or feedback, and we’ll get back to you as soon as possible.
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem', width: '100%', maxWidth: 1100, color: '#256029', fontSize: '1.1rem' }}>
        <div style={{ minWidth: 220, textAlign: 'center' }}>
          <h4 style={{ color: '#256029', fontWeight: 'bold', fontSize: '1.13rem', marginBottom: '0.5rem' }}>📬 Get in Touch</h4>
          <div>📧 <b>Email</b><br />support@farmart.com</div>
          <div>📱 <b>Phone</b><br />+254 700 000 000</div>
          <div>📍 <b>Location</b><br />Nairobi, Kenya</div>
          <div>⏰ <b>Business Hours</b><br />Monday – Friday<br />8:00 AM – 5:00 PM</div>
        </div>
        <div style={{ minWidth: 220, textAlign: 'center' }}>
          <h4 style={{ color: '#256029', fontWeight: 'bold', fontSize: '1.13rem', marginBottom: '0.5rem' }}>🤝 What We Can Help With</h4>
          <div>👨‍🌾 Farmer account support</div>
          <div>🛒 Buyer inquiries</div>
          <div>💳 Payment and checkout issues</div>
          <div>🛠️ Technical support</div>
          <div>💡 Feedback and suggestions</div>
        </div>
        <div style={{ minWidth: 220, textAlign: 'center' }}>
          <h4 style={{ color: '#256029', fontWeight: 'bold', fontSize: '1.13rem', marginBottom: '0.5rem' }}>🌍 Follow Us</h4>
          <div>👍 Facebook</div>
          <div>🐦 Twitter (X)</div>
          <div>📸 Instagram</div>
        </div>
      </div>
      <div style={{ marginTop: '2.5rem', color: '#256029', fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'center' }}>🤝 Support Us</div>
    </main>
  );
}
