import { motion } from "framer-motion";
import Rating from "./Rating";

export default function MovieDetailsCard({ movie }) {
  return (
    <motion.div
      className="container pt-5"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div
        className="card-movies"
        style={{
          boxShadow: "5px 5px 20px rgba(0, 123, 255, 0.7)",
          borderRadius: "12px",
        }}
      >
        <div className="row g-0 ">
          <div className="col-12 col-md-3 ">
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              className="img-fluid w-100"
              style={{ borderRadius: "12px", maxHeight: "100%" }}
              alt="poster"
            />
          </div>

          <div className="col-12 col-md-9">
            <div className="card-body m-3">
              <h1
                className="display-6 fw-bold card-title"
                style={{
                  color: "white",
                  fontSize: "34px",
                  paddingBottom: "5px",
                }}
              >
                {movie.title}
              </h1>
              <p
                className="card-text text-muted"
                style={{
                  paddingBottom: "5px",
                }}
              >
                {movie.release_date}
              </p>
              <div className="d-flex">
                <Rating rate={movie.vote_average / 2} />
                <h6 className="ps-3 text-muted">{movie.vote_count} votes</h6>
              </div>
              <p
                className="card-text mt-2"
                style={{
                  fontSize: "16px",
                }}
              >
                {movie.overview}
              </p>
              <div className="w-100 d-flex mt-4 flex-wrap">
                {movie.genres.map((item) => (
                  <p key={item.id} className="badge p-2 btn-movies ms-2">
                    {item.name}
                  </p>
                ))}
              </div>

              <div className="d-flex w-100 justify-content-start pt-2">
                <p className="ps-1 small text-muted fst-italic">
                  <span className="fw-bold">Duration</span>: {movie.runtime} min
                </p>
                <p className="ps-5 small text-muted fst-italic">
                  <span className="fw-bold">Language</span>:{" "}
                  {movie.spoken_languages.map((item) => item.name).join(", ")}
                </p>
              </div>

              <div className="mt-3 d-flex justify-content-between w-100">
                {movie.production_companies &&
                  movie.production_companies[0] &&
                  movie.production_companies[0].logo_path && (
                    <button
                      className="btn btn-movies-outline"
                      style={{
                        backgroundColor: "#f2f0ef",
                        padding: "10px",
                      }}
                    >
                      <img
                        className=" ms-1"
                        src={`https://image.tmdb.org/t/p/w200/${movie.production_companies[0].logo_path}`}
                        style={{
                          height: "40px",
                          width: "auto",
                          maxWidth: "120px",
                          objectFit: "contain",
                        }}
                        alt="company logo"
                      />
                    </button>
                  )}

                <a
                  className="ps-2"
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="btn btn-movies-outline text-white"
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    <small>Website</small> <i className="bi bi-link"></i>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
