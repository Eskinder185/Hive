import React, { useEffect, useRef } from "react";

export default function BeesField(){
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let raf = 0; let alive = true;

    function resize(){
      c.width = c.clientWidth * devicePixelRatio;
      c.height = c.clientHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    const ro = new ResizeObserver(resize); ro.observe(c);
    resize();

    const bees = Array.from({ length: 14 }, () => ({
      x: Math.random()*c.clientWidth,
      y: Math.random()*c.clientHeight,
      vx: 0.2 + Math.random()*0.6,
      vy: (Math.random()-0.5)*0.3,
      size: 16 + Math.random()*10,
      alpha: 0.35 + Math.random()*0.3,
      emoji: '🐝',
    }));

    function step(){
      if (!alive) return;
      ctx.clearRect(0,0,c.clientWidth, c.clientHeight);
      for (const b of bees){
        b.x += b.vx; b.y += b.vy;
        if (b.x > c.clientWidth + 30) { b.x = -30; b.y = Math.random()*c.clientHeight; }
        if (b.y < -30) b.y = c.clientHeight + 30; if (b.y > c.clientHeight + 30) b.y = -30;
        ctx.globalAlpha = b.alpha; ctx.font = `${b.size}px system-ui, "Apple Color Emoji", "Segoe UI Emoji"`;
        ctx.fillText(b.emoji, b.x, b.y);
      }
      raf = requestAnimationFrame(step);
    }

    if (!reduce) raf = requestAnimationFrame(step);
    return () => { alive = false; cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div aria-hidden style={{ position:"absolute", inset:0, zIndex: 0, pointerEvents:"none" }}>
      <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }} />
    </div>
  );
}

