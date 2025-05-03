import React, { useState } from 'react';
import './TLDRSection.css';
import { FiPlus } from 'react-icons/fi';

export default function TLDRSection({ items }) {
  const [openIndices, setOpenIndices] = useState([]);

  const toggle = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="tldr-section">
      <h2 className="tldr-title">TL;DR – Get to know me!</h2>
      <ul className="tldr-list">
        {items.map((item, index) => (
          <li key={index} className="tldr-item">
            <button
              className="tldr-question"
              onClick={() => toggle(index)}
            >
              <span className="question-text">{item.question}</span>
              <span className={`icon ${openIndices.includes(index) ? 'open' : ''}`}>
                <FiPlus />
              </span>
            </button>

            {openIndices.includes(index) && (
              <div className="tldr-answer">
                {item.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
