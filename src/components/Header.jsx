import React, { useContext, useState } from 'react';
import { YoutubeContext } from '../context/YoutubeContext';
import { Menu, Search, Mic, Video, Bell, Play, ChevronDown } from 'lucide-react';
import './Header.css';

export default function Header({ onOpenUploadModal }) {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    searchQuery, 
    setSearchQuery, 
    navigate,
    channels
  } = useContext(YoutubeContext);
  
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    navigate("search", { query: searchInput });
  };

  const handleLogoClick = () => {
    setSearchQuery("");
    setSearchInput("");
    navigate("home");
  };

  const userChannel = channels["ch-1"]; // TechByte as mock logged-in user

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="icon-btn sidebar-toggle" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="logo-container" onClick={handleLogoClick}>
          <div className="logo-icon">
            <Play size={14} fill="#fff" stroke="#fff" />
          </div>
          <span className="logo-text">YouTube</span>
          <span className="logo-country">IN</span>
        </div>
      </div>

      <form className="header-middle" onSubmit={handleSearchSubmit}>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button 
              type="button" 
              className="clear-search-btn"
              onClick={() => setSearchInput("")}
            >
              ×
            </button>
          )}
        </div>
        <button type="submit" className="search-btn" aria-label="Search">
          <Search size={18} />
        </button>
        <button type="button" className="icon-btn mic-btn" aria-label="Search with voice">
          <Mic size={18} />
        </button>
      </form>

      <div className="header-right">
        <button 
          className="icon-btn create-btn" 
          onClick={onOpenUploadModal}
          title="Create"
        >
          <Video size={20} />
          <span className="create-text">Create</span>
        </button>
        <button className="icon-btn notification-btn" title="Notifications">
          <Bell size={20} />
          <div className="notification-badge">3</div>
        </button>
        <div className="profile-container">
          <button 
            className="profile-btn" 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <img 
              src={userChannel?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&auto=format&fit=crop&q=80"} 
              alt="Profile" 
              className="profile-avatar"
            />
          </button>
          
          {showProfileDropdown && (
            <div className="profile-dropdown glass-card">
              <div className="dropdown-user-info">
                <img 
                  src={userChannel?.avatar} 
                  alt={userChannel?.name} 
                  className="dropdown-avatar"
                />
                <div>
                  <h4 className="user-name">{userChannel?.name}</h4>
                  <span className="user-handle">{userChannel?.handle}</span>
                </div>
              </div>
              <hr className="dropdown-divider" />
              <button 
                className="dropdown-item" 
                onClick={() => {
                  setShowProfileDropdown(false);
                  navigate("channel", { id: "ch-1" });
                }}
              >
                Your Channel
              </button>
              <button 
                className="dropdown-item"
                onClick={() => {
                  setShowProfileDropdown(false);
                  navigate("home");
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
