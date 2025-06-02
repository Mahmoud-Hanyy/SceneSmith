import { useSelector } from "react-redux";
import DefaultWatchlist from "../components/DefaultWatchlist";
import MovieWatchlist from "../components/MovieWatchlist";
import ShowWatchlist from "../components/ShowWatchlist";
import { Container, Row, Col } from "react-bootstrap";

const Watchlist = () => {
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const moviesId = Object.keys(watchlist["movies"]);
  const showsId = Object.keys(watchlist["shows"]);
  const watchlistCount = useSelector((state) => state.watchlist.watchlistCount);
  const showsCount = useSelector((state) => state.watchlist.showsCount);
  const moviesCount = useSelector((state) => state.watchlist.moviesCount);
  return (
    <Container>
      <h2>Watchlist</h2>
      {watchlistCount ? "" : <DefaultWatchlist />}
      {moviesCount ? <h3>Movies Watchlist</h3> : ""}
      <Row>
        {moviesCount
          ? moviesId.map((id) => (
              <Col className=" d-flex justify-content-center g-4" key={id} xs={12} sm={12} md={12} lg={6}>
                <MovieWatchlist movie={watchlist["movies"][id]} movieId={id} />
              </Col>
            ))
          : ""}
      </Row>

      {showsCount ? <h3>TV Shows Watchlist</h3> : ""}
      <Row>
        {showsCount
          ? showsId.map((id) => (
              <Col key={id} md={6}>
                <ShowWatchlist show={watchlist["shows"][id]} showId={id} />
              </Col>
            ))
          : ""}
      </Row>
    </Container>
  );
};

export default Watchlist;
