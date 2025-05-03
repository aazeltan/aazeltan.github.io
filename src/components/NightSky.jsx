// src/components/NightSky.jsx
import React from 'react';
import '../styles/sky.scss';

export default function NightSky() {
  // make this match $star-count
  const STAR_COUNT = 50;

  return (
    <div className="night">
      {Array.from({ length: STAR_COUNT }).map((_, i) => (
        <div key={i} className="shooting_star" />
      ))}
    </div>
  );
}
