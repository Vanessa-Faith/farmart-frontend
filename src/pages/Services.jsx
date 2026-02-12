import React from 'react';

export default function Services() {
  return (
    <main className="services-section" style={{ minHeight: '100vh', background: 'rgba(34, 139, 34, 0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem' }}>
      <h1 style={{ color: '#185c1e', fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Our services</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', width: '100%', maxWidth: 1100 }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center' }}>How farmart works for the farmers:</h2>
          <ul style={{ color: '#fff', fontSize: '1.1rem', listStyle: 'none', padding: 0, textAlign: 'center' }}>
            <li>- Register as a farmer</li>
            <li>- List animals for sale</li>
            <li>- Review incoming orders</li>
            <li>- Confirm and complete sales</li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center' }}>How farmart works for the buyers:</h2>
          <ul style={{ color: '#fff', fontSize: '1.1rem', listStyle: 'none', padding: 0, textAlign: 'center' }}>
            <li>- Create an account</li>
            <li>- Browse and filter animals</li>
            <li>- Add to cart and checkout</li>
            <li>- Receive confirmation<br />&nbsp;&nbsp;from the farmer</li>
          </ul>
        </div>
      </div>
      {/* Testimonials */}
      <div style={{ marginTop: '3rem', width: '100%', maxWidth: 900, background: 'rgba(0,0,0,0.15)', borderRadius: '1rem', padding: '2rem 1rem' }}>
        <h3 style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '1.3rem', textAlign: 'center', marginBottom: '1rem' }}>💬 <span style={{ color: '#43a047' }}>TESTIMONIALS</span> - what our users say <span style={{ color: '#ffd700' }}>★★★★★</span></h3>
        <div style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.2rem', textAlign: 'center' }}>
          “Farmart helped me sell my cattle directly without losing money to brokers. I now reach buyers faster and earn more.”<br />
          <span style={{ fontWeight: 'bold' }}>— John M., Livestock Farmer</span><br />
          <span style={{ color: '#ffd700' }}>★★★★★</span>
        </div>
        <div style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.2rem', textAlign: 'center' }}>
          “I love how easy it is to search for specific breeds. The process feels transparent and trustworthy.”<br />
          <span style={{ fontWeight: 'bold' }}>— Sarah K., Buyer</span><br />
          <span style={{ color: '#ffd700' }}>★★★★★</span>
        </div>
        <div style={{ color: '#fff', fontSize: '1.1rem', textAlign: 'center' }}>
          “The platform is simple, reliable, and fair to both farmers and buyers.”<br />
          <span style={{ fontWeight: 'bold' }}>— David O., Farmer</span><br />
          <span style={{ color: '#ffd700' }}>★★★★★</span>
        </div>
      </div>
    </main>
  );
}
