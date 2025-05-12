// src/components/CursorTrail.jsx
import React, { useRef, useEffect } from 'react';
import './CursorTrail.css';

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let mouseMoved = false;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const params = {
      pointsNumber: 3,
      maxRadius: 21,
      minRadius: 15,
      spring: 0.2,
      friction: 0.4,
    };

    const trail = Array.from({ length: params.pointsNumber }).map(() => ({
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    }));

    // use clientX/Y so transforms and scroll don't distort it
    const updatePointer = (x, y) => {
      pointer.x = x;
      pointer.y = y;
    };
    const onMove = e => {
      mouseMoved = true;
      updatePointer(e.clientX, e.clientY);
    };
    const onTouch = e => {
      mouseMoved = true;
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let raf;
    const draw = t => {
      if (!mouseMoved) {
        pointer.x = (0.5 + 0.02 * Math.cos(0.001 * t) * Math.sin(0.003 * t)) * canvas.width;
        pointer.y = (0.5 + 0.02 * Math.cos(0.004 * t)) * canvas.height;
      }

      trail.forEach((p, i) => {
        const prev = i === 0 ? pointer : trail[i - 1];
        p.dx += (prev.x - p.x) * params.spring;
        p.dy += (prev.y - p.y) * params.spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.forEach((p, i) => {
        const tnorm = i / (trail.length - 1);
        const radius = params.maxRadius * (1 - tnorm) + params.minRadius * tnorm;
        const alpha = 0.5 * (1 - tnorm) + 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 149, 237, ${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail-canvas" />;
}
