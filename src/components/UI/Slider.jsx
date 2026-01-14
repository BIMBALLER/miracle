import React from 'react';

const Slider = ({ label, min, max, step, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2 mb-6">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500">
        <span>{label}</span>
        <span className="text-cyan-400 font-bold bg-cyan-950/30 px-2 py-0.5 rounded">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
      />
    </div>
  );
};

export default Slider;