import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage';
import MainCards from './components/MainCards';
import Search from './components/Search';
import ResultsPage from './pages/ResultsPage';
import { useState } from 'react';
import SearchContext from './context/searchContext';
import SearchKeyContext from './context/searchKeyContext';
function App() {

  const [search, setSearch] = useState();
  const [searchKeyword, setSearchKeyword] = useState();
  return (
     <BrowserRouter>
      <Navbar />
       <div className="container my-5">
        <SearchContext.Provider value={{search, setSearch}}>
        <SearchKeyContext.Provider value={{searchKeyword,setSearchKeyword}}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<MainCards />} />
        <Route path="/search-results" element={<ResultsPage></ResultsPage>} />
      </Routes>
      </SearchKeyContext.Provider>
        </SearchContext.Provider>
      </div>
     </BrowserRouter>
  )
}

export default App
