import React, { useState, useEffect, useCallback } from 'react';
import './App.css'; // Import the CSS file

const API_KEY = process.env.REACT_APP_CURRENTS_API_KEY // Store API key from environment variables

// Main app function 
const App = () => {
  return (
    <div >
      <NewsSearch />
    </div>
  );
};

// Function to handle news search 
const NewsSearch = () => {
  // state for the value of the inputs 
  const [searchType, setSearchType] = useState('keyword'); // Either 'keyword' or 'category'
  const [keyword, setKeyWord] = useState(''); // User input for keyword search
  const [category, setCategory] = useState(''); // User-selected category
  const [language, setLanguage] = useState('en'); // Default language setting 
  const [newsArticles, setNewsArticles] = useState([]); // state for the news articles we get back 

  // available categories 
  const categories = [
    "regional", "technology", "lifestyle", "business", "general", "programming",
    "science", "entertainment", "world", "sports", "finance", "academia",
    "politics", "health", "opinion", "food", "game"
  ];

  //function to handle search based on the user's choice (keyword or category )
  const handleSearch = useCallback(async () => {
    let API_URL;
    // Construct the correct API URL based on search type
    if (searchType === 'keyword') {
      API_URL = `https://api.currentsapi.services/v1/search?apiKey=${API_KEY}&keywords=${keyword}&language=${language}`;
    } else if (searchType === 'category') {
      API_URL = `https://api.currentsapi.services/v1/search?apiKey=${API_KEY}&category=${category}&language=${language}`;
    }
    //fetches data from API only when the API URL is constructed 
    if (API_URL) {
      const response = await fetch(API_URL) // Make the API call using the fetch method 
      const data = await response.json() // Parse the JSON response
      setNewsArticles(data.news); // Update the state with fetched news articles
    }
  },[searchType, keyword, category, language]); // include dependencies for the callback function

  // Function to handle category change
  const handleCategoryChange = (cat) => {
    setCategory(cat); // Update category state when the search button is clicked
  };

  // Effect to call handleSearch when the category changes (got from LLM)
  useEffect(() => {
    if (category) {
      handleSearch(); // Call handleSearch when category updates
    }
}, [category, handleSearch]); // Run this effect when category changes

return (
  <div>
    {/* Header with App Name */}
    <div className="header" onClick={() => window.scrollTo(0, 0)}>
                <h1>The Daily Lens </h1>
            </div>
    <h2>Search for Daily News Articles by {searchType}</h2>
    <div>
      {/* Dropdown button for search type */}
      <label>Choose Search Type: </label>
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="keyword">Keyword</option>
          <option value="category">Category</option>
        </select>
      </div>
      {/* Run when the user chooses to search by keyword */}
      {searchType === 'keyword' ? (
        <div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyWord(e.target.value)}
            placeholder="Enter a keyword"
          />
          <button onClick={() => { handleSearch(); console.log('Keyword:', keyword); }}>Search</button>
        </div>
      ) : (
        <div>
      {/* Run when the user chooses to search by category */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      {/* Dropdown for Language Selection */}
      <div>
        <label>Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="zh">Chinese</option>
          <option value="ar">Arabic</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="it">Italian</option>
          <option value="ru">Russian</option>
          <option value="th">Thai</option>
          <option value="hi">Hindi</option>
          <option value="vi">Vietnamese</option>
        </select>
      </div>
      {/* To Display the News Articles from search */}
      <div>
        <NewsResults newsArticles={newsArticles} />
      </div>
    </div>
);
};
// Function to retrieve and display news articles 
const NewsResults = ({ newsArticles }) => {
  return (
    <div>
      {newsArticles.map((news, index) => (
        <div key={index} className="news-article">
          <hr className="article-separator" />
          <h3 className="article-title">{news.title}</h3>
          <p className="article-author">{news.author}</p>
          {news.image ? (
            <img className="article-image" src={news.image} alt={news.title} />
          ) : (
            <div className="placeholder-image" />
          )}
          <p className="article-description">{news.description}</p>
          <a href={news.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default App; // Export the App component as the default export
