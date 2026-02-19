import React from 'react';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 px-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
          Precision Cuts & Styles
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
          Experience the finest grooming at DS CUTZ. Professional service, modern styles, and a relaxing atmosphere.
        </p>
        <a 
          href="#book"
          className="inline-block bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Book Appointment
        </a>
      </div>
    </section>
  );
}
