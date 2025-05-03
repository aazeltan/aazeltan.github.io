import React, { useRef, useEffect } from "react";
import "./AutoScrollGallery.css";

const AutoScrollGallery = ({ images, scrollSpeed = 75 }) => {
  // Duplicate the images array so the first half is repeated.
  const duplicatedImages = [...images, ...images, ...images, ...images];
  // Use ref on the gallery-content element so we can measure its scroll width.
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Get the total scrollable width (which is two sets of images).
      const totalWidth = contentRef.current.scrollWidth;
      // The width of one complete set is half of that.
      const oneSetWidth = totalWidth / 2;
      // Set a CSS variable so our keyframes know how far to scroll.
      contentRef.current.style.setProperty("--set-width", `${oneSetWidth}px`);
      // Calculate the duration (in seconds) to scroll one set using the scrollSpeed (px per second).
      const duration = oneSetWidth / scrollSpeed;
      // Set the CSS variable used for animation duration.
      contentRef.current.style.setProperty("--duration", `${duration}s`);
    }
  }, [images, scrollSpeed]);

  return (
    <div className="gallery-wrap">
        <div className="gallery-content" ref={contentRef}>
          {duplicatedImages.map((src, index) => (
            <span key={index}>
              <img src={src} alt={`Gallery image ${index}`} />
            </span>
          ))}
        </div>
      </div>
  );
};

export default AutoScrollGallery;
