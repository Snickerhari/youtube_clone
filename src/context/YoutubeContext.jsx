import React, { createContext, useState, useEffect } from 'react';
import { mockVideos, mockChannels, mockComments } from '../data/mockData';

export const YoutubeContext = createContext();

export const YoutubeProvider = ({ children }) => {
  const [videos, setVideos] = useState(mockVideos);
  const [channels, setChannels] = useState(mockChannels);
  const [comments, setComments] = useState(mockComments);
  
  const [subscriptions, setSubscriptions] = useState(["ch-1", "ch-3"]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Custom routing state
  const [page, setPage] = useState("home"); // home, watch, search, channel
  const [pageParams, setPageParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Navigate function that includes loading screen simulation
  const navigate = (targetPage, params = {}) => {
    setIsLoading(true);
    setTimeout(() => {
      setPage(targetPage);
      setPageParams(params);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 450); // 450ms loading skeleton transition
  };

  // Add a newly uploaded video
  const addVideo = (newVideo) => {
    const videoId = `v-${Date.now()}`;
    const videoWithDetails = {
      id: videoId,
      title: newVideo.title,
      description: newVideo.description || "No description provided.",
      thumbnail: newVideo.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      videoUrl: newVideo.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      channelId: "ch-1", // Uploaded to TechByte for mock purposes
      views: "0",
      viewCount: 0,
      likes: "0",
      likeCount: 0,
      category: newVideo.category || "Tech",
      duration: newVideo.duration || "3:15",
      publishDate: "Just now"
    };

    setVideos(prev => [videoWithDetails, ...prev]);
  };

  // Toggle channel subscription
  const toggleSubscribe = (channelId) => {
    setSubscriptions(prev => {
      const isSubscribed = prev.includes(channelId);
      const newSubs = isSubscribed
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId];
      
      // Update subscriber count in channel details
      setChannels(prevChannels => {
        const channel = prevChannels[channelId];
        if (!channel) return prevChannels;
        
        let count = channel.subscriberCount;
        if (isSubscribed) {
          count -= 1;
        } else {
          count += 1;
        }
        
        // Format subscriber display (e.g. 1.42M or 840K)
        let subscribersStr = "";
        if (count >= 1000000) {
          subscribersStr = `${(count / 1000000).toFixed(2)}M`;
        } else if (count >= 1000) {
          subscribersStr = `${(count / 1000).toFixed(0)}K`;
        } else {
          subscribersStr = count.toString();
        }

        return {
          ...prevChannels,
          [channelId]: {
            ...channel,
            subscriberCount: count,
            subscribers: subscribersStr
          }
        };
      });

      return newSubs;
    });
  };

  // Toggle video liking
  const toggleLikeVideo = (videoId) => {
    setLikedVideos(prev => {
      const isLiked = prev.includes(videoId);
      const newLikes = isLiked
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId];

      setVideos(prevVideos => 
        prevVideos.map(vid => {
          if (vid.id === videoId) {
            const count = isLiked ? vid.likeCount - 1 : vid.likeCount + 1;
            
            // Format likes string
            let likesStr = "";
            if (count >= 1000) {
              likesStr = `${(count / 1000).toFixed(1)}K`;
            } else {
              likesStr = count.toString();
            }

            return {
              ...vid,
              likeCount: count,
              likes: likesStr
            };
          }
          return vid;
        })
      );

      return newLikes;
    });
  };

  // Add comment to a video
  const addComment = (videoId, text) => {
    const newCommentObj = {
      id: `c-${Date.now()}`,
      authorName: "You (User)",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&auto=format&fit=crop&q=80",
      text,
      likes: 0,
      publishDate: "Just now"
    };

    setComments(prev => {
      const videoComments = prev[videoId] || [];
      return {
        ...prev,
        [videoId]: [newCommentObj, ...videoComments]
      };
    });
  };

  // Add video to watch history
  const addToHistory = (videoId) => {
    setHistory(prev => {
      const filtered = prev.filter(id => id !== videoId);
      return [videoId, ...filtered];
    });
  };

  return (
    <YoutubeContext.Provider value={{
      videos,
      channels,
      comments,
      subscriptions,
      likedVideos,
      history,
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
      sidebarOpen,
      setSidebarOpen,
      page,
      pageParams,
      isLoading,
      navigate,
      addVideo,
      toggleSubscribe,
      toggleLikeVideo,
      addComment,
      addToHistory
    }}>
      {children}
    </YoutubeContext.Provider>
  );
};
