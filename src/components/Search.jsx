import React, { useCallback, useContext, useState } from "react";
import axiosInstance from "../apis/config";
import { useNavigate } from "react-router";
import SearchContext from "../context/searchContext";
import SearchKeyContext from "../context/searchKeyContext";
import { useLanguage } from "../context/LanguageContext";

export default function Search({ type = "movie" }) {
  const [searchKey, setSearchKey] = useState("");

  const { _, setSearch } = useContext(SearchContext);
  const { __, setSearchKeyword } = useContext(SearchKeyContext);

  const { language } = useLanguage();

  const navigate = useNavigate();

  // a function to fetch the data we are searching for
  const fetching = useCallback(() => {
    axiosInstance
      .get(`/search/${type}`, {
        params: {
          query: searchKey,
          language,
        },
      })
      .then((res) => {
        console.log(res.data.results);
        setSearch(res.data.results);
      })
      .catch((err) => {
        // Handle any errors that occur during the API call
        console.error("Error fetching movie data:", err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(
            `Error: ${err.response.status} - ${
              err.response.data.status_message || "Something went wrong."
            }`
          );
        } else if (err.request) {
          // The request was made but no response was received
          console.log(
            "Error: No response from server. Check your network connection."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`Error: ${err.message}`);
        }
      });
  }, [searchKey, type, setSearch, language]);

  // handle the search on click the button
  const handleSearch = () => {
    if (!searchKey.trim()) {
      alert("Please enter a name to search for.");
      return;
    }
    fetching();
    navigate("/search-results");
  };

  // handle the search on press enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!searchKey.trim()) {
        alert("Please enter a name to search for.");
        return;
      }
      fetching();
      navigate("/search-results");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="card mb-3 bg-transparent border-white text-white col-12 col-md-10 col-lg-8">
        <div className="card-body">
          <div className="row mb-2">
            <div className="col">
              <h3>
                <b>Welcome to SceneSmith</b>
              </h3>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <small>
                Millions of movies, TV shows and people to discover. Explore
                now.
              </small>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 mb-2 mb-md-0">
              <input
                type="text"
                placeholder="Search and explore..."
                className="form-control border-0 rounded w-100"
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                  setSearchKeyword(e.target.value);
                }}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="col-12 col-md-3 d-flex justify-content-md-end">
              <a
                href="#"
                className="btn btn-outline-light btn-sm px-4 py-2 w-100 w-md-auto"
                onClick={handleSearch}
              >
                Search
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
