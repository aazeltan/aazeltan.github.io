import React, { useState, useRef, useEffect } from 'react';
import './TLDRSection.css';
import { FiPlus } from 'react-icons/fi';

export default function TLDRSection({ items }) {
  const [openIndices, setOpenIndices] = useState([]);
  const [anyWrapped, setAnyWrapped] = useState(false);
  const containerRef = useRef(null);

  const toggle = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // on mount + on resize, check if any question-text overflows (wraps)
  useEffect(() => {
    const checkWrap = () => {
      if (!containerRef.current) return;
      const nodes = containerRef.current.querySelectorAll('.question-text');
      const wrapped = Array.from(nodes).some(
        (el) => el.scrollWidth > el.clientWidth + 1
      );
      setAnyWrapped(wrapped);
    };

    checkWrap();
    window.addEventListener('resize', checkWrap);
    return () => window.removeEventListener('resize', checkWrap);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`tldr-section${anyWrapped ? ' wrapped' : ''}`}
    >
      <h2 className="tldr-title">TL;DR – Get to know me!</h2>
      <ul className="tldr-list">
        {items.map((item, index) => (
          <li key={index} className="tldr-item">
            <button
              className="tldr-question"
              onClick={() => toggle(index)}
            >
              <span className="question-text">{item.question}</span>
              <span
                className={`icon ${openIndices.includes(index) ? 'open' : ''}`}
              >
                <FiPlus />
              </span>
            </button>
            {openIndices.includes(index) && (
              <div className="tldr-answer">{item.answer}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
