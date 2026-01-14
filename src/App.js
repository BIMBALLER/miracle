import React, { useState } from 'react';
import { useSpiro } from './hooks/useSpiro';
import Slider from './components/UI/Slider';
import { downloadSpiro } from './utils/exportSvg';

function App() {
  // --- State for Math ---
  const [R, setR] = useState(100);      // Large circle
  const [r, setRsmall] = useState(52);  // Small circle
  const [d, setD] = useState(60);       // Pen offset
  const [iters, setIters] = useState(20);
  
  // --- State for Visuals ---
  const [hue, setHue] = useState(190);  // Default cyan-ish hue

  // Get the generated SVG path from our hook
  const path = useSpiro({ R, r, d, iterations: iters });

  // Download Handler
  const handleDownload = () => {
    // Pass the current hue so the downloaded file matches the screen
    const color = `hsl(${hue}, 90%, 60%)`;
    downloadSpiro(path, `spiro-${Date.now()}.svg`, color);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar Controls */}
      <aside className="w-full md:w-80 bg-slate-900/50 border-r border-slate-800 p-8 z-10 backdrop-blur-xl flex flex-col h-full overflow-y-auto">
        <h1 className="text-xl font-bold mb-8 tracking-tighter text-white">
          SPIRO<span className="text-cyan-500">STUDIO</span>
        </h1>
        
        <div className="flex-1">
          <Slider label="Outer Radius (R)" min={10} max={200} step={1} value={R} onChange={setR} />
          <Slider label="Inner Radius (r)" min={1} max={150} step={1} value={r} onChange={setRsmall} />
          <Slider label="Pen Distance (d)" min={1} max={150} step={1} value={d} onChange={setD} />
          <Slider label="Complexity" min={1} max={100} step={1} value={iters} onChange={setIters} />
          
          {/* Color Slider */}
          <Slider label="Color Hue" min={0} max={360} step={1} value={hue} onChange={setHue} />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-4">
          <button 
            onClick={handleDownload}
            className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export SVG
          </button>

          <p className="text-[10px] text-center text-slate-500 font-mono uppercase tracking-widest">
            React + Tailwind + Math
          </p>
        </div>
      </aside>

      {/* Drawing Canvas */}
      <main className="flex-1 flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-8 relative">
        {/* The SVG Container */}
        <div className="relative w-full max-w-[70vh] aspect-square">
          <svg 
            viewBox="-250 -250 500 500" 
            className="w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            <path 
              d={path} 
              fill="none" 
              style={{ stroke: `hsl(${hue}, 90%, 60%)` }}
              className="transition-all duration-300 ease-out" 
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Subtle Background Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </main>

    </div>
  );
}

export default App;