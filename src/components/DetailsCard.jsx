import { motion } from "framer-motion";
import Rating from "./Rating";

export default function DetailsCard({ show: show }) {
  const isSeries = !!show.first_air_date;

  return (
    <motion.div
      className="container pt-5"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* boxShadow: "5px 5px 20px rgba(221, 230, 240, 0.7)", */}

      <div
        className="card-movies"
        style={{
          boxShadow: "5px 5px 20px rgba(221, 230, 240, 0.7)",
          borderRadius: "12px",
        }}
      >
        <div className="row g-0 ">
          <div className="col-12 col-md-3 ">
            <img
              src={`https://image.tmdb.org/t/p/w300/${show.poster_path}`}
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
                {show.title || show.name}
              </h1>
              <p
                className="card-text text-muted"
                style={{
                  paddingBottom: "5px",
                }}
              >
                {show.release_date || show.first_air_date}
              </p>
              <div className="d-flex">
                <Rating rate={show.vote_average / 2} />
                <h6 className="ps-3 text-muted">{show.vote_count} votes</h6>
              </div>
              <p
                className="card-text mt-2"
                style={{
                  fontSize: "16px",
                }}
              >
                {show.overview}
              </p>
              <div className="w-100 d-flex mt-4 flex-wrap">
                {show.genres.map((item) => (
                  <p key={item.id} className="badge p-2 btn-movies ms-2">
                    {item.name}
                  </p>
                ))}
              </div>

              <div className="d-flex w-100 justify-content-start pt-2">
                <p className="ps-1 small text-muted fst-italic">
                  <span className="fw-bold">Duration:</span>{" "}
                  {show.runtime
                    ? `${show.runtime} min`
                    : show.episode_run_time?.[0]
                    ? `${show.episode_run_time[0]} min / ep`
                    : "N/A"}
                </p>
                <p className="ps-5 small text-muted fst-italic">
                  <span className="fw-bold">Language</span>:{" "}
                  {show.spoken_languages.map((item) => item.name).join(", ")}
                </p>
              </div>
              {isSeries && (
                <>
                  <div className="d-flex w-100 d-flex justify-content-between text-muted small mt-2">
                    <p className="pe-4">
                      <span className="fw-bold">Seasons:</span>{" "}
                      {show.number_of_seasons}
                    </p>
                    <p className="pe-4">
                      <span className="fw-bold">Episodes:</span>{" "}
                      {show.number_of_episodes}
                    </p>
                    <p className="pe-4">
                      <span className="fw-bold">Status:</span> {show.status}
                    </p>
                  </div>
                  <p className="text-muted small">
                    <span className="fw-bold">Created by:</span>{" "}
                    {show.created_by?.map((c) => c.name).join(", ") || "N/A"}
                  </p>
                  <p className="text-muted small">
                    <span className="fw-bold">Networks:</span>{" "}
                    {show.networks?.map((n) => n.name).join(", ") || "N/A"}
                  </p>
                </>
              )}

              <div className="mt-3 d-flex justify-content-between w-100">
                {show.production_companies &&
                  show.production_companies[0] &&
                  show.production_companies[0].logo_path && (
                    <button
                      className="btn btn-movies-outline"
                      style={{
                        backgroundColor: "#f2f0ef",
                        padding: "10px",
                      }}
                    >
                      <img
                        className=" ms-1"
                        src={`https://image.tmdb.org/t/p/w200/${show.production_companies[0].logo_path}`}
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
                  href={show.homepage}
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
