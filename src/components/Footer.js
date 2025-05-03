import React from 'react';  
import './Footer.css';
import ChatGPT from '../assets/icons/chatgpt.png';
import Arrow from '../assets/icons/arrow.png'; 
import React_pic from '../assets/icons/react.png';

const Footer = () => {
  return (
    <div className="footer-div">
      <hr className="footer-div-line" />

      {/* Main content container */}
      <div className="footer-content">
        <div className="footer-left">
          <h1 className="footer-heading"> Thanks for visiting my digital corner</h1>
          <p className="footer-subtext">
            Don’t leave just yet!
            I would love to chat and connect with you {'<3'}
          </p>
        </div>

        {/* Right side: icons + resume link */}
        <div className="footer-right">
          <div className="footer-icons">
            <a href="https://github.com/aazeltan" target="_blank" rel="noopener noreferrer">
              <div className="footer-icon" id="footer-icon1"></div>
            </a>
            <a href="https://www.linkedin.com/in/aazeltan/" target="_blank" rel="noopener noreferrer">
              <div className="footer-icon" id="footer-icon2"></div>
            </a>
            <a href="mailto:aazeltan@gmail.com" target="_blank" rel="noopener noreferrer">
              <div className="footer-icon" id="footer-icon3"></div>
            </a>
          </div>

          <div className="footer-resume">
            <a 
              href="path/to/your_resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resume-link"
            >
              Resume{' '}
              <img
                src={Arrow}
                alt="Arrow"
                className="resume-arrow"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom center: 'Made with ...' */}
      <div className="footer-bottom-center">
        <p>
          Made with a spoonful of 
          <img 
            src={React_pic} 
            alt="React" 
            style={{ height: '20px', verticalAlign: 'middle', margin: '0 5px' }} 
          />
          and a sprinkle of 
          <img 
            src={ChatGPT} 
            alt="ChatGPT" 
            style={{ height: '20px', verticalAlign: 'middle', margin: '0 5px' }} 
          />
          by me 
        </p>
      </div>
    </div>
  );
};

export default Footer;
