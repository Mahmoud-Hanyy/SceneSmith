import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage';
import MovieDetails from './pages/MovieDetails';
import TvShows from './pages/TvShows';
import TvShowsDetails from './pages/TvShowsDetails';

function App() {

  return (
     <BrowserRouter>
      <Navbar />
       <div className="container my-5">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/tv-shows/:id" element={<TvShowsDetails />} />
      </Routes>
      </div>
     </BrowserRouter>
  )
}

export default App
