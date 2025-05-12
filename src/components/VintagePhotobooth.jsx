import React from 'react';
import './VintagePhotobooth.css';

export default function VintagePhotobooth({ photos }) {
  const doubledPhotos = photos.concat(photos); // duplicate for seamless scroll

  return (
    <div className="vintage-photobooth">
      <div className="strip-container">
        <div className="strip">
          {doubledPhotos.map((photo, i) => (
            <div className="photo-wrapper" key={i}>
              <div className="photo-frame">
                <img src={photo.bw} className="bw-img" alt="" />
                <img src={photo.color} className="color-img" alt="" />
                <div className="film-grain"></div>
                <div className="scratches"></div>
                <div className="grunge-overlay"></div>
                <div className="vignette"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}