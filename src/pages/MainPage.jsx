import React, { useState, useEffect } from "react";
import MainCards from "../components/MainCards";
import axiosInstance from "../apis/config";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import Search from "../components/Search";

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const onMovieClick = (movieId) => {
    navigate(`/details/movie/${movieId}`);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axiosInstance.get(
          "/discover/movie?with_original_language=ar&region=EG&primary_release_date.gte=2020-01-01&primary_release_date.lte=2025-12-31",
          {
            params: {
              page: page,
              language,
            },
          }
        );

        if (res.data && Array.isArray(res.data.results)) {
          setMovies(res.data.results);
        } else if (res.data && res.data.status_code) {
          setError(`API Error: ${res.data.status_message}`);
          setMovies([]);
        } else {
          setError(
            "Unexpected API response: 'results' is missing or not an array."
          );
          setMovies([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching movies.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, language]);

  return (
    <div className="text-light px-2 px-md-4">
      <Search />
      {/* Heading */}
      <h2 className="fw-bold">Now Playing</h2>
      <hr className="border-light" />

      {/* Loading / Error / Content */}
      <div>
        {loading && <p className="text-light">Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <>
            {/* Responsive Movie Grid */}
            <div className="row  ">
              {movies.map((movie) => (
                <div
                  className="col d-flex justify-content-center g-4"
                  key={movie.id}
                >
                  <MainCards
                    data={movie}
                    category={"movies"}
                    onCardClick={() => onMovieClick(movie.id)}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mt-4">
              <button
                className="btn btn-movies"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span className="text-light">Page {page}</span>
              <button
                className="btn btn-movies"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainPage;
