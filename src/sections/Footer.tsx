import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-black text-white border-t border-zinc-800">
      <div className="container mx-auto max-w-2xl text-center">
        <h3 className="text-2xl font-bold mb-2">DS CUTZ</h3>
        <div className="text-zinc-400 mb-8 flex flex-col items-center justify-center gap-1">
          <p>Quality cuts, every time ✨</p>
          <div className="mt-4 text-sm text-zinc-500">
            <p>227-231 Heathway</p>
            <p>Dagenham, RM9 5AN</p>
            <p className="mt-1">
              <a href="tel:07308304796" className="hover:text-zinc-300 transition-colors">07308 304796</a>
            </p>
            <a 
              href="https://www.google.com/maps/dir//227-231+Heathway,+Dagenham+RM9+5AN" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-2 text-zinc-400 hover:text-white underline underline-offset-4"
            >
              Get directions
            </a>
          </div>
        </div>
        
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
