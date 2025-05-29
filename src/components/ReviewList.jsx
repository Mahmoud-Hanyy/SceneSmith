import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Rating from "./Rating";
import axiosInstance from "../apis/config";

export default function ReviewList({type,id}) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

 const fetchReviews = async () => {
    const response = await axiosInstance.get(`/${type}/${id}/reviews`)
      
      const data = response.data
      setReviews(data.results);
      setTotalPages(data.total_pages);
    };
  useEffect(() => {
   
    fetchReviews();
  }, [page,id,type]);
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Reviews</h2>
     
      {reviews.length === 0 ? (
        <p className="text-center text-muted">No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="card mb-3" style={{ backgroundColor: "#212529" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: "white" }}>
                {review.author_details.name || review.author}
              </h5>
              <h6 className="card-subtitle" style={{ color: "white" }}>
                {review.author_details.username}
              </h6>
              <Rating rate={(review.author_details.rating || 0) / 2} />
              <p className="card-text mt-2">{review.content}</p>
            </div>
          </div>
        ))
      )}

      {reviews.length > 0 && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
}