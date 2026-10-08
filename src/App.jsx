import React, { useContext, useState } from 'react';
import { YoutubeContext, YoutubeProvider } from './context/YoutubeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryChips from './components/CategoryChips';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Channel from './pages/Channel';
import UploadModal from './components/UploadModal';
import './App.css';

function MainAppContent() {
  const { page, sidebarOpen } = useContext(YoutubeContext);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "watch":
        return <Watch />;
      case "search":
        return <Search />;
      case "channel":
        return <Channel />;
      default:
        return <Home />;
    }
  };

  // Determine classes for spacing the main content area based on sidebar
  const mainContentClass = `main-content ${
    sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed-spacing"
  } ${page === "watch" ? "watch-page-mode" : ""}`;

  return (
    <div className="app-layout">
      <Header onOpenUploadModal={() => setIsUploadModalOpen(true)} />
      
      <div className="app-body">
        {/* Hide Sidebar only on Watch page on smaller screens if desired, but keep it standard for now */}
        <Sidebar />
        
        <main className={mainContentClass}>
          {/* Only show Category Chips on the Home page feed */}
          {page === "home" && <CategoryChips />}
          
          <div className="page-wrapper-inner">
            {renderPage()}
          </div>
        </main>
      </div>

      {isUploadModalOpen && (
        <UploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <YoutubeProvider>
      <MainAppContent />
    </YoutubeProvider>
  );
}
