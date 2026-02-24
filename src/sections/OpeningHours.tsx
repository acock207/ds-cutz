import React from 'react';

const hours = [
  { day: 'Monday', time: '3:45pm - 8pm' },
  { day: 'Tuesday', time: '3:45pm - 8pm' },
  { day: 'Wednesday', time: '3:45pm - 8pm' },
  { day: 'Thursday', time: '3:45pm - 8pm' },
  { day: 'Friday', time: '3:45pm - 8pm' },
  { day: 'Saturday', time: '11am - 8pm' },
  { day: 'Sunday', time: 'Closed' },
];

export default function OpeningHours() {
  return (
    <section id="hours" className="py-16 px-4 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Opening Hours</h2>
        <div className="bg-white dark:bg-black rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <ul className="space-y-4">
            {hours.map((item) => (
              <li key={item.day} className="flex justify-between items-center text-sm md:text-base">
                <span className="font-medium text-zinc-900 dark:text-white">{item.day}</span>
                <span className={`${item.time === 'Closed' ? 'text-zinc-400' : 'text-zinc-600 dark:text-zinc-300'}`}>
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
