import React, { useContext, useState } from 'react';
import { YoutubeContext } from '../context/YoutubeContext';
import VideoCard from '../components/VideoCard';
import { CheckCircle, Check } from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';
import './Channel.css';

export default function Channel() {
  const { 
    pageParams, 
    channels, 
    videos, 
    subscriptions, 
    toggleSubscribe, 
    isLoading 
  } = useContext(YoutubeContext);

  const channelId = pageParams.id;
  const channel = channels[channelId];
  const channelVideos = videos.filter(v => v.channelId === channelId);

  const [activeTab, setActiveTab] = useState("Videos");

  if (!channel) {
    return (
      <div className="channel-error">
        <h3>Channel not found</h3>
      </div>
    );
  }

  const isSubscribed = subscriptions.includes(channel.id);

  if (isLoading) {
    return (
      <div className="channel-loading-wrapper">
        <div className="skeleton channel-banner-skeleton"></div>
        <div className="channel-header-skeleton-info">
          <div className="skeleton channel-avatar-skeleton"></div>
          <div className="channel-text-skeleton">
            <div className="skeleton line-1"></div>
            <div className="skeleton line-2"></div>
            <div className="skeleton line-3"></div>
          </div>
        </div>
        <SkeletonLoader count={4} />
      </div>
    );
  }

  return (
    <div className="channel-page-container">
      {/* Banner */}
      <div className="channel-banner">
        <img src={channel.banner} alt={channel.name} />
      </div>

      {/* Profile Details Header */}
      <div className="channel-header-section">
        <img src={channel.avatar} alt={channel.name} className="channel-profile-avatar" />
        
        <div className="channel-header-info">
          <div className="channel-title-row">
            <h1 className="channel-header-name">{channel.name}</h1>
            {channel.verified && (
              <CheckCircle size={18} className="channel-verified-badge" fill="currentColor" />
            )}
          </div>
          
          <div className="channel-header-meta">
            <span>{channel.handle}</span>
            <span>•</span>
            <span>{channel.subscribers} subscribers</span>
            <span>•</span>
            <span>{channelVideos.length} videos</span>
          </div>

          <p className="channel-header-description" title={channel.description}>
            {channel.description}
          </p>

          <button 
            className={`channel-page-subscribe-btn ${isSubscribed ? "subscribed" : ""}`}
            onClick={() => toggleSubscribe(channel.id)}
          >
            {isSubscribed ? (
              <>
                <Check size={16} />
                <span>Subscribed</span>
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="channel-tabs-bar">
        {["Home", "Videos", "Playlists", "About"].map((tab) => (
          <button 
            key={tab} 
            className={`channel-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <hr className="channel-tabs-divider" />

      {/* Tab Contents */}
      <div className="channel-tab-content">
        {activeTab === "Videos" || activeTab === "Home" ? (
          channelVideos.length === 0 ? (
            <div className="channel-empty-videos">
              <p>This channel has no videos uploaded.</p>
            </div>
          ) : (
            <div className="video-grid">
              {channelVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )
        ) : activeTab === "Playlists" ? (
          <div className="channel-empty-state">
            <h4>No playlists created yet</h4>
            <p>Created playlists will be displayed here.</p>
          </div>
        ) : (
          <div className="channel-about-section glass-card">
            <h3>Description</h3>
            <p className="about-text">{channel.description}</p>
            
            <div className="about-stats">
              <h3>Stats</h3>
              <hr className="about-divider" />
              <p>Subscribers: {channel.subscribers}</p>
              <p>Total Videos: {channelVideos.length}</p>
              <p>Joined: Jan 12, 2021</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
