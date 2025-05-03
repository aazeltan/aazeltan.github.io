import React, { useState, useEffect } from 'react';
import './Typewriter.css';

export default function Typewriter({
  words = ['Product Manager', 'Data Scientist', 'Developer', 'Designer'],
  typingSpeed = 150,
  deletingSpeed = 80,
  pause = 1500,
}) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timer;

    if (!isDeleting) {
      // typing
      timer = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, typingSpeed);
      if (text === current) {
        timer = setTimeout(() => setIsDeleting(true), pause);
      }
    } else {
      // deleting
      timer = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, deletingSpeed);
      if (text === '') {
        setIsDeleting(false);
        setIndex(i => i + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, words, index, typingSpeed, deletingSpeed, pause]);

  return (
    <span className="typewriter">
      {text}
      <span className="cursor" />
    </span>
  );
}
