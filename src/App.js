import React, { useState, useRef, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Gallery from "./Components/Gallery";
import SearchBar from "./Components/SearchBar";
import AlbumView from "./Components/AlbumView";
import ArtistView from "./Components/ArtistView";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";
import { fetchData } from './helper';
import Spinner from './Spinner';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

function App() {
  const [message, setMessage] = useState("Search for Music!");
  const [data, setData] = useState(null);
  const searchInput = useRef("");
  const API_URL = "https://itunes.apple.com/search?term=";

  const handleSearch = async (e, term) => {
    e.preventDefault();
    document.title = `${term} Music`;

    try {
      const response = await fetch(API_URL + term);
      const resData = await response.json();
      if (resData.results.length > 0) {
        setData(resData.results);
        setMessage("");
      } else {
        setMessage("Not Found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error fetching data");
    }
  };

  const renderGallery = () => {
    return data ? <Gallery data={data} /> : null;
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
        <Routes>
          <Route
            path="/"
            element={
              <SearchContext.Provider
                value={{
                  term: searchInput,
                  handleSearch: handleSearch,
                }}
              >
                <SearchBar handleSearch={handleSearch} />
                <p>{message}</p>
                <Suspense fallback={<Spinner />} />
              </SearchContext.Provider>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
      <DataContext.Provider value={data}>{renderGallery()}</DataContext.Provider>
    </div>
  );
}

export default App;
