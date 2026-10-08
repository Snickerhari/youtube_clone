import React, { useContext } from 'react';
import { YoutubeContext } from '../context/YoutubeContext';
import { CheckCircle } from 'lucide-react';
import './VideoCard.css';

export default function VideoCard({ video }) {
  const { channels, navigate, addToHistory } = useContext(YoutubeContext);
  const channel = channels[video.channelId];

  const handleCardClick = () => {
    addToHistory(video.id);
    navigate("watch", { id: video.id });
  };

  const handleChannelClick = (e) => {
    e.stopPropagation(); // Prevent card navigation
    if (channel) {
      navigate("channel", { id: channel.id });
    }
  };

  return (
    <div className="video-card" onClick={handleCardClick}>
      <div className="thumbnail-container">
        <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
        <span className="duration-badge">{video.duration}</span>
      </div>
      
      <div className="video-details">
        <div className="channel-avatar-wrapper" onClick={handleChannelClick}>
          <img 
            src={channel?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&auto=format&fit=crop&q=80"} 
            alt={channel?.name} 
            className="channel-avatar" 
          />
        </div>
        <div className="video-info">
          <h3 className="video-title" title={video.title}>
            {video.title}
          </h3>
          <div className="channel-name-wrapper" onClick={handleChannelClick}>
            <span className="channel-name">{channel?.name}</span>
            {channel?.verified && (
              <CheckCircle size={12} className="verified-badge-icon" fill="currentColor" />
            )}
          </div>
          <div className="video-metadata">
            <span>{video.views} views</span>
            <span className="metadata-dot">•</span>
            <span>{video.publishDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
