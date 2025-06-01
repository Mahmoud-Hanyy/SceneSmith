import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeShowFromWatchlist } from "../store/slices/watchlistSlice";
import Rating from "./Rating";
import { useNavigate } from "react-router";

const ShowWatchlist = ({ show, showId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigate(`/details/tv/${showId}`);
  };
  const removeFromWatchlist = () => {
    dispatch(removeShowFromWatchlist(showId));
  };

  const posterSrc = `https://image.tmdb.org/t/p/w200${show.poster_path}`;
  const date = new Date(show.first_air_date);
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
            <h4 style={{ fontWeight: "bold", fontSize: 32 }}>{show.name}</h4>
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
            <Rating rate={show.vote_average / 2} />
            <h6 className="ps-2">{show.vote_count}</h6>
          </div>
          <div className="mt-3">
            {show.overview.length > 220
              ? `${show.overview.slice(0, 220)}...`
              : show.overview}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowWatchlist;
