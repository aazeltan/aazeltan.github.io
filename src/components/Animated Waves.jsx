import '../styles/wave.css';

export default function AnimatedWaves() {
  return (
    <div className="section_wave">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000">
        {[...Array(10)].map((_, i) => (
          <path
            key={i}
            className={`dash dash_${i}`}
            d="M0,500 Q250,450 500,500 T1000,500"
            fill="none"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}

