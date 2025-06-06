import React, { useState, useEffect, useCallback } from "react";
import MainCards from "../components/MainCards";
import axiosInstance from "../apis/config";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import Search from "../components/Search";

export default function TvShows() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const onTvShowClick = (seriesId) => {
    navigate(`/details/tv/${seriesId}`);
  };
  const fetchShows = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get(
        "/discover/tv?with_original_language=ar&region=EG&primary_release_date.gte=2020-01-01&primary_release_date.lte=2025-12-31",
        {
          params: {
            page: page,
            language,
          },
        }
      );

      if (res.data && Array.isArray(res.data.results)) {
        setShows(res.data.results);
      } else if (res.data && res.data.status_code) {
        setError(`API Error: ${res.data.status_message}`);
        setShows([]);
      } else {
        setError(
          "Unexpected API response: 'results' is missing or not an array."
        );
        setShows([]);
      }
    } catch (err) {
      console.error("API Error Details:", {
        message: err.message,
        response: err.response ? err.response.data : "No response data",
        status: err.response ? err.response.status : "No status",
      });
      setError("Failed to load shows. Please check the console for details.");
      setShows([]);
    } finally {
      setLoading(false);
    }
  }, [page, language]);

  useEffect(() => {
    fetchShows();
  }, [fetchShows, language]);

  return (
    <div className="text-light">
      <Search type="tv" />

      <h2 style={{ fontWeight: "bold" }}>Popular Shows</h2>
      <hr className="border-light" />
      <div>
        {loading && <p className="text-light">Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <>
            <div className="row">
              {shows.map((show) => (
                <div
                  className="col d-flex justify-content-center g-4"
                  key={show.id}
                >
                  <MainCards
                    data={show}
                    category={"shows"}
                    onCardClick={() => {
                      onTvShowClick(show.id);
                    }}
                  />
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
              <span
                className="text-light"
                style={{
                  marginTop: "7px",
                }}
              >
                Page {page}
              </span>
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
