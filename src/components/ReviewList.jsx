import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Rating from "./Rating";

export default function ReviewList({ ID }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(
        `${baseUrl}/movie/${ID}/reviews?api_key=${
          import.meta.env.VITE_API_KEY
        }&page=${page}`,
      );
      const data = await res.json();
      setReviews(data.results);
      setTotalPages(data.total_pages);
    };
    fetchReviews();
  }, [page]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Reviews</h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="card mb-3"
          style={{ backgroundColor: "#212529" }}
        >
          <div className="card-body">
            <h5 className="card-title" style={{ color: "white" }}>
              {review.author_details.name}
            </h5>
            <h6 className="card-subtitle" style={{ color: "white" }}>
              {review.author_details.username}
            </h6>
            <Rating rate={review.author_details.rating / 2} />
            <p className="card-text mt-2">{review.content}</p>
          </div>
        </div>
      ))}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
