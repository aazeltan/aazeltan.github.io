import React from 'react';
import './AazelName.css';

import HelloBubble from '../assets/name/hello.png';
import UpperA from '../assets/name/Uppercase_A.png';
import LowerA from '../assets/name/lowercase_a.png';
import Z from '../assets/name/z.png';
import E from '../assets/name/e.png';
import L from '../assets/name/l.png';
import Star from '../assets/name/star.png';
import Flower from '../assets/name/flower.png';
import MajorNote from '../assets/name/major.png';    // new import

export default function AazelName() {
  return (
    <div className="name-container">
      {/* Main name wrapper with bubble and letters */}
      <div className="name-wrapper">
        <img
          src={HelloBubble}
          alt="Hi! My name is..."
          className="hello-bubble"
        />

        <div className="letters">
          <img src={UpperA} className="letter letter--A" alt="A" />
          <img src={LowerA} className="letter letter--a" alt="a" />
          <img src={Z}      className="letter letter--z" alt="z" />
          <img src={E}      className="letter letter--e" alt="e" />
          <img src={L}      className="letter letter--l" alt="l" />
        </div>
      </div>

      {/* Major note graphic pinned like the photo */}
      <img
        src={MajorNote}
        alt="Math of Comp @UCLA note"
        className="major-note"
      />

      {/* Six stars decorations */}
      <img src={Star} className="decoration star2" alt="" />
      <img src={Star} className="decoration star4" alt="" />
      <img src={Star} className="decoration star5" alt="" />
      <img src={Star} className="decoration star6" alt="" />

      {/* Two flowers decorations */}
      <img src={Flower} className="decoration flower1" alt="" />
      <img src={Flower} className="decoration flower2" alt="" />
    </div>
  );
  }