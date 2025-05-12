import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const [open, setOpen] = useState(false);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
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

  // close dropdown when any link inside is clicked
  useEffect(() => {
    const linksContainer = navRef.current.querySelector('.navlinks');
    const handleClick = () => setOpen(false);
    linksContainer.addEventListener('click', handleClick);
    return () => linksContainer.removeEventListener('click', handleClick);
  }, []);

  // **NEW**: close dropdown on window resize
  useEffect(() => {
    const handleResize = () => setOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`navbar${open ? ' open' : ''}`}
    >
      <NavLink to="/" end>
        <div className="top-left-name">
          <h1>Aazel Tan</h1>
        </div>
      </NavLink>

      {/* Hamburger toggle */}
      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        onClick={() => setOpen(o => !o)}
      >
        <span />
        <span />
        <span />
      </button>

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
