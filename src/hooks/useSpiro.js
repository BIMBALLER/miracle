import { useMemo } from 'react';

export const useSpiro = ({ R, r, d, iterations }) => {
  return useMemo(() => {
    let pathData = "";
    // We use a high resolution (0.05) for smooth curves
    const step = 0.05; 
    const totalSteps = iterations * Math.PI * 2;

    for (let theta = 0; theta <= totalSteps; theta += step) {
      // Hypotrochoid Formula
      const x = (R - r) * Math.cos(theta) + d * Math.cos(((R - r) / r) * theta);
      const y = (R - r) * Math.sin(theta) - d * Math.sin(((R - r) / r) * theta);

      if (theta === 0) {
        pathData += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      } else {
        pathData += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
    }

    return pathData;
  }, [R, r, d, iterations]);
};