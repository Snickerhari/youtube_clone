import React, { useContext } from 'react';
import { YoutubeContext } from '../context/YoutubeContext';
import VideoCard from '../components/VideoCard';
import SkeletonLoader from '../components/SkeletonLoader';
import './Home.css';

export default function Home() {
  const { videos, activeCategory, isLoading } = useContext(YoutubeContext);

  const filteredVideos = activeCategory === "All"
    ? videos
    : videos.filter(video => video.category.toLowerCase() === activeCategory.toLowerCase());

  if (isLoading) {
    return <SkeletonLoader count={8} />;
  }

  return (
    <div className="home-container">
      {filteredVideos.length === 0 ? (
        <div className="empty-state">
          <h3>No videos found</h3>
          <p>Try exploring another category or upload your own video!</p>
        </div>
      ) : (
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
