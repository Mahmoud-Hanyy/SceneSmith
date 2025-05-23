import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage';
import MainCards from './components/MainCards';
function App() {

  return (
     <BrowserRouter>
      <Navbar />
       <div className="container my-5">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<MainCards />} />
      </Routes>
      </div>
     </BrowserRouter>
  )
}

export default App
