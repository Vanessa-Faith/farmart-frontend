import { Link } from 'react-router-dom'

export default function Home() {
  // This component now only shows for non-logged in users
  // Logged-in users are redirected via AppRoutes
  return (
    <main className="home">
      <section className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">Farm Fresh Marketplace</span>
          <h1>Quality Livestock, Straight from the Farm</h1>
          <p className="hero__subtitle">
            Connect directly with local farmers. Browse healthy, well-cared-for livestock
            and support sustainable agriculture in your community.
          </p>
          <div className="hero__actions">
            <Link to="/register" className="btn btn--primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn--ghost">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__inner">
          <h2>Why Choose FarMart?</h2>
          <ul className="features-list">
            <li>🐄 Direct from verified local farmers</li>
            <li>✅ Health-checked and vaccinated livestock</li>
            <li>🚚 Convenient delivery options</li>
            <li>💬 Direct communication with sellers</li>
          </ul>
        </div>
      </section>

      <section className="section section--dark">
        <div className="section__inner">
          <h2>For Farmers</h2>
          <p>List your livestock and reach buyers across the region.</p>
          <Link to="/register" className="btn btn--secondary" style={{ marginTop: '20px' }}>
            Start Selling
          </Link>
        </div>
      </section>
    </main>
  )
}
