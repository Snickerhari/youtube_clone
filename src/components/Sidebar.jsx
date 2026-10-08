import React, { useContext } from 'react';
import { YoutubeContext } from '../context/YoutubeContext';
import { Home, PlaySquare, History, ThumbsUp, Clock, User, Compass } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const { 
    sidebarOpen, 
    subscriptions, 
    channels, 
    page, 
    navigate 
  } = useContext(YoutubeContext);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "subscriptions", label: "Subscriptions", icon: PlaySquare }
  ];

  const libraryItems = [
    { id: "history", label: "History", icon: History },
    { id: "liked", label: "Liked Videos", icon: ThumbsUp },
    { id: "watch-later", label: "Watch Later", icon: Clock }
  ];

  const handleNavClick = (pageId, params = {}) => {
    if (pageId === "home") {
      navigate("home");
    } else if (pageId === "explore") {
      navigate("home"); // Mock explore pointing back to home
    } else if (pageId === "subscriptions") {
      navigate("home"); // Filter home to subscriptions later or just go home
    } else if (pageId === "history") {
      navigate("home"); // Simple routing or mock history page
    } else if (pageId === "liked") {
      navigate("home");
    } else {
      navigate(pageId, params);
    }
  };

  // If sidebar is collapsed, show mini sidebar
  if (!sidebarOpen) {
    return (
      <aside className="sidebar-collapsed">
        <button 
          className={`sidebar-collapsed-item ${page === "home" ? "active" : ""}`}
          onClick={() => navigate("home")}
        >
          <Home size={20} />
          <span>Home</span>
        </button>
        <button className="sidebar-collapsed-item" onClick={() => navigate("home")}>
          <Compass size={20} />
          <span>Explore</span>
        </button>
        <button className="sidebar-collapsed-item" onClick={() => navigate("home")}>
          <PlaySquare size={20} />
          <span>Subs</span>
        </button>
        <button className="sidebar-collapsed-item" onClick={() => navigate("home")}>
          <History size={20} />
          <span>History</span>
        </button>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${page === item.id ? "active" : ""}`}
            onClick={() => handleNavClick(item.id)}
          >
            <item.icon size={20} className="sidebar-item-icon" />
            <span className="sidebar-item-label">{item.label}</span>
          </button>
        ))}
      </div>
      
      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <h3 className="sidebar-title">You</h3>
        {libraryItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${page === item.id ? "active" : ""}`}
            onClick={() => handleNavClick(item.id)}
          >
            <item.icon size={20} className="sidebar-item-icon" />
            <span className="sidebar-item-label">{item.label}</span>
          </button>
        ))}
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <h3 className="sidebar-title">Subscriptions</h3>
        <div className="subscriptions-list">
          {subscriptions.length === 0 ? (
            <p className="sidebar-empty">No subscriptions yet</p>
          ) : (
            subscriptions.map((chanId) => {
              const chan = channels[chanId];
              if (!chan) return null;
              return (
                <button
                  key={chanId}
                  className={`sidebar-item ${page === "channel" && pageParams.id === chanId ? "active" : ""}`}
                  onClick={() => navigate("channel", { id: chanId })}
                >
                  <img src={chan.avatar} alt={chan.name} className="sub-avatar" />
                  <span className="sidebar-item-label sub-name">{chan.name}</span>
                  {chan.verified && <span className="sub-verified-dot"></span>}
                </button>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
