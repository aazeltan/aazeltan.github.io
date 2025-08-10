import React from 'react';
import './Home.css';

import WorkProjectLeft from '../components/WorkProjectLeft';
import WorkProjectRight from '../components/WorkProjectRight';
import AazelName from '../components/AazelName';
import NightSky from '../components/NightSky';
import Typewriter from '../components/Typewriter';

import MetaLogo from '../assets/experiences/meta_logo.png';
import ExponentLogo from '../assets/experiences/Exponent.png';
import UberLogo from '../assets/experiences/Uber.png';
import HandshakesLogo from '../assets/experiences/Handshakes.png';

import MetaProj from '../assets/experiences/meta_proj.png';
import ExponentProj from '../assets/experiences/exponent_proj.png';
import UberProj from '../assets/experiences/uber_proj.png';
import HandshakesProj from '../assets/experiences/handshakes_project.jpeg';

const Home = () => {
  return (
    <>
      <NightSky />

      <div className="home-header">
        <div className="home-name">
          <AazelName />
        </div>

        <p className="home-role">
          I am a&nbsp;
          <Typewriter
            words={[
              'Product Manager',
              'Data Scientist',
              'Developer',
              'Aspiring Designer'
            ]}
            typingSpeed={120}
            deletingSpeed={60}
            pause={2000}
          />
        </p>

        <p className="home-status">
          Currently @
          <a
            href="https://about.meta.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-status-logo-link"
          >
            <img src={MetaLogo} alt="Meta" className="home-status-logo" />
          </a>
          , Previously @
          <a
            href="https://www.uber.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-status-link"
          >
            Uber ↗
          </a>
          ,
          <a
            href="https://www.handshakes.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-status-link"
          >
            Handshakes ↗
          </a>
        </p>

        <div className="intro-arrow">⌄</div>
      </div>

      {/* Meta */}
      <WorkProjectRight
        screenshot={MetaProj}
        companyLogo={MetaLogo}
        roleTitle="Data Science Intern (Product Analytics)"
        projectHeadline="Driving CTX Ads Monetization Opportunities on Facebook"
        projectDescription="Identified why Click-to-Messaging (CTX) ads on Reels lagged behind Feed and worked with cross-functional teams on creative and UI fixes to close the gap."
        tags={['SQL', 'Product Recommendations', 'Conversion Optimization', 'Creative Strategy']}
      />

      {/* Exponent */}
      <WorkProjectLeft
        screenshot={ExponentProj}
        companyLogo={ExponentLogo}
        roleTitle="Product Management (Data Science Track) Fellow"
        projectHeadline="Transforming Content Design for Data Science Products"
        projectDescription="Revamped 100+ lessons for clarity and cohesion, guided by competitive analysis and NLP-driven forum insights."
        tags={['Product Roadmap', 'Web Scraping', 'Sentiment Analysis', 'Content Strategy']}
      />

      {/* Uber */}
      <WorkProjectRight
        screenshot={UberProj}
        companyLogo={UberLogo}
        roleTitle="Product Manager (Contract)"
        projectHeadline="Reimagining Campus Dining Experiences"
        projectDescription="Synthesized surveys and interviews to prototype new integrated dining flows and reduced user friction in checkout."
        tags={['Persona Development', 'User Journey Mapping', 'Usability Testing', 'Product-Market Fit']}
      />

      {/* Handshakes */}
      <WorkProjectLeft
        screenshot={HandshakesProj}
        companyLogo={HandshakesLogo}
        roleTitle="Product Manager Intern"
        projectHeadline="Building an Intelligent Risk‐Detection Feature"
        projectDescription="Leveraged NLP on 60K+ company feeds to flag adverse media and led roadmap a B2B API that bolstered compliance workflows and generated over $30,000."
        tags={['NLP', 'User Acceptance Testing', 'Product Discovery', 'API Development']}
      />
    </>
  );
};

export default Home;
