import React from "react";

export default function HoneycombBG(){
  return (
    <div aria-hidden className="hcomb-wrap" style={wrap}>
      <div style={layer} />
      <style>{css}</style>
    </div>
  );
}

const wrap = {
  position: "fixed",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none",
};

const layer = {
  width: "100%",
  height: "100%",
  opacity: 0.35,
  backgroundImage:
    // Hex-style pattern using angled repeating gradients
    `
    radial-gradient(circle at 10px 6px, rgba(255, 200, 82, .25) 2px, transparent 3px),
    radial-gradient(circle at 30px 16px, rgba(255, 200, 82, .25) 2px, transparent 3px),
    radial-gradient(circle at 50px 6px, rgba(255, 200, 82, .25) 2px, transparent 3px)
  `,
  backgroundSize: "60px 22px",
  backgroundPosition: "0 0, 0 0, 0 0",
  animation: "hiveDrift 18s linear infinite",
};

const css = `
@keyframes hiveDrift {
  from { background-position: 0 0, 0 0, 0 0; }
  to { background-position: 60px 0, 60px 0, 60px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hcomb-wrap > div { animation: none !important; }
}
`;

