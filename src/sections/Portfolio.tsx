import React from 'react';

const images = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
  '/images/5.jpeg',
  '/images/6.jpeg',
  '/images/7.jpeg',
  '/images/8.jpeg',
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 px-4 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Work</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div key={index} className="aspect-square rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 hover:opacity-90 transition-opacity cursor-pointer">
              <img 
                src={src} 
                alt={`Portfolio work ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
