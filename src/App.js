import React, { useState } from 'react';
import { useSpiro } from './hooks/useSpiro';
import Slider from './components/UI/Slider';
import { downloadSpiro } from './utils/exportSvg';

const spiroPresets = [
  { name: "Neon Star", R: 100, r: 62, d: 80, iters: 40, hue: 280 },
  { name: "Atomic Orbit", R: 150, r: 52, d: 100, iters: 25, hue: 190 },
  { name: "Geometric Rose", R: 120, r: 4, d: 70, iters: 15, hue: 340 },
  { name: "Galactic Mesh", R: 200, r: 149, d: 140, iters: 80, hue: 160 }
];

function App() {
  // --- State Logic ---
  const [R, setR] = useState(150); 
  const [r, setRsmall] = useState(52);
  const [d, setD] = useState(100);
  const [iters, setIters] = useState(25);
  const [hue, setHue] = useState(190);

  // Use the corrected hook
  const path = useSpiro({ R, r, d, iterations: iters });

  const handleDownload = () => {
    const color = `hsl(${hue}, 90%, 60%)`;
    downloadSpiro(path, `spiro-${Date.now()}.svg`, color);
  };

  const resetView = () => {
    setR(150); setRsmall(52); setD(100); setIters(25); setHue(190);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      
      {/* Sidebar Controls */}
      <aside className="w-full md:w-80 bg-slate-900/90 border-r border-slate-800 p-6 z-10 backdrop-blur-xl flex flex-col overflow-y-auto shrink-0">
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tighter text-white">
            SPIRO<span className="text-cyan-400">STUDIO</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-mono">PARAMETRIC VECTOR ENGINE</p>
        </div>
        
        <div className="flex-1 space-y-1">
          <Slider label="Outer Radius (R)" min={10} max={250} step={1} value={R} onChange={setR} />
          <Slider label="Inner Radius (r)" min={1} max={200} step={1} value={r} onChange={setRsmall} />
          <Slider label="Pen Distance (d)" min={1} max={200} step={1} value={d} onChange={setD} />
          <Slider label="Complexity" min={1} max={100} step={1} value={iters} onChange={setIters} />
          <Slider label="Color Hue" min={0} max={360} step={1} value={hue} onChange={setHue} />

          <div className="pt-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3 border-b border-slate-800 pb-1">Presets</p>
            <div className="grid grid-cols-2 gap-2">
              {spiroPresets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => { setR(p.R); setRsmall(p.r); setD(p.d); setIters(p.iters); setHue(p.hue); }}
                  className="text-[10px] py-2 bg-slate-800 hover:bg-cyan-900/30 hover:text-cyan-400 text-slate-400 rounded border border-slate-700 transition-all active:scale-95"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button 
            onClick={handleDownload}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/40 active:scale-95"
          >
            Export SVG
          </button>
          <button 
            onClick={resetView}
            className="w-full py-2 text-[11px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            Reset Camera
          </button>
        </div>
      </aside>

      {/* Main Display Area */}
      <main className="flex-1 flex items-center justify-center bg-black relative p-8">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
          <svg 
            viewBox="-300 -300 600 600" 
            className="w-full h-full overflow-visible drop-shadow-2xl"
          >
            <path 
              d={path} 
              fill="none" 
              style={{ 
                stroke: `hsl(${hue}, 90%, 60%)`,
                filter: `drop-shadow(0 0 12px hsl(${hue}, 90%, 60%))` 
              }}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
        </div>

        {/* HUD Overlay */}
        <div className="absolute top-8 right-8 text-right opacity-30 font-mono text-[10px] hidden md:block">
          <p>STATUS: OPERATIONAL</p>
          <p>RESOLUTION: 0.05 RAD</p>
          <p>X_LIMIT: ±300</p>
          <p>Y_LIMIT: ±300</p>
        </div>
      </main>
    </div>
  );
}

export default App;