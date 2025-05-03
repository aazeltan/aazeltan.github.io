// src/pages/Playground.jsx

import React, { useState, useEffect } from 'react';
import './Playground.css';
import InteractiveGlobe from '../components/InteractiveGlobe';
import NowPlaying from '../components/NowPlaying';
import Favorites from '../components/Favorites';

import PlaygroundGraphic from '../assets/playground/playground.png';
import PhotoboothGif from '../assets/playground/photobooth.gif';
import tangerines from '../assets/playground/tangerines.png';

// album assets
import album1 from '../assets/favorites/albums/ariana_grande_eternal_sunshine.png';
import album2 from '../assets/favorites/albums/conan_gray_memories.png';
import album3 from '../assets/favorites/albums/exo_universe.png';
import album4 from '../assets/favorites/albums/justin_bieber_justice.png';
import album5 from '../assets/favorites/albums/taylor_swift_red.png';

// show assets
import show1 from '../assets/favorites/shows/catching_fire.jpg';
import show2 from '../assets/favorites/shows/flipped.jpeg';
import show3 from '../assets/favorites/shows/gilmore_girls.jpg';
import show4 from '../assets/favorites/shows/hospital_playlist.jpg';
import show5 from '../assets/favorites/shows/the_edge_of_seventeen.webp';

// book assets
import book1 from '../assets/favorites/books/hunger_games.jpg';
import book2 from '../assets/favorites/books/legend.jpg';
import book3 from '../assets/favorites/books/outliers.jpg';
import book4 from '../assets/favorites/books/p&p.jpeg';
import book5 from '../assets/favorites/books/pachinko.jpg';

export default function Playground() {
  const [quizAnswer, setQuizAnswer] = useState(null);

  const albumFavorites = [
    { imageSrc: album1, alt: 'Eternal Sunshine – Ariana Grande', url: 'https://open.spotify.com/album/1' },
    { imageSrc: album2, alt: 'Memories – Conan Gray',        url: 'https://open.spotify.com/album/2' },
    { imageSrc: album3, alt: 'Universe – EXO',                url: 'https://open.spotify.com/album/3' },
    { imageSrc: album4, alt: 'Justice – Justin Bieber',       url: 'https://open.spotify.com/album/4' },
    { imageSrc: album5, alt: 'Red – Taylor Swift',            url: 'https://open.spotify.com/album/5' },
  ];

  const showFavorites = [
    { imageSrc: show1, alt: 'Catching Fire',           url: 'https://www.imdb.com/title/tt1951264/' },
    { imageSrc: show2, alt: 'Flipped',                 url: 'https://www.imdb.com/title/tt0817177/' },
    { imageSrc: show3, alt: 'Gilmore Girls',           url: 'https://www.imdb.com/title/tt0238784/' },
    { imageSrc: show4, alt: 'Hospital Playlist',       url: 'https://www.imdb.com/title/tt11769304/' },
    { imageSrc: show5, alt: 'The Edge of Seventeen',   url: 'https://www.imdb.com/title/tt1878870/' },
  ];

  const bookFavorites = [
    { imageSrc: book1, alt: 'The Hunger Games',        url: 'https://yourbooklink.com/1' },
    { imageSrc: book2, alt: 'Legend',                  url: 'https://yourbooklink.com/2' },
    { imageSrc: book3, alt: 'Outliers',                url: 'https://yourbooklink.com/3' },
    { imageSrc: book4, alt: 'Pride & Prejudice',       url: 'https://yourbooklink.com/4' },
    { imageSrc: book5, alt: 'Pachinko',                url: 'https://yourbooklink.com/5' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll('.playground-globe-container, .favorite-block, .playground-sidebar')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="playground-page">
      <header className="playground-header">
        <div className="playground-header-inner">
          <h1 className="playground-header-title">welcome to my…</h1>
          <img
            className="playground-graphic"
            src={PlaygroundGraphic}
            alt="PLAYGROUND"
          />
        </div>
        <p className="playground-tagline">take a peek into my life!</p>
      </header>

      <div className="playground-content">
        <main className="playground-main-col">
          {/* Globe Block */}
          <div className="playground-globe-container">
            <h2 className="playground-col-title">my attempt at globetrotting 🩵</h2>
            <InteractiveGlobe className="playground-globe" />
          </div>

          {/* Favorites Blocks */}
          <div className="favorite-block">
            <Favorites
              icon={<span role="img" aria-label="headphones">🎧</span>}
              title="albums i listen to on repeat"
              items={albumFavorites}
            />
          </div>
          <div className="favorite-block">
            <Favorites
              icon={<span role="img" aria-label="tv">📺</span>}
              title="shows & films i binged"
              items={showFavorites}
            />
          </div>
          <div className="favorite-block">
            <Favorites
              icon={<span role="img" aria-label="book">📕</span>}
              title="books i couldn't put down"
              items={bookFavorites}
            />
          </div>
        </main>

        {/* Sidebar Block */}
        <aside className="playground-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">listening to</h3>
            <NowPlaying />
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-title">currently watching</h3>
            <div className="watching-card">
              <img
                src={tangerines}
                alt="when life gives you tangerines"
                className="watching-poster"
              />
              <div className="watching-info">
                <p className="watching-show">when life gives you tangerines</p>
                <p className="watching-ep">episode 2</p>
              </div>
            </div>
          </div>
          <div className="sidebar-section quiz">
            <h3 className="sidebar-title">coffee or tea?</h3>
            <div className="quiz-buttons">
              <button onClick={() => setQuizAnswer(true)}>Coffee ☕</button>
              <button onClick={() => setQuizAnswer(false)}>Tea 🍵</button>
            </div>
            {quizAnswer === false && (
              <p className="quiz-feedback wrong">Wrong — coffee is better!</p>
            )}
            {quizAnswer === true && (
              <p className="quiz-feedback right">Correct ☕!</p>
            )}
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-title">memories</h3>
            <img
              src={PhotoboothGif}
              alt="Photo-booth strip"
              className="photo-strip-gif"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
