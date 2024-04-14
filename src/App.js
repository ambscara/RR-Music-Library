import { useEffect, useState, Fragment, useRef, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./Components/Gallery";
import SearchBar from "./Components/SearchBar";
import AlbumView from "./Components/AlbumView";
import ArtistView from "./Components/ArtistView";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";
import { createResource as fetchData } from './helper'
import Spinner from './Spinner'


function App() {
  let [message, setMessage] = useState("Search for Music!");
  let [data, setData] = useState(null);
  let searchInput = useRef("");

  const API_URL = "https://itunes.apple.com/search?term=";

  // useEffect(() => {
  //   if (searchTerm) {
  //     setData(fetchData(searchTerm))
  // }
  // }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault();
    // Fetch Data
    const fetchData = async () => {
      document.title = `${term} Music`;
      const response = await fetch(API_URL + term);
      const resData = await response.json();
      if (resData.results.length > 0) {
        // Set State and Context value
        return setData(resData.results);
      } else {
        return setMessage("Not Found");
      }
    };
    fetchData();
  };


  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={Spinner()}>
          <Gallery data={data}/>
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
        
        <Router>
            <Routes>
      <Route path="/" element={<Fragment><SearchContext.Provider
        value={{
          term: searchInput,
          handleSearch: handleSearch,
        }}
      >
        <SearchBar handleSearch={handleSearch}/>
        {message}
        <Suspense fallback={Spinner()}/>
      </SearchContext.Provider>
      <DataContext.Provider value={data}>
        {renderGallery()}
        <Suspense/>
      </DataContext.Provider>
      </Fragment> }/>
      <Route path="/album/:id" element={<AlbumView />}/>
      <Route path="/artist/:id"element={<ArtistView />}/>
      </Routes>
      </Router>
    </div>
  );
}



export default App;