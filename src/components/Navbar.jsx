// Navbar.jsx
import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      // if scrolling down and past 50px, hide
      if (currentY > lastScrollY.current && currentY > 50) {
        navRef.current.classList.add('hidden');
      } else {
        navRef.current.classList.remove('hidden');
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <NavLink to="/" end>
        <div className="top-left-name">
          <h1>Aazel Tan</h1>
        </div>
      </NavLink>

      <div className="navlinks">
        {['home', 'playground', 'about'].map((path) => (
          <NavLink
            key={path}
            to={path === 'home' ? '/' : `/${path}`}
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active-link' : 'nav-link'
            }
          >
            {path}
          </NavLink>
        ))}

        <a
          href="https://www.linkedin.com/in/aazeltan/"
          target="_blank"
          rel="noopener noreferrer"
          className="connect-button"
        >
          connect
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
