import React, { useState, useContext } from 'react';
import { YoutubeContext } from '../context/YoutubeContext';
import { X } from 'lucide-react';
import './UploadModal.css';

export default function UploadModal({ onClose }) {
  const { addVideo, navigate } = useContext(YoutubeContext);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Tech");
  const [duration, setDuration] = useState("3:45");
  
  // Stock lists
  const stockVideos = [
    { name: "Sci-Fi Cinematic (Tears of Steel)", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Funny Animation (Big Buck Bunny)", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Surreal Dream (Elephants Dream)", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Subaru Offroad", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" }
  ];

  const stockThumbnails = [
    { name: "Tech Desk", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80" },
    { name: "Green Forest", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80" },
    { name: "Developer Code", url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=80" },
    { name: "Neon Gaming Setup", url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80" }
  ];

  const [selectedVideo, setSelectedVideo] = useState(stockVideos[0].url);
  const [selectedThumbnail, setSelectedThumbnail] = useState(stockThumbnails[0].url);
  const [customVideoUrl, setCustomVideoUrl] = useState("");
  const [customThumbnailUrl, setCustomThumbnailUrl] = useState("");
  const [useCustomVideo, setUseCustomVideo] = useState(false);
  const [useCustomThumbnail, setUseCustomThumbnail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalVideoUrl = useCustomVideo ? customVideoUrl : selectedVideo;
    const finalThumbnailUrl = useCustomThumbnail ? customThumbnailUrl : selectedThumbnail;

    addVideo({
      title,
      description,
      category,
      duration,
      videoUrl: finalVideoUrl,
      thumbnail: finalThumbnailUrl
    });

    onClose();
    // Navigate home so they see their new upload!
    navigate("home");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Upload Video (Simulated)</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close Modal">
            <X size={20} />
          </button>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input 
              type="text" 
              id="title" 
              placeholder="Give your video a catchy title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea 
              id="desc" 
              placeholder="Tell viewers about your video" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="cat">Category</label>
              <select id="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Coding">Coding</option>
                <option value="Tech">Tech</option>
                <option value="Music">Music</option>
                <option value="Nature">Nature</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
            <div className="form-group col">
              <label htmlFor="dur">Duration</label>
              <input 
                type="text" 
                id="dur" 
                placeholder="e.g. 5:10" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          {/* Video URL Config */}
          <div className="form-group">
            <div className="label-toggle-row">
              <label>Video File Source</label>
              <button 
                type="button" 
                className="toggle-link"
                onClick={() => setUseCustomVideo(!useCustomVideo)}
              >
                {useCustomVideo ? "Use Stock List" : "Use Custom URL"}
              </button>
            </div>
            
            {useCustomVideo ? (
              <input 
                type="url" 
                placeholder="Paste direct MP4 video URL" 
                value={customVideoUrl}
                onChange={(e) => setCustomVideoUrl(e.target.value)}
                required
              />
            ) : (
              <div className="stock-selector">
                {stockVideos.map((vid) => (
                  <label key={vid.url} className={`stock-option ${selectedVideo === vid.url ? "selected" : ""}`}>
                    <input 
                      type="radio" 
                      name="stockVideo" 
                      value={vid.url} 
                      checked={selectedVideo === vid.url}
                      onChange={() => setSelectedVideo(vid.url)}
                    />
                    <span>{vid.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Config */}
          <div className="form-group">
            <div className="label-toggle-row">
              <label>Thumbnail Image</label>
              <button 
                type="button" 
                className="toggle-link"
                onClick={() => setUseCustomThumbnail(!useCustomThumbnail)}
              >
                {useCustomThumbnail ? "Use Stock Gallery" : "Use Custom Image URL"}
              </button>
            </div>
            
            {useCustomThumbnail ? (
              <input 
                type="url" 
                placeholder="Paste thumbnail image URL" 
                value={customThumbnailUrl}
                onChange={(e) => setCustomThumbnailUrl(e.target.value)}
                required
              />
            ) : (
              <div className="thumbnail-gallery-grid">
                {stockThumbnails.map((thumb) => (
                  <div 
                    key={thumb.url} 
                    className={`thumb-gallery-option ${selectedThumbnail === thumb.url ? "selected" : ""}`}
                    onClick={() => setSelectedThumbnail(thumb.url)}
                  >
                    <img src={thumb.url} alt={thumb.name} />
                    <span className="thumb-gallery-name">{thumb.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={!title.trim()}>
              Upload Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
