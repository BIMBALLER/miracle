export const downloadSpiro = (pathData, fileName, strokeColor = "#22d3ee") => {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-250 -250 500 500" width="1000" height="1000">
      <rect width="100%" height="100%" fill="#020617" />
      <path d="${pathData}" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linejoin="round" />
    </svg>
  `;

  const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};