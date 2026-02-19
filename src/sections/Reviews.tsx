import React from 'react';
import { Star } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 px-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Reviews</h2>
        
        <div className="flex items-end gap-2 mb-2">
          <span className="text-6xl font-bold text-zinc-900 dark:text-white">5.0</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">AVG</span>
        </div>
        
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 fill-green-500 text-green-500" />
          ))}
        </div>
        
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">Based on 0 Reviews</p>
        
        <div className="py-8 text-center border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">No comments have been left yet. Be the first!</p>
        </div>
      </div>
    </section>
  );
}
