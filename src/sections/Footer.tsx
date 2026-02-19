import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-black text-white border-t border-zinc-800">
      <div className="container mx-auto max-w-2xl text-center">
        <h3 className="text-2xl font-bold mb-2">DS CUTZ</h3>
        <p className="text-zinc-400 mb-8 flex items-center justify-center gap-2">
          Quality cuts, every time ✨
        </p>
        
        <div className="flex justify-center gap-8 text-sm font-medium">
          <a 
            href="https://www.instagram.com/ds_cutz1?igsh=MWpoMnB5cWYwNDEydA==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            Instagram
          </a>
          <a 
            href="https://www.tiktok.com/@ds_cutz1?_r=1&_t=ZN-93xGBwkE8T0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            TikTok
          </a>
          <a href="#book" className="hover:text-zinc-300 transition-colors">Contact</a>
        </div>
        
        <div className="mt-12 text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} DS CUTZ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
