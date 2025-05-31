import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../store/slices/watchlistSlice";

function MainCards({ data, onCardClick }) {
  const moviesWatchlist = useSelector(
    (state) => state.watchlist.watchlist["movies"]
  );
  const handleNavigation = (id) => {
    onCardClick(id);
  };
  const dispatch = useDispatch();
  const addToWatchlist = () => {
    dispatch(addMovieToWatchlist(data));
  };
  const removeFromWatchlist = () => {
    dispatch(removeMovieFromWatchlist(data));
  };

  const imageUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "https://via.placeholder.com/200x300";
  const rating = Math.round(data.vote_average * 10);

  let circleColor = "#21d07a";
  if (rating < 70 && rating >= 40) circleColor = "#ffcc00";
  if (rating < 40) circleColor = "#ff4444";

  return (
    <div className="card main-card">
      <div
        className="image-container"
        onClick={() => handleNavigation(data.id)}
      >
        <img src={imageUrl} className="card-img-top" alt={data.title} />
        <div className="rating-circle" style={{ backgroundColor: circleColor }}>
          {rating}%
        </div>
      </div>
      <div className="main-card-body">
        <div className="content-left">
          <h5
            className="card-title"
            style={{ color: "#1e2129" }}
            onClick={() => handleNavigation(data.id)}
          >
            {data.title || data.name}
          </h5>
          <p className="card-text" style={{ color: "#1e2129" }}>
            {data.release_date || data.first_air_date}
          </p>
        </div>
        <div className="content-right">
          {moviesWatchlist[data.id] ? (
            <FontAwesomeIcon
              icon={faHeartSolid}
              style={{ color: "yellow" }}
              onClick={() => removeFromWatchlist()}
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeartRegular}
              style={{ color: "yellow" }}
              onClick={() => addToWatchlist()}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainCards;
