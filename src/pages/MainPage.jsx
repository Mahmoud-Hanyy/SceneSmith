import React, { useState, useEffect, useCallback } from "react";
import MainCards from "../components/MainCards";
import axiosInstance from "../apis/config";
import { useNavigate } from "react-router";

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onMovieClick = (movieId) => {
    navigate(`/details/movie/${movieId}`);
  };
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/movie/now_playing", {
        params: {
          page: page,
        },
      });

      if (res.data && Array.isArray(res.data.results)) {
        setMovies(res.data.results);
      } else if (res.data && res.data.status_code) {
        setError(`API Error: ${res.data.status_message}`);
        setMovies([]);
      } else {
        setError(
          "Unexpected API response: 'results' is missing or not an array.",
        );
        setMovies([]);
      }
    } catch (err) {
      console.error("API Error Details:", {
        message: err.message,
        response: err.response ? err.response.data : "No response data",
        status: err.response ? err.response.status : "No status",
      });
      setError("Failed to load movies. Please check the console for details.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]); // Dependency: fetchMovies (which depends on page)

  return (
    <div className="text-light px-2 px-md-4">
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
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
              {movies.map((movie) => (
                <div className="col" key={movie.id}>
                  <MainCards
                    data={movie}
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
