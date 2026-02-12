import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-farm-dark">
      <section className="bg-gradient-to-r from-black/60 to-black/60 bg-cover bg-center py-32 px-10 text-center text-white" style={{backgroundImage: "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200')"}}>
        <h1 className="text-6xl font-bold mb-6">Welcome to FarMart</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">Connect directly with farmers and buy quality livestock at fair prices</p>
        <Link to="/animals" className="inline-block px-8 py-4 bg-farm-green text-white rounded-lg text-lg font-semibold hover:bg-farm-green-dark transition">
          Browse Animals
        </Link>
      </section>
    </div>
  );
}
