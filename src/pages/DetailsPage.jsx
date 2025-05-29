import DetailsCard from "../components/DetailsCard";
import axiosInstance from "../apis/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReviewList from "../components/ReviewList";
import RecommendationMovie from "../components/MoviesRecommendation";

export default function Details() {
  const [details, setDetails] = useState(null);
  const { id, type } = useParams();

  const getDetails = async () => {
    try {
      const detailsResponse = await axiosInstance.get(`/${type}/${id}`);
      setDetails(detailsResponse.data);
      console.log(details);
    } catch (error) {
      console.error("Failed to fetch movie details", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [id, type]);

  if (details) {
    return (
      <>
        <DetailsCard show={details} />
        {type === "movie" && (
          <>
            <ReviewList ID={id} />
            <div className="d-flex justify-content-center">
              <div className="col-lg-9 col-md-9 col-12">
                <RecommendationMovie movieId={id} />
              </div>
            </div>
          </>
        )}
      </>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    );
  }
}
