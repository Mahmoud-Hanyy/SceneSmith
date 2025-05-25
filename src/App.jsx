import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage';
import MainCards from './components/MainCards';


import MovieDetails from './pages/MovieDetails';
import TvShows from './pages/TvShows';
// search-feature imports

// import SearchContext from './context/searchContext';
// import SearchKeyContext from './context/searchKeyContext'
// import Search from './components/Search';
// import ResultsPage from './pages/ResultsPage';
// import { useState } from 'react';


function App() {
  
  //Don't Remove these comments please 
 
  //const [search, setSearch] = useState();
//  const [searchKeyword, setSearchKeyword] = useState();
  return (
     <BrowserRouter>
      <Navbar />
       <div className="container my-5">
   //     <SearchContext.Provider value={{search, setSearch}}>
    //    <SearchKeyContext.Provider value={{searchKeyword,setSearchKeyword}}>
      <Routes>
        <Route path="/" element={<MainPage />} />
    //    <Route path="/search-results" element={<ResultsPage></ResultsPage>} />

        <Route path="/movie-details/:id" element={<MovieDetails />} />
        <Route path="/tv-shows" element={<TvShows />} />

          </Routes>
    //  </SearchKeyContext.Provider>
    //    </SearchContext.Provider>
      </div>
     </BrowserRouter>
  )
}

export default App
