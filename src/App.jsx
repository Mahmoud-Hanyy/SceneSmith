import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import MainPage from "./pages/MainPage";
import Details from "./pages/DetailsPage";
import TvShows from "./pages/TvShows";
import SearchContext from "./context/searchContext";
import SearchKeyContext from "./context/searchKeyContext";
import Search from "./components/Search";
import ResultsPage from "./pages/ResultsPage";
import { useState } from "react";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [search, setSearch] = useState();
  const [searchKeyword, setSearchKeyword] = useState();
  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ search, setSearch }}>
        <SearchKeyContext.Provider value={{ searchKeyword, setSearchKeyword }}>
          <HandleRouting />
        </SearchKeyContext.Provider>
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

function HandleRouting() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <Navbar />
      <div className="container my-5">
        {(location.pathname === "/" || location.pathname === "/tv-shows") && (
          <Search />
        )}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search-results" element={<ResultsPage />} />
          <Route path="/details/:type/:id" element={<Details />} />
          <Route path="/tv-shows" element={<TvShows />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
