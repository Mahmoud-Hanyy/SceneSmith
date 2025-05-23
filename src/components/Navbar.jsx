import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [activeTab, setActiveTab] = useState('Movies');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#4da8cc' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"> <strong>SceneSmith</strong></Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto gap-3 align-items-center">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                EN
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">EN</Link></li>
                <li><Link className="dropdown-item" to="#">AR</Link></li>
                <li><Link className="dropdown-item" to="#">FR</Link></li>
                <li><Link className="dropdown-item" to="#">ZN</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <button
                className={`btn ${activeTab === 'Movies' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => handleTabClick('Movies')}
              >
                Movies
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn ${activeTab === 'TV Shows' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => handleTabClick('TV Shows')}
              >
                TV Shows
              </button>
            </li>
            <li className="nav-item position-relative">
              <Link to="/watchlist" className="nav-link">
                🖤 Watchlist
                <span
                  className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-secondary"
                  style={{ fontSize: '0.6rem', padding: '5px 7px' }}
                >
                  0
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;