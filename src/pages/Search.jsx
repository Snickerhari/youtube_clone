import React, { useContext } from 'react';
import { YoutubeContext } from '../context/YoutubeContext';
import { CheckCircle } from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';
import './Search.css';

export default function Search() {
  const { videos, channels, pageParams, isLoading, navigate } = useContext(YoutubeContext);
  const query = pageParams.query || "";

  const results = videos.filter(video => {
    const channel = channels[video.channelId];
    return video.title.toLowerCase().includes(query.toLowerCase()) || 
           video.description.toLowerCase().includes(query.toLowerCase()) ||
           (channel && channel.name.toLowerCase().includes(query.toLowerCase()));
  });

  if (isLoading) {
    // Show a general list skeleton
    return (
      <div className="search-skeleton-container">
        {Array(4).fill(0).map((_, idx) => (
          <div key={idx} className="search-skeleton-item">
            <div className="skeleton search-skeleton-thumb"></div>
            <div className="search-skeleton-text">
              <div className="skeleton search-skeleton-title"></div>
              <div className="skeleton search-skeleton-meta"></div>
              <div className="skeleton search-skeleton-channel"></div>
              <div className="skeleton search-skeleton-desc"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="search-page-container">
      <h2 className="search-results-heading">Search results for: "{query}"</h2>
      
      {results.length === 0 ? (
        <div className="search-empty">
          <h3>No results found</h3>
          <p>Try searching for coding, tech, nature, or browse standard videos.</p>
        </div>
      ) : (
        <div className="search-results-list">
          {results.map((video) => {
            const channel = channels[video.channelId];
            return (
              <div 
                key={video.id} 
                className="search-item-card" 
                onClick={() => navigate("watch", { id: video.id })}
              >
                <div className="search-thumb-wrapper">
                  <img src={video.thumbnail} alt={video.title} />
                  <span className="search-item-duration">{video.duration}</span>
                </div>
                
                <div className="search-item-info">
                  <h3 className="search-item-title" title={video.title}>
                    {video.title}
                  </h3>
                  <div className="search-item-metadata">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.publishDate}</span>
                  </div>
                  
                  <div 
                    className="search-item-channel-row" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (channel) navigate("channel", { id: channel.id });
                    }}
                  >
                    <img src={channel?.avatar} alt={channel?.name} className="search-channel-avatar" />
                    <span>{channel?.name}</span>
                    {channel?.verified && (
                      <CheckCircle size={12} className="verified-icon" fill="currentColor" />
                    )}
                  </div>

                  <p className="search-item-desc">{video.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
