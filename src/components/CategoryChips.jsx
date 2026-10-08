import React, { useContext } from 'react';
import { YoutubeContext } from '../context/YoutubeContext';
import './CategoryChips.css';

export default function CategoryChips() {
  const { activeCategory, setActiveCategory, navigate, page } = useContext(YoutubeContext);

  const categories = [
    "All",
    "Coding",
    "Tech",
    "Music",
    "Nature",
    "Gaming",
    "ASMR",
    "Live",
    "Comedy",
    "Gadgets",
    "Podcasts",
    "Web Dev"
  ];

  const handleChipClick = (cat) => {
    setActiveCategory(cat);
    // If user is on watch or channel page, category click should navigate them back to Home.
    if (page !== "home") {
      navigate("home");
    }
  };

  return (
    <div className="category-chips-wrapper">
      <div className="category-chips-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-chip ${activeCategory === cat ? "active" : ""}`}
            onClick={() => handleChipClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
