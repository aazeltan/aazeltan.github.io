import React from 'react';
import './Favorites.css';

export default function Favorites({
  icon,
  title,  // ← accept linkText, not title
  items = []
}) {
  // if no items passed, fill with 5 placeholders
  if (!items.length) {
    items = Array.from({ length: 5 }).map((_, i) => ({
      imageSrc: '',   // your fallback
      alt: `Favorite ${i + 1}`,
      url: '#'
    }));
  }

  return (
    <section className="favorites">
      <div className="favorites__header">
        {icon && <span className="favorites__icon">{icon}</span>}
        {title && <span className="favorites__title">{title}</span>}
      </div>
      <div className="favorites__strip">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            className="favorites__item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={item.imageSrc}
                 alt={item.alt}
                 className="favorites__img"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
