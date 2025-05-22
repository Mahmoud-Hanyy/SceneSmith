import React, { useState, useEffect } from "react";
import MainCards from '../components/MainCards';
import axiosInstance from "../apis/config";

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
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
          setError("Unexpected API response: 'results' is missing or not an array.");
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
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="text-light">
      <h2>Now Playing</h2>
      <hr className="border-light" />
      <div>
        {loading && <p className="text-light">Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <>
            <div className="row row-cols-1 row-cols-md-5 g-2">
              {movies.map((movie) => (
                <div className="col" key={movie.id}>
                  <MainCards data={movie} />
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-4 gap-3">
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