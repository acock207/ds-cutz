import React from 'react';
import { services } from '../data/services';

export default function Services() {
  return (
    <section id="services" className="py-16 px-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Services</h2>
        <div className="space-y-4">
          {services.map((service) => (
            <div 
              key={service.id}
              className="flex items-start justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-zinc-900 dark:text-white">{service.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-zinc-900 dark:text-white">{service.price}</span>
                  <span className="text-zinc-400">~ {service.duration}</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-200 dark:bg-zinc-800">
                 <img 
                   src={service.image} 
                   alt={service.title} 
                   className="w-full h-full object-cover"
                 />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
