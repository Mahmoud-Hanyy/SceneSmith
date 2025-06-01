import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const DefaultWatchlist = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <FontAwesomeIcon icon={faHeartCircleXmark} size="10x" />
        <p className="mt-5">No Movies or TV Shows in Watchlist</p>
        <Button className="mt-4 px-5" onClick={() => navigateToHome()}>
          Back to Home
        </Button>
      </div>
    </>
  );
};

export default DefaultWatchlist;
