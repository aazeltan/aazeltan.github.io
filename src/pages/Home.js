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
          Incoming @
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

        {/* Arrow is now a flex item pushed to the bottom */}
        <div className="intro-arrow">⌄</div>
      </div>

      <WorkProjectLeft
        screenshot={ExponentProj}
        companyLogo={ExponentLogo}
        roleTitle="Product Management Fellow"
        projectHeadline="Led Data Science Track Roadmap"
        projectDescription="Prioritized updates across 100+ lessons, driving a 15% lift in ratings and 30% fewer confusion reports."
        tags={['Product Strategy', 'Roadmap', 'Content']}
      />

      <WorkProjectRight
        screenshot={UberProj}
        companyLogo={UberLogo}
        roleTitle="Product Manager (Contract)"
        projectHeadline="Redefining Campus Dining Options"
        projectDescription="Synthesized user insights into 5 personas and revamped flows, cutting checkout time by ~25%."
        tags={['UX Research', 'Figma', 'A/B Testing']}
      />

      <WorkProjectLeft
        screenshot={HandshakesProj}
        companyLogo={HandshakesLogo}
        roleTitle="Product Management Intern"
        projectHeadline="Championed B2B API Revenue Growth"
        projectDescription="Defined roadmap that generated $30K+, led AI risk feature for 60K+ firms, boosting reliability by 40%."
        tags={['B2B SaaS', 'AI', 'UAT']}
      />
    </>
  );
};

export default Home;
