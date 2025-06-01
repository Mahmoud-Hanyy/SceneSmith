import DetailsCard from "../components/DetailsCard";
import axiosInstance from "../apis/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReviewList from "../components/ReviewList";
import Recommendation from "../components/Recommendation";
export default function Details() {
  const [details, setDetails] = useState(null);
  const { id, type } = useParams();
  const category = type === "movie" ? "movies" : "shows";

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

        {(type === "movie" || type === "tv") && (
          <>
            <ReviewList type={type} id={id} />

            <div className="d-flex justify-content-center">
              <div className="col-lg-9 col-md-9 col-12">
                <Recommendation type={type} category={category} id={id} />
              </div>
            </div>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <p className="text-white">Loading</p>
      </>
    );
  }
}
