import React, { useContext, useState, useEffect, useRef } from 'react';
import { YoutubeContext } from '../context/YoutubeContext';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, Check, ListPlus } from 'lucide-react';
import './Watch.css';

export default function Watch() {
  const { 
    pageParams, 
    videos, 
    channels, 
    comments, 
    subscriptions, 
    likedVideos, 
    toggleSubscribe, 
    toggleLikeVideo, 
    addComment,
    navigate 
  } = useContext(YoutubeContext);

  const videoId = pageParams.id;
  const video = videos.find(v => v.id === videoId);
  const channel = video ? channels[video.channelId] : null;
  const videoComments = comments[videoId] || [];
  
  const [commentText, setCommentText] = useState("");
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [commentLikeStates, setCommentLikeStates] = useState({});
  const videoRef = useRef(null);

  // Auto-play video on navigation
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        // Autoplay policy blocker fallback
        console.log("Autoplay blocked, user interaction required: ", err);
      });
    }
  }, [videoId]);

  if (!video) {
    return (
      <div className="watch-error">
        <h3>Video not found</h3>
        <button onClick={() => navigate("home")} className="back-btn">Go Home</button>
      </div>
    );
  }

  // Filter out the current video from suggestions
  const suggestedVideos = videos.filter(v => v.id !== videoId);

  const isSubscribed = subscriptions.includes(video.channelId);
  const isLiked = likedVideos.includes(video.id);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(video.id, commentText);
    setCommentText("");
  };

  const handleShareClick = () => {
    // Copy a mock link
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const handleCommentLike = (cId) => {
    setCommentLikeStates(prev => ({
      ...prev,
      [cId]: !prev[cId]
    }));
  };

  return (
    <div className="watch-container">
      {/* Ambient glow in background reflecting video theme */}
      <div className="ambient-glow" style={{
        background: `radial-gradient(circle, rgba(62, 166, 255, 0.15) 0%, rgba(255, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0) 100%)`
      }}></div>

      <div className="watch-content">
        {/* Left Column: Player and Details */}
        <div className="player-details-column">
          <div className="player-wrapper">
            <video 
              ref={videoRef}
              src={video.videoUrl} 
              controls 
              autoPlay 
              className="main-video-player"
              poster={video.thumbnail}
            />
          </div>

          <h1 className="watch-title">{video.title}</h1>

          {/* Action and channel details bar */}
          <div className="channel-actions-row">
            <div className="channel-info-section">
              <img 
                src={channel?.avatar} 
                alt={channel?.name} 
                className="channel-avatar-watch"
                onClick={() => navigate("channel", { id: channel.id })}
              />
              <div className="channel-text-watch">
                <h3 onClick={() => navigate("channel", { id: channel.id })}>{channel?.name}</h3>
                <span>{channel?.subscribers} subscribers</span>
              </div>
              <button 
                className={`subscribe-btn-watch ${isSubscribed ? "subscribed" : ""}`}
                onClick={() => toggleSubscribe(video.channelId)}
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

            <div className="video-actions-section">
              <div className="like-dislike-pill">
                <button 
                  className={`like-btn ${isLiked ? "active" : ""}`} 
                  onClick={() => toggleLikeVideo(video.id)}
                  title="Like this video"
                >
                  <ThumbsUp size={16} fill={isLiked ? "currentColor" : "none"} />
                  <span>{video.likes}</span>
                </button>
                <div className="pill-divider"></div>
                <button className="dislike-btn" title="Dislike this video">
                  <ThumbsDown size={16} />
                </button>
              </div>

              <button className="action-pill" onClick={handleShareClick} title="Share">
                <Share2 size={16} />
                <span>Share</span>
              </button>

              <button className="action-pill" title="Download">
                <Download size={16} />
                <span>Download</span>
              </button>

              <button className="action-pill icon-only" title="More">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Video Description container */}
          <div className="description-container glass-card">
            <div className="description-metadata">
              <span>{video.views} views</span>
              <span>{video.publishDate}</span>
              <span className="desc-category-tag">#{video.category}</span>
            </div>
            
            <p className={`description-text ${isDescExpanded ? "expanded" : ""}`}>
              {video.description}
            </p>
            
            <button 
              className="toggle-desc-btn" 
              onClick={() => setIsDescExpanded(!isDescExpanded)}
            >
              {isDescExpanded ? "Show less" : "...more"}
            </button>
          </div>

          {/* Comments section */}
          <div className="comments-section-container">
            <h2 className="comments-count">{videoComments.length} Comments</h2>
            
            <form className="add-comment-form" onSubmit={handleCommentSubmit}>
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&auto=format&fit=crop&q=80" 
                alt="Your Avatar" 
                className="user-avatar-comment" 
              />
              <div className="comment-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="comment-actions">
                  {commentText.trim() && (
                    <>
                      <button type="button" className="cancel-comment-btn" onClick={() => setCommentText("")}>
                        Cancel
                      </button>
                      <button type="submit" className="submit-comment-btn">
                        Comment
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>

            <div className="comments-list">
              {videoComments.map((comment) => {
                const isCommentLiked = commentLikeStates[comment.id];
                return (
                  <div key={comment.id} className="comment-item">
                    <img src={comment.authorAvatar} alt={comment.authorName} className="comment-author-avatar" />
                    <div className="comment-content">
                      <div className="comment-author-row">
                        <span className="comment-author-name">{comment.authorName}</span>
                        <span className="comment-time">{comment.publishDate}</span>
                      </div>
                      <p className="comment-text-content">{comment.text}</p>
                      <div className="comment-feedback">
                        <button 
                          className={`comment-feedback-btn ${isCommentLiked ? "active" : ""}`}
                          onClick={() => handleCommentLike(comment.id)}
                        >
                          <ThumbsUp size={14} fill={isCommentLiked ? "currentColor" : "none"} />
                          <span>{comment.likes + (isCommentLiked ? 1 : 0)}</span>
                        </button>
                        <button className="comment-feedback-btn">
                          <ThumbsDown size={14} />
                        </button>
                        <button className="comment-reply-btn">Reply</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Suggested Videos */}
        <div className="suggested-column">
          <h3 className="suggested-heading">Related Videos</h3>
          <div className="suggested-list">
            {suggestedVideos.map((sVideo) => {
              const sChan = channels[sVideo.channelId];
              return (
                <div 
                  key={sVideo.id} 
                  className="suggested-item"
                  onClick={() => navigate("watch", { id: sVideo.id })}
                >
                  <div className="suggested-thumbnail-wrapper">
                    <img src={sVideo.thumbnail} alt={sVideo.title} />
                    <span className="suggested-duration">{sVideo.duration}</span>
                  </div>
                  <div className="suggested-info">
                    <h4 className="suggested-title" title={sVideo.title}>
                      {sVideo.title}
                    </h4>
                    <span className="suggested-channel">{sChan?.name}</span>
                    <div className="suggested-metadata">
                      <span>{sVideo.views} views</span>
                      <span>•</span>
                      <span>{sVideo.publishDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showShareToast && (
        <div className="share-toast glass-card">
          <span>Link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
