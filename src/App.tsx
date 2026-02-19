import React from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Reviews from './sections/Reviews';
import OpeningHours from './sections/OpeningHours';
import Booking from './sections/Booking';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Reviews />
        <OpeningHours />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
