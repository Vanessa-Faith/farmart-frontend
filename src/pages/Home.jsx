import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main id="home" className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="hero__eyebrow">FarMart</p>
          <h1 id="hero-title">Sell Direct. Earn More. Just Fair Trade.</h1>
          <p className="hero__subtitle">
            Connecting farmers directly to buyers and distributors, eliminating
            middle men — transparently, securely, and profitably.
          </p>
          <div className="hero__actions">
            <Link to="/auth" className="btn btn--primary">Get started</Link>
            <Link to="/animals" className="btn btn--secondary">Browse animals</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
