import { useMemo } from 'react';

/**
 * R = Large circle radius
 * r = Small circle radius
 * d = Distance from center of small circle
 */
export const useSpiro = ({ R, r, d, resolution = 0.1, iterations = 20 }) => {
  const pathData = useMemo(() => {
    let points = [];
    
    // We loop through 'theta' to calculate points along the curve
    for (let theta = 0; theta < Math.PI * iterations; theta += resolution) {
      // The Hypotrochoid Math
      const x = (R - r) * Math.cos(theta) + d * Math.cos(((R - r) / r) * theta);
      const y = (R - r) * Math.sin(theta) - d * Math.sin(((R - r) / r) * theta);
      
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    // Return an SVG path string: "M x,y L x,y L x,y..."
    return `M ${points.join(" L ")}`;
  }, [R, r, d, resolution, iterations]);

  return pathData;
};