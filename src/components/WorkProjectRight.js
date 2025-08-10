// src/components/WorkProjectRight.js
import React, { useEffect, useRef } from 'react';
import './WorkProject.css';

const WorkProjectRight = ({
  screenshot,
  companyLogo,
  roleTitle,
  projectHeadline,
  projectDescription,
  tags
}) => {
  const projectRef = useRef(null);

  useEffect(() => {
    const projectElement = projectRef.current;
    if (!projectElement) return;

    // Intersection Observer for scroll reveal
    const observerOptions = {
      threshold: 0.2,
    };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);
    observer.observe(projectElement);

    // Enhanced 3D Magnetic Hover Effect
    const handleMouseMove = (e) => {
      const rect = projectElement.getBoundingClientRect();
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;

      // Calculate cursor offset from center
      const offsetX = e.clientX - (rect.left + halfWidth);
      const offsetY = e.clientY - (rect.top + halfHeight);

      // Rotation: up to 15°; invert Y for natural movement.
      const rotateX = (-offsetY / halfHeight) * 15;
      const rotateY = (offsetX / halfWidth) * 15;

      // Optional translation on X and Y axes
      const translateX = (offsetX / halfWidth) * 10;
      const translateY = (offsetY / halfHeight) * 10;

      // TranslateZ: pop-out effect strongest in the center.
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      const maxDistance = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight);
      const translateZ = 30 * (1 - distance / maxDistance);

      projectElement.style.transform = `
        perspective(1000px)
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(${translateZ}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
      projectElement.style.boxShadow = `0 ${4 + translateY / 2}px ${8 + Math.abs(translateX) + translateZ}px rgba(0, 0, 0, 0.3)`;
    };

    const handleMouseLeave = () => {
      projectElement.style.transform = '';
      projectElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    };

    projectElement.addEventListener('mousemove', handleMouseMove);
    projectElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      projectElement.removeEventListener('mousemove', handleMouseMove);
      projectElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="work-project reverse" ref={projectRef}>
      {/* Due to the "reverse" class, the image is positioned on the right */}
      <div className="work-project-image">
        <img src={screenshot} alt="Project Screenshot" className="project-screenshot" />
      </div>
      {/* Content Column */}
      <div className="work-project-content">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
        <h3 className="role-title">{roleTitle}</h3>
        <h1 className="project-headline">{projectHeadline}</h1>
        <p className="project-description">{projectDescription}</p>
        <div className="work-tags">
          {tags.map((tag, index) => (
            <div className="work-tag" key={index}>{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkProjectRight;
