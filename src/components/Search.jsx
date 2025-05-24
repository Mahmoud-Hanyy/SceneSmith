import React, { useCallback, useContext, useEffect, useState } from "react";
import axiosInstance from "../apis/config";
import { useNavigate } from "react-router";
import SearchContext from "../context/searchContext";
import SearchKeyContext from "../context/searchKeyContext";

export default function Search({type = 'movie'}) {
  const [searchKey, setSearchKey] = useState("");

  const {_, setSearch} = useContext(SearchContext);
  const {__, setSearchKeyword} = useContext(SearchKeyContext)

  const navigate = useNavigate();

  // a function to fetch the data we are searching for
  const fetching = useCallback(() => {
    axiosInstance
      .get(`/search/${type}`, {
        params: {
          query: searchKey,
        },
      })
      .then((res) => {console.log(res.data.results);
      setSearch(res.data.results)})
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
  }, [searchKey,type,setSearch]);

  // handle the search on click the button
  const handleSearch = () => {
    if (!searchKey.trim()) {
      alert("Please enter a name to search for.");
      return;
    }
    fetching();
    navigate('/search-results');
  };

  // handle the search on press enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!searchKey.trim()) {
        alert("Please enter a name to search for.");
        return;
      }
      fetching();
      navigate('/search-results');
    }
  };

  useEffect(() => {
    fetching();
  }, [fetching]);

  return (
    <div className="row ">
      <div className="card mb-3 bg-transparent border-white text-white">
        <div className="card-body row">
          <div className="row">
            <h3 className=" col-10">
              <b>Welcome to SceneSmith</b>
            </h3>
          </div>
          <div className="row my-3">
            <small className="col-8">
              Millions of movies, TV shows and people to discover. Explore now.
            </small>
          </div>
          <div className="row my-3">
            <input
              type="text"
              placeholder="Search and explore..."
              className="col-9 border-0 rounded"
              value={searchKey}
              onChange={(e) => {setSearchKey(e.target.value);
                setSearchKeyword(e.target.value)
              }}
              onKeyDown={handleKeyPress}
            />
            <a
              href="#"
              className="btn btn-transparent text-white border-white col-2 mx-3"
              onClick={handleSearch}
            >
              Search
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
