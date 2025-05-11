import React from 'react';
import './About.css';
import VintagePhotobooth from '../components/VintagePhotobooth';

// ← new import
import TLDRSection from '../components/TLDRSection';

import aboutPhoto from '../assets/about/about_photo.png';
import wave      from '../assets/about/wave.gif';
import hiThere   from '../assets/about/hi_there.png';

export default function About() {
  const placeholderFavorites = Array.from({ length: 5 }, () => ({
    bw: aboutPhoto,
    color: aboutPhoto,
  }));

  // ← define your questions + answers here
  const tldrItems = [
    {
      question: 'What tools do you work with most often?',
      answer: `I mostly use Python and SQL for data and backend work, and JavaScript or TypeScript when I’m building frontends. For research projects, I’ll pull out R, and I use Git to collaborate with teammates. When I'm thinking through product ideas, I’ll sketch things out in Figma. I enjoy bouncing between code and design, I find it keeps things interesting.`
    },
    {
      question: 'What is Mathematics of Computation?',
      answer: `Being a Math of Comp major means I don’t just know how to code up models—I actually understand the math that makes them work. It’s a mix of math, computer science, and theory, so I can build things and explain what’s going on under the hood.`
    },
    {
      question: 'What communities are you part of at UCLA?',
      answer: `A mix of tech, policy, and home. I’m part of the Society of Women Engineers, where I keep in touch with my interest in advocacy through national lobbying efforts. I learned web dev through ACM Hack and started teaching it too. DataRes helped me level up my data skills, and The Bruin Group gave me a taste of business. The Singapore Students Association? That’s my home away from home.`
    },
    {
      question: 'What motivates you?',
      answer: `Being a first-generation student means I’ve lived both sides — knowing what it’s like to not have access, and wanting to change that. I’m driven by the idea that systems can be reimagined to include more people, not just optimize for those already in the room. Whether I’m building tools, teaching students, or shaping policy, I’m always asking: who else could this help?`
    },
    {
      question: 'What’s one skill you’re unexpectedly good at?',
      answer: `Braiding hair! It’s a bit random, but I’ve gotten pretty good at it since first learning how to French braid at 9—I was determined to recreate Katniss Everdeen’s braid for school, and my mum definitely wasn’t waking up at 6am to do it for me.`
    }
  ];
  

  return (
    <div className="about-page">
      <div className="about-content">
        {/* LEFT: Big Photo + Photobooth strip */}
        <div className="about-image-block">
          <img
            src={aboutPhoto}
            alt="Aazel"
            className="about-main-img"
          />
          <div className="about-photo-strip">
            <VintagePhotobooth photos={placeholderFavorites} />
          </div>
        </div>

        {/* RIGHT: Greeting + Intro text */}
        <div className="about-text-block">
          <div className="text-greeting">
            <img src={hiThere} alt="hi there" className="hi-there-img" />
            <img src={wave}    alt="wave"    className="wave-gif"     />
          </div>
          <p className="about-intro">
            <span className="emoji-point">
              <strong>🙇🏻‍♀️ Aazel Tan</strong> (pronounced like hazel but ‘ay-zel’!)
            </span>
            <br/><br/>

            <span className="emoji-point">
              <strong>💻 Mathematics of Computation</strong> @ UCLA
            </span>
            <br/><br/>

            With experience in product management, data science, and web development, I bring a multidisciplinary lens to every problem I tackle. I’ve worked on everything from social impact ventures to web dev workshops to AI-driven tools — always with an eye toward clarity, empathy, and usability. I’m especially interested in how different disciplines can shape better products. Whether it's collaborating with designers, engineers, or researchers, I enjoy being the bridge that translates ideas across roles and keeps users at the center.
            <br/><br/>
            When you don’t see me wireframing or wrangling data, you’ll probably find me wandering aimlessly around my favorite mall (ION Orchard, of course), filling my Amazon cart, and picking up a new hobby I definitely don’t have time for. (Serial hobbyist alert.)
            <br/><br/>
            ✨ I believe in building with heart and logic — because thoughtful products don’t just function, they connect.
          </p>
        </div>
      </div>

      {/* ← TL;DR Q&A section at the bottom */}
      <TLDRSection items={tldrItems} />
    </div>
  );
}
