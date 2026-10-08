import React from 'react';
import './SkeletonLoader.css';

export default function SkeletonLoader({ count = 8 }) {
  const skeletonArray = Array(count).fill(0);

  return (
    <div className="video-grid">
      {skeletonArray.map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton-thumbnail"></div>
          <div className="skeleton-details">
            <div className="skeleton skeleton-avatar"></div>
            <div className="skeleton-info">
              <div className="skeleton skeleton-line title-line"></div>
              <div className="skeleton skeleton-line title-line-short"></div>
              <div className="skeleton skeleton-line meta-line"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
