import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/background.mp4"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <section className="relative z-20 flex flex-col items-center justify-center min-h-screen py-32 px-10 text-center text-white">
        <h1 className="text-6xl font-bold mb-6">Welcome to FarMart</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">Connect directly with farmers and buy quality livestock at fair prices</p>
        <Link to="/animals" className="inline-block px-8 py-4 bg-farm-green text-white rounded-lg text-lg font-semibold hover:bg-farm-green-dark transition">
          Browse Animals
        </Link>
      </section>
    </div>
  );
}
