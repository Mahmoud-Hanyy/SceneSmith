import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route ,useLocation} from 'react-router';
import MainPage from './pages/MainPage';
import MovieDetails from './pages/MovieDetails';
import TvShows from './pages/TvShows';
import SearchContext from './context/searchContext';
import SearchKeyContext from './context/searchKeyContext'
import Search from './components/Search';
import ResultsPage from './pages/ResultsPage';
import { useState } from 'react';


function App() {
  
  const [search, setSearch] = useState();
 const [searchKeyword, setSearchKeyword] = useState();
  return (
     <BrowserRouter>
       <SearchContext.Provider value={{search, setSearch}}>
       <SearchKeyContext.Provider value={{searchKeyword,setSearchKeyword}}>
        <HandleRouting/>
     </SearchKeyContext.Provider>
        </SearchContext.Provider>
     </BrowserRouter>
  )
}

function HandleRouting(){
const location=useLocation()
console.log(location.pathname);
  return (
  <>
    <Navbar/>
       <div className="container my-5">

        {/* { search component  will appear only here } */}
        {
         (location.pathname === "/"
            || location.pathname === "/tv-shows"
          )
            &&
      <Search/>
        }
         <Routes>
        <Route path="/" element={<MainPage />} />
       <Route path="/search-results" element={<ResultsPage></ResultsPage>} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
        <Route path="/tv-shows" element={<TvShows />} />

          </Routes>
      </div>

  </>);
}

export default App
