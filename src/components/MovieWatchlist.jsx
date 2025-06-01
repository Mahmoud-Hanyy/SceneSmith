import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeMovieFromWatchlist } from "../store/slices/watchlistSlice";
import Rating from "./Rating";
import { useNavigate } from "react-router";

const MovieWatchlist = ({ movie, movieId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigate(`/details/movie/${movieId}`);
  };
  const removeFromWatchlist = () => {
    dispatch(removeMovieFromWatchlist(movieId));
  };

  const posterSrc = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  const date = new Date(movie.release_date);
  const formattedDate = date.toLocaleDateString("en-Us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <div
        className="d-flex flex-column flex-md-row border rounded-2 p-3 my-3 w-100"
        style={{ maxWidth: "100%" }}
      >
        <div>
          <img
            className="rounded-4"
            style={{ cursor: "pointer" }}
            src={posterSrc}
            onClick={() => handleNavigation()}
          ></img>
        </div>
        <div className="ms-3 mt-2">
          <div className="d-flex justify-content-between">
            <h4 style={{ fontWeight: "bold", fontSize: 32 }}>{movie.title}</h4>
            <FontAwesomeIcon
              icon={faHeartSolid}
              size="2x"
              style={{ color: "#00acc1", cursor: "pointer" }}
              onClick={() => removeFromWatchlist()}
            />
          </div>

          <div className="text-muted" style={{ fontSize: 12 }}>
            {formattedDate}
          </div>
          <div className="d-flex pt-2">
            <Rating rate={movie.vote_average / 2} />
            <h6 className="ps-2">{movie.vote_count}</h6>
          </div>
          <div className="mt-3">
            {movie.overview.length > 280
              ? `${movie.overview.slice(0, 280)}...`
              : movie.overview}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieWatchlist;
